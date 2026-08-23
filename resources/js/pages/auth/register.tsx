import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    FileText,
    LockKeyhole,
    Mail,
    UserRound,
} from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps } from 'react';

import { SocialProviderButtons } from '@/components/social-provider-buttons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeDropdown, useAppTheme } from '@/lib/themes';

export default function Register() {
    const { theme } = useAppTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: ComponentProps<'form'>['onSubmit'] = (event) => {
        event.preventDefault();
        post('/register');
    };

    return (
        <main
            className="flex h-screen flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)]"
            style={theme.vars}
        >
            <Head title="Create account" />

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
                <section className="pro-card hidden min-h-0 flex-col justify-between rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-7 shadow-[var(--app-shadow)] shadow-xl lg:flex">
                    <div className="max-w-xl">
                        <h1 className="text-4xl leading-tight font-semibold tracking-normal xl:text-5xl">
                            One profile. Three polished outputs.
                        </h1>
                        <p className="mt-4 text-base leading-7 text-[var(--app-muted)] xl:text-lg">
                            Start with a Simple Account. Then build editable
                            resume, publish a portfolio, and prepare clean PDF
                            exports from the same data.
                        </p>
                    </div>

                    <div className="pro-card mt-8 rounded-xl border border-[var(--app-border)] bg-[var(--app-bg-soft)] p-4">
                        <div className="grid gap-4 xl:grid-cols-[1fr_0.92fr]">
                            <div className="pro-card rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4 text-[var(--app-text)]">
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="font-semibold">
                                        First resume
                                    </p>
                                    <span className="rounded-full bg-[var(--app-accent-soft)] px-2 py-1 text-xs font-medium text-[var(--app-accent)]">
                                        Draft
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    {['Profile', 'Experience', 'Projects'].map(
                                        (item) => (
                                            <button
                                                key={item}
                                                type="button"
                                                className="pro-action w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-3 text-left transition-colors duration-200 hover:border-[var(--app-accent)] hover:bg-[var(--app-surface)]"
                                            >
                                                <p className="mb-2 text-sm font-medium">
                                                    {item}
                                                </p>
                                                <div className="h-2 rounded-full bg-[var(--app-border)]" />
                                            </button>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    'Publish /p/your-name',
                                    'Export clean PDF',
                                    'Improve ATS score',
                                    'AI Resume Suggestions',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="pro-action flex items-center gap-3 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] p-4 transition-colors duration-200 hover:bg-[var(--app-accent-soft)]"
                                    >
                                        <CheckCircle2 className="size-5 text-[var(--app-accent)]" />
                                        <span className="font-medium">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pro-card flex min-h-0 items-center rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 shadow-[var(--app-shadow)] shadow-xl sm:p-6">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-5">
                            <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
                                Create your account
                            </h2>
                        </div>

                        <SocialProviderButtons />

                        <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-[var(--app-border)]" />
                            <span className="text-xs font-semibold text-[var(--app-muted)] uppercase">
                                or
                            </span>
                            <div className="h-px flex-1 bg-[var(--app-border)]" />
                        </div>

                        <form onSubmit={submit} className="space-y-3.5">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-[var(--app-text)]"
                                >
                                    Full name
                                </Label>
                                <div className="group relative">
                                    <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--app-muted)] transition-colors duration-200 group-focus-within:text-[var(--app-accent)]" />
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(event) =>
                                            setData('name', event.target.value)
                                        }
                                        className="h-10 rounded-lg border-[var(--app-border)] bg-[var(--app-bg)] pl-10 transition-colors duration-200 hover:bg-[var(--app-surface-2)] focus-visible:border-[var(--app-accent)] focus-visible:ring-[var(--app-accent)]/20"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm font-medium text-[var(--app-danger)]">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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
                                        className="h-10 rounded-lg border-[var(--app-border)] bg-[var(--app-bg)] pl-10 transition-colors duration-200 hover:bg-[var(--app-surface-2)] focus-visible:border-[var(--app-accent)] focus-visible:ring-[var(--app-accent)]/20"
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

                            <div className="space-y-3.5">
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
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password}
                                            onChange={(event) =>
                                                setData(
                                                    'password',
                                                    event.target.value,
                                                )
                                            }
                                            className="h-10 rounded-lg border-[var(--app-border)] bg-[var(--app-bg)] pr-10 pl-10 transition-colors duration-200 hover:bg-[var(--app-surface-2)] focus-visible:border-[var(--app-accent)] focus-visible:ring-[var(--app-accent)]/20"
                                            placeholder="********"
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

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password_confirmation"
                                        className="text-[var(--app-text)]"
                                    >
                                        Confirm Password
                                    </Label>
                                    <div className="group relative">
                                        <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--app-muted)] transition-colors duration-200 group-focus-within:text-[var(--app-accent)]" />
                                        <Input
                                            id="password_confirmation"
                                            type={
                                                showConfirmation
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password_confirmation}
                                            onChange={(event) =>
                                                setData(
                                                    'password_confirmation',
                                                    event.target.value,
                                                )
                                            }
                                            className="h-10 rounded-lg border-[var(--app-border)] bg-[var(--app-bg)] pr-10 pl-10 transition-colors duration-200 hover:bg-[var(--app-surface-2)] focus-visible:border-[var(--app-accent)] focus-visible:ring-[var(--app-accent)]/20"
                                            placeholder="********"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmation(
                                                    (visible) => !visible,
                                                )
                                            }
                                            className="absolute top-1/2 right-3 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--app-muted)] transition-colors duration-200 hover:bg-[var(--app-bg-soft)] hover:text-[var(--app-text)] focus:ring-2 focus:ring-[var(--app-accent)]/25 focus:outline-none"
                                            aria-label={
                                                showConfirmation
                                                    ? 'Hide confirmation'
                                                    : 'Show confirmation'
                                            }
                                        >
                                            {showConfirmation ? (
                                                <EyeOff className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="group h-11 w-full rounded-lg bg-[var(--app-text)] text-base text-[var(--app-surface)] transition-colors duration-200 hover:bg-[var(--app-accent)]"
                            >
                                {processing
                                    ? 'Creating account...'
                                    : 'Create workspace'}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </form>

                        <p className="mt-4 text-center text-sm text-[var(--app-muted)]">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-[var(--app-accent)] underline-offset-4 transition-colors duration-200 hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </section>
            </section>
        </main>
    );
}
