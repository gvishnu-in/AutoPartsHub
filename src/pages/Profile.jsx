import '../styles/profile.css'
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import API_URL from '../apiConfig';

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser, loginUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }

    const url = `${API_URL}/users/${authUser.id}`;

    axios.get(url)
      .then((res) => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setNumber(res.data.number);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [authUser, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = { name: name, email: email, number: number };
    const url = `${API_URL}/users/${authUser.id}`;

    axios.put(url, { ...user, ...updatedData })
      .then((res) => {
        setUser(res.data);
        loginUser(res.data); // keep AuthContext in sync so navbar/session reflect the change
        alert('Profile updated successfully');
        setEditing(false);
      })
      .catch((err) => {
        console.log(err);
        alert('Update failed');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      {!editing ? (
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.number}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <label htmlFor="">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="">Mobile</label>
          <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />

          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default Profile