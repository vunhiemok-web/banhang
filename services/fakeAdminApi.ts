import { PRODUCTS } from '../constants';

// Types mimicking the DB schema
export interface AdminOrder {
    id: string;
    customer: { phone: string; address: string; note: string };
    cart: { [key: string]: number };
    totalItems: number;
    date: string;
    status: 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';
    totalAmount: number; // calculated field
}

export interface AdminProduct {
    id: string;
    name: string;
    priceHint: string;
    description: string;
    imageUrl: string;
}

// --- MOCK API SERVICE ---
// This service simulates the Backend API responses interacting with LocalStorage

const DELAY = 500; // Simulate network latency

const getOrders = (): AdminOrder[] => {
    const stored = localStorage.getItem('tet_orders');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    // Add status if missing (migration)
    return parsed.map((o: any) => ({
        ...o,
        status: o.status || 'pending',
        totalAmount: calculateTotal(o.cart)
    }));
};

const calculateTotal = (cart: { [key: string]: number }): number => {
    let total = 0;
    Object.entries(cart).forEach(([id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            // Parse "25k" -> 25000
            const price = parseInt(product.priceHint.replace('k', '000').replace('.', ''));
            if (!isNaN(price)) {
                total += price * qty;
            }
        }
    });
    return total;
};

export const adminApi = {
    // 1. Dashboard Overview
    getDashboardStats: async () => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        const orders = getOrders();
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const today = new Date().toLocaleDateString('vi-VN');
        const todayOrders = orders.filter(o => new Date(o.date).toLocaleDateString('vi-VN') === today).length;

        return {
            totalUsers: 125, // Mock
            totalOrders: orders.length,
            totalRevenue,
            todayOrders
        };
    },

    // 2. Orders
    getAllOrders: async (status?: string) => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        let orders = getOrders();
        if (status) {
            orders = orders.filter(o => o.status === status);
        }
        return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    updateOrderStatus: async (id: string, status: string) => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        const orders = getOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index !== -1) {
            orders[index].status = status as any;
            localStorage.setItem('tet_orders', JSON.stringify(orders));
            return orders[index];
        }
        throw new Error('Order not found');
    },

    deleteOrder: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        let orders = getOrders();
        orders = orders.filter(o => o.id !== id);
        localStorage.setItem('tet_orders', JSON.stringify(orders));
        return true;
    },

    // 3. Products (Mocking edit of CONSTANTS - usually restricted in frontend, but we simulate)
    getAllProducts: async () => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        return PRODUCTS;
    },

    // 4. Revenue Chart Data
    getRevenueData: async () => {
        await new Promise(resolve => setTimeout(resolve, DELAY));
        // Generate some fake data based on last 7 days
        return [
            { date: '12/02', revenue: 150000 },
            { date: '13/02', revenue: 300000 },
            { date: '14/02', revenue: 450000 },
            { date: '15/02', revenue: 200000 },
            { date: '16/02', revenue: 600000 },
            { date: '17/02', revenue: 850000 },
            { date: '18/02', revenue: 1200000 },
        ];
    }
};
