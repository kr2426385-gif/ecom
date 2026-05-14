import React, { useState } from 'react';
import './PaymentOptions.css';

const PaymentOptions = ({ orderId, amount, onPaymentComplete }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});

  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: '💳' },
    { id: 'debit_card', name: 'Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
    { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: '💵' }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setPaymentDetails({});
  };

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/orders/${orderId}/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount,
          method: selectedMethod,
          paymentDetails
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Payment processed successfully!');
        onPaymentComplete && onPaymentComplete(data.data);
      } else {
        alert('Payment failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'credit_card':
      case 'debit_card':
        return (
          <div className="payment-form">
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                placeholder="John Doe"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        );
      case 'paypal':
        return (
          <div className="payment-form">
            <p>You will be redirected to PayPal to complete your payment.</p>
            <div className="form-group">
              <label>PayPal Email</label>
              <input
                type="email"
                name="paypalEmail"
                placeholder="your@email.com"
                onChange={handleInputChange}
              />
            </div>
          </div>
        );
      case 'bank_transfer':
        return (
          <div className="payment-form">
            <p>Please transfer the amount to the following account:</p>
            <div className="bank-details">
              <p><strong>Bank:</strong> Example Bank</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>Routing Number:</strong> 123456789</p>
              <p><strong>Reference:</strong> Order #{orderId.slice(-8)}</p>
            </div>
          </div>
        );
      case 'cash_on_delivery':
        return (
          <div className="payment-form">
            <p>You will pay in cash when your order is delivered.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="payment-options">
      <h2>Payment Options</h2>
      <div className="amount-display">
        <strong>Total Amount: ${amount}</strong>
      </div>

      <div className="payment-methods">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <span className="method-icon">{method.icon}</span>
            <span className="method-name">{method.name}</span>
          </div>
        ))}
      </div>

      {selectedMethod && (
        <div className="payment-details">
          <h3>{paymentMethods.find(m => m.id === selectedMethod)?.name} Details</h3>
          {renderPaymentForm()}
          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${amount}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;