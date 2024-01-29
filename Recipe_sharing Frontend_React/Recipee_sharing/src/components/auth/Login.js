import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Navbar from '../Navbar';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch(); // Initialize useDispatch to dispatch actions
  const navigate = useNavigate(); // Initialize useNavigate

  const loginUser = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post('http://127.0.0.1:8000/api/login/', user)
      .then(response => {
        setErrorMessage('');

        // Assuming your response contains a token field, adjust accordingly
        const token = response.data.access_token;
        console.log(token)

        // Dispatch the setUser action with the user information, including the token
        dispatch(setUser({
          email: response.data.email, // Adjust accordingly based on your API response
          accessToken: token,
          
        }));

        // Redirect or navigate to the desired page
        // For example, navigate to '/app' after successful login
        navigate('/');  // Navigate to the recipe list page
      })
      .catch(error => {
        if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Failed to connect to the API');
        }
      });
  };

  return (
    <div>
      <Navbar />
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={loginUser}>Login</button>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default LoginComponent;
