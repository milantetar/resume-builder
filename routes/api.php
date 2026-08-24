<?php

use App\Http\Controllers\Api\v1\AuthUserController;
use App\Http\Controllers\Api\v1\UserThemeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    /**
     * Guest Auth Routes
     */
    Route::middleware('guest')->group(function () {
        Route::post('/register', [AuthUserController::class, 'registerUser']);
        Route::post('/login', [AuthUserController::class, 'loginUser']);
    });

    /**
     * Authenticated User Routes
     */
    Route::middleware('auth:sanctum')->group(function () {
        Route::patch('/user/theme', [UserThemeController::class, 'update']);
    });
});
