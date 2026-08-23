export type User = {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    portfolio_slug: string | null;
    is_active: boolean;
    is_public: boolean;
    preferred_theme: string;
    email_verified_at: string | null;
};

export type Auth = {
    user: User | null;
    roles: string[];
    permissions: string[];
};
