import '../styles/category.css'
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import API_URL from '../apiConfig';

const Category = () => {

  const { addToCart } = useContext(CartContext);

  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const url = categoryName === 'All'
      ? `${API_URL}/products`
      : `${API_URL}/products?category=${categoryName}`;

    axios.get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, [categoryName]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const displayedProducts = searchTerm
    ? products.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="category-page">

      <h2>{searchTerm ? `Results for "${searchTerm}"` : categoryName}</h2>

      {loading ? (

        <p>Loading...</p>

      ) : displayedProducts.length === 0 ? (

        <p>No products found.</p>

      ) : (

        <div className="product-list">

          {displayedProducts.map((prod) => (

            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={handleAddToCart}
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Category;