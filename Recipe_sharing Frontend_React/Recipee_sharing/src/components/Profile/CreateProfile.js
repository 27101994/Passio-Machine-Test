import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../store/authSlice'; // Update the path
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import Navbar from '../Navbar';

const CreateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!user.accessToken) {
      navigate('/login');
    }
  }, [user.accessToken, navigate]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleCreateProfile = () => {
    axios.post('http://127.0.0.1:8000/api/create-profile', { bio }, { headers: { Authorization: `Bearer ${user.accessToken}` } })
      .then(response => {
        setMessage(response.data.message);

        // Assuming the user object is updated with the new profile details in the backend
        dispatch(setUser(response.data.user));
      })
      .catch(error => {
        console.error('Error creating profile:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <h2>Create Profile</h2>
      <label htmlFor="bio">Bio:</label>
      <textarea
        id="bio"
        name="bio"
        value={bio}
        onChange={handleBioChange}
      />
      <button onClick={handleCreateProfile}>Create Profile</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProfile;
