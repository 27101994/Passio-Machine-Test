// Import necessary modules and components
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authSlice'; // Adjust the path
import Navbar from './Navbar';

const RecipeUpdateForm = ({ recipeId }) => {
    // Use useSelector to access the user from the Redux store
    const user = useSelector(selectUser);

    // State for recipe data and error message
    const [recipeData, setRecipeData] = useState({
        title: '',
        ingredients: '',
        steps: '',
        cooking_time: '',
        difficulty: '',
        images: [],
    });

    // Event handler for input change
    const handleInputChange = (e) => {
        setRecipeData({ ...recipeData, [e.target.name]: e.target.value });
    };

    // Event handler for image change
    const handleImageChange = (e) => {
        setRecipeData({ ...recipeData, images: [...e.target.files] });
    };

    // Event handler for recipe update
    const handleRecipeUpdate = async (e) => {
        e.preventDefault();

        // Validate the form data
        // (You may want to add additional client-side validation here)

        try {
            // Always use the update recipe endpoint with the recipeId parameter
            const url = `http://127.0.0.1:8000/api/recipes/${recipeId}`;

            // Create a FormData object and append recipe data
            const formData = new FormData();
            formData.append('title', recipeData.title);
            formData.append('ingredients', recipeData.ingredients);
            formData.append('steps', recipeData.steps);
            formData.append('cooking_time', recipeData.cooking_time);
            formData.append('difficulty', recipeData.difficulty);

            for (let i = 0; i < recipeData.images.length; i++) {
                formData.append('images[]', recipeData.images[i]);
            }

            // Make a PUT request with the user's access token in the Authorization header
            const response = await axios.put(url, formData, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`, // Access token from user
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            // Handle successful recipe update, redirect, etc.
        } catch (error) {
            console.error('Recipe update error:', error.response.data);
        }
    };


    // Event handler for recipe deletion
    const handleRecipeDelete = async () => {
        try {
            // Always use the delete recipe endpoint with the recipeId parameter
            const url = `http://127.0.0.1:8000/api/recipes/${recipeId}`;

            // Make a DELETE request with the user's access token in the Authorization header
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`, // Access token from user
                },
            });

            console.log(response.data);
            // Handle successful recipe deletion, redirect, etc.
        } catch (error) {
            console.error('Recipe deletion error:', error.response.data);
        }
    };

    // JSX for the RecipeUpdateForm component
    return (
        <div>
            <Navbar />
            <h1>Update Recipe</h1>
            <form onSubmit={handleRecipeUpdate}>
                {/* Form fields go here */}
                {/* Example: Title */}
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={recipeData.title}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Example: Ingredients */}
                <div>
                    <label>Ingredients:</label>
                    <textarea
                        name="ingredients"
                        value={recipeData.ingredients}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Example: Steps */}
                <div>
                    <label>Steps:</label>
                    <textarea
                        name="steps"
                        value={recipeData.steps}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Example: Cooking Time */}
                <div>
                    <label>Cooking Time:</label>
                    <input
                        type="text"
                        name="cooking_time"
                        value={recipeData.cooking_time}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Example: Difficulty */}
                <div>
                    <label>Difficulty:</label>
                    <input
                        type="text"
                        name="difficulty"
                        value={recipeData.difficulty}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Example: Images */}
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

                {/* Example: Delete Button */}
                <button type="button" onClick={handleRecipeDelete} className="btn btn-danger">
                    Delete Recipe
                </button>

                {/* ... Add other fields as needed ... */}

                <button type="submit" className="btn btn-primary">
                    Update Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipeUpdateForm;
