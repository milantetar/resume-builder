<?php

use App\Http\Controllers\Web\AuthUserController;
use App\Http\Controllers\Web\UserThemeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 *  Welcome Route
 */

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

/**
 * Guest Auth Routes
 */
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthUserController::class, 'create'])->name('register');
    Route::get('/login', [AuthUserController::class, 'login'])->name('login');
    Route::get('/auth/{provider}/redirect', [AuthUserController::class, 'redirectToProvider'])->name('socialite.redirect');
    Route::get('/auth/{provider}/callback', [AuthUserController::class, 'handleProviderCallback'])->name('socialite.callback');
});

/**
 * Auth Routes
 */
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::patch('/settings/theme', [UserThemeController::class, 'update'])->name('settings.theme.update');
});
