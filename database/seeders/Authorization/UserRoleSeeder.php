<?php

namespace Database\Seeders\Authorization;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserRoleSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Super Admin User
        $superAdmin = User::firstOrCreate(
            ['email' => 'superadmin@resumebuilder.local'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('SACMS@123'),
                'email_verified_at' => now(),
                'portfolio_slug' => 'super-admin',
                'is_active' => true,
                'is_public' => false,
            ]
        );
        $superAdmin->assignRole('super-admin');

        // 2. Create Standard Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@resumebuilder.local'],
            [
                'name' => 'System Admin',
                'password' => Hash::make('Admin@123'),
                'email_verified_at' => now(),
                'portfolio_slug' => 'admin',
                'is_active' => true,
                'is_public' => false,
            ]
        );
        $admin->assignRole('admin');

        // 3. Create Sample Registered User
        $user = User::firstOrCreate(
            ['email' => 'user@resumebuilder.local'],
            [
                'name' => 'John Doe',
                'password' => Hash::make('Password@123'),
                'email_verified_at' => now(),
                'portfolio_slug' => 'john-doe',
                'is_active' => true,
                'is_public' => true,
            ]
        );
        $user->assignRole('user');
    }
}
