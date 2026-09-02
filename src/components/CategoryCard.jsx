import React from 'react'
import '../styles/categorycard.css'
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMotorcycle } from 'react-icons/fa';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.name}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      {category.name === 'Bike Parts' ? (
        <FaMotorcycle className="category-icon" />
      ) : (
        <FaCar className="category-icon" />
      )}
      <p>{category.name}</p>
    </div>
  );
};

export default CategoryCard