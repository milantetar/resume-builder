<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Granular System Permissions
    |--------------------------------------------------------------------------
    */
    'permissions' => [
        // Registration & Auth
        'auth.register',
        'auth.login',

        // Resume & Portfolio Operations
        'resumes.create',
        'resumes.edit',
        'resumes.delete',
        'resumes.export-pdf',
        'portfolios.publish',

        // Media Management
        'media.upload',

        // Platform Administration
        'users.manage',
        'templates.manage',
        'system.analytics',
        'system.settings',
    ],

    /*
    |--------------------------------------------------------------------------
    | System Roles & Permission Mapping
    |--------------------------------------------------------------------------
    */
    'roles' => [
        'super-admin' => [
            // Super Admin gets everything via Gate::before or explicit assignment
            'description' => 'Full unrestricted system access.',
            'permissions' => '*',
        ],

        'admin' => [
            'description' => 'Platform manager handling users and system templates.',
            'permissions' => [
                'auth.register',
                'auth.login',
                'resumes.create',
                'resumes.edit',
                'resumes.delete',
                'resumes.export-pdf',
                'portfolios.publish',
                'media.upload',
                'users.manage',
                'templates.manage',
                'system.analytics',
            ],
        ],

        'user' => [
            'description' => 'Standard registered candidate building resumes & portfolios.',
            'permissions' => [
                'auth.register',
                'auth.login',
                'resumes.create',
                'resumes.edit',
                'resumes.delete',
                'resumes.export-pdf',
                'portfolios.publish',
                'media.upload',
            ],
        ],
    ],
];
