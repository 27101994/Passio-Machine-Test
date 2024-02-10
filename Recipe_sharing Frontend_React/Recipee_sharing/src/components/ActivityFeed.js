import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromLocalStorage } from '../store/authSlice';
import Navbar from './Navbar';

const ActivityFeed = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Load user from localStorage on component mount
    dispatch(setUserFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    const fetchActivityFeed = async () => {
      try {
        if (!user || !user.id) {
          // Handle the case when user or user ID is undefined
          throw new Error('User or User ID is undefined');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/activity-feed/${user.id}`, {
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
  }, [user, dispatch]);

  return (
    <div>
      <Navbar />
      <h2 className="mb-4">Activity Feed</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {recipes.length === 0 && !loading && !error && <p>No recipes in the activity feed.</p>}
      {recipes.length > 0 && (
        <ul className="list-group">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="list-group-item">
              <strong>{recipe.user.name}</strong> created a recipe: {recipe.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityFeed;
