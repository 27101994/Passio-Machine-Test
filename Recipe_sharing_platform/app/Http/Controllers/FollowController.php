<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follower;
use App\Models\User; // Add this import statement
use Illuminate\Support\Facades\Validator;

class FollowController extends Controller
{
    public function follow(Request $request, $id)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'follower_id' => 'required|exists:users,id',
            'following_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Check if the follow relationship already exists
        $existingFollow = Follower::where('follower_id', $request->follower_id)
            ->where('following_id', $request->following_id)
            ->first();

        if ($existingFollow) {
            // If the relationship exists, unfollow
            $existingFollow->delete();
            $message = 'User unfollowed successfully';
        } else {
            // If the relationship doesn't exist, follow
            $follow = Follower::create([
                'follower_id' => $request->follower_id,
                'following_id' => $request->following_id,
            ]);
            $message = 'User followed successfully';
        }

        // Update follower and following counts in the user table
        $follower = User::find($request->follower_id);
        $following = User::find($request->following_id);

        if ($follower && $following) {
            $follower->update([
                'following_count' => $follower->following()->count(), // Adjusted logic
            ]);

            $following->update([
                'followers_count' => $following->followers()->count(), // Adjusted logic
            ]);
        }

        return response()->json(['message' => $message], 200);
    }
}
