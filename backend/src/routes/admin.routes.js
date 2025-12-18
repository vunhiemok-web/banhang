const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Public: Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Add product
router.post('/', auth, isAdmin, async (req, res) => {
    const { name, price, stock, description, image_url } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO products(name, price, stock, description, image_url) VALUES (?,?,?,?,?)',
            [name, price, stock, description, image_url]
        );
        res.status(201).json({ message: 'Thêm sản phẩm thành công', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Update product
router.put('/:id', auth, isAdmin, async (req, res) => {
    const { name, price, stock, description, image_url } = req.body;
    try {
        await db.query(
            'UPDATE products SET name=?, price=?, stock=?, description=?, image_url=? WHERE id=?',
            [name, price, stock, description, image_url, req.params.id]
        );
        res.json({ message: 'Product updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin: Delete product
router.delete('/:id', auth, isAdmin, async (req, res) => {
    try {
        await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
