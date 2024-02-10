<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function blockUser(User $admin, User $user)
    {
        return $admin->is_admin;
    }

    public function unblockUser(User $admin, User $user)
    {
        return $admin->is_admin;
    }
}
