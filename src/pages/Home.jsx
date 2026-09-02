import '../styles/home.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import API_URL from '../apiConfig';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const productUrl = `${API_URL}/products`;
  const categoryUrl = `${API_URL}/categories`;

  useEffect(() => {
    axios.get(productUrl).then((res) => setProducts(res.data)).catch(console.log);
    axios.get(categoryUrl)
      .then((res) => { setCategories(res.data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, []);

  const handleAddToCart = (product) => addToCart(product);
  const dealsOfTheDay = products.filter((p) => p.isDeal === true);
  const spotlight = dealsOfTheDay[0];

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <span className="hero-tagline">Precision Parts. Built to Last.</span>
          <h1>Best Quality Parts for Your Ride</h1>
          <button className="btn-industrial" onClick={() => navigate('/category/All')}>
            Shop Now
          </button>
        </div>

        {spotlight && (
          <div className="hero-deal-card panel" onClick={() => navigate(`/product/${spotlight.id}`)}>
            <span className="discount-badge">-{spotlight.discount}%</span>
            <img src={spotlight.image} alt={spotlight.name} />
            <div className="hero-deal-info">
              <p className="hero-deal-brand">{spotlight.brand}</p>
              <h3>{spotlight.name}</h3>
              <div className="hero-deal-price">
                <span className="price-current">₹{spotlight.price}</span>
                <span className="price-mrp">₹{spotlight.mrp}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="section-title">Top Categories</h2>
      {loading ? <p>Loading...</p> : (
        <div className="category-list">
          {categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      )}

      <h2 className="section-title">Deals of the Day</h2>
      {loading ? <p>Loading...</p> : (
        <div className="product-list">
          {dealsOfTheDay.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home