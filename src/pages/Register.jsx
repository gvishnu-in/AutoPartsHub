 import '../styles/register.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const url = `${API_URL}/users`;

  const regName = /^[a-zA-Z]{3,16}$/;
  const regEmail = /^[a-zA-Z0-9_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regNumber = /^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/;
  const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  const validation = () => {
    if (!name || !email || !number || !password || !confirmpassword) {
      alert('Please enter all the fields');
      return false;
    }
    if (!regName.test(name)) {
      alert('Name must be 3 to 16 characters long and contain only letters');
      return false;
    }
    if (!regEmail.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    if (!regNumber.test(number)) {
      alert('Please enter a valid 10-digit Indian mobile number');
      return false;
    }
    if (!regPassword.test(password)) {
      alert('Password must be 8-15 characters with uppercase, lowercase, number and special character');
      return false;
    }
    if (password !== confirmpassword) {
      alert('Password and Confirm Password do not match');
      return false;
    }
    return true;
  };

  const registeruser = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      name: name,
      email: email,
      number: number,
      password: password,
    };

    axios.post(url, data)
      .then((res) => {
        console.log(res.data);
        alert('Registration Successful');
        setName('');
        setEmail('');
        setNumber('');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        alert('Registration failed');
      });
  };

  return (
    <div className="register-page">
      <form onSubmit={registeruser}>
        <h2>Create Account</h2>

        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={(x) => setName(x.target.value)} />

        <label htmlFor="">Email</label>
        <input type="email" value={email} onChange={(x) => setEmail(x.target.value)} />

        <label htmlFor="">Number</label>
        <input type="number" value={number} onChange={(x) => setNumber(x.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(x) => setPassword(x.target.value)} />

        <label htmlFor="">Confirm Password</label>
        <input type="password" value={confirmpassword} onChange={(x) => setConfirmPassword(x.target.value)} />

        <button type="submit">Create Account</button>

        <p className="switch-link">Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  );
};

export default Register