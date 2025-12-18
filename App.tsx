import React, { useState, useEffect } from 'react';
import { ProductType, Product } from './types';
import { PRODUCTS } from './constants';
import { ShoppingBag, Sparkles, Star, Plus, Minus, X, LayoutList, Phone, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

// Simple currency formatter
const formatPrice = (priceHint: string) => {
  return priceHint.replace('k', '.000đ').replace('/', ' / ');
};

import AdminDashboard from './components/AdminDashboard';

// ... (keep existing imports)

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ phone: '', address: '', note: '' });
  const [showPhone, setShowPhone] = useState(false);

  // Admin & Order State
  const [view, setView] = useState<'shop' | 'admin' | 'login'>('shop');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('tet_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Calculate total items
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));

    // Festive confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFE800', '#FF0000', '#FFD700']
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.phone.trim() || !customerInfo.address.trim()) return;

    const newOrder = {
      id: Date.now().toString(),
      customer: { ...customerInfo },
      cart: { ...cart },
      totalItems,
      date: new Date().toLocaleString('vi-VN'),
      status: 'pending' // Default status
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('tet_orders', JSON.stringify(updatedOrders));

    alert(`Cảm ơn bạn! Đơn hàng sẽ được giao đến:\n${customerInfo.address}\nSĐT: ${customerInfo.phone}\n\nChúc bạn năm mới An Khang Thịnh Vượng!`);

    setCart({});
    setCustomerInfo({ phone: '', address: '', note: '' });
    setIsCheckoutOpen(false);
    confetti({ particleCount: 300, spread: 120, origin: { y: 0.6 }, colors: ['#FFE800', '#FF0000', '#FFD700'] });
  };

  const handleAdminLogin = (e: React.FormEvent, password: string) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for demo
      setIsAdminLoggedIn(true);
      setView('admin');
    } else {
      alert('Mật khẩu không đúng!');
    }
  };

  // --- ADMIN LOGIN VIEW ---
  if (view === 'login') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutList size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Đăng Nhập Admin</h2>
            <p className="text-gray-500 text-sm mt-2">Vui lòng nhập mật khẩu để truy cập.</p>
          </div>
          <form
            onSubmit={(e) => {
              const target = e.target as typeof e.target & {
                password: { value: string };
              };
              handleAdminLogin(e, target.password.value);
            }}
            className="space-y-4"
          >
            <div>
              <input
                name="password"
                type="password"
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all font-medium"
                autoFocus
              />
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/30">
              Truy Cập Dashboard
            </button>
            <button
              type="button"
              onClick={() => setView('shop')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-all"
            >
              Quay Lại Shop
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- ADMIN DASHBOARD VIEW ---
  if (view === 'admin') {
    if (!isAdminLoggedIn) {
      setView('login');
      return null;
    }
    return <AdminDashboard onBackToShop={() => setView('shop')} />;
  }

  // --- SHOP VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-red-100 selection:text-red-900">

      {/* Background decorations - Subtle modernization */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Modern Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold text-gray-900 tracking-tight leading-none group-hover:text-red-600 transition-colors">
                  BÁNH TRÁNG <span className="text-red-600">TẾT</span>
                </h1>
                <span className="text-xs font-medium text-gray-500 tracking-wider uppercase mt-0.5">Vị ngon truyền thống</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setView('login')}
                className="hidden md:block text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
              >
                Admin Panel
              </button>

              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2.5 rounded-full hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all duration-300 group"
              >
                <ShoppingBag size={26} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white animate-bounce-slow">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">

          {/* Hero Banner / Campaign */}
          <div className="mb-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-700 to-red-800 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-yellow-300 text-sm font-bold mb-6 uppercase tracking-wider shadow-sm">
                <Star size={14} fill="currentColor" /> Chào Xuân 2026
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                Xuân Gắn Kết <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Tết Yêu Thương</span>
              </h2>
              <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
                Mỗi sản phẩm là một tấm lòng. Cùng chung tay ủng hộ <br className="hidden md:block" /> quỹ từ thiện Câu Lạc Bộ Kết Nối.
              </p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex items-end justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-red-600 rounded-full mr-2"></span>
              Sản Phẩm Nổi Bật
            </h3>
            <span className="text-sm text-gray-500 font-medium hidden sm:block">Hiển thị {PRODUCTS.length} sản phẩm</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PRODUCTS.map(product => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 flex flex-col">
                {/* Image Container - Aspect Ratio 4:3 for better fit */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
                    loading="lazy"
                    onDoubleClick={() => setSelectedProduct(product)}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-md">
                      Best Seller
                    </span>
                  </div>
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg transform scale-90 hover:scale-100 transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <Plus size={18} /> Mua Nhanh
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div>
                      <span className="block text-xs text-gray-400 font-medium line-through">25.000đ</span>
                      <span className="text-lg font-bold text-red-600">{product.priceHint}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white text-gray-600 flex items-center justify-center transition-all duration-300 shadow-sm"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Product Description Section */}
          <div className="mt-24 space-y-24">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-black text-gray-900 inline-block relative">
                <span className="relative z-10">Khám Phá Hương Vị</span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-300 -z-0 opacity-60"></span>
              </h3>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Mỗi món ăn là một câu chuyện, là tâm huyết chúng tôi gửi gắm trong từng công đoạn chế biến.</p>
            </div>

            {PRODUCTS.map((product, index) => (
              <div key={`detail-${product.id}`} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 relative group">
                  <div className="absolute inset-0 bg-red-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform opacity-10"></div>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="relative z-10 rounded-3xl shadow-xl w-full object-cover aspect-[4/3] transform transition-transform duration-500 group-hover:-translate-y-2"
                  />
                </div>
                <div className="md:w-1/2 space-y-6">
                  <h4 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h4>
                  <p className="text-lg text-red-600 font-bold">{product.priceHint}</p>
                  <div className="w-16 h-1 bg-gray-200"></div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {product.detailDescription || product.description}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✔</div>
                      Hương vị độc quyền
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✔</div>
                      Đảm bảo vệ sinh
                    </li>
                    <li className="flex items-center gap-3 text-gray-600">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✔</div>
                      Giao hàng hỏa tốc
                    </li>
                  </ul>
                  <button
                    onClick={() => addToCart(product.id)}
                    className="mt-4 px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-lg shadow-gray-200"
                  >
                    Đặt Món Này
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 section-bg">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h4 className="text-white font-bold text-lg mb-4">BÁNH TRÁNG AI MARKETER</h4>
            <div className="flex justify-center gap-6 mb-8">
              <a href="#" className="hover:text-white transition-colors">Về chúng tôi</a>
              <a href="#" className="hover:text-white transition-colors">Chính sách</a>
              <a href="#" className="hover:text-white transition-colors">Liên hệ</a>
            </div>
            <p className="text-sm opacity-60">&copy; 2025 Powered by Gemini Advanced Coding</p>
          </div>
        </footer>

        {/* FLOATING ACTION BUTTON - SUPPORT */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
          {/* Phone Number Tooltip */}
          <div className={`pointer-events-auto bg-white px-5 py-3 rounded-2xl shadow-xl border border-red-100 flex items-center gap-3 transition-all duration-300 origin-bottom-right transform ${showPhone ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-4'}`}>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase">Hotline hỗ trợ</p>
              <p className="text-lg font-bold text-gray-900 leading-none">0343 280 742</p>
            </div>
          </div>

          {/* Main Button */}
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="pointer-events-auto group bg-gradient-to-r from-red-600 to-orange-500 hover:to-red-600 text-white p-4 rounded-full shadow-lg shadow-red-500/40 transform hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
          >
            {showPhone ? <X size={26} /> : <MessageCircle size={26} className="animate-pulse-slow" />}
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Tư vấn khách hàng
            </span>
          </button>
        </div>

        {/* CART DRAWER */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300" onClick={() => setIsCartOpen(false)}></div>
            <div className="bg-white w-full max-w-md h-full shadow-2xl relative z-10 flex flex-col transform transition-transform duration-300 animate-slideRec">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-red-600" /> Giỏ Hàng ({totalItems})
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-5 space-y-5">
                {Object.keys(cart).length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-300">
                      <ShoppingBag size={40} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
                    <p className="text-gray-500 mb-8 max-w-[200px]">Chưa có sản phẩm nào được chọn. Hãy thêm vài món ngon nhé!</p>
                    <button onClick={() => setIsCartOpen(false)} className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-all">
                      Tiếp tục mua sắm
                    </button>
                  </div>
                ) : (
                  Object.keys(cart).map(id => {
                    const product = PRODUCTS.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="flex gap-4 p-3 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-gray-200 transition-colors">
                        <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</h4>
                          <p className="text-red-600 font-bold text-sm">{product.priceHint}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                              <button onClick={() => removeFromCart(id)} className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-red-600 disabled:opacity-50">
                                <Minus size={14} />
                              </button>
                              <span className="font-bold text-gray-900 text-sm w-4 text-center">{cart[id]}</span>
                              <button onClick={() => addToCart(id)} className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-green-600">
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {Object.keys(cart).length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                  <button
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-red-500/20 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2"
                    onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
                  >
                    Tiến Hành Đặt Hàng <Sparkles size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHECKOUT MODAL - MODERNIZED */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCheckoutOpen(false)}></div>
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-zoomIn flex flex-col max-h-[90vh]">

              <div className="px-8 py-6 border-b border-gray-100 bg-white flex justify-between items-center sticky top-0 z-20">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Thông tin giao hàng</h3>
                  <p className="text-gray-500 text-sm mt-1">Hoàn tất đơn hàng của bạn</p>
                </div>
                <button onClick={() => setIsCheckoutOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-8 bg-gray-50/30">
                <form id="checkoutWrapper" onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white font-medium"
                        placeholder="Nhập số điện thoại..."
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Địa chỉ nhận hàng <span className="text-red-500">*</span></label>
                      <textarea
                        required
                        rows={3}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white font-medium resize-none shadow-sm"
                        placeholder="Số nhà, đường, phường/xã..."
                        value={customerInfo.address}
                        onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Ghi chú thêm</label>
                      <textarea
                        rows={2}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all bg-white font-medium resize-none shadow-sm"
                        placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                        value={customerInfo.note}
                        onChange={e => setCustomerInfo({ ...customerInfo, note: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 z-20">
                <button
                  type="submit"
                  form="checkoutWrapper"
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white font-bold py-4 rounded-xl shadow-xl shadow-gray-900/20 transition-all transform active:scale-[0.99] flex justify-center items-center gap-2 text-lg"
                >
                  Xác Nhận Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setSelectedProduct(null)}></div>
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-zoomIn flex flex-col md:flex-row">
              <div className="md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Best Seller
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedProduct.name}</h3>
                  <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-6 text-red-600 font-bold text-xl">
                  {selectedProduct.priceHint}
                </div>

                <div className="flex-grow overflow-y-auto pr-2 mb-6 custom-scrollbar">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {selectedProduct.detailDescription || selectedProduct.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-sm text-gray-800 mb-2">Đặc điểm nổi bật:</h4>
                    <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside h-24 overflow-y-auto">
                      <li>Nguyên liệu tuyển chọn loại 1</li>
                      <li>Đóng gói zip tiện lợi, sạch sẽ</li>
                      <li>Không chất bảo quản độc hại</li>
                      <li>Giao hàng nhanh 2h nội thành</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-red-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> Thêm Vào Giỏ Ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;