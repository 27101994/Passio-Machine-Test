// RecipeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const RecipeForm = ({ onSubmit, initialRecipe }) => {
  const [recipe, setRecipe] = useState(
    initialRecipe || { title: '', ingredients: '', steps: '', cooking_time: '', difficulty_level: '' }
  );
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error('User not authenticated. Redirect to login page or show a message.');
      return;
    }

    try {

      const validDifficultyLevels = ['easy', 'medium', 'difficult'];

      if (!validDifficultyLevels.includes(recipe.difficulty_level)) {
        console.error('Invalid difficulty_level value');
        return;
      }
      const recipeWithUserId = { ...recipe, user_id: user.id };
      const response = await axios.post('http://127.0.0.1:8000/api/recipes/create', recipeWithUserId, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.status === 201) {
        console.log('Recipe created successfully:', response.data.data);
        console.log('User ID:', user.id);

        if (images.length > 0) {
          const formData = new FormData();
          images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
          });

          await axios.post(
            `http://127.0.0.1:8000/api/recipes/${response.data.data.id}/upload-image`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
        }

        navigate('/recipe/list');
      } else {
        console.error('Error creating recipe:', response.data.message);
      }
    } catch (error) {
      console.error('Error creating recipe:', error.response ? error.response.data : error.message);
    }

    if (onSubmit) {
      onSubmit(recipe);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredients:</label>
            <textarea
              className="form-control"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Steps:</label>
            <textarea
              className="form-control"
              name="steps"
              value={recipe.steps}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Cooking Time:</label>
            <input
              type="number"
              className="form-control"
              name="cooking_time"
              value={recipe.cooking_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Difficulty Level:</label>
            <select
              className="form-control"
              name="difficulty_level"
              value={recipe.difficulty_level}
              onChange={handleChange}
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
          </div>

          <div className="form-group">
            <label>Images:</label>
            <input
              type="file"
              className="form-control-file"
              name="images"
              onChange={handleImageChange}
              accept="image/*"
              multiple
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
