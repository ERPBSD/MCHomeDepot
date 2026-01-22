# AGENTS.md

Project context
- Repo: fork of bigcommerce/catalyst.
- Frontend: Next.js App Router + TypeScript + Tailwind.
- Design system: VIBES primitives/sections.
- CMS/page builder: Makeswift (official Catalyst Makeswift integration branch).
- Goal: marketing-editable Makeswift components/sections while core commerce flows (PDP/PLP/cart/checkout/account) stay in code.

Stack and conventions
- Components use Catalyst patterns and VIBES primitives when possible.
- Keep styling in Tailwind; avoid new styling frameworks.
- Use the project Link wrapper: `~/components/link`.
- Do not access `window`/`document` during render (SSR-safe). Use `useEffect`.
- Follow existing file structure and naming.

Makeswift integration (expected)
- Components must be registered with the Makeswift runtime.
- Registration files live under `core/lib/makeswift/components/**/register.ts` and are imported by `core/lib/makeswift/components.ts`.
- Components intended for Makeswift should be client components (`'use client'`) where required.
- Use explicit input schemas with sensible defaults, guardrails, and clear labels.
- Keep props marketer-friendly; prefer `text`, `color`, `link`, `boolean`, `select`, and repeaters for lists.
- Ensure components render with missing/empty fields (fallbacks).

Header-related context
- Global header is composed in `core/components/header/index.tsx`.
- Makeswift header pieces:
  - Top bar: `core/lib/makeswift/components/header-top-bar`
  - Site header: `core/lib/makeswift/components/site-header`
  - Secondary nav: `core/lib/makeswift/components/header-secondary-nav`
- Navigation primitive: `core/vibes/soul/primitives/navigation/index.tsx`
  - Contains inline search form + mobile/tablet behaviors.
  - Inline search form now uses `w-full` so container width changes apply.
  - Mobile layout: hamburger left, logo centered, search icon + cart right (logo centered via absolute positioning on mobile).
  - Tablet (md–lg): hamburger appears next to the inline search bar.
  - Search button hover color is driven by `searchButtonHoverColor` on navigation.

Data shape notes
- `HeaderSecondaryNav` accepts both legacy link shape `{ label, href, groups }` and Makeswift shape `{ label, link }` and normalizes at render time.

Notes for future work
- If adding a new Makeswift component, add:
  - `client.tsx` (component)
  - `register.ts` (runtime registration + inputs)
  - `index.tsx` (server wrapper if needed)
  - Import `register.ts` in `core/lib/makeswift/components.ts`
- Keep changes SSR-safe and avoid layout flashes by matching background colors on wrappers.

Build/lint notes
- `core/package.json` scripts: `lint`, `typecheck`, `generate`, `build`, `dev`.
- Build runs `npm run generate` first; requires store hash in `.env.local` or env vars.
- Prettier CRLF warnings can be fixed via: `pnpm --filter @bigcommerce/catalyst-makeswift exec prettier --write .`
