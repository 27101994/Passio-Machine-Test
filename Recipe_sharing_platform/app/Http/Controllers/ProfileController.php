<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display the specified profile.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        return response()->json(['profile' => $profile]);
    }

    /**
     * Store a newly created profile in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'bio' => 'string',
            'followers_count' => 'integer',
            'following_count' => 'integer',
            // Add other validation rules as needed
        ]);

        // Check if a profile already exists for the specified user_id
        $existingProfile = Profile::where('user_id', $request->input('user_id'))->first();

        if ($existingProfile) {
            return response()->json(['message' => 'Profile already exists for this user'], 400);
        }

        $profile = Profile::create($request->all());

        return response()->json(['message' => 'Profile created successfully', 'profile' => $profile]);
    }

    /**
     * Update the specified profile in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        // Log request data
        \Log::info($request->all());

        $request->validate([
            'bio' => 'string',
            'followers_count' => 'integer',
            'following_count' => 'integer',
            // Add other validation rules as needed
        ]);

        $profile->update($request->all());

        return response()->json(['message' => 'Profile updated successfully', 'profile' => $profile]);
    }

    /**
     * Remove the specified profile from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $profile = Profile::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $profile->delete();

        return response()->json(['message' => 'Profile deleted successfully']);
    }
}
