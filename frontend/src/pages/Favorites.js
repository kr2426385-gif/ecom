import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Favorites.css';

const Favorites = () => {
  const { favorites, addToCart, addToFavorites } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    alert(`${product.name} added to cart!`);
  };

  const handleRemoveFavorite = (product) => {
    addToFavorites(product);
  };

  return (
    <div className="favorites-page">
      <h1>❤️ My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p className="empty-icon">💔</p>
          <p>You haven't added any favorites yet!</p>
          <p>Browse products and click the ❤️ to add them here.</p>
        </div>
      ) : (
        <>
          <p className="favorites-count">You have {favorites.length} favorite item(s)</p>
          <div className="favorites-grid">
            {favorites.map(product => (
              <div key={product._id} className="favorite-card">
                <div className="favorite-image-container">
                  <img src={product.image} alt={product.name} className="favorite-image" />
                </div>
                <div className="favorite-info">
                  <h3>{product.name}</h3>
                  <p className="favorite-category">{product.category}</p>
                  <p className="favorite-description">{product.description}</p>
                  <div className="favorite-footer">
                    <p className="favorite-price">${product.price.toFixed(2)}</p>
                    <div className="favorite-buttons">
                      <button
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 Order
                      </button>
                      <button
                        className="remove-favorite-btn"
                        onClick={() => handleRemoveFavorite(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;