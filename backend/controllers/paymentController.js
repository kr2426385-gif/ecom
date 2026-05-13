const Payment = require('../models/Payment');
const Order = require('../models/Order');

// @desc    Get payments for an order
// @route   GET /api/orders/:orderId/payments
// @access  Private
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ order: req.params.orderId });
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create payment for an order
// @route   POST /api/orders/:orderId/payments
// @access  Private
const createPayment = async (req, res) => {
  try {
    const { amount, method, paymentDetails } = req.body;

    // Check if order exists and belongs to user
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const payment = await Payment.create({
      order: req.params.orderId,
      amount,
      method,
      paymentDetails
    });

    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
// @access  Private/Admin
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getPayments,
  createPayment,
  updatePayment
};