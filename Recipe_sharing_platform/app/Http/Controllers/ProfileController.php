<?php

// ProfileController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * List all user profiles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listProfiles()
    {
        try {
            $profiles = User::all(['id', 'name', 'email', 'followers_count', 'following_count', 'bio']);

            return response()->json(['profiles' => $profiles]);
        } catch (\Exception $e) {
            \Log::error('Error listing user profiles: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Create user profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProfileDetails()
    {
        try {
            // Get the authenticated user
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Eager load the user's profile to retrieve profile details
            $userWithProfile = User::with('profile')->find($user->id);

            // You can customize the data you want to return, here we include user and profile details
            $profileDetails = [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    // Add other user fields if needed
                ],
                'profile' => [
                    'bio' => $userWithProfile->profile ? $userWithProfile->profile->bio : null,
                    // Add other profile fields if needed
                ],
            ];

            return response()->json(['data' => $profileDetails]);
        } catch (\Exception $e) {
            \Log::error('Error fetching profile details: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
    /**
     * Edit user profile.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function updateProfile(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'bio' => 'required|string|max:255',
        ]);

        // Get the authenticated user
        $user = auth()->user();

        // Check if the user already has a profile
        $profile = $user->profile;

        if ($profile) {
            // If the profile exists, update the bio
            $profile->update([
                'bio' => $request->bio,
                // Add other profile fields if needed
            ]);
        } else {
            // If the profile doesn't exist, create a new profile
            $user->profile()->create([
                'bio' => $request->bio,
                // Add other profile fields if needed
            ]);
        }

        return response()->json(['message' => 'Bio updated successfully'], 200);
    }

    public function getUser()
    {
        // Get the authenticated user
        $user = auth()->user();

        // Check if the user has a profile
        $profile = $user->profile;

        if ($profile) {
            // If the profile exists, return the user data with the profile
            return response()->json(['user' => $user, 'profile' => $profile], 200);
        } else {
            // If the profile doesn't exist, return the user data without the profile or customize as needed
            return response()->json(['user' => $user, 'profile' => null], 200);
        }
    }

}