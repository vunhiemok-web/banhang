const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
// const orderRoutes = require('./routes/order.routes'); // To be implemented

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/products', adminRoutes); // Using admin.routes for products as per structure
// app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Banh Trang Backend API Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
