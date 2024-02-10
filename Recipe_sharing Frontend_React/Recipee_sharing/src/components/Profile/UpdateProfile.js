import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../store/authSlice'; // Update the path

const UpdateBio = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user's existing bio on component mount
    axios.get('http://127.0.0.1:8000/api/get-user', { headers: { Authorization: `Bearer ${user.accessToken}` } })
      .then(response => {
        setBio(response.data.profile.bio);
      })
      .catch(error => {
        console.error('Error fetching user bio:', error);
      });
  }, [user.accessToken]);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleUpdateBio = () => {
    axios.post('http://127.0.0.1:8000/api/update-profile', { bio }, { headers: { Authorization: `Bearer ${user.accessToken}` } })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error updating bio:', error);
      });
  };

  return (
    <div>
      <h2>Update Bio</h2>
      <label htmlFor="bio">Bio:</label>
      <textarea
        id="bio"
        name="bio"
        value={bio}
        onChange={handleBioChange}
      />
      <button onClick={handleUpdateBio}>Update Bio</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateBio;
