<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;

class ActivityFeedController extends Controller
{
    public function showActivityFeed($userId)
    {
        try {
            // Get the user
            $user = User::find($userId);

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Get the users who are following the current user
            $followerIds = $user->followers->pluck('id');

            // Get the recipes of the followers
            $recipes = Recipe::whereIn('user_id', $followerIds)
                ->with('user') // Eager load user details
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json(['recipes' => $recipes]);
        } catch (\Exception $e) {
            \Log::error('Error fetching recipe feed: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
