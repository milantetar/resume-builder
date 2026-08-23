<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\Authorization\PermissionSeeder;
use Database\Seeders\Authorization\RoleSeeder;
use Database\Seeders\Authorization\UserRoleSeeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserRoleSeeder::class,
        ]);
    }
}
