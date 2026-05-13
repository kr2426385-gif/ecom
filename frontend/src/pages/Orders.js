import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Orders.css';

const Orders = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { cart, clearCart, getTotalPrice } = React.useContext(CartContext);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setPlacedOrders(data.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      // If backend fails, just load from localStorage
      const savedOrders = localStorage.getItem('placedOrders');
      if (savedOrders) {
        setPlacedOrders(JSON.parse(savedOrders));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode) {
      alert('Please fill in all address fields!');
      return;
    }

    // Create order object
    const newOrder = {
      _id: Date.now().toString(),
      user: user?.id || 'guest',
      products: cart.map(item => ({
        product: item,
        quantity: item.quantity,
        price: item.price
      })),
      total: getTotalPrice(),
      status: 'pending',
      shippingAddress: shippingAddress,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const savedOrders = localStorage.getItem('placedOrders');
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(newOrder);
    localStorage.setItem('placedOrders', JSON.stringify(orders));

    // Update state
    setPlacedOrders(orders);
    clearCart();
    setShippingAddress({ street: '', city: '', state: '', zipCode: '', country: '' });
    setShowOrderForm(false);
    alert('Order placed successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'processing': return '#3498db';
      case 'shipped': return '#9b59b6';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (!user) return <div className="error">Please login to view your orders</div>;
  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders">
      <h1>🛒 My Orders & Cart</h1>

      {/* Cart Section */}
      <div className="cart-section">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty. Start shopping!</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className="cart-item-total">
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <p className="total-price">Total: ${getTotalPrice().toFixed(2)}</p>
              <button
                className="place-order-btn"
                onClick={() => setShowOrderForm(true)}
              >
                Place Order
              </button>
            </div>

            {/* Order Form Modal */}
            {showOrderForm && (
              <div className="order-form-overlay">
                <div className="order-form">
                  <h3>Shipping Address</h3>
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                  />
                  <div className="form-buttons">
                    <button
                      className="confirm-order-btn"
                      onClick={handlePlaceOrder}
                    >
                      Confirm Order
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setShowOrderForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Placed Orders Section */}
      <div className="orders-section">
        <h2>Order History</h2>
        {placedOrders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {placedOrders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <span
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  {order.shippingAddress && (
                    <div className="shipping-address">
                      <strong>Shipping Address:</strong>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      {order.shippingAddress.country && <p>{order.shippingAddress.country}</p>}
                    </div>
                  )}
                </div>
                <div className="order-products">
                  <h4>Products:</h4>
                  {order.products.map((item, index) => (
                    <div key={index} className="order-product">
                      <span>{item.product.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;