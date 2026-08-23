<?php

namespace Database\Seeders\Authorization;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $rolesConfig = config('permissions.roles', []);

        foreach ($rolesConfig as $roleName => $details) {
            $role = Role::firstOrCreate(
                ['name' => $roleName],
                ['guard_name' => 'web']
            );

            // Assign permissions mapped in config
            if ($details['permissions'] === '*') {
                $role->syncPermissions(Permission::all());
            } else {
                $role->syncPermissions($details['permissions']);
            }
        }
    }
}
