# 📄 Resume Builder & Portfolio CMS

**Build. Customize. Publish. Ship your career, headlessly.**

[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat-square&logo=laravel)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4?style=flat-square&logo=php)](https://php.net)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=flat-square)](https://inertiajs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

## Overview

**Resume Builder & Portfolio CMS** is a full-stack platform that lets developers assemble rich, drag-and-drop resumes and portfolio sites through an interactive editing dashboard, then instantly publish them as SEO-friendly public pages or high-fidelity PDF exports. Under the hood it is a true **dual-interface system**: the same underlying content model powers a polished, session-driven Inertia.js dashboard for humans *and* a stateless, token-authenticated JSON API for machines — mobile apps, integrations, and third-party consumers.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose in This Project |
|---|---|---|
| **Backend** | Laravel 13 (PHP 8.3+) | Core application framework — routing, queues, validation, service layer, Eloquent ORM, and job orchestration for PDF generation. |
| **Frontend** | React 18 + Inertia.js | Renders the SPA-like editing dashboard and public portfolio pages without building a separate API-consuming client — Inertia bridges Laravel controllers directly to React page components. |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first styling with accessible, composable UI primitives (dialogs, dropdowns, forms) for the editor and template gallery. |
| **Database** | PostgreSQL (`cvbuilderdb`) | Primary relational store for users, resumes, sections, templates, media references, and permission tables. Chosen for JSONB support (flexible resume section schemas) and robust full-text search. |
| **Auth & Sessions** | Laravel Sanctum | Issues SPA session cookies for the Inertia dashboard *and* revocable personal access tokens for headless API consumers — one auth system, two delivery modes. |
| **RBAC** | Spatie Laravel-Permission | Role and permission gating (`admin`, `editor`, `viewer`) controlling who can publish, delete, or manage team-owned portfolios. |
| **Media Handling** | spatie/laravel-medialibrary | Manages profile photos, company logos, and generated resume PDFs, including automatic image conversions/thumbnails. |
| **Slugs** | spatie/laravel-sluggable | Auto-generates clean, collision-free public URLs (e.g. `/p/john-doe`) from a user's display name. |
| **PDF Export** | spatie/browsershot | Drives headless Puppeteer/Chromium to render the live HTML resume template into a pixel-perfect, print-ready PDF. |
| **Icons & Motion** | lucide-react, framer-motion | Consistent iconography and fluid transitions when reordering sections or switching templates. |
| **Drag & Drop** | @dnd-kit/core | Powers reordering of work history entries, skills, and education blocks in the editor. |

---

## 🏗️ Architecture: The Dual-Route Blueprint

The application deliberately exposes **two distinct route surfaces** off a single Laravel codebase and a single source of truth in PostgreSQL.

### 1. Inertia Web Routes (`routes/web.php`)
Serves the **stateful, session-authenticated experience**:
- Split-screen live editor (`/dashboard/resumes/{resume}/edit`) — form panel on the left, real-time React preview on the right.
- Public portfolio pages (`/p/{slug}`) — server-rendered on first load via Inertia, then hydrated into a fully interactive React page.
- Authentication flows (login, registration, password reset) using Sanctum's stateful SPA session.

### 2. Headless REST API Routes (`routes/api.php`)
Serves **stateless, token-authenticated JSON**:
- `GET /api/user`, `GET /api/resumes`, `GET /api/portfolios/{slug}` — consumable by mobile apps, CLI tools, or third-party integrations.
- Every response is a plain JSON resource (via Laravel API Resources), version-namespaced under `/api/v1/`.
- Protected by Sanctum Bearer tokens, scoped and revocable per-application.

### Request Flow

```
┌──────────────┐         ┌───────────────────────────────┐         ┌──────────────┐
│   Browser    │         │           Laravel 13           │         │  PostgreSQL  │
│ (React/Inertia)│        │                                 │         │ cvbuilderdb  │
└──────┬───────┘         └───────────────┬─────────────────┘         └──────┬───────┘
       │                                 │                                  │
       │ 1. GET /dashboard/resumes/1/edit│                                  │
       ├────────────────────────────────►│                                  │
       │                                 │ 2. Sanctum session validated     │
       │                                 │ 3. ResumeController@edit         │
       │                                 ├─────────────────────────────────►│
       │                                 │ 4. Eloquent query (sections,     │
       │                                 │    media, permissions)           │
       │                                 │◄─────────────────────────────────┤
       │ 5. Inertia::render() returns    │                                  │
       │    JSON page-props payload      │                                  │
       │◄────────────────────────────────┤                                  │
       │ 6. React hydrates Editor.jsx    │                                  │
       │    with props (no full reload)  │                                  │
       │                                 │                                  │
       │ 7. User drags a skill (dnd-kit) │                                  │
       │    → PATCH /dashboard/resumes/1 │                                  │
       ├────────────────────────────────►│                                  │
       │                                 │ 8. Update + persist order        │
       │                                 ├─────────────────────────────────►│
       │                                 │◄─────────────────────────────────┤
       │ 9. Partial Inertia reload       │                                  │
       │◄────────────────────────────────┤                                  │
       │                                 │                                  │
┌──────┴───────┐                        │                                  │
│ External /    │  10. GET /api/v1/portfolios/john-doe                     │
│ Mobile Client │  (Authorization: Bearer <sanctum-token>)                 │
└──────┬───────┘                        │                                  │
       ├───────────────────────────────►│ 11. Sanctum token guard          │
       │                                 │ 12. PortfolioResource::json()    │
       │                                 ├─────────────────────────────────►│
       │                                 │◄─────────────────────────────────┤
       │ 13. { "data": { ...resume } }  │                                  │
       │◄────────────────────────────────┤                                  │
```

**Key principle:** Inertia routes never expose raw JSON to the public internet as an "API" — they return page-prop payloads Inertia consumes internally. The `/api/*` surface is the only contract-stable, versioned, machine-consumable interface.

---

## ⚙️ Local Setup Guide

### Prerequisites

| Requirement | Minimum Version | Notes |
|---|---|---|
| PHP | 8.3+ | With `pdo_pgsql`, `mbstring`, `intl`, `gd` extensions enabled |
| Composer | 2.7+ | PHP dependency manager |
| Node.js | 20.x (LTS) | Required for Vite + Puppeteer (Browsershot) |
| PostgreSQL | 15+ | Running locally on port `5432` |
| Chrome/Chromium | Latest | Required by spatie/browsershot for PDF rendering (installed via `npm install puppeteer`) |

### Step-by-Step Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-org/resume-builder-cms.git
cd resume-builder-cms
```

**2. Install PHP dependencies**
```bash
composer install
```

**3. Install JavaScript dependencies**
```bash
npm install
```

**4. Create your environment file**
```bash
cp .env.example .env
```

**5. Configure the database connection**

Edit `.env` and set the following:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=cvbuilderdb
DB_USERNAME=postgres
DB_PASSWORD=your_local_password

# Sanctum stateful domains for the Inertia SPA session
SANCTUM_STATEFUL_DOMAINS=localhost:8000,127.0.0.1:8000

# Browsershot / Puppeteer binary path (adjust if needed)
BROWSERSHOT_NODE_BINARY=/usr/local/bin/node
BROWSERSHOT_NPM_BINARY=/usr/local/bin/npm
```

**6. Create the PostgreSQL database**
```bash
createdb cvbuilderdb
```

**7. Generate the application key**
```bash
php artisan key:generate
```

**8. Run database migrations and seeders**
```bash
php artisan migrate --seed
```

**9. Create the storage symlink (for media library assets)**
```bash
php artisan storage:link
```

---

## 🚀 Running the Application

This project uses a single unified command — powered by `concurrently` under the hood — to boot **all** required local services at once:

```bash
composer run dev
```

This single command concurrently starts:
- 🖥️ **Laravel HTTP server** — `php artisan serve`
- 📬 **Queue listener** — `php artisan queue:listen` (processes async PDF export & media jobs)
- ⚡ **Vite dev server** — hot-module-reloading React/Inertia assets

### Default Local URLs

| Service | URL |
|---|---|
| Web Application (Inertia Dashboard) | `http://127.0.0.1:8000` |
| Public Portfolio Example | `http://127.0.0.1:8000/p/john-doe` |
| Headless REST API Base | `http://127.0.0.1:8000/api/v1` |
| Vite Dev Server (HMR) | `http://127.0.0.1:5173` |

---

## 🔌 API Testing Example

Once you've generated a personal access token (via the dashboard's **API Tokens** settings page, or `php artisan tinker`), query the authenticated user endpoint:

```bash
curl -X GET "http://127.0.0.1:8000/api/user" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer 1|s3cReTTokenGeneratedBySanctum"
```

**Expected response:**
```json
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["editor"],
    "portfolio_slug": "john-doe"
  }
}
```

---

## 📁 Directory Structure

```
resume-builder-cms/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Web/                # Inertia-rendering controllers (dashboard, editor)
│   │   │   └── Api/V1/             # Stateless JSON API controllers
│   │   ├── Middleware/
│   │   │   └── HandleInertiaRequests.php
│   │   └── Resources/              # API Resource transformers (JSON shaping)
│   ├── Models/
│   │   ├── User.php
│   │   ├── Resume.php
│   │   ├── ResumeSection.php
│   │   ├── Portfolio.php           # Uses HasSlug (spatie/laravel-sluggable)
│   │   └── Template.php
│   ├── Policies/                   # Authorization policies (paired w/ Spatie roles)
│   ├── Jobs/
│   │   └── GenerateResumePdf.php   # Dispatches Browsershot rendering
│   └── Services/
│       ├── PdfExportService.php    # Wraps spatie/browsershot logic
│       └── MediaService.php        # Wraps spatie/laravel-medialibrary logic
│
├── database/
│   ├── migrations/
│   │   ├── xxxx_create_resumes_table.php
│   │   ├── xxxx_create_resume_sections_table.php
│   │   ├── xxxx_create_portfolios_table.php
│   │   └── xxxx_create_permission_tables.php   # Spatie Laravel-Permission
│   ├── factories/
│   └── seeders/
│       └── DatabaseSeeder.php
│
├── resources/
│   └── js/
│       ├── Pages/                  # Inertia page components (auto-resolved by route)
│       │   ├── Dashboard/
│       │   │   └── Editor.jsx      # Split-screen resume editor
│       │   └── Portfolio/
│       │       └── Show.jsx        # Public portfolio template renderer
│       ├── Components/
│       │   ├── ui/                 # shadcn/ui primitives
│       │   ├── editor/
│       │   │   ├── SectionList.jsx     # dnd-kit drag-and-drop container
│       │   │   └── SkillDragItem.jsx
│       │   └── templates/          # Selectable resume/portfolio templates
│       ├── Layouts/
│       │   └── DashboardLayout.jsx
│       └── app.jsx                 # Inertia app entrypoint
│
├── routes/
│   ├── web.php                     # Inertia (session-based) routes
│   ├── api.php                     # Headless REST API (Sanctum token) routes
│   └── console.php
│
├── config/
├── public/
├── storage/
├── .env.example
├── composer.json
├── package.json
└── vite.config.js
```

---

## 🗺️ Future Roadmap

- [ ] **Custom Domain Binding** — Allow users to point a personal domain (e.g. `johndoe.dev`) directly at their published portfolio via CNAME verification.
- [ ] **Template Marketplace** — A community-driven gallery where designers can submit, sell, and install new resume/portfolio templates.
- [ ] **AI Summary Generator** — Integrate an LLM-powered assistant to draft professional summaries and bullet-point achievements from raw user input.
- [ ] **Real-Time Collaboration** — Multi-user co-editing of a single resume via WebSockets (Laravel Reverb), with live cursors and change attribution.

## 🤝 Contribution Guidelines

We welcome contributions of all sizes. To submit a change:

1. **Fork** the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Follow code style** — run `./vendor/bin/pint` for PHP and `npm run lint` for JS/React before committing.
3. **Write tests** for any new behavior (`php artisan test` must pass in full).
4. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/) syntax (e.g. `feat: add PDF watermark option`).
5. **Open a Pull Request** against `main` with a clear description of the change, screenshots for UI changes, and linked issue references.
6. A maintainer will review, request changes if needed, and merge once CI passes.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
