// CreateRecipeComponent.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authSlice'; // Adjust the path
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const CreateRecipeComponent = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cooking_time: '',
    difficulty: '',
    images: [],
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setRecipeData({ ...recipeData, images: [...e.target.files] });
  };

  const handleRecipeCreation = async (e) => {
    e.preventDefault();

    if (!recipeData.title.trim() ||
        !recipeData.ingredients.trim() ||
        !recipeData.steps.trim() ||
        !recipeData.cooking_time.trim() ||
        !recipeData.difficulty.trim()) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('title', recipeData.title);
    formData.append('ingredients', recipeData.ingredients);
    formData.append('steps', recipeData.steps);
    formData.append('cooking_time', recipeData.cooking_time);
    formData.append('difficulty', recipeData.difficulty);

    for (let i = 0; i < recipeData.images.length; i++) {
      formData.append('images[]', recipeData.images[i]);
    }

    try {
      const url = 'http://127.0.0.1:8000/api/recipes';

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      navigate("/")
      // Handle successful recipe creation, redirect, etc.
    } catch (error) {
      console.error('Recipe creation error:', error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Create Recipe</h1>
      <form onSubmit={handleRecipeCreation}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Ingredients:</label>
          <textarea
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Steps:</label>
          <textarea
            name="steps"
            value={recipeData.steps}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Cooking Time:</label>
          <input
            type="text"
            name="cooking_time"
            value={recipeData.cooking_time}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Difficulty:</label>
          <input
            type="text"
            name="difficulty"
            value={recipeData.difficulty}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Images:</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="btn btn-primary">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipeComponent;
