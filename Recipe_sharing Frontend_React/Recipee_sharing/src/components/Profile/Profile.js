// ProfileList.jsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/api/user-details', {
  //         headers: {
  //           Authorization: `Bearer ${user.accessToken}`,
  //         },
  //       });

  //       setProfiles(response.data.profiles);
  //       const storedFollowedUsers = localStorage.getItem('followedUsers');
  //       setFollowedUsers(storedFollowedUsers ? JSON.parse(storedFollowedUsers) : []);
  //     } catch (error) {
  //       console.error('Error fetching profiles details:', error);
  //       setError('Error fetching profiles details. Please try again.');
  //     }
  //   };

  //   if (user.accessToken) {
  //     fetchProfiles();
  //   }
  // }, [user.accessToken]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list-profiles', {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setProfiles(response.data.profiles);
        // Retrieve the list of followed users from local storage
        const storedFollowedUsers = localStorage.getItem('followedUsers');
        setFollowedUsers(storedFollowedUsers ? JSON.parse(storedFollowedUsers) : []);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError('Error fetching profiles. Please try again.');
      }
    };

    if (user.accessToken) {
      fetchProfiles();
    }
  }, [user.accessToken]);

  const isFollowed = (profileId) => {
    // Check if the given profileId is in the list of followedUsers
    return followedUsers.includes(profileId);
  };

  const handleToggleFollow = async (profileId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/users/${profileId}/follow`,
        {
          follower_id: user.id,
          following_id: profileId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      // Toggle the follow status and update the followedUsers state accordingly
      const updatedFollowedUsers = isFollowed(profileId)
        ? followedUsers.filter((id) => id !== profileId)
        : [...followedUsers, profileId];

      setFollowedUsers(updatedFollowedUsers);

      // Save the updated list of followed users to local storage
      localStorage.setItem('followedUsers', JSON.stringify(updatedFollowedUsers));

      console.log(
        isFollowed(profileId) ? `Unfollow user with ID: ${profileId}` : `Follow user with ID: ${profileId}`
      );
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>User Profiles</h2>
      {error && <p>{error}</p>}
      <Row>
        {profiles.map(profile => (
          <Col key={profile.id} xs={12} md={4}>
            <Card style={{ margin: '10px' }}>
              <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Email: {profile.email}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>Followers: {profile.followers_count}</ListGroup.Item>
                  <ListGroup.Item>Following: {profile.following_count}</ListGroup.Item>
                  <ListGroup.Item>Bio: {profile.bio}</ListGroup.Item>
                </ListGroup>
                <Button
                  variant={isFollowed(profile.id) ? 'danger' : 'primary'}
                  onClick={() => handleToggleFollow(profile.id)}
                >
                  {isFollowed(profile.id) ? 'Followed' : 'Follow'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProfileList;
