<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\Models\Concerns\LogsActivity;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Spatie\Activitylog\Support\LogOptions;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string|null $password
 * @property string|null $github_id
 * @property string|null $google_id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $headline
 * @property string|null $bio
 * @property string|null $phone_number
 * @property string|null $avatar_url
 * @property string|null $portfolio_slug
 * @property string|null $country
 * @property string|null $state
 * @property string|null $city
 * @property string|null $zip_code
 * @property string|null $address
 * @property string|null $website_url
 * @property array|null $social_links
 * @property bool $is_active
 * @property bool $is_public
 * @property string $preferred_theme
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'github_id',
    'google_id',
    'first_name',
    'last_name',
    'headline',
    'bio',
    'phone_number',
    'avatar_url',
    'portfolio_slug',
    'country',
    'state',
    'city',
    'zip_code',
    'address',
    'website_url',
    'social_links',
    'is_active',
    'is_public',
    'preferred_theme',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements HasMedia
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, HasSlug, InteractsWithMedia, Notifiable, LogsActivity, SoftDeletes;

    /**
     * Get the options for generating the portfolio slug.
     */
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('portfolio_slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly([
                'name',
                'email',
                'first_name',
                'last_name',
                'headline',
                'bio',
                'phone_number',
                'is_active',
                'is_public',
                'preferred_theme',
            ])
            ->logOnlyDirty()
            ->dontLogEmptyChanges();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'social_links' => 'array',
            'is_active' => 'boolean',
            'is_public' => 'boolean',
        ];
    }
}
