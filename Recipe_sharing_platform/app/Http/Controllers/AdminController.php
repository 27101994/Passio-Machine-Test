<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;

class AdminController extends Controller
{
    public function getUsers(Request $request)
    {
        $users = User::all();
        return response()->json($users);
    }

    public function getRecipes(Request $request, $userId)
    {
        $recipes = Recipe::with('images')->where('user_id', $userId)->get();
        return response()->json($recipes);
    }

    public function deleteRecipeAdmin(Request $request, $recipeId)
    {
        $recipe = Recipe::find($recipeId);

        if (!$recipe) {
            return response()->json(['error' => 'Recipe not found'], 404);
        }

        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    public function blockUser(User $user)
    {
        $this->authorize('block-user', $user); // Add authorization check

        $user->update(['blocked' => true]);

        return response()->json(['success' => 'User blocked successfully.']);
    }

    public function unblockUser(User $user)
    {
        $this->authorize('unblock-user', $user); // Add authorization check

        $user->update(['blocked' => false]);

        return response()->json(['success' => 'User unblocked.']);
    }
}
