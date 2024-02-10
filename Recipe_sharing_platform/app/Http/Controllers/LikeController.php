<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use Illuminate\Support\Facades\Validator;

class LikeController extends Controller
{
    public function like(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'recipe_id' => 'required|exists:recipes,id',
        ]);
    
        // Find existing like or create a new one
        $like = Like::firstOrNew([
            'user_id' => $request->user_id,
            'recipe_id' => $request->recipe_id,
        ]);
    
        // Update the status to 'like'
        $like->status = 1;
        $like->save();
    
        return response()->json(['message' => 'Recipe liked successfully', 'data' => $like], 200);
    }
    
    public function dislike(Request $request, $id)
    {
        // Validate incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'recipe_id' => 'required|exists:recipes,id',
        ]);
    
        // Find existing like or create a new one
        $like = Like::firstOrNew([
            'user_id' => $request->user_id,
            'recipe_id' => $request->recipe_id,
        ]);
    
        // Update the status to 'dislike'
        $like->status = 0;
        $like->save();
    
        return response()->json(['message' => 'Recipe disliked successfully', 'data' => $like], 200);
    }
}
