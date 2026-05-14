const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

const configuredOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URLS,
  'http://localhost:3000'
]
  .filter(Boolean)
  .flatMap(origin => origin.split(','))
  .map(origin => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (configuredOrigins.includes(origin)) {
    return true;
  }

  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Jewelry Shop API is running',
    service: 'jewelry-shop-backend',
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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: ['/', '/api/health', '/api/auth', '/api/products', '/api/orders']
  });
});

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
