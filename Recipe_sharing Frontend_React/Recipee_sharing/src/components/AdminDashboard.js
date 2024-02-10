import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromLocalStorage } from '../store/authSlice'; // Update the path
import Navbar from './Navbar';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState('');

  // Fetch all users on component mount
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch recipes for the selected user
  const fetchRecipes = async () => {
    if (selectedUserId) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/recipes/${selectedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user.accessToken]);

  useEffect(() => {
    fetchRecipes();
  }, [selectedUserId, user.accessToken]);

  // Delete a recipe
  const handleDeleteRecipe = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/recipes/${selectedRecipeId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      // You might want to update the recipes list after deleting
      // Example: Refetch the recipes for the selected user
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  // Block or unblock a user
  const handleToggleBlockUser = async (userId, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/users/${userId}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // You might want to update the users list after blocking/unblocking
      // Example: Refetch the users
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">Admin Dashboard</h1>

        <div>
          <h2>Users</h2>
          <ul className="list-group">
            {users
              .filter((user) => !user.is_admin) // Exclude admin users
              .map((user) => (
                <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {user.name} - {user.email}{' '}
                  <button
                    className={`btn ${user.blocked ? 'btn-success' : 'btn-danger'}`}
                    onClick={() => handleToggleBlockUser(user.id, user.blocked)}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-4">
          <h2>Recipes</h2>
          <select className="form-select mb-3" onChange={(e) => setSelectedUserId(e.target.value)}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserId && (
            <ul className="list-group">
              {recipes.map((recipe) => (
                <li key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {recipe.title}{' '}
                  <button className="btn btn-danger" onClick={() => setSelectedRecipeId(recipe.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          {selectedRecipeId && (
            <button className="btn btn-danger mt-3" onClick={handleDeleteRecipe}>
              Delete Selected Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
