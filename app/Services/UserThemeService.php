<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;

class UserThemeService
{
    public function __construct(private readonly UserRepositoryInterface $users) {}

    public function updatePreferredTheme(User $user, string $theme): User
    {
        return $this->users->update($user, [
            'preferred_theme' => $theme,
        ]);
    }
}
