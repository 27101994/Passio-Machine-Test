<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile; // Add this line

class GetprofileController extends Controller
{
    /**
     * Get all profiles.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllProfiles()
    {
        $profiles = Profile::all();

        return response()->json(['profiles' => $profiles]);
    }
}
