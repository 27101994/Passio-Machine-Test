<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function followUser(Request $request, $userId)
    {
        $userToFollow = User::findOrFail($userId);

        if ($userToFollow->id !== auth()->id()) {
            auth()->user()->following()->attach($userToFollow->id);

            return response()->json(['message' => 'Successfully followed user']);
        } else {
            return response()->json(['message' => 'Cannot follow yourself'], 400);
        }
    }

    public function unfollowUser(Request $request, $userId)
    {
        $userToUnfollow = User::findOrFail($userId);

        auth()->user()->following()->detach($userToUnfollow->id);

        return response()->json(['message' => 'Successfully unfollowed user']);
    }
}
