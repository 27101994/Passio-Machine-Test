
<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\RecipeRatingController;
use App\Http\Controllers\RecipeImageController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ActivityFeedController;
use App\Http\Controllers\ProfileController;

// Registration route
Route::post('/register', [UserController::class, 'register']);

// Login route
Route::post('/login', [UserController::class, 'login']);

// Logout route
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:api');

Route::group(['middleware' => ['auth:api', 'admin']], function () {
    // Get all users
    Route::get('/admin/users', [AdminController::class, 'getUsers']);

    // Get recipes for a specific user
    Route::get('/admin/recipes/{userId}', [AdminController::class, 'getRecipes']);
    
    // Delete a recipe
    Route::delete('/admin/recipes/{recipeId}', [AdminController::class, 'deleteRecipeAdmin']);
    
    // Block a user
    Route::post('/admin/users/{user}/block', [AdminController::class, 'blockUser']);
    
    // Unblock a user
    Route::post('/admin/users/{user}/unblock', [AdminController::class, 'unblockUser']);
});

// User profile routes
Route::group(['middleware' => 'auth:api'], function () {
    // Tagging route
    Route::post('/tag', [TagController::class, 'tag']);
    // Search route
    Route::post('/search', [SearchController::class, 'search']);
    // Rating route
    Route::post('/recipes/{recipeId}/rate', [RecipeRatingController::class, 'rateRecipe']);
    // Recipe Image Upload route
    Route::post('/recipes/{recipeId}/upload-image', [RecipeImageController::class, 'uploadImage']);
    Route::get('recipes/{recipeId}/images', [RecipeImageController::class, 'getImagesByRecipeId']);
    // Recipe routes
    Route::post('/recipes/create', [RecipeController::class, 'create']);
    Route::put('/recipes/{id}/update', [RecipeController::class, 'update']);
    Route::get('/recipes', [RecipeController::class, 'getAllRecipes']);
    Route::delete('/recipes/{id}/delete', [RecipeController::class, 'delete']);
    Route::get('/recipes/{id}', [RecipeController::class, 'getRecipe']);
    Route::get('/recipes/following-users', [RecipeController::class, 'recipesByFollowingUsers']);
    // Like routes
    Route::post('/recipes/{id}/like', [LikeController::class, 'like']);
    Route::post('/recipes/{id}/dislike', [LikeController::class, 'dislike']);
    // Follow routes
    Route::post('/users/{id}/follow', [FollowController::class, 'follow']);
    // Route::post('/users/{id}/unfollow', [FollowController::class, 'unfollow']);
    // // Admin routes
    // Route::get('/admin/users', [AdminController::class, 'getUsers']);
    // Route::get('/admin/users/{userId}/recipes', [AdminController::class, 'getRecipes']);
    // Route::delete('/admin/recipes/{recipeId}', [AdminController::class, 'deleteRecipeAdmin']);
    // Route::put('/admin/users/{user}/block', [AdminController::class, 'blockUser']);
    // Route::put('/admin/users/{user}/unblock', [AdminController::class, 'unblockUser']);
    // Save activity when a user adds a recipe
    // Route::post('/user/{userId}/recipe/{recipeId}/save-activity', [UserActivityController::class, 'saveActivity']);

    // Show activities for a specific user
    Route::get('/activity-feed/{userId}', [ActivityFeedController::class, 'showActivityFeed']);
    // New Profile routes
    Route::get('/list-profiles', [ProfileController::class, 'listProfiles']);
    Route::post('/create-profile', [UserController::class, 'createProfile']);
    Route::post('/update-profile', [ProfileController::class, 'updateProfile']);
    Route::get('/api/get-user', [ProfileController::class, 'getUser']);
    // // Route to get user details including followers_count, following_count, and bio
    // Route::get('/user-details', [UserController::class, 'getUserDetails']);

    
});

// Add other necessary routes or middleware as needed

?>









