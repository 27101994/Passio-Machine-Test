import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email,
        password: password,
      });

      setErrorMessage('');

      const user = {
        id: response.data.id, // Include user_id in the payload
        accessToken: response.data.token,
        email: response.data.email,
        is_admin: response.data.is_admin,
      };

      dispatch(setUser(user));

      if (user.is_admin) {
        // If the logged-in user is an admin, navigate to the admin dashboard
        navigate('/admin');
      } else {
        // If the user is not an admin, navigate to the recipe list page
        navigate('/');
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password. Please try again.');
      } else if (error.response && error.response.data.errors) {
        setErrorMessage(Object.values(error.response.data.errors).join(' '));
      } else if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary" onClick={loginUser}>
          Login
        </button>

        {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginComponent;
