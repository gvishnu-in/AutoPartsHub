import '../styles/login.css'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
 import API_URL from '../apiConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const RegEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const RegPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  const url = `${API_URL}/users`;

  const validate = () => {
    if (!email || !password) {
      alert('all fields are required');
      return false;
    }
    if (!RegEmail.test(email)) {
      alert('Enter a valid email');
      return false;
    }
    if (!RegPassword.test(password)) {
      alert('Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number');
      return false;
    }
    return true;
  };

  const loginuser = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    axios.get(url)
      .then((res) => {
        const user = res.data.find((x) => {
          return x.email === email && x.password === password;
        });

        if (user) {
          alert('Login successful');
          loginUser(user);
          navigate('/');
        } else {
          alert('Login failed');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Server error');
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={loginuser}>
        <h2>Welcome Back!</h2>

        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>

        <p className="switch-link">Don't have an account? <span onClick={() => navigate('/register')}>Sign up</span></p>
      </form>
    </div>
  );
};

export default Login