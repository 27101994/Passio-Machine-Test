<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'bio',
        'followers_count',
        'following_count',
    ];

    protected $attributes = [
        'followers_count' => 0,
        'following_count' => 0,
    ];

    protected $casts = [
        'followers_count' => 'integer',
        'following_count' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
