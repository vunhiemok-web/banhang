// Mock Data (In a real app, use Mongoose/Sequelize models)
let products = require('../../constants').PRODUCTS || []; // Assuming constants can be required or mocked here
let orders = []; // Would come from DB
let users = [
    { id: 1, name: 'Admin User', role: 'admin', email: 'admin@example.com' },
    { id: 2, name: 'Customer', role: 'user', email: 'user@example.com' }
];

// --- Products ---
exports.getAllProducts = (req, res) => {
    res.json(products);
};

exports.createProduct = (req, res) => {
    const { name, price, category_id, description, stock } = req.body;
    const newProduct = {
        id: Date.now().toString(),
        name,
        price,
        category_id,
        description,
        stock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== id);
    res.json({ message: 'Product deleted' });
};

// --- Orders ---
exports.getAllOrders = (req, res) => {
    const { status } = req.query;
    let filteredOrders = orders;
    if (status) {
        filteredOrders = orders.filter(o => o.status === status);
    }
    res.json(filteredOrders);
};

exports.updateOrderStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

// --- Dashboard ---
exports.getDashboardOverview = (req, res) => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0); // Simplified
    const today = new Date().toLocaleDateString();
    const todayOrders = orders.filter(o => new Date(o.date).toLocaleDateString() === today).length;

    res.json({
        totalUsers: users.length,
        totalOrders: orders.length,
        totalRevenue,
        todayOrders
    });
};

exports.getRevenueStats = (req, res) => {
    // Mock data for chart
    res.json([
        { date: '2025-01-01', revenue: 500000 },
        { date: '2025-01-02', revenue: 750000 },
        { date: '2025-01-03', revenue: 1200000 },
    ]);
};

// --- Users ---
exports.getAllUsers = (req, res) => {
    res.json(users);
};

exports.updateUserRole = (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const user = users.find(u => u.id == id);
    if (user) {
        user.role = role;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
