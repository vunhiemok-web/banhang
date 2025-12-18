const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllOrders,
    updateOrderStatus,
    getDashboardOverview,
    getRevenueStats,
    getAllUsers,
    updateUserRole
} = require('../controllers/adminController');

// Apply Auth & Admin check to all routes
router.use(authMiddleware, isAdmin);

// Product Management
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Dashboard Stats
router.get('/dashboard/overview', getDashboardOverview);
router.get('/dashboard/revenue', getRevenueStats);

// User Management
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router;
