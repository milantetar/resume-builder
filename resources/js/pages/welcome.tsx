import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    FileText,
    LayoutDashboard,
    PenLine,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ThemeDropdown, useAppTheme } from '@/lib/themes';
import type { Auth } from '@/types';

const workflow = [
    { icon: PenLine, label: 'Write once', value: 'Structured profile blocks' },
    {
        icon: LayoutDashboard,
        label: 'Preview live',
        value: 'Resume and portfolio views',
    },
    {
        icon: BarChart3,
        label: 'Improve fit',
        value: 'ATS checks and AI polish',
    },
];

const previewModes = {
    resume: {
        label: 'Resume',
        title: 'John Doe',
        subtitle: 'Full-stack Laravel Developer',
        note: 'ATS coverage improved by 14%',
    },
    portfolio: {
        label: 'Portfolio',
        title: 'johndoe.dev',
        subtitle: 'Projects, writing, case studies',
        note: 'Public page synced with resume data',
    },
    api: {
        label: 'API',
        title: '/api/v1/profile',
        subtitle: 'Token-authenticated JSON',
        note: 'Ready for mobile apps and integrations',
    },
};

type PreviewMode = keyof typeof previewModes;

export default function Welcome() {
    const { theme } = useAppTheme();
    const [activePreview, setActivePreview] = useState<PreviewMode>('resume');
    const preview = previewModes[activePreview];
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth.user;
    const primaryRole = auth.roles[0] ?? 'guest';
    const hasPermission = (permission: string) =>
        auth.permissions.includes(permission);
    const roleLabel = primaryRole
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    const availableModules = [
        { label: 'Resume builder', enabled: hasPermission('resumes.create') },
        {
            label: 'Portfolio publishing',
            enabled: hasPermission('portfolios.publish'),
        },
        { label: 'PDF export', enabled: hasPermission('resumes.export-pdf') },
        { label: 'Media uploads', enabled: hasPermission('media.upload') },
        { label: 'User management', enabled: hasPermission('users.manage') },
        {
            label: 'Template management',
            enabled: hasPermission('templates.manage'),
        },
        {
            label: 'System analytics',
            enabled: hasPermission('system.analytics'),
        },
    ];

    return (
        <main
            className="h-screen overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)] selection:bg-[var(--app-text)] selection:text-[var(--app-surface)]"
            style={theme.vars}
        >
            <Head title="Resume Builder & Portfolio CMS" />

            <section
                className={[
                    'flex h-full flex-col border-b border-[var(--app-border)]',
                    theme.name === 'dark'
                        ? 'bg-[var(--app-bg)]'
                        : 'bg-[radial-gradient(circle_at_top_left,var(--app-surface)_0,var(--app-bg)_40%,var(--app-bg-soft)_100%)]',
                ].join(' ')}
            >
                <header className="flex h-18 shrink-0 items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link
                        href="/"
                        className="group flex items-center gap-3 focus:outline-none"
                    >
                        <span className="flex size-10 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] shadow-sm transition-all duration-200 group-hover:border-[var(--app-accent)] group-hover:text-[var(--app-accent)]">
                            <FileText className="size-5" />
                        </span>
                        <span className="text-lg font-semibold tracking-normal text-[var(--app-text)] transition-colors duration-200 group-hover:text-[var(--app-accent)]">
                            PortCV
                        </span>
                    </Link>

                    <nav className="flex items-center gap-2">
                        <ThemeDropdown />
                        {user ? (
                            <>
                                <span className="hidden rounded-full border border-[var(--app-border)] bg-[var(--app-surface)] px-3 py-2 text-sm font-medium text-[var(--app-muted)] sm:inline-flex">
                                    {roleLabel}
                                </span>
                                <Link href="/dashboard">
                                    <Button className="group h-10 rounded-lg bg-[var(--app-text)] px-4 text-[var(--app-surface)] hover:bg-[var(--app-accent)]">
                                        Dashboard
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="ghost"
                                        className="h-10 rounded-lg px-4 text-[var(--app-muted)] hover:bg-[var(--app-bg-soft)] hover:text-[var(--app-text)]"
                                    >
                                        Log in
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="group h-10 rounded-lg bg-[var(--app-text)] px-4 text-[var(--app-surface)] hover:bg-[var(--app-accent)]">
                                        Start free
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="grid min-h-0 flex-1 gap-6 px-5 pb-5 sm:px-8 sm:pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl leading-tight font-semibold tracking-normal text-[var(--app-text)] sm:text-4xl xl:text-5xl">
                            {user
                                ? `Welcome back, ${user.name}.`
                                : 'Build a Resume Management System, Not Just a Static PDF'}
                        </h1>

                        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--app-muted)]">
                            {user
                                ? 'This page is synced with your Laravel session, roles, and permissions, so the interface can show only the tools your account can use.'
                                : 'Manage your career content once, then ship it as an editable resume, public portfolio, and API-ready profile without duplicating the same details everywhere.'}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            {user ? (
                                <>
                                    <Link href="/dashboard">
                                        <Button className="group h-11 w-full rounded-lg bg-[var(--app-text)] px-5 text-base text-[var(--app-surface)] hover:bg-[var(--app-accent)] sm:w-auto">
                                            Open your dashboard
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                        </Button>
                                    </Link>
                                    {hasPermission('users.manage') && (
                                        <Link href="/dashboard">
                                            <Button
                                                variant="outline"
                                                className="h-11 w-full rounded-lg border-[var(--app-border)] bg-[var(--app-surface)] px-5 text-base text-[var(--app-text)] hover:bg-[var(--app-bg-soft)] sm:w-auto"
                                            >
                                                Manage platform
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link href="/register">
                                        <Button className="group h-11 w-full rounded-lg bg-[var(--app-text)] px-5 text-base text-[var(--app-surface)] hover:bg-[var(--app-accent)] sm:w-auto">
                                            Create workspace
                                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                                        </Button>
                                    </Link>
                                    <Link href="/login">
                                        <Button
                                            variant="outline"
                                            className="h-11 w-full rounded-lg border-[var(--app-border)] bg-[var(--app-surface)] px-5 text-base text-[var(--app-text)] hover:bg-[var(--app-bg-soft)] sm:w-auto"
                                        >
                                            Continue editing
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {user && (
                            <div className="pro-card mt-5 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]/80 p-3 shadow-sm">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-[var(--app-text)]">
                                        Backend permissions
                                    </p>
                                    <span className="rounded-full bg-[var(--app-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--app-accent)]">
                                        {auth.permissions.length} enabled
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {availableModules.map((module) => (
                                        <span
                                            key={module.label}
                                            className={[
                                                'rounded-full border px-2.5 py-1.5 text-xs font-medium',
                                                module.enabled
                                                    ? 'border-[var(--app-border)] bg-[var(--app-accent-soft)] text-[var(--app-accent)]'
                                                    : 'border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-muted)]',
                                            ].join(' ')}
                                        >
                                            {module.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            {workflow.map((item) => (
                                <article
                                    key={item.label}
                                    className="pro-card group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)]/75 p-3 shadow-sm transition-all duration-200 hover:bg-[var(--app-surface)]"
                                >
                                    <item.icon className="mb-3 size-5 text-[var(--app-accent)]" />
                                    <h2 className="text-sm font-semibold text-[var(--app-text)]">
                                        {item.label}
                                    </h2>
                                    <p className="mt-1 text-sm leading-5 text-[var(--app-muted)]">
                                        {item.value}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="pro-card min-h-0 rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3 shadow-[var(--app-shadow)] shadow-xl">
                        <div className="mb-3 grid grid-cols-3 rounded-xl bg-[var(--app-bg-soft)] p-1">
                            {(Object.keys(previewModes) as PreviewMode[]).map(
                                (mode) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setActivePreview(mode)}
                                        className={[
                                            'rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                                            activePreview === mode
                                                ? 'bg-[var(--app-surface)] text-[var(--app-text)] shadow-sm'
                                                : 'text-[var(--app-muted)] hover:text-[var(--app-text)]',
                                        ].join(' ')}
                                    >
                                        {previewModes[mode].label}
                                    </button>
                                ),
                            )}
                        </div>

                        <div className="grid min-h-0 gap-3 lg:grid-cols-[0.9fr_1.1fr]">
                            <aside className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-bg-soft)] p-3 text-[var(--app-text)]">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-semibold">
                                        Editor
                                    </span>
                                    <span className="rounded-full bg-[var(--app-accent-soft)] px-2 py-1 text-xs font-medium text-[var(--app-accent)]">
                                        Synced
                                    </span>
                                </div>

                                {[
                                    'Summary',
                                    'Experience',
                                    'Projects',
                                    'Skills',
                                    'Education',
                                ].map((section, index) => (
                                    <button
                                        key={section}
                                        type="button"
                                        className="pro-action mb-2.5 w-full rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-2)] p-2.5 text-left transition-colors duration-200 hover:border-[var(--app-accent)] hover:bg-[var(--app-surface)]"
                                    >
                                        <span className="mb-2 flex items-center gap-2">
                                            <span className="flex size-7 items-center justify-center rounded-md bg-[var(--app-bg)] text-xs font-semibold text-[var(--app-muted)]">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm font-medium">
                                                {section}
                                            </span>
                                        </span>
                                        <span className="block h-2 rounded-full bg-[var(--app-border)]" />
                                    </button>
                                ))}
                            </aside>

                            <section className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-2)] p-4 text-[var(--app-text)]">
                                <div className="mb-4 flex items-start justify-between gap-4 border-b border-[var(--app-border)] pb-4">
                                    <div>
                                        <p className="text-2xl leading-tight font-semibold">
                                            {user && activePreview === 'resume'
                                                ? user.name
                                                : preview.title}
                                        </p>
                                        <p className="mt-1 text-sm font-medium text-[var(--app-accent)]">
                                            {user &&
                                            activePreview === 'portfolio' &&
                                            user.portfolio_slug
                                                ? `/p/${user.portfolio_slug}`
                                                : preview.subtitle}
                                        </p>
                                    </div>
                                    <div className="pro-pulse size-11 rounded-xl bg-[var(--app-accent-soft)] ring-1 ring-[var(--app-border)]" />
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="mb-2 text-xs font-semibold text-[var(--app-muted)] uppercase">
                                            Impact
                                        </p>
                                        <div className="space-y-2">
                                            <div className="h-2.5 w-full rounded-full bg-[var(--app-text)] opacity-70" />
                                            <div className="h-2.5 w-5/6 rounded-full bg-[var(--app-muted)] opacity-45" />
                                            <div className="h-2.5 w-2/3 rounded-full bg-[var(--app-border)]" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {['PDF', 'Portfolio', 'API'].map(
                                            (item) => (
                                                <button
                                                    key={item}
                                                    type="button"
                                                    className="pro-action rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] p-3 text-center text-xs font-semibold text-[var(--app-text)] transition-colors duration-200 hover:border-[var(--app-accent)] hover:bg-[var(--app-accent-soft)] hover:text-[var(--app-accent)]"
                                                >
                                                    {item}
                                                </button>
                                            ),
                                        )}
                                    </div>

                                    <div className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-accent-soft)] p-3">
                                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--app-accent)]">
                                            <CheckCircle2 className="size-4" />
                                            {preview.note}
                                        </div>
                                        <p className="text-sm leading-6 text-[var(--app-muted)]">
                                            Strong verbs, measurable bullets,
                                            clean sections, and keyword
                                            coverage.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
