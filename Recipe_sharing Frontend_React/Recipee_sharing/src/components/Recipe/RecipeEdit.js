// RecipeEdit.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const RecipeEdit = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cooking_time: '',
    difficulty_level: '',
  });

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });

        setRecipe(response.data.data);
      } catch (error) {
        console.error('Error fetching recipe:', error.response ? error.response.data : error.message);
      }
    };

    if (!user) {
      // Redirect to login or handle unauthorized access
      navigate('/login');
    } else {
      fetchRecipe();
    }
  }, [id, user?.accessToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/recipes/${id}/update`, recipe, {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log('Recipe updated successfully:', response.data.data);
        // Navigate to the recipe details page or another appropriate page
        navigate(`/recipe/list`);
      } else {
        console.error('Error updating recipe:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating recipe:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Edit Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title:</label>
            <input type="text" className="form-control" name="title" value={recipe.title} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients:</label>
            <textarea className="form-control" name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Steps:</label>
            <textarea className="form-control" name="steps" value={recipe.steps} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Cooking Time:</label>
            <input type="number" className="form-control" name="cooking_time" value={recipe.cooking_time} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Difficulty Level:</label>
            <input type="text" className="form-control" name="difficulty_level" value={recipe.difficulty_level} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary">Update Recipe</button>
        </form>
      </div>
    </div>
  );
};

export default RecipeEdit;
