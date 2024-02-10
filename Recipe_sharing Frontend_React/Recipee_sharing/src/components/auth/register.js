import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../Navbar';

function RegisterComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const registerUser = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    axios.post('http://127.0.0.1:8000/api/register', user)
      .then(response => {
        setErrorMessage('');
        // Handle successful registration (redirect or show success message)
        navigate('/login'); // Navigate to '/login' after successful registration
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
    <div className="container mt-5"> {/* Add Bootstrap container class */}
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Password Confirmation:</label>
        <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      </div>

      <button className="btn btn-primary" onClick={registerUser}>Register</button>
      
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
    </div>
  );
}

export default RegisterComponent;
