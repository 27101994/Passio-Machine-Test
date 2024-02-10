import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromLocalStorage } from '../store/authSlice';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

const ActivityFeed = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Use useParams to get the userId from the route parameters
  const { userId } = useParams();

  useEffect(() => {
    // Load user from localStorage on component mount
    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    const fetchActivityFeed = async () => {
      try {
        if (!userId) {
          // Handle the case when userId is undefined
          throw new Error('User ID is undefined');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/activity-feed/${userId}`, {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        });

        // Log response details
        console.log('Activity Feed Response:', response);

        setRecipes(response.data.recipes);
        setLoading(false);
      } catch (error) {
        setError('Error fetching activity feed. Please try again later.');
        setLoading(false);
      }
    };

    // Check if user is authenticated before fetching activity feed
    if (user?.accessToken) {
      fetchActivityFeed();
    }
  }, [userId, user?.accessToken, dispatch]);

  return (
    <div>
      <Navbar />
      <h2>Activity Feed</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {recipes.length === 0 && !loading && !error && <p>No recipes in the activity feed.</p>}
      {recipes.length > 0 && (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.user.name}</strong> created a recipe: {recipe.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityFeed;
