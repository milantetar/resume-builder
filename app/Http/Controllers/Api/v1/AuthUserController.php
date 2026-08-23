<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\RegisterUserRequest;

class AuthUserController extends Controller
{
    /**
     * @param RegisterUserRequest $request
     * @return JsonResponse
     */
    public function registerUser(RegisterUserRequest $request)
    {
        $validated = $request->validated();
        dd($validated);
    }
}