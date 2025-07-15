import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrum.css';

const Breadcrum = ({ product }) => {
  if (!product) return null;

  // Format category name for display
  const formatCategory = (category) => {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className='breadcrum'>
      <Link to='/'>HOME</Link> 
      <img src='/images/arrow.png' alt='arrow' /> 
      <Link to={`/${product.category === 'kid' ? 'kids' : product.category + 's'}`}>
        {formatCategory(product.category)}
      </Link> 
      <img src='/images/arrow.png' alt='arrow' /> 
      <span>{product.name}</span>
    </div>
  );
};

export default Breadcrum;