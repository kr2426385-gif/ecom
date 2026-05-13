const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getPayments,
  createPayment,
  updatePayment
} = require('../controllers/paymentController');

const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getPayments)
  .post(protect, createPayment);

router.route('/:id')
  .put(protect, updatePayment);

module.exports = router;