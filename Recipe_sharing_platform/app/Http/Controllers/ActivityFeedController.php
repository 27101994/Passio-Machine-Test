<?php

namespace App\Http\Controllers;

use App\Models\ActivityFeed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityFeedController extends Controller
{
    /**
     * Display a listing of the activity feeds.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $activityFeeds = ActivityFeed::with('user')->get();

        return response()->json(['activityFeeds' => $activityFeeds]);
    }

    /**
     * Store a newly created activity feed in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'activity_type' => 'required|string',
            'activity_details' => 'required|array',
            // Add other validation rules as needed
        ]);

        $user = Auth::user();

        $activityFeed = $user->activityFeeds()->create([
            'activity_type' => $request->input('activity_type'),
            'activity_details' => $request->input('activity_details'),
        ]);

        return response()->json(['message' => 'Activity feed created successfully', 'activityFeed' => $activityFeed]);
    }

    /**
     * Remove the specified activity feed from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $activityFeed = ActivityFeed::find($id);

        if (!$activityFeed) {
            return response()->json(['message' => 'Activity feed not found'], 404);
        }

        $this->authorize('delete', $activityFeed);

        $activityFeed->delete();

        return response()->json(['message' => 'Activity feed deleted successfully']);
    }
}
