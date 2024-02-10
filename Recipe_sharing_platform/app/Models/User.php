<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'followers_count', 'following_count', 'bio', 'is_admin', 'blocked',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
        'blocked' => 'boolean',
    ];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }


    public function recipes()
    {
        return $this->hasMany(Recipe::class);
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'follower_id')->withTimestamps();
    }
    
    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'following_id')->withTimestamps();
    }

    

    public function likes()
    {
        return $this->belongsToMany(Recipe::class, 'likes', 'user_id', 'recipe_id')->withTimestamps();
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class, 'user_id');
    }


    public function followersCount()
    {
        return $this->followers()->count();
    }

    public function followingCount()
    {
        return $this->following()->count();
    }

    
}
