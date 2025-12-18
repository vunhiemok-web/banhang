const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE email=?', [email]);
        if (!users.length) return res.status(401).json({ msg: 'Sai email' });

        const valid = await bcrypt.compare(password, users[0].password);
        if (!valid) return res.status(401).json({ msg: 'Sai mật khẩu' });

        const token = jwt.sign(
            { id: users[0].id, role: users[0].role },
            process.env.JWT_SECRET || 'SECRET_KEY',
            { expiresIn: '24h' }
        );
        res.json({ token, user: { id: users[0].id, name: users[0].name, role: users[0].role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, 'user']);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
