# SwimStrong development guide

## Verified project facts

- Next.js App Router with TypeScript and Tailwind CSS.
- Routes: `/`, `/pain-tracker`, `/recovery-journal`, and `/injury-education`.
- Pain and recovery data are stored in Supabase per authenticated account.
- Shared pain-tracker data and lookup logic lives in `lib/pain-tracker-data.ts`.
- Supabase account integration lives under `lib/supabase/`, root `proxy.ts`,
  and `supabase/schema.sql`.

## Verified commands

PowerShell blocks the `npm.ps1` shim in this environment, so use the Windows
command shim:

```text
npm.cmd test
npm.cmd run build
npm.cmd run dev
```

## Change protocol

Read `docs/ARCHITECTURE.md`, `docs/DATA_FORMATS.md`, and `docs/ROADMAP.md`
before changing behavior. Update affected documentation in the same change.
Keep pain-location facts in `lib/pain-tracker-data.ts`; do not duplicate them
in a page component. Keep Supabase ownership in RLS and never put service-role
credentials in client code. See `docs/DEPLOYMENT.md` for deployment setup.
