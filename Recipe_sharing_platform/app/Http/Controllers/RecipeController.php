<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function create(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'title' => 'required|string|max:255',
            'ingredients' => 'required|string',
            'steps' => 'required|string',
            'cooking_time' => 'required|integer',
            'difficulty_level' => 'required|in:easy,medium,difficult', // Use 'in' rule for enum values
        ]);

    // Recipe creation logic
    $recipe = Recipe::create([
        'user_id' => auth()->user()->id,
        'title' => $request->input('title'),
        'ingredients' => $request->input('ingredients'),
        'steps' => $request->input('steps'),
        'cooking_time' => $request->input('cooking_time'),
        'difficulty_level' => $request->input('difficulty_level'),
    ]);

    // // Save activity feed entry
    // Activity::create([
    //     'user_id' => auth()->user()->id, // Ensure this is the correct case
    //     'recipe_id' => $recipe->id,
    //     'added_date' => now()->toDateString(),
    // ]);

    return response()->json(['message' => 'Recipe created successfully', 'data' => $recipe], 201);
}

    public function getAllRecipes()
    {
        $recipes = Recipe::all();

        return response()->json(['recipes' => $recipes], 200);
    }



    public function update(Request $request, $id)
    {
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }

        // Validate incoming request data
        $request->validate([
            'title' => 'sometimes|string|max:255',
            'ingredients' => 'sometimes|string',
            'steps' => 'sometimes|string',
            'cooking_time' => 'sometimes|integer',
            'difficulty_level' => 'sometimes|in:easy,medium,difficult',
        ]);

        // Recipe update logic
        $recipe->update($request->all());

        return response()->json(['message' => 'Recipe updated successfully', 'data' => $recipe], 200);
    }

    public function delete($id)
    {
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }

        // Recipe deletion logic
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully'], 200);
    }

    public function getRecipe($id)
    {
        try {
            // Fetch the recipe by ID
            $recipe = Recipe::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $recipe,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Recipe not found.',
            ], 404);
        }
    }

    public function recipesByFollowingUsers()
    {
        // Get the IDs of users followed by the current user
        $followingUserIds = auth()->user()->following()->pluck('id');
    
        // Get recipes created by the followed users with creation date
        $recipes = Recipe::whereIn('user_id', $followingUserIds)->with('user')->latest()->get();
    
        return response()->json(['recipes' => $recipes], 200);
    }
}    
