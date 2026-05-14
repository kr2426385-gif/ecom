import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, addToFavorites, isFavorited } = useContext(CartContext);

  // Sample products with images
  const sampleProducts = [
    {
      _id: '1',
      name: 'Diamond Necklace',
      description: 'Elegant diamond necklace with 18k gold chain. Perfect for special occasions.',
      price: 2999.99,
      image: 'https://media.angara.com/necklace/sp0789d/4.4mm-gvs2-diamond-yellow-gold-necklace.jpg?width=480&quality=85&auto=avif,webp',
      category: 'Necklaces',
      stock: 5
    },
    {
      _id: '2',
      name: 'Gold Earrings',
      description: 'Beautiful 18k gold hoop earrings. Classic and timeless design.',
      price: 899.99,
      image: "data:image/jpeg;base64,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",
      category: 'Earrings',
      stock: 10
    },
    {
      _id: '3',
      name: 'Silver Bracelet',
      description: 'Sterling silver charm bracelet. Durable and elegant.',
      price: 249.99,
      image: 'https://th.bing.com/th/id/OIP.YvBx7BmzaqerCGP2guU4aAHaHa?w=196&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      category: 'Bracelets',
      stock: 15
    },
    {
      _id: '4',
      name: 'Pearl Ring',
      description: 'Classic pearl engagement ring. A symbol of elegance.',
      price: 1299.99,
      image: 'https://th.bing.com/th/id/OIP.FESUZi2rRd1WK0oB9ShpcgHaFj?w=280&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      category: 'Rings',
      stock: 8
    },
    {
      _id: '5',
      name: 'Crystal Pendant',
      description: 'Swarovski crystal pendant necklace. Sparkles and shines.',
      price: 599.99,
      image: 'https://th.bing.com/th/id/OIP.FcnTrG0bx7dd5xsNbzDgRwHaHa?w=167&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      category: 'Necklaces',
      stock: 12
    },
    {
      _id: '6',
      name: 'Rose Gold Watch',
      description: 'Elegant rose gold wristwatch. Perfect timepiece for any occasion.',
      price: 1899.99,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
      category: 'Watches',
      stock: 6
    }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Try to fetch from backend first
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/products`);
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setProducts(data.data);
      } else {
        // Use sample products if backend returns empty
        setProducts(sampleProducts);
      }
    } catch (err) {
      // Use sample products if backend is not available
      setProducts(sampleProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const handleFavorite = (product) => {
    addToFavorites(product);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list">
      <h1>💎 Product List</h1>
      <p className="subtitle">Browse our exclusive jewelry collection</p>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <button
                className={`favorite-btn ${isFavorited(product._id) ? 'favorited' : ''}`}
                onClick={() => handleFavorite(product)}
                title="Add to favorites"
              >
                ❤️
              </button>
              {product.stock < 5 && product.stock > 0 && (
                <span className="stock-badge">Only {product.stock} left!</span>
              )}
              {product.stock === 0 && (
                <span className="stock-badge out-of-stock">Out of Stock</span>
              )}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <p className="product-price">${product.price.toFixed(2)}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? '🛒 Order' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;