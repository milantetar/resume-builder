import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    FileText,
    LockKeyhole,
    Mail,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps } from 'react';

import { SocialProviderButtons } from '@/components/social-provider-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeDropdown, useAppTheme } from '@/lib/themes';

export default function Login() {
    const { theme } = useAppTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: ComponentProps<'form'>['onSubmit'] = (event) => {
        event.preventDefault();
        post('/login');
    };

    return (
        <main
            className="flex h-screen flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)]"
            style={theme.vars}
        >
            <Head title="Log in" />

            <header className="flex h-18 shrink-0 items-center justify-between px-5 sm:px-8 lg:px-10">
                <Link
                    href="/"
                    className="group flex w-fit items-center gap-3 focus:outline-none"
                >
                    <span className="flex size-10 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] shadow-sm transition-colors duration-200 group-hover:border-[var(--app-accent)] group-hover:text-[var(--app-accent)]">
                        <FileText className="size-5" />
                    </span>
                    <span className="text-lg font-semibold text-[var(--app-text)] transition-colors duration-200 group-hover:text-[var(--app-accent)]">
                        PortCV
                    </span>
                </Link>
                <ThemeDropdown />
            </header>

            <section className="grid min-h-0 flex-1 gap-6 px-5 pb-5 sm:px-8 sm:pb-8 lg:grid-cols-2 lg:px-10">
                <section className="pro-card flex min-h-0 items-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)] shadow-xl sm:p-7">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-6">
                            <h1 className="text-3xl font-semibold tracking-normal text-[var(--app-text)] sm:text-4xl">
                                Welcome back
                            </h1>
                            <p className="mt-2 leading-6 text-[var(--app-muted)]">
                                Continue editing resumes, portfolio pages, API
                                profile data, and export-ready PDFs.
                            </p>
                        </div>

                        <SocialProviderButtons />

                        <div className="my-5 flex items-center gap-3">
                            <div className="h-px flex-1 bg-[var(--app-border)]" />
                            <span className="text-xs font-semibold text-[var(--app-muted)] uppercase">
                                or
                            </span>
                            <div className="h-px flex-1 bg-[var(--app-border)]" />
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-[var(--app-text)]"
                                >
                                    Email address
                                </Label>
                                <div className="group relative">
                                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--app-muted)] transition-colors duration-200 group-focus-within:text-[var(--app-accent)]" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(event) =>
                                            setData('email', event.target.value)
                                        }
                                        className="h-11 rounded-lg border-[var(--app-border)] bg-[var(--app-bg)] pl-10 transition-colors duration-200 hover:bg-[var(--app-surface-2)] focus-visible:border-[var(--app-accent)] focus-visible:ring-[var(--app-accent)]/20"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm font-medium text-[var(--app-danger)]">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-[var(--app-text)]"
                                >
                                    Password
                                </Label>
                                <div className="group relative">
                                    <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--app-muted)] transition-colors duration-200 group-focus-within:text-[var(--app-accent)]" />
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={data.password}
                                        onChange={(event) =>
                                            setData(
                                                'password',
                                                event.target.value,
                                            )
                                        }
                                        className="h-11 rounded-lg border-[var(--app-border)] bg-[var(--app-bg)] pr-10 pl-10 transition-colors duration-200 hover:bg-[var(--app-surface-2)] focus-visible:border-[var(--app-accent)] focus-visible:ring-[var(--app-accent)]/20"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (visible) => !visible,
                                            )
                                        }
                                        className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--app-muted)] transition-colors duration-200 hover:bg-[var(--app-bg-soft)] hover:text-[var(--app-text)] focus:ring-2 focus:ring-[var(--app-accent)]/25 focus:outline-none"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-4" />
                                        ) : (
                                            <Eye className="size-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm font-medium text-[var(--app-danger)]">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[var(--app-muted)] transition-colors duration-200 hover:text-[var(--app-text)]">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(event) =>
                                        setData(
                                            'remember',
                                            event.target.checked,
                                        )
                                    }
                                    className="size-4 rounded border-[var(--app-border)] accent-[var(--app-accent)]"
                                />
                                Keep me signed in
                            </label>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="group h-11 w-full rounded-lg bg-[var(--app-text)] text-base text-[var(--app-surface)] transition-colors duration-200 hover:bg-[var(--app-accent)]"
                            >
                                {processing
                                    ? 'Signing in...'
                                    : 'Open dashboard'}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </form>

                        <p className="mt-5 text-center text-sm text-[var(--app-muted)]">
                            New here?{' '}
                            <Link
                                href="/register"
                                className="font-semibold text-[var(--app-accent)] underline-offset-4 transition-colors duration-200 hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>

                <section className="hidden min-h-0 text-[var(--app-text)] lg:flex">
                    <div className="pro-card flex w-full flex-col justify-between rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 shadow-2xl shadow-[var(--app-shadow)]">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full bg-[var(--app-accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--app-accent)]">
                                <CheckCircle2 className="size-4" />
                                Last edit saved
                            </p>
                            <h2 className="mt-6 max-w-xl text-4xl leading-tight font-semibold tracking-normal xl:text-5xl">
                                Pick up exactly where your career story paused.
                            </h2>
                        </div>

                        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                            <div className="pro-card space-y-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-bg-soft)] p-4">
                                {[
                                    'Portfolio published',
                                    'Resume PDF ready',
                                    'API token active',
                                    'Custom Domains',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="pro-action flex items-center gap-3 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] p-3 transition-colors duration-200 hover:border-[var(--app-accent)] hover:bg-[var(--app-surface)]"
                                    >
                                        <CheckCircle2 className="size-5 text-[var(--app-accent)]" />
                                        <span className="font-medium">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-5 text-[var(--app-text)]">
                                <div className="mb-5 flex items-center justify-between border-b border-[var(--app-border)] pb-4">
                                    <div>
                                        <p className="text-xl font-semibold">
                                            Sr. Software Developer
                                        </p>
                                        <p className="text-sm font-medium text-[var(--app-accent)]">
                                            ATS coverage: 86%
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-[var(--app-text)] px-3 py-2 text-sm font-semibold text-[var(--app-surface)]">
                                        PDF
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2.5 rounded-full bg-[var(--app-text)] opacity-70" />
                                    <div className="h-2.5 w-5/6 rounded-full bg-[var(--app-muted)] opacity-45" />
                                    <div className="h-2.5 w-3/4 rounded-full bg-[var(--app-border)]" />
                                </div>
                                <div className="pro-card mt-5 rounded-xl border border-[var(--app-border)] bg-[var(--app-accent-soft)] p-4 text-sm font-medium text-[var(--app-muted)]">
                                    Add two measurable outcomes to improve
                                    recruiter scan quality.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}
