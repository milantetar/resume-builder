<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserThemeRequest;
use App\Services\UserThemeService;
use Illuminate\Http\RedirectResponse;

class UserThemeController extends Controller
{
    public function __construct(private readonly UserThemeService $themes) {}

    public function update(UpdateUserThemeRequest $request): RedirectResponse
    {
        $this->themes->updatePreferredTheme($request->user(), $request->validated('theme'));

        return back();
    }
}
