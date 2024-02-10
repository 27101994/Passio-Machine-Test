<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RecipeImage;
use Illuminate\Support\Facades\Storage;
use App\Models\Recipe;
use Illuminate\Support\Facades\Auth;

class RecipeImageController extends Controller
{
    public function uploadImage(Request $request, $recipeId)
{
    // Ensure the associated recipe exists
    $recipe = Recipe::findOrFail($recipeId);

    if (Auth::user()->id !== $recipe->user_id) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized access to upload image for this recipe.',
        ], 403); // 403 Forbidden status code
    }

    $request->validate([
        'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $uploadedImages = [];

    foreach ($request->file('images') as $image) {
        // Create a new RecipeImages instance
        $recipeImage = new RecipeImage();
        $recipeImage->recipe_id = $recipeId;

        // Upload the image
        $imagePath = $image->store('recipe_images', 'public');
        $recipeImage->image_path = Storage::url($imagePath);

        // Save the recipe image
        $recipeImage->save();

        $uploadedImages[] = $recipeImage;
    }

    return response()->json([
        'success' => true,
        'message' => 'Images uploaded successfully.',
        'images' => $uploadedImages,
    ]);
}

public function getImagesByRecipeId($recipeId)
{
    // Retrieve the associated recipe with its images
    $recipe = Recipe::with('images')->find($recipeId);

    if (!$recipe) {
        return response()->json([
            'success' => false,
            'message' => 'Recipe not found.',
        ], 404);
    }

    // Check if the authenticated user has access to the recipe
    // if (Auth::user()->id !== $recipe->user_id) {
    //     return response()->json([
    //         'success' => false,
    //         'message' => 'Unauthorized access to view images for this recipe.',
    //     ], 403); // 403 Forbidden status code
    // }

    // Retrieve images from the loaded relationship
    $images = $recipe->images;

    // Return the images
    return response()->json([
        'success' => true,
        'images' => $images,
    ]);
}


}
