import '../styles/cart.css'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h2>My Cart ({cartItems.length} items)</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <p className="item-name">{item.name}</p>
                <p className="item-price">₹{item.price}</p>

                <div className="quantity-box">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Price Details</h3>
            <p>Total Amount: ₹{total}</p>
            <button className="checkout-btn" onClick={goToCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart