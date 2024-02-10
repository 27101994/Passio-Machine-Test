<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
use App\Models\Recipe;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class RecipeRatingController extends Controller
{
    public function rateRecipe(Request $request, $recipeId)
    {
        try {
            // Validate incoming request data
            $validator = Validator::make($request->all(), [
                'user_id' => 'required|exists:users,id',
                'rating' => ['required', 'numeric', 'min:1', 'max:5'],
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }
    
            // Create or update the rating
            $rating = Rating::updateOrCreate(
                ['user_id' => $request->user_id, 'recipe_id' => $recipeId],
                ['rating' => $request->rating]
            );
    
            // Recalculate and update the average rating for the recipe
            $recipe = Recipe::find($recipeId);
            $recipe->update(['rating' => $recipe->ratings()->avg('rating')]);
    
            return response()->json(['message' => 'Recipe rated successfully', 'data' => $rating], 200);
        } catch (\Exception $e) {
            \Log::error('Error in rateRecipe: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    
}