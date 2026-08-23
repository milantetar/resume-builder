<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthUserController;

/*
|--------------------------------------------------------------------------
| API V1 Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(
    function () {

        /**
         * Guest Auth Routes 
         */

        Route::middleware('guest')->group(
            function () {
            Route::post('/register',          [AuthUserController::class, 'registerUser']);
            Route::post('/login',          [AuthUserController::class, 'loginUser']);
        });
    }
);
