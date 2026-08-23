import { router, usePage } from '@inertiajs/react';
import { Check, Moon, Palette } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import type { Auth } from '@/types';

export type AppThemeName = 'dark' | 'light' | 'forest' | 'ocean' | 'rose';

export type AppTheme = {
    name: AppThemeName;
    label: string;
    swatch: string;
    vars: CSSProperties;
};

export const appThemes: AppTheme[] = [
    {
        name: 'dark',
        label: 'Dark',
        swatch: '#202123',
        vars: {
            '--app-bg': '#202123',
            '--app-bg-soft': '#2b2c2f',
            '--app-surface': '#343541',
            '--app-surface-2': '#2b2c2f',
            '--app-text': '#f7f7f4',
            '--app-muted': '#c8c8c0',
            '--app-border': 'rgba(255,255,255,0.12)',
            '--app-accent': '#10a37f',
            '--app-accent-soft': 'rgba(16,163,127,0.16)',
            '--app-danger': '#f97066',
            '--app-shadow': 'rgba(0,0,0,0.22)',
        } as CSSProperties,
    },
    {
        name: 'light',
        label: 'Light',
        swatch: '#f7f7f4',
        vars: {
            '--app-bg': '#f7f7f4',
            '--app-bg-soft': '#ecece7',
            '--app-surface': '#ffffff',
            '--app-surface-2': '#fafaf8',
            '--app-text': '#202123',
            '--app-muted': '#6b6c68',
            '--app-border': '#deded8',
            '--app-accent': '#10a37f',
            '--app-accent-soft': '#e7f8f2',
            '--app-danger': '#b42318',
            '--app-shadow': 'rgba(0,0,0,0.06)',
        } as CSSProperties,
    },
    {
        name: 'forest',
        label: 'Forest',
        swatch: '#1f2a24',
        vars: {
            '--app-bg': '#eff3ed',
            '--app-bg-soft': '#dfe7dc',
            '--app-surface': '#ffffff',
            '--app-surface-2': '#f6f8f4',
            '--app-text': '#1f2a24',
            '--app-muted': '#657266',
            '--app-border': '#d3ddd0',
            '--app-accent': '#2f7d55',
            '--app-accent-soft': '#e3f2e9',
            '--app-danger': '#b42318',
            '--app-shadow': 'rgba(31,42,36,0.08)',
        } as CSSProperties,
    },
    {
        name: 'ocean',
        label: 'Ocean',
        swatch: '#1f3a44',
        vars: {
            '--app-bg': '#eef4f5',
            '--app-bg-soft': '#dce9ec',
            '--app-surface': '#ffffff',
            '--app-surface-2': '#f7fbfb',
            '--app-text': '#1f3a44',
            '--app-muted': '#60757b',
            '--app-border': '#d2e0e3',
            '--app-accent': '#267c8c',
            '--app-accent-soft': '#e3f3f5',
            '--app-danger': '#b42318',
            '--app-shadow': 'rgba(31,58,68,0.08)',
        } as CSSProperties,
    },
    {
        name: 'rose',
        label: 'Rose',
        swatch: '#4a252d',
        vars: {
            '--app-bg': '#f8f2f1',
            '--app-bg-soft': '#efe2df',
            '--app-surface': '#ffffff',
            '--app-surface-2': '#fcf8f7',
            '--app-text': '#332528',
            '--app-muted': '#7b696d',
            '--app-border': '#e4d6d3',
            '--app-accent': '#9b4b5a',
            '--app-accent-soft': '#f4e4e7',
            '--app-danger': '#b42318',
            '--app-shadow': 'rgba(74,37,45,0.08)',
        } as CSSProperties,
    },
];

const themeStorageKey = 'portcv-theme';

export function useAppTheme() {
    const { auth } = usePage<{ auth?: Auth }>().props;
    const safeAuth = auth ?? { user: null, roles: [], permissions: [] };
    const savedTheme = safeAuth.user?.preferred_theme;
    const initialTheme = savedTheme && isAppThemeName(savedTheme) ? savedTheme : getStoredTheme();
    const [themeName, setThemeName] = useState<AppThemeName>(initialTheme);

    const theme = useMemo(() => appThemes.find((item) => item.name === themeName) ?? appThemes[0], [themeName]);

    useEffect(() => {
        document.documentElement.dataset.appTheme = theme.name;

        try {
            window.localStorage.setItem(themeStorageKey, theme.name);
        } catch {
            // Theme storage is optional; the UI should still render if the browser blocks it.
        }
    }, [theme.name]);

    useEffect(() => {
        const syncTheme = (event: Event) => {
            const nextTheme = (event as CustomEvent<AppThemeName>).detail;

            if (isAppThemeName(nextTheme)) {
                setThemeName(nextTheme);
            }
        };

        window.addEventListener('portcv-theme-change', syncTheme);

        return () => window.removeEventListener('portcv-theme-change', syncTheme);
    }, []);

    const setTheme = (nextTheme: AppThemeName) => {
        setThemeName(nextTheme);
        window.dispatchEvent(new CustomEvent<AppThemeName>('portcv-theme-change', { detail: nextTheme }));

        if (safeAuth.user) {
            router.patch(
                '/settings/theme',
                { theme: nextTheme },
                {
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        }
    };

    return { theme, themeName, setTheme };
}

export function ThemeDropdown() {
    const { themeName, setTheme } = useAppTheme();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] px-3 text-sm font-medium text-[var(--app-text)] shadow-sm transition-colors hover:bg-[var(--app-bg-soft)]"
                aria-expanded={open}
            >
                <Moon className="size-4 text-[var(--app-accent)]" />
                <span className="hidden sm:inline">Theme</span>
                <Palette className="size-4 text-[var(--app-muted)]" />
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface)] p-1.5 shadow-xl shadow-black/10">
                    {appThemes.map((theme) => (
                        <button
                            key={theme.name}
                            type="button"
                            onClick={() => {
                                setTheme(theme.name);
                                setOpen(false);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-[var(--app-text)] transition-colors hover:bg-[var(--app-bg-soft)]"
                        >
                            <span
                                className="size-3 rounded-full border border-black/10"
                                style={{ backgroundColor: theme.swatch }}
                            />
                            <span className="flex-1">{theme.label}</span>
                            {themeName === theme.name && <Check className="size-4 text-[var(--app-accent)]" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function getStoredTheme(): AppThemeName {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    try {
        const storedTheme = window.localStorage.getItem(themeStorageKey);

        return isAppThemeName(storedTheme) ? storedTheme : 'dark';
    } catch {
        return 'dark';
    }
}

function isAppThemeName(value: unknown): value is AppThemeName {
    return typeof value === 'string' && appThemes.some((theme) => theme.name === value);
}
