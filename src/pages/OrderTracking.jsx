import '../styles/ot.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../apiConfig';
const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = `${API_URL}/orders/${orderId}`;

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [url]);

  const stages = ['Order Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found.</p>;
  }

  const currentStageIndex = stages.indexOf(order.status);

  return (
    <div className="order-tracking-page">
      <h2>Order #{order.id}</h2>
      <p>Placed on {order.orderDate}</p>

      <div className="tracking-bar">
        {stages.map((stage, index) => (
          <div key={stage} className={`stage ${index <= currentStageIndex ? 'active' : ''}`}>
            <div className="dot"></div>
            <p>{stage}</p>
          </div>
        ))}
      </div>

      <div className="order-items">
        <h3>Items</h3>
        {order.items.map((item) => (
          <div className="tracking-item" key={item.productId}>
            <p>{item.name} x {item.quantity}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>

      <div className="delivery-info">
        <h3>Delivery Address</h3>
        <p>{order.address}, {order.city} - {order.pincode}</p>
        <p>Phone: {order.phone}</p>
      </div>

      <p className="total">Total Amount: ₹{order.totalAmount}</p>
    </div>
  );
};

export default OrderTracking