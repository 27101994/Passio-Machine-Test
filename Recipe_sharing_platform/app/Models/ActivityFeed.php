<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityFeed extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'activity_type',
        'activity_details',
    ];

    protected $casts = [
        'activity_details' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}