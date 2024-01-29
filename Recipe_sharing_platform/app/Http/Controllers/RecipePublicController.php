<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Recipe;

class RecipePublicController extends Controller
{
    public function getRecipesPublic()
    {
        // Retrieve all recipes with associated user and images
        $recipes = Recipe::with(['user', 'images'])->get();

        return response()->json(['data' => $recipes]);
    }
}
