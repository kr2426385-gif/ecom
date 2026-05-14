import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { cart, favorites } = useContext(CartContext);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Jewelry Shop</h1>
        </div>
        <div className="navbar-links">
          <Link to="/products" className="nav-link">Shop</Link>
          <Link to="/orders" className="nav-link cart-link">
            Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
          <Link to="/favorites" className="nav-link favorites-link">
            Favorites
            {favorites.length > 0 && <span className="favorites-badge">{favorites.length}</span>}
          </Link>
        </div>
        <div className="navbar-user">
          <span>Welcome, {user?.name}!</span>
          <button onClick={handleLogout} className="logout-btn" type="button">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Welcome to your jewelry shop account</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>

          <div className="dashboard-card">
            <h3>Products</h3>
            <p>Browse our exclusive jewelry collection</p>
            <Link to="/products" className="card-btn">View Products</Link>
          </div>

          <div className="dashboard-card">
            <h3>Orders & Cart</h3>
            <p>Manage your orders and checkout</p>
            <Link to="/orders" className="card-btn">View Orders</Link>
          </div>

          <div className="dashboard-card">
            <h3>Favorites</h3>
            <p>Your saved jewelry items</p>
            <Link to="/favorites" className="card-btn">View Favorites</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
