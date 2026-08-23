type SocialProvider = {
    name: 'Google' | 'GitHub';
    href: string;
};

const socialProviders: SocialProvider[] = [
    { name: 'Google', href: '/auth/google/redirect' },
    { name: 'GitHub', href: '/auth/github/redirect' },
];

function GoogleLogo() {
    return (
        <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.44 1.18 4.94l3.66-2.84Z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38Z"
            />
        </svg>
    );
}

function GitHubLogo() {
    return (
        <svg
            aria-hidden="true"
            className="size-5 fill-current"
            viewBox="0 0 24 24"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.92.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.38-3.88-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.8 10.8 0 0 1 5.75 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.79.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function ProviderLogo({ name }: { name: SocialProvider['name'] }) {
    return name === 'Google' ? <GoogleLogo /> : <GitHubLogo />;
}

export function SocialProviderButtons() {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {socialProviders.map((provider) => (
                <a
                    key={provider.name}
                    href={provider.href}
                    className="pro-action group flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-4 text-sm font-semibold text-[var(--app-text)] transition-all duration-200 hover:border-[var(--app-accent)] hover:bg-[var(--app-accent-soft)] hover:text-[var(--app-accent)] focus:ring-2 focus:ring-[var(--app-accent)]/25 focus:outline-none"
                >
                    <span className="flex size-5 items-center justify-center text-[var(--app-text)] transition-colors duration-200 group-hover:text-[var(--app-accent)]">
                        <ProviderLogo name={provider.name} />
                    </span>
                    <span>Continue with {provider.name}</span>
                </a>
            ))}
        </div>
    );
}
