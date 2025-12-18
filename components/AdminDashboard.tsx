import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, DollarSign, Package, TrendingUp, Search, Bell, Menu, X, Check, Archive, Truck, Trash2 } from 'lucide-react';
import { adminApi, AdminOrder } from '../services/fakeAdminApi';
import { PRODUCTS } from '../constants';

// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            {trend && <p className="text-green-600 text-xs font-bold mt-2 flex items-center gap-1"><TrendingUp size={12} /> {trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={24} className="text-white" />
        </div>
    </div>
);

const OrderRow = ({ order, onStatusUpdate, onDelete }: { order: AdminOrder; onStatusUpdate: (id: string, status: string) => void; onDelete: (id: string) => void }) => {
    const statusColors: any = {
        pending: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-blue-100 text-blue-800',
        shipping: 'bg-purple-100 text-purple-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    const statusLabels: any = {
        pending: 'Chờ xử lý',
        confirmed: 'Đã xác nhận',
        shipping: 'Đang giao',
        completed: 'Hoàn thành',
        cancelled: 'Đã huỷ'
    };

    return (
        <tr className="hover:bg-gray-50 transition-colors border-b border-gray-50">
            <td className="p-4 font-bold text-gray-700">#{order.id.slice(-6)}</td>
            <td className="p-4">
                <div className="font-medium text-gray-900">{order.customer.phone}</div>
                <div className="text-xs text-gray-500 truncate max-w-[150px]">{order.customer.address}</div>
            </td>
            <td className="p-4">
                <div className="flex flex-col gap-1">
                    {Object.entries(order.cart).map(([pid, qty]) => (
                        <span key={pid} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                            {PRODUCTS.find(p => p.id === pid)?.name || pid} x {qty}
                        </span>
                    ))}
                </div>
            </td>
            <td className="p-4 font-bold text-gray-900">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
            </td>
            <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || 'bg-gray-100'}`}>
                    {statusLabels[order.status] || order.status}
                </span>
            </td>
            <td className="p-4 flex items-center gap-2">
                <select
                    className="text-xs border-gray-300 border rounded p-1.5 outline-none focus:border-blue-500 bg-white"
                    value={order.status}
                    onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                >
                    <option value="pending">Chờ xử lý</option>
                    <option value="confirmed">Xác nhận</option>
                    <option value="shipping">Giao hàng</option>
                    <option value="completed">Hoàn tất</option>
                </select>
                <button
                    onClick={() => onDelete(order.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Huỷ & Xóa đơn hàng"
                >
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};

// --- MAIN DASHBOARD COMPONENT ---

const AdminDashboard = ({ onBackToShop }: { onBackToShop: () => void }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'users'>('overview');
    const [stats, setStats] = useState<any>(null);
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dashboardStats = await adminApi.getDashboardStats();
                const allOrders = await adminApi.getAllOrders();
                setStats(dashboardStats);
                setOrders(allOrders);
            } catch (error) {
                console.error("Failed to load admin data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await adminApi.updateOrderStatus(id, newStatus);
            setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus as any } : o));
        } catch (e) {
            alert('Có lỗi xảy ra!');
            console.error(e);
        }
    };

    const handleDeleteOrder = async (id: string) => {
        const isConfirmed = window.confirm("Xác nhận HỦY và XÓA đơn hàng này? Đơn hàng sẽ biến mất khỏi hệ thống.");
        if (isConfirmed) {
            try {
                await adminApi.deleteOrder(id);
                setOrders(prev => prev.filter(o => o.id !== id));
            } catch (e) {
                alert('Không thể xóa đơn hàng');
                console.error(e);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans flex text-gray-800">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Package size={20} />
                    </div>
                    <h1 className="font-bold text-xl text-gray-800">Admin Pro</h1>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <TrendingUp size={20} /> Tổng Quan
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <ShoppingBag size={20} /> Đơn Hàng
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Archive size={20} /> Sản Phẩm
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === 'users' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Users size={20} /> Người Dùng
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button onClick={onBackToShop} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-lg transition-colors">
                        Thoát Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow md:ml-64 min-h-screen">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-20">
                    <h2 className="font-bold text-lg capitalize">{activeTab === 'overview' ? 'Dashboard Tổng Quan' : activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Tìm kiếm..." className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-200" />
                        </div>
                        <button className="p-2 relative bg-gray-100 rounded-full hover:bg-gray-200">
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* OVERVIEW TAB */}
                            {activeTab === 'overview' && stats && (
                                <div className="space-y-8 animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <StatCard title="Tổng Doanh Thu" value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(stats.totalRevenue)} icon={DollarSign} color="bg-green-500" trend="+12.5%" />
                                        <StatCard title="Tổng Đơn Hàng" value={stats.totalOrders} icon={ShoppingBag} color="bg-blue-500" trend="+5.2%" />
                                        <StatCard title="Đơn Hôm Nay" value={stats.todayOrders} icon={Truck} color="bg-purple-500" trend="Mới" />
                                        <StatCard title="Khách Hàng" value={stats.totalUsers} icon={Users} color="bg-orange-500" />
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="font-bold text-lg mb-4 text-gray-800">Đơn hàng mới nhất</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="text-gray-400 text-sm border-b border-gray-100">
                                                        <th className="p-4 font-medium">Mã đơn</th>
                                                        <th className="p-4 font-medium">Khách hàng</th>
                                                        <th className="p-4 font-medium">Sản phẩm</th>
                                                        <th className="p-4 font-medium">Tổng tiền</th>
                                                        <th className="p-4 font-medium">Trạng thái</th>
                                                        <th className="p-4 font-medium">Hành động</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.slice(0, 5).map(order => (
                                                        <OrderRow key={order.id} order={order} onStatusUpdate={handleStatusUpdate} onDelete={handleDeleteOrder} />
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ORDERS TAB */}
                            {activeTab === 'orders' && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-lg text-gray-800">Quản lý toàn bộ đơn hàng</h3>
                                        <div className="flex gap-2">
                                            <select
                                                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 outline-none cursor-pointer"
                                                onChange={(e) => {
                                                    const status = e.target.value;
                                                    if (status === 'all') {
                                                        adminApi.getAllOrders().then(setOrders);
                                                    } else {
                                                        adminApi.getAllOrders(status).then(setOrders);
                                                    }
                                                }}
                                            >
                                                <option value="all">Tất cả trạng thái</option>
                                                <option value="pending">Chờ xử lý</option>
                                                <option value="confirmed">Đã xác nhận</option>
                                                <option value="shipping">Đang giao</option>
                                                <option value="completed">Hoàn thành</option>
                                            </select>
                                            <button
                                                onClick={() => {
                                                    const header = ["Mã đơn", "Khách hàng", "SĐT", "Địa chỉ", "Tổng tiền", "Trạng thái", "Ngày đặt"];
                                                    const rows = orders.map(o => [
                                                        o.id,
                                                        o.customer.phone, // Using phone as name proxy if name missing
                                                        o.customer.phone,
                                                        o.customer.address,
                                                        o.totalAmount,
                                                        o.status,
                                                        o.date
                                                    ]);
                                                    const csvContent = "data:text/csv;charset=utf-8,"
                                                        + [header.join(","), ...rows.map(e => e.join(","))].join("\n");
                                                    const encodedUri = encodeURI(csvContent);
                                                    const link = document.createElement("a");
                                                    link.setAttribute("href", encodedUri);
                                                    link.setAttribute("download", "danh_sach_don_hang.csv");
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center gap-2"
                                            >
                                                <Package size={16} /> Xuất Excel
                                            </button>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                                    <th className="p-4 rounded-l-xl">Mã</th>
                                                    <th className="p-4">Khách hàng</th>
                                                    <th className="p-4">Chi tiết</th>
                                                    <th className="p-4">Tổng tiền</th>
                                                    <th className="p-4">Trạng thái</th>
                                                    <th className="p-4 rounded-r-xl">Cập nhật</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {orders.length > 0 ? (
                                                    orders.map(order => (
                                                        <OrderRow key={order.id} order={order} onStatusUpdate={handleStatusUpdate} onDelete={handleDeleteOrder} />
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={6} className="p-8 text-center text-gray-400">Không tìm thấy đơn hàng nào</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* USERS TAB - CUSTOMER HISTORY */}
                            {activeTab === 'users' && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
                                    <h3 className="font-bold text-lg text-gray-800 mb-6">Lịch sử mua hàng khách hàng</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* Group orders by phone number to simulate users */}
                                        {Array.from(new Set(orders.map(o => o.customer.phone))).map(phone => {
                                            const userOrders = orders.filter(o => o.customer.phone === phone);
                                            const totalSpent = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);
                                            const lastOrder = userOrders[0]; // Assuming sorted by date desc

                                            return (
                                                <div key={phone} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg">
                                                                {phone.slice(-2)}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-gray-900">{phone}</h4>
                                                                <p className="text-sm text-gray-500">{lastOrder.customer.address}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">Tổng chi tiêu</p>
                                                            <p className="text-xl font-bold text-blue-600">
                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalSpent)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <h5 className="text-xs font-bold text-gray-500 uppercase mb-3">Lịch sử đơn hàng ({userOrders.length})</h5>
                                                        <div className="space-y-3">
                                                            {userOrders.map(order => (
                                                                <div key={order.id} className="flex justify-between items-center text-sm border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                                                                    <span className="font-medium">#{order.id.slice(-6)}</span>
                                                                    <span className="text-gray-500">{order.date}</span>
                                                                    <span className={`px-2 py-0.5 rounded textxs font-medium 
                                                                        ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                                                                        {order.status === 'pending' ? 'Chờ xử lý' :
                                                                            order.status === 'shipping' ? 'Đang giao' :
                                                                                order.status === 'completed' ? 'Hoàn thành' :
                                                                                    order.status === 'cancelled' ? 'Đã huỷ' : 'Đã xác nhận'}
                                                                    </span>
                                                                    <span className="font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</span>
                                                                    <button
                                                                        onClick={() => handleDeleteOrder(order.id)}
                                                                        className="p-1 text-gray-400 hover:text-red-500 ml-2"
                                                                        title="Xóa đơn"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {orders.length === 0 && <p className="text-center text-gray-500">Chưa có dữ liệu khách hàng.</p>}
                                    </div>
                                </div>
                            )}

                            {/* PRODUCTS TAB (Placeholder) */}
                            {activeTab === 'products' && (
                                <div className="bg-white p-10 rounded-2xl text-center border-2 border-dashed border-gray-200">
                                    <Archive size={48} className="mx-auto text-gray-300 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-400">Quản lý sản phẩm đang bảo trì</h3>
                                    <p className="text-gray-400">Vui lòng quay lại sau.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
