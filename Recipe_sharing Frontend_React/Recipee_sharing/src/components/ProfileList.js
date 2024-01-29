// ProfileList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';



const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profiles');
        setProfiles(response.data.profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error.response.data);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="container"> {/* Bootstrap container class */}
      <h2 className="mt-4 mb-4">Profile List</h2>
      {profiles.length > 0 ? (
        profiles.map((profile) => (
          <div key={profile.id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">User ID: {profile.user_id}</h3>
              <p className="card-text">Bio: {profile.bio}</p>
              <p className="card-text">Followers Count: {profile.followers_count}</p>
              <p className="card-text">Following Count: {profile.following_count}</p>
              {/* Add other profile information as needed */}
            </div>
          </div>
        ))
      ) : (
        <p>No profiles available.</p>
      )}
    </div>
    </div>
  );
};

export default ProfileList;
