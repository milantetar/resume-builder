<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserThemeController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'theme' => ['required', 'string', Rule::in(['dark', 'light', 'forest', 'ocean', 'rose'])],
        ]);

        $request->user()->update([
            'preferred_theme' => $validated['theme'],
        ]);

        return back();
    }
}
