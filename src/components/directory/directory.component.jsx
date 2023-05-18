import React from 'react';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({ categories }) => {
  return (
    <div>
      <div className="categories-container">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Directory;