 import '../styles/footer.css'
import { FaCheckCircle, FaUndo, FaTruck, FaLock } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <h2>AutoPartsHub</h2>
      <p>Your trusted store for car and bike spare parts.</p>

      <div className="footer-badges">
        <div className="badge"><FaCheckCircle /> Genuine Parts</div>
        <div className="badge"><FaUndo /> Easy Returns</div>
        <div className="badge"><FaTruck /> Fast Delivery</div>
        <div className="badge"><FaLock /> Secure Payments</div>
      </div>

      <hr />
      <p className="copyright">© 2026 AutoPartsHub. All rights reserved.</p>
    </div>
  );
};

export default Footer