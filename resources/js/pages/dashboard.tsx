import { Head, Link, usePage } from '@inertiajs/react';
import {
    BarChart3,
    FileText,
    Globe2,
    ImageUp,
    LayoutTemplate,
    Settings,
    ShieldCheck,
    UsersRound,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeDropdown, useAppTheme } from '@/lib/themes';
import type { Auth } from '@/types';

const modules = [
    {
        permission: 'resumes.create',
        title: 'Resume Builder',
        body: 'Create and edit structured resumes.',
        icon: FileText,
    },
    {
        permission: 'portfolios.publish',
        title: 'Portfolio Publishing',
        body: 'Publish your profile at a public slug.',
        icon: Globe2,
    },
    {
        permission: 'resumes.export-pdf',
        title: 'PDF Export',
        body: 'Generate print-ready documents.',
        icon: LayoutTemplate,
    },
    {
        permission: 'media.upload',
        title: 'Media Library',
        body: 'Upload avatars and project assets.',
        icon: ImageUp,
    },
    {
        permission: 'users.manage',
        title: 'User Management',
        body: 'Manage accounts, roles, and access.',
        icon: UsersRound,
    },
    {
        permission: 'templates.manage',
        title: 'Template Management',
        body: 'Curate resume and portfolio templates.',
        icon: Settings,
    },
    {
        permission: 'system.analytics',
        title: 'System Analytics',
        body: 'Review platform usage and activity.',
        icon: BarChart3,
    },
];

export default function Dashboard() {
    const { theme } = useAppTheme();
    const { auth } = usePage<{ auth: Auth }>().props;
    const user = auth.user;
    const primaryRole = auth.roles[0] ?? 'user';
    const roleLabel = primaryRole
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    const enabledModules = modules.filter((module) =>
        auth.permissions.includes(module.permission),
    );

    return (
        <main
            className="flex h-screen flex-col overflow-hidden bg-[var(--app-bg)] text-[var(--app-text)]"
            style={theme.vars}
        >
            <Head title="Dashboard" />

            <header className="shrink-0 border-b border-[var(--app-border)] bg-[var(--app-surface)]/80 backdrop-blur">
                <div className="flex h-18 items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link href="/" className="group flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text)] shadow-sm transition-colors duration-200 group-hover:border-[var(--app-accent)] group-hover:text-[var(--app-accent)]">
                            <FileText className="size-5" />
                        </span>
                        <span className="text-lg font-semibold transition-colors duration-200 group-hover:text-[var(--app-accent)]">
                            PortCV
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeDropdown />
                        <span className="rounded-full border border-[var(--app-border)] bg-[var(--app-accent-soft)] px-3 py-2 text-sm font-semibold text-[var(--app-accent)]">
                            {roleLabel}
                        </span>
                    </div>
                </div>
            </header>

            <section className="min-h-0 flex-1 px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
                <div className="grid h-full min-h-0 gap-5 lg:grid-cols-[0.72fr_1.28fr]">
                    <aside className="pro-card rounded-2xl border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)] shadow-xl">
                        <div className="mb-5 flex items-center gap-4">
                            <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--app-text)] text-xl font-semibold text-[var(--app-surface)]">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    {user?.name}
                                </h1>
                                <p className="text-sm font-medium text-[var(--app-muted)]">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)] p-4">
                            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--app-accent)]">
                                <ShieldCheck className="size-4" />
                                Backend synced
                            </div>
                            <p className="text-sm leading-6 text-[var(--app-muted)]">
                                This dashboard is rendering modules from Laravel
                                roles and Spatie permissions shared by Inertia.
                            </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3">
                                <p className="text-2xl font-semibold">
                                    {auth.roles.length}
                                </p>
                                <p className="text-xs font-medium text-[var(--app-muted)]">
                                    Roles
                                </p>
                            </div>
                            <div className="pro-card rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-3">
                                <p className="text-2xl font-semibold">
                                    {auth.permissions.length}
                                </p>
                                <p className="text-xs font-medium text-[var(--app-muted)]">
                                    Permissions
                                </p>
                            </div>
                        </div>
                    </aside>

                    <section className="min-h-0">
                        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                            <div>
                                <p className="text-sm font-semibold text-[var(--app-muted)] uppercase">
                                    Available modules
                                </p>
                                <h2 className="mt-1 text-2xl font-semibold sm:text-3xl">
                                    Your allowed workspace
                                </h2>
                            </div>
                            <Button className="h-10 rounded-lg bg-[var(--app-text)] text-[var(--app-surface)] hover:bg-[var(--app-accent)]">
                                Create resume
                            </Button>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {enabledModules.map((module) => (
                                <article
                                    key={module.permission}
                                    className="pro-card group rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-4 shadow-sm transition-all duration-200 hover:shadow-[var(--app-shadow)] hover:shadow-lg"
                                >
                                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl border border-[var(--app-border)] bg-[var(--app-accent-soft)] text-[var(--app-accent)]">
                                        <module.icon className="size-5" />
                                    </div>
                                    <h3 className="text-base font-semibold text-[var(--app-text)] group-hover:text-[var(--app-accent)]">
                                        {module.title}
                                    </h3>
                                    <p className="mt-1 text-sm leading-5 text-[var(--app-muted)]">
                                        {module.body}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
