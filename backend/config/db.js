const mongoose = require('mongoose');

let cachedConnection = null;
let cachedPromise = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });
  }

  cachedConnection = await cachedPromise;
  return cachedConnection;
};

module.exports = connectDB;
