<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class UserController extends Controller
{
    // function for registering a new user
    public function register(Request $request){

        // validating the incoming data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        //check for validation fails
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        //new user creation
        $data=User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
        ]);

        return response()->json([
            'success'=>true,
            'message'=>'success',
            'data'=>$data
        ],200);
    }

// function for login
public function login(Request $request){
    $creditials=[
        'email'=>$request->email,
        'password'=>$request->password
    ];

    if(!Auth::attempt($creditials)){
        return response()->json([
            'success'=>false,
            'message'=>'email or password is incorrect'
        ],401);
    }
    $user = Auth::user();
    if ($user->blocked) {
        Auth::logout(); 
        return response()->json([
            'success' => false,
            'message' => 'User is blocked. contact admin.',
        ], 403);
    }
    if ($user->is_admin) {
        $token = $user->createToken('AdminToken')->accessToken;
    } else {
        $token = $user->createToken('UserToken')->accessToken;
    }
    return response()->json([
        'success'=>true,
        'id'=>$user->id,
        'email'=>$user->email,
        'is_admin'=>$user->is_admin,
        'token' => $token,
    ]);
}


    //logout function
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'User logged out successfully',
        ]);
    }

    public function createProfile(Request $request)
    {
        // Check if the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }
    
        // Validate incoming request data
        $validator = Validator::make($request->all(), [
            'bio' => 'required|string|max:255',
            // Add other validation rules for additional profile fields if needed
        ]);
    
        // If validation fails, return the error response
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        try {
            // Get the authenticated user
            $user = auth()->user();
    
            // Check if the user already has a profile
            $existingProfile = $user->profile;
    
            if ($existingProfile) {
                return response()->json(['message' => 'User already has a profile'], 409);
            }
    
            // Create a new profile for the user
            $user->profile()->create([
                'bio' => $request->bio,
                // Add other profile fields if needed
            ]);
    
            return response()->json(['message' => 'Profile created successfully'], 201);
        } catch (\Exception $e) {
            // Log the error using the fully qualified namespace
            Log::error('Error creating profile: ' . $e->getMessage());
    
            // Return a generic error response
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }
    
}

