import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { setUserFromLocalStorage } from '../../store/authSlice';

const RecipeTagComponent = ({ recipeId, updateTags }) => {
  const [tagName, setTagName] = useState('');
  const [error, setError] = useState(null);

  // Access user information from the Redux store
  const user = useSelector((state) => state.auth.user);

  const handleTagChange = (e) => {
    setTagName(e.target.value);
  };

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to add a new tag for the recipe with authentication token
      const response = await axios.post(
        'http://127.0.0.1:8000/api/tag',
        {
          tag_name: tagName,
          recipe_id: recipeId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Recipe tagged successfully');
        // Update the tags by calling the provided callback
        updateTags();
        // Clear the input field
        setTagName('');
        setError(null);
      }
    } catch (error) {
      console.error('Error tagging recipe:', error.response ? error.response.data : error.message);
      setError('Error tagging recipe. Please try again.');
    }
  };

  return (
    <div>
      <h4>Add Recipe Tags</h4>
      <form onSubmit={handleTagSubmit}>
        <div className="form-group">
          <label htmlFor="tagName">Tag Name:</label>
          <input
            type="text"
            className="form-control"
            id="tagName"
            value={tagName}
            onChange={handleTagChange}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default RecipeTagComponent;
