import React from 'react'
import '../styles/co.css'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../apiConfig';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const url = `${API_URL}/orders`;

  const validate = () => {
    if (!address || !city || !pincode || !phone) {
      alert('Please fill all address fields');
      return false;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return false;
    }
    return true;
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const orderData = {
      userId: user ? user.id : 'guest',
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      address: address,
      city: city,
      pincode: pincode,
      phone: phone,
      paymentMethod: paymentMethod,
      totalAmount: total,
      status: 'Order Placed',
      orderDate: new Date().toLocaleDateString(),
    };

    axios.post(url, orderData)
      .then((res) => {
        alert('Order placed successfully');
        clearCart();
        navigate(`/track/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        alert('Order failed');
      });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <form onSubmit={placeOrder}>
        <label htmlFor="">Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label htmlFor="">City</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="">Pincode</label>
        <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />

        <label htmlFor="">Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="">Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <p className="order-total">Total Amount: ₹{total}</p>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout