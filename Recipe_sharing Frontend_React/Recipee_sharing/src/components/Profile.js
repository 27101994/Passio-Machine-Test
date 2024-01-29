import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile');
        setProfileData(response.data.profile);
      } catch (error) {
        console.error('Error fetching profile:', error.response.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {profileData ? (
        <>
          <h2>{profileData.user.name}'s Profile</h2>
          {/* Display user's uploaded recipes, followers, and following */}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
