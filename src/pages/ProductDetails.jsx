import '../styles/pd.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import API_URL from '../apiConfig';

const ProductDetails = () => {

  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const url = `${API_URL}/products/${productId}`;

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [url]);

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
  addToCart(product);
  alert('Added to cart');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} />

      <div className="details-info">
        <h2>{product.name}</h2>
        <p className="brand">Brand: {product.brand}</p>
        <p className="rating">⭐ {product.rating}</p>

        <p className="price">
          ₹{product.price} <span className="mrp">₹{product.mrp}</span>
        </p>
        <p className="discount">{product.discount}% OFF</p>

        <div className="quantity-box">
          <button onClick={decreaseQty}>-</button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>+</button>
        </div>

        <button className="add-cart-btn" onClick={handleAddToCart}>Add to Cart</button>

        <p className="description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails
