const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  }
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Jewelry Shop API is running',
    health: '/api/health'
  });
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({ success: true, message: 'Server is running' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/product'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/orders/:orderId/payments', require('./routes/payment'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || 'Server error'
  });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    });
}

module.exports = app;
