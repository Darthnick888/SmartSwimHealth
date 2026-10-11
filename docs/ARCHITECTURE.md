# Smart Swim Health architecture

## Runtime

The project is a Next.js App Router site. `app/layout.tsx` owns the shared
metadata, navigation, and footer. Each directory under `app/` is a route.
The home and injury-education routes are server-rendered static content.
The pain-tracker and recovery-journal routes are client components because
they use React state, Supabase browser queries, and browser interaction APIs.

## Pain tracker

`lib/pain-tracker-data.ts` is the single source of truth for pain locations,
stretch recommendations, and injury-cause guides. The pain-tracker page owns
form state, Supabase persistence, entry sorting, and presentation. It derives
both recommendations and causes from the selected location through the shared
lookup functions. `lib/supabase/client.ts` is for browser components;
`lib/supabase/server.ts` and root `proxy.ts` handle cookie-backed SSR sessions.

## Contracts and invariants

- Pain and journal entries belong to the signed-in Supabase user.
- Supabase RLS enforces row ownership at the database boundary.
- A selected location must come from `locationsList`.
- Pain entries require a location. Journal entries require a date, sleep value,
  and hydration value.
- Unknown pain areas produce no stretch list and no cause guide.
- The app requires the two `NEXT_PUBLIC_SUPABASE_*` environment variables in
  deployed environments.

## Styling and build

Tailwind scans `app/` and `components/`. Global CSS establishes the dark,
blue-toned page background. `npm.cmd run build` is the verified production
build command on Windows in this workspace.
