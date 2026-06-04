# Sketchbook Portfolio

Personal portfolio of **Elias Ortiz** -- a software developer specializing in full-stack web and mobile applications. Built as a pnpm monorepo with a sketchbook-inspired design system.

## Stack

| Layer | Technology |
|---|---|
| Monorepo | pnpm workspaces (v10) |
| Language | TypeScript 5.9 (strict mode) |
| Runtime | Node.js 24 |
| Frontend | React 19, Vite 7, wouter, TanStack React Query 5 |
| Styling | Tailwind CSS v4, framer-motion, tw-animate-css |
| UI | Radix primitives, shadcn/ui (New York), lucide-react |
| API | Express 5, esbuild, pino |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod v3 |
| Codegen | Orval v8 (OpenAPI 3.1 to typed hooks) |
| Analytics | Vercel Web Analytics |
| Theme | next-themes (light/dark/system) |

## Architecture

The repository is organized as a monorepo with three deployable artifacts and four shared libraries.

```
Sketchbook-Portfolio/
├── artifacts/
│   ├── portfolio/          # Main portfolio website (React + Vite)
│   │   ├── src/pages/      # Home, Catlink, 404
│   │   ├── src/components/ # Doodles, theme, 50+ shadcn/ui components
│   │   ├── src/hooks/      # Custom React hooks
│   │   └── src/lib/        # Utility modules
│   ├── api-server/         # Express 5 API with Zod validation
│   └── mockup-sandbox/     # Component preview environment
├── lib/
│   ├── db/                 # PostgreSQL schema + Drizzle ORM client
│   ├── api-spec/           # OpenAPI 3.1 specification
│   ├── api-zod/            # Generated Zod schemas (Orval)
│   └── api-client-react/   # Generated React Query hooks (Orval)
├── attached_assets/        # Raw design assets
└── scripts/                # Utility scripts
```

### Design System

The portfolio implements a dual-theme sketchbook aesthetic:

- **Whiteboard** (light): Warm paper background (#fafaf7), black marker typography, hand-drawn doodle accents
- **Blackboard** (dark): Deep charcoal background (#1a1a1a), chalk-white text, SVG noise texture overlay

Custom fonts (Caveat, Archivo Black, Patrick Hand) reinforce the hand-drawn identity. Framer Motion powers scroll-triggered reveals, SVG path animations, and spring transitions throughout.

### Code Generation Pipeline

1. OpenAPI 3.1 spec defined in `lib/api-spec/openapi.yaml`
2. Orval generates Zod validation schemas in `lib/api-zod`
3. Orval generates typed React Query hooks in `lib/api-client-react`
4. Type-safe from spec to UI with zero manual type duplication

## Key Features

- **Bilingual i18n**: Built-in translation system (EN/ES) with full content maps across all sections
- **Skills Architecture Map**: Interactive quadrants (Frontend, Mobile, Backend, Database) with animated SVG arrows and annotations
- **Project Showcase**: Three featured projects with tech tags, mockups, and live links
- **Experience Timeline**: Professional history with company details and role descriptions
- **Contact Form**: Direct messaging with social profile links (GitHub, LinkedIn, Twitter)
- **Dark/Light Mode**: Persistent theme toggle with system preference detection
- **Responsive**: Adaptive layout from mobile to desktop with distinct skill visualization

## Getting Started

```bash
# Install dependencies (pnpm required)
pnpm install

# Run type checking across all packages
pnpm run typecheck

# Start portfolio development server
pnpm --filter @workspace/portfolio run dev

# Start API server locally
pnpm --filter @workspace/api-server run dev

# Full build (typecheck + build all artifacts)
pnpm run build
```

## Commands

| Command | Description |
|---|---|
| `pnpm run typecheck` | Full typecheck across all packages |
| `pnpm run build` | Typecheck + build all artifacts |
| `pnpm --filter @workspace/api-spec run codegen` | Regenerate API client from OpenAPI spec |
| `pnpm --filter @workspace/db run push` | Push Drizzle schema changes (dev) |
| `pnpm --filter @workspace/portfolio run dev` | Portfolio dev server (Vite) |

## Security

This workspace enforces a 1-day minimum release age for npm packages as a defense against supply-chain attacks (configured via `minimumReleaseAge: 1440` in `pnpm-workspace.yaml`). Only Replit packages are excluded from this policy.

## Deployment

Optimized for Replit deployment with platform-specific native binary management. Ports:
- Portfolio: 8081 / 80
- API Server: 8080
- Mockup Sandbox: 3000

Also runs locally on macOS (darwin/x64) with appropriate platform binaries included via `supportedArchitectures`.

## License

MIT
