import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = ({ product }) => {
  if (!product) return null;

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews ({product.reviews || 0})</div>
      </div>
      <div className="descriptionbox-description">
        <p>{product.description}</p>
        
        {product.details && product.details.length > 0 && (
          <div className="product-details">
            <h3>Product Details</h3>
            <ul>
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
        
        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            <h3>Available Colors</h3>
            <div className="color-options">
              {product.colors.map((color, index) => (
                <span 
                  key={index} 
                  className="color-option"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                ></span>
              ))}
            </div>
          </div>
        )}
        
        <div className="stock-status">
          <strong>Availability:</strong> {product.stock > 0 
            ? `In Stock (${product.stock} available)` 
            : 'Out of Stock'}
        </div>
      </div>
    </div>
  );
};

export default DescriptionBox;