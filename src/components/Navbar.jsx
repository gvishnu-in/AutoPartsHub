import '../styles/nav.css';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const goToCart = () => {
    navigate('/cart');
  };

  const goToProfile = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/category/All?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <Link to="/" className="logo">
          AutoPartsHub | Bike & Car Parts
        </Link>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search auto parts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </form>

        <div className="navbar-icons">
          <FaHeart
            className="icon"
            onClick={() => navigate('/wishlist')}
          />

          <div className="cart-icon" onClick={goToCart}>
            <FaShoppingCart className="icon" />
            <span className="cart-badge">{cartCount}</span>
          </div>

          <FaUser className="icon" onClick={goToProfile} />
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/category/Engine Parts">Engine Parts</Link>
        <Link to="/category/Braking System">Braking System</Link>
        <Link to="/category/Body Parts">Body Parts</Link>
        <Link to="/category/Filters">Filters</Link>
        <Link to="/admin">Admin Panel</Link>
        <Link to="/category/Bike Parts">Bike Parts</Link>
      </div>
    </div>
  );
};

export default Navbar;