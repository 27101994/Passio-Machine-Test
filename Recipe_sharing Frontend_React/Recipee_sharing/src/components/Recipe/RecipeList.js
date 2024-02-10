import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setUserFromLocalStorage } from '../../store/authSlice';
import { Link, useNavigate  } from 'react-router-dom';
import RecipeRatingComponent from './RecipeRatingComponent';
import RecipeTagComponent from './RecipeTagComponent';
import Navbar from '../Navbar';
import RecipeImageComponent from './RecipeImageComponentnew'; // Import the RecipeImageComponent

const RecipeList = ({ onEdit, onDelete }) => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [recipeImages, setRecipeImages] = useState({}); // State to store recipe images
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    // Retrieve likesMap from local storage or use an empty object if not present
    const initialLikesMap = JSON.parse(localStorage.getItem('likesMap')) || {};
    const [likesMap, setLikesMap] = useState(initialLikesMap);

    const fetchRecipes = async () => {
        try {
            if (!user || !user.accessToken) {
                console.error('User or access token is missing.');
                navigate('/login');
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/recipes', {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });

            console.log('Recipes fetched successfully:', response.data.recipes);

            // Update likesMap with the current state
            const updatedLikesMap = { ...initialLikesMap };

            response.data.recipes.forEach((recipe) => {
                if (!(recipe.id in updatedLikesMap)) {
                    updatedLikesMap[recipe.id] = { liked: false, disliked: false };
                }
            });

            setLikesMap(updatedLikesMap);
            setRecipes(response.data.recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error.response ? error.response.data : error.message);
        }
    };

    const fetchRecipeImages = async (recipeId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/recipes/${recipeId}/images`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });

            // Update the recipeImages state with the fetched images
            setRecipeImages((prevRecipeImages) => ({
                ...prevRecipeImages,
                [recipeId]: response.data.images,
            }));
        } catch (error) {
            console.error('Error fetching recipe images:', error.response ? error.response.data : error.message);
        }
    };


    useEffect(() => {
        // Update user data from local storage on component mount
        setUserFromLocalStorage();
        if (!user || !user.accessToken) {
            // Redirect to login or handle the case where user or accessToken is null
            navigate('/login');
            return;
        }
        fetchRecipes();
    }, [user, navigate]);
    

    useEffect(() => {
        // Save likesMap to local storage whenever it changes
        localStorage.setItem('likesMap', JSON.stringify(likesMap));
    }, [likesMap]);

    useEffect(() => {
        // Fetch recipe images for each recipe when recipes change
        recipes.forEach((recipe) => {
            fetchRecipeImages(recipe.id);
        });
    }, [recipes]);

    const handleDelete = async (recipeId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/recipes/${recipeId}/delete`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`,
                },
            });

            if (response.status === 200) {
                console.log('Recipe deleted successfully');
                fetchRecipes();
            } else {
                console.error('Error deleting recipe:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error.response ? error.response.data : error.message);
        }
    };

    const handleLike = async (recipeId) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/recipes/${recipeId}/like`,
                { user_id: user.id, recipe_id: recipeId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log('Recipe liked successfully');
                // fetchRecipes(); // Update the recipes after liking
                // Update likesMap to mark the recipe as liked
                setLikesMap((prevLikesMap) => ({
                    ...prevLikesMap,
                    [recipeId]: { liked: true, disliked: false },
                }));
            } else {
                console.error('Error liking recipe:', response.data.message);
            }
        } catch (error) {
            console.error('Error liking recipe:', error.response ? error.response.data : error.message);
        }
    };

    const handleDislike = async (recipeId) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/recipes/${recipeId}/dislike`,
                { user_id: user.id, recipe_id: recipeId },
                {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log('Recipe disliked successfully');
                // fetchRecipes(); // Update the recipes after disliking
                // Update likesMap to mark the recipe as disliked
                setLikesMap((prevLikesMap) => ({
                    ...prevLikesMap,
                    [recipeId]: { liked: false, disliked: true },
                }));
            } else {
                console.error('Error disliking recipe:', response.data.message);
            }
        } catch (error) {
            console.error('Error disliking recipe:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Recipe List</h2>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div className="row">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-4 mb-4">
                            <div className="card">
                                {/* Use the RecipeImageComponent here */}
                                <RecipeImageComponent images={recipeImages[recipe.id]} />

                                <div className="card-body">
                                    <h5 className="card-title">{recipe.title}</h5>
                                    <p className="card-text">
                                        <p>Ingredients: {recipe.ingredients}</p>
                                        <p>Steps: {recipe.steps}</p>
                                        <p>Cooking Time: {recipe.cooking_time} minutes</p>
                                        <p>Difficulty Level: {recipe.difficulty_level}</p>
                                    </p>
                                    <Link to={`/recipe/${recipe.id}/edit`} className="btn btn-primary mr-2">
                                        Edit
                                    </Link>
                                    <button
                                        className={`btn btn-${likesMap[recipe.id]?.liked ? 'success' : 'secondary'} mr-2`}
                                        onClick={() => handleLike(recipe.id)}
                                    >
                                        Like
                                    </button>
                                    <button
                                        className={`btn btn-${likesMap[recipe.id]?.disliked ? 'success' : 'secondary'}`}
                                        onClick={() => handleDislike(recipe.id)}
                                    >
                                        Dislike
                                    </button>
                                    <button className="btn btn-danger ml-2" onClick={() => handleDelete(recipe.id)}>
                                        Delete
                                    </button>
                                    <RecipeRatingComponent
                                        recipeId={recipe.id}
                                        userId={user.id}
                                        accessToken={user.accessToken}
                                    />
                                    <RecipeTagComponent recipeId={recipe.id} updateTags={fetchRecipes} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;
