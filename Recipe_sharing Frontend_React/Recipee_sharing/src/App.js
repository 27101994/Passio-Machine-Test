// RecipeList.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recipes-public');
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching public recipes:', error.response.data);
      }
    };

    fetchRecipes();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const recipesInRows = chunkArray(recipes, 3);

  const handleLike = async (recipeId, type) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/like-recipe/${recipeId}`, { type });
      console.log(response.data.message);

      // Update likedRecipes state based on the recipeId and type
      setLikedRecipes((prevLikedRecipes) => ({
        ...prevLikedRecipes,
        [recipeId]: type === 1,
      }));

      // Refresh the recipe list or update local state as needed
    } catch (error) {
      console.error('Like recipe error:', error.response.data);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Public Recipe List</h2>
      {recipesInRows.length > 0 ? (
        recipesInRows.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((recipe) => (
              <div className="col-md-4 mb-3" key={recipe.id}>
                <div className="card">
                  <Link to={`/recipe-details/${recipe.id}`} style={{ textDecoration: 'none' }}>
                    <img
                      src={recipe.images.length > 0 ? recipe.images[0].image_path : 'placeholder-image-url'}
                      alt={recipe.title}
                      className="card-img-top"
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <p className="card-text">By {recipe.user.name}</p>
                    </div>
                  </Link>
                  {/* Like and Unlike buttons outside the Link */}
                  <div>
                    <button
                      onClick={() => handleLike(recipe.id, 1)}
                      style={{ backgroundColor: likedRecipes[recipe.id] ? 'green' : 'white' }}
                    >
                      Like
                    </button>
                    <button
                      onClick={() => handleLike(recipe.id, 0)}
                      style={{ backgroundColor: likedRecipes[recipe.id] === false ? 'green' : 'white' }}
                    >
                      Unlike
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No public recipes available.</p>
      )}
    </div>
  );
};

export default RecipeList;
