<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            //Auth details
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();

            //OAuth Drivers (Laravel Socialite)
            $table->string('github_id')->nullable()->unique();
            $table->string('google_id')->nullable()->unique();

            //Personal & Contact Details
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('headline')->nullable();
            $table->text('bio')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('avatar_url')->nullable();

            //Public SEO slug & Portfolio Handle
            $table->string('portfolio_slug')->unique()->nullable();

            //Location & Professional Metadata
            $table->string('country')->nullable();
            $table->string('state')->nullable();
            $table->string('city')->nullable();
            $table->string('zip_code')->nullable();
            $table->text('address')->nullable();
            $table->string('website_url')->nullable();

            // PostgreSQL Native JSONB for Dynamic Social Links
            // e.g. {"GitHub": "username", "LinkedIn": "in/username", "twitter": "handle"}
            $table->jsonb('social_links')->nullable();

            // Settings & System Flags
            $table->boolean('is_active')->default(true);
            $table->boolean('is_public')->default(true);
            $table->string('preferred_theme')->default('system');

            // Tokens & Timestamps
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();

            // Performance Indexes for PostgreSQL
            $table->index('portfolio_slug');
            $table->index('is_active');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
