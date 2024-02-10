// src/components/CreateProfile.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser, setUserFromLocalStorage } from '../../store/authSlice';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Update user data from local storage on component mount
    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleCreateProfile = async () => {
    try {
      // Check if user is null before accessing properties
      if (!user || !user.accessToken) {
        console.error('User or access token is missing.');
        // Handle unauthenticated user, redirect to login or show a message
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/create-profile',
        { bio },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );

      setMessage(response.data.message);

      // Assuming the user object is updated with the new profile details in the backend
      dispatch(setUser(response.data.user));
      navigate('/')
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Create Bio</h2>
      <label htmlFor="bio">Bio:</label>
      <textarea
        id="bio"
        name="bio"
        value={bio}
        onChange={handleBioChange}
      />
      <button onClick={handleCreateProfile}>Create Bio</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProfile;
