import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { apiUrl } from '../config/api';
import './ProductList.css';

const sampleProducts = [
  {
    _id: 'sample-diamond-necklace',
    name: 'Diamond Necklace',
    description: 'Elegant diamond necklace with 18k gold chain. Perfect for special occasions.',
    price: 2999.99,
    image: 'https://media.angara.com/necklace/sp0789d/4.4mm-gvs2-diamond-yellow-gold-necklace.jpg?width=480&quality=85&auto=avif,webp',
    category: 'Necklaces',
    stock: 5
  },
  {
    _id: 'sample-gold-earrings',
    name: 'Gold Earrings',
    description: 'Beautiful 18k gold hoop earrings. Classic and timeless design.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    category: 'Earrings',
    stock: 10
  },
  {
    _id: 'sample-silver-bracelet',
    name: 'Silver Bracelet',
    description: 'Sterling silver charm bracelet. Durable and elegant.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop',
    category: 'Bracelets',
    stock: 15
  },
  {
    _id: 'sample-pearl-ring',
    name: 'Pearl Ring',
    description: 'Classic pearl ring with a refined polished band.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&h=500&fit=crop',
    category: 'Rings',
    stock: 8
  },
  {
    _id: 'sample-crystal-pendant',
    name: 'Crystal Pendant',
    description: 'Crystal pendant necklace that sparkles with every movement.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    category: 'Necklaces',
    stock: 12
  },
  {
    _id: 'sample-rose-gold-watch',
    name: 'Rose Gold Watch',
    description: 'Elegant rose gold wristwatch. Perfect timepiece for any occasion.',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
    category: 'Watches',
    stock: 6
  }
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart, addToFavorites, isFavorited } = useContext(CartContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiUrl('/api/products'));
      const data = await response.json();

      if (response.ok && data.success && data.data?.length > 0) {
        setProducts(data.data);
        setError('');
      } else {
        setProducts(sampleProducts);
        setError('Showing sample products until backend products are added.');
      }
    } catch (err) {
      setProducts(sampleProducts);
      setError('Showing sample products because the backend is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (product._id.startsWith('sample-')) {
      alert('This is a sample product. Seed products in the backend before placing real orders.');
      return;
    }

    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const handleFavorite = (product) => {
    addToFavorites(product);
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <p className="subtitle">Browse our exclusive jewelry collection</p>
      {error && <div className="error">{error}</div>}
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <button
                className={`favorite-btn ${isFavorited(product._id) ? 'favorited' : ''}`}
                onClick={() => handleFavorite(product)}
                title="Add to favorites"
                type="button"
              >
                Favorite
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
                  disabled={product.stock === 0 || product._id.startsWith('sample-')}
                  type="button"
                >
                  {product.stock === 0 ? 'Out of Stock' : product._id.startsWith('sample-') ? 'Sample' : 'Order'}
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
