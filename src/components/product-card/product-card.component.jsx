import React from 'react';
import './product-card.styles.scss';

import Button from '../button/button.component';

const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl } = product;
  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button type='inverted'>Add To Cart</Button>
    </div>
  );
}

export default ProductCard;
