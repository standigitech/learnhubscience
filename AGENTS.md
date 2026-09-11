# AGENTS.md — LearnSci Project Architecture & Guidelines

This document serves as the guide for AI agents and developers working on the **LearnSci** codebase.

---

## 1. Architectural Blueprint

LearnSci is a full-stack Netlify web application structured as follows:

```
/opt/build/repo/
├── db/
│   ├── index.ts                     # Drizzle ORM client with @netlify/database adapter
│   └── schema.ts                    # PostgreSQL relational schema definitions
├── netlify/
│   ├── database/
│   │   └── migrations/              # Drizzle-Kit generated SQL migrations
│   └── functions/
│       └── api.ts                   # Central REST API Netlify Function (/api/*)
├── src/
│   ├── components/
│   │   ├── Header.tsx               # Header with global search, cart, notifications, persona switcher
│   │   ├── Sidebar.tsx              # Fixed desktop sidebar / collapsible mobile drawer
│   │   ├── HeroSection.tsx          # Blue-purple gradient hero with science motifs
│   │   ├── SubjectSection.tsx       # 4 STEM subject cards with topic tag clouds
│   │   ├── PopularLessons.tsx       # Featured courses with ratings, KSh prices, badges
│   │   ├── ContinueLearningPanel.tsx# 4:3 right widget with progress, streaks, recent history
│   │   ├── LessonView.tsx           # 9-part Quadratic Equations lesson + interactive solver
│   │   ├── QuizEngine.tsx           # Timed quiz engine with MC/TF/Numeric questions & explanations
│   │   ├── SearchView.tsx           # Multi-faceted search index across all content types
│   │   ├── ArticlesView.tsx         # STEM blog hub and individual article reader
│   │   ├── ResourcesView.tsx        # Revision papers and downloadable PDF notes
│   │   ├── TeacherDashboard.tsx     # Teacher course authoring and learner tracking
│   │   ├── AdminDashboard.tsx       # Administrator platform analytics and KPIs
│   │   ├── SubscriptionModal.tsx    # Monthly and Annual plan tiers
│   │   └── PaymentModal.tsx         # M-Pesa & Stripe Card checkout simulation
│   ├── data/
│   │   └── seedData.ts              # Rich seed dataset with realistic STEM curricula
│   ├── types/
│   │   └── index.ts                 # TypeScript type interfaces
│   ├── App.tsx                      # Main application shell and state orchestrator
│   ├── index.css                    # Tailwind CSS directives and custom font imports
│   └── main.tsx                     # Vite React entrypoint
├── drizzle.config.ts                # Drizzle Kit configuration pointing to netlify/database/migrations
├── netlify.toml                     # Netlify build configuration & SPA rewrites
└── package.json
```

---

## 2. Netlify Database & Drizzle ORM Mandates

- **Drizzle ORM Beta Line:** Netlify Database requires the `@beta` dist-tag for both `drizzle-orm` and `drizzle-kit`.
- **Database Client:** Imported from `drizzle-orm/netlify-db` in `db/index.ts`.
- **Schema Management:** All tables must be specified in `db/schema.ts` using snake_case for PostgreSQL column names.
- **Migration Generation:** Always run `npx drizzle-kit generate --name <descriptive_slug>` after modifying `db/schema.ts`. Migrations are output to `netlify/database/migrations/`.
- **Automatic Migration Application:** Netlify applies migrations at deploy time automatically. Do NOT run `drizzle-kit migrate` or `drizzle-kit push` manually.

---

## 3. Coding Conventions & Key Decisions

1. **Client-Side Persona Switcher:** The top header includes an interactive role selector (Learner, Teacher, Admin). This enables immediate testing of role-based dashboards without separate logout-login cycles.
2. **Offline Fallback Resilience:** `netlify/functions/api.ts` implements in-memory session persistence alongside the Netlify Database adapter so preview builds and isolated environments continue to function seamlessly before database provisioning completes.
3. **Responsive 4:3 Reference Layout:** The desktop home layout follows an 8:4 grid composition on widescreen viewports (main stage on left, continue learning widget on right) and collapses into a clean single-column view on tablet and mobile viewports.
