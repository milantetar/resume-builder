<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;
use Throwable;

class AuthUserController extends Controller
{
    /**
     * @var array<string, string>
     */
    private const SOCIALITE_PROVIDERS = [
        'github' => 'github_id',
        'google' => 'google_id',
    ];

    /**
     * Display Registration Page
     */
    public function create(): Response
    {
        return Inertia::render(('auth/register'));
    }

    /**
     * Display Login Page
     */
    public function login(): Response
    {
        return Inertia::render(('auth/login'));
    }

    public function redirectToProvider(string $provider): SymfonyRedirectResponse
    {
        abort_unless(array_key_exists($provider, self::SOCIALITE_PROVIDERS), 404);

        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider): RedirectResponse
    {
        abort_unless(array_key_exists($provider, self::SOCIALITE_PROVIDERS), 404);

        try {
            $socialiteUser = Socialite::driver($provider)->user();
        } catch (Throwable) {
            return redirect()
                ->route('login')
                ->withErrors(['email' => 'We could not sign you in with that provider. Please try again.']);
        }

        $email = $socialiteUser->getEmail();

        if (! $email) {
            return redirect()
                ->route('login')
                ->withErrors(['email' => 'Your social account did not share an email address.']);
        }

        $providerColumn = self::SOCIALITE_PROVIDERS[$provider];
        $providerId = (string) $socialiteUser->getId();

        $user = User::query()
            ->where($providerColumn, $providerId)
            ->orWhere('email', $email)
            ->first();

        if ($user) {
            $user->forceFill([
                $providerColumn => $providerId,
                'avatar_url' => $user->avatar_url ?: $socialiteUser->getAvatar(),
                'email_verified_at' => $user->email_verified_at ?: now(),
            ])->save();
        } else {
            $user = User::create([
                'name' => $socialiteUser->getName() ?: $socialiteUser->getNickname() ?: $email,
                'email' => $email,
                $providerColumn => $providerId,
                'avatar_url' => $socialiteUser->getAvatar(),
                'email_verified_at' => now(),
                'preferred_theme' => 'dark',
            ]);

            if (Role::query()->where('name', 'user')->exists()) {
                $user->assignRole('user');
            }
        }

        Auth::login($user, remember: true);
        request()->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
