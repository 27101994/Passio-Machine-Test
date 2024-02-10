<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    public function tag(Request $request)
    {
        // Validating incoming request data
        $validator = Validator::make($request->all(), [
            'tag_name' => 'required|string|max:255',
            'recipe_id' => 'required|exists:recipes,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Create a new tag
        $tag = Tag::create([
            'tag_name' => $request->input('tag_name'),
            'recipe_id' => $request->input('recipe_id'),
        ]);

        return response()->json(['message' => 'Recipe tagged successfully', 'tag' => $tag], 200);
    }
}
