<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\UpdateUserThemeRequest;
use App\Http\Resources\UserResource;
use App\Services\UserThemeService;
use Illuminate\Http\JsonResponse;

class UserThemeController extends BaseController
{
    public function __construct(private readonly UserThemeService $themes) {}

    public function update(UpdateUserThemeRequest $request): JsonResponse
    {
        $user = $this->themes->updatePreferredTheme($request->user(), $request->validated('theme'));

        return $this->successResponse('Theme updated successfully.', [
            'user' => new UserResource($user),
        ]);
    }
}
