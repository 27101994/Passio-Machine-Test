import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from 'react-rating';

const RecipeRatingComponent = ({ recipeId, userId, accessToken }) => {
    const [rating, setRating] = useState(0);

    // Load initial rating from localStorage on component mount
    useEffect(() => {
        const storedRating = localStorage.getItem(`recipe_${recipeId}_rating`);
        if (storedRating) {
            setRating(parseFloat(storedRating));
        }
    }, [recipeId]);

    const handleRate = async (value) => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/recipes/${recipeId}/rate`,
                { user_id: userId, rating: value },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 200) {
                console.log('Recipe rated successfully');
                // Update local storage with the new rating value
                localStorage.setItem(`recipe_${recipeId}_rating`, value);
            } else {
                console.error('Error rating recipe:', response.status, response.data);
            }
        } catch (error) {
            console.error('Error rating recipe:', error);
        }
    };

    return (
        <div><br />
            <p>Rate this recipe:</p>
            <Rating
                initialRating={rating}
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
                onClick={(value) => {
                    setRating(value);
                    handleRate(value);
                }}
            />
        </div>
    );
};

export default RecipeRatingComponent;
