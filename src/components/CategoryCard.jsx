import '../styles/categorycard.css'
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMotorcycle } from 'react-icons/fa';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const categoryDetails = {
    'Engine Parts': ['Engine components', '/images/p9.png'],
    'Braking System': ['Brake discs, pads & fluid', '/images/p4.jpg'],
    'Body Parts': ['Lighting & exterior parts', '/images/p12.png'],
    Filters: ['Clean air, oil & fuel', '/images/p2.jpg'],
    'Bike Parts': ['Reliable two-wheel parts', '/images/p18.png'],
    Electrical: ['Power and ignition essentials', '/images/p13.png'],
    Accessories: ['Useful upgrades for every ride', '/images/p20.png'],
  };
  const [description, image] = categoryDetails[category.name] || ['Quality parts for your vehicle', '/images/p1.jpg'];

  const handleClick = () => {
    navigate(`/category/${encodeURIComponent(category.name)}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-image">
        <img src={image} alt="" />
        <span className="category-icon" aria-hidden="true">
          {category.name === 'Bike Parts' ? <FaMotorcycle /> : <FaCar />}
        </span>
      </div>
      <div className="category-card-content">
        <h3>{category.name}</h3>
        <p>{description}</p>
        <span className="category-link">Explore parts <span aria-hidden="true">→</span></span>
      </div>
    </div>
  );
};

export default CategoryCard