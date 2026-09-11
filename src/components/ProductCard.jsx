import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import '../styles/pc.css';

const ProductCard = ({ product, onRemoveWishlist }) => {

  const navigate = useNavigate();

  const {
    toggleWishlist,
    isInWishlist
  } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.stopPropagation();
    // On the Wishlist page, clicking the heart should remove it via the
    // page's own handler (which may also update other state there);
    // everywhere else, fall back to the normal context toggle.
    if (inWishlist && onRemoveWishlist) {
      onRemoveWishlist(product.id);
    } else {
      toggleWishlist(product);
    }
  };

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    alert('Added to cart!');
  };

  return (
    <div className="product-card">

      <div
        className="product-image"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {product.discount && (
          <span className="discount-badge">-{product.discount}%</span>
        )}
        <img src={product.image} alt={product.name} />
      </div>

      <button
        className="wishlist-button"
        onClick={handleWishlist}
      >
        {inWishlist ? (
          <FaHeart />
        ) : (
          <FaRegHeart />
        )}
      </button>

      <h3>{product.name}</h3>

      <p className="product-brand">{product.brand}</p>

      <div className="price-row">
        <span className="price-current">₹{product.price}</span>
        {product.mrp && <span className="price-mrp">₹{product.mrp}</span>}
      </div>

      <p className="product-rating">⭐ {product.rating}</p>
      <p className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>

      <button onClick={handleCart}>
        <FaShoppingCart /> Add to Cart
      </button>

    </div>
  );
};

export default ProductCard;