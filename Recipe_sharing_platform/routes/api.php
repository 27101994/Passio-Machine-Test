<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\ActivityFeedController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes (no authentication required)
Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

use App\Http\Controllers\RecipePublicController;

// ...

// Use the getRecipesPublic function for public access without authentication
Route::get('/recipes-public', [RecipePublicController::class, 'getRecipesPublic']);

use App\Http\Controllers\GetprofileController;

Route::get('/profiles', [GetprofileController::class, 'getAllProfiles']);




// Routes protected by auth:api middleware
Route::group(['middleware' => 'auth:api'], function () {
    Route::post('logout', [UserController::class, 'logout']);

    Route::get('/profiles/{id}', [ProfileController::class, 'show']);
    Route::post('/profiles', [ProfileController::class, 'store']);
    Route::put('/profiles/{id}', [ProfileController::class, 'update']);
    Route::delete('/profiles/{id}', [ProfileController::class, 'destroy']);

    Route::post('/recipes', [RecipeController::class, 'createRecipe']);
    Route::get('/recipes', [RecipeController::class, 'getRecipes']);
    Route::delete('/recipes/{recipeId}', [RecipeController::class, 'deleteRecipe']);
    Route::get('/recipes/search', [RecipeController::class, 'searchRecipes']);
    Route::post('/recipes/{recipeId}/rate', [RecipeController::class, 'rateRecipe']);
    Route::post('/recipes/{recipeId}/like', [RecipeController::class, 'likeRecipe']);
    Route::put('/recipes/{recipeId}', [RecipeController::class, 'updateRecipe']);

    Route::post('/follow/{userId}', [FollowController::class, 'followUser']);
    Route::post('/unfollow/{userId}', [FollowController::class, 'unfollowUser']);

    Route::get('/tags', [TagController::class, 'index']);
    Route::get('/tags/{id}', [TagController::class, 'show']);
    Route::post('/tags', [TagController::class, 'store']);
    Route::put('/tags/{id}', [TagController::class, 'update']);
    Route::delete('/tags/{id}', [TagController::class, 'destroy']);

    Route::get('/activity-feeds', [ActivityFeedController::class, 'index']);
    Route::post('/activity-feeds', [ActivityFeedController::class, 'store']);
    Route::delete('/activity-feeds/{id}', [ActivityFeedController::class, 'destroy']);
});









