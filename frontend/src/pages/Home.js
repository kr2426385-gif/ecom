import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <nav className="top-navbar">
        <div className="navbar-brand">
          <h1>✨ Jewelry Shop</h1>
        </div>
        <div className="navbar-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Jewelry Shop</h1>
          <p>Discover exquisite jewelry pieces crafted with precision and love</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>💎 Premium Quality</h3>
          <p>Only the finest materials and craftsmanship</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and secure delivery to your doorstep</p>
        </div>
        <div className="feature-card">
          <h3>💳 Secure Payment</h3>
          <p>Safe and encrypted payment processing</p>
        </div>
        <div className="feature-card">
          <h3>❤️ Best Prices</h3>
          <p>Competitive prices with regular discounts</p>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Jewelry Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
