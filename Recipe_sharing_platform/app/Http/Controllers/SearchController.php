<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'search_query' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $searchQuery = $request->input('search_query');

        // Search recipes by tag name or recipe name
        $recipes = Recipe::whereHas('tags', function ($query) use ($searchQuery) {
            $query->where('tag_name', 'like', '%' . $searchQuery . '%');
        })->orWhere('title', 'like', '%' . $searchQuery . '%')->get();

        return response()->json(['recipes' => $recipes], 200);
    }
}
