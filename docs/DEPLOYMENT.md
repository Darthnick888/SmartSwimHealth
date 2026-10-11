# Vercel + Supabase deployment

## Setup

1. Create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
2. Enable Email provider authentication. Set the Site URL and redirect URL to
   `https://<your-vercel-domain>/auth/callback`.
3. Copy `.env.example` to `.env.local` for local work. Fill in the Supabase
   project URL and publishable key. Never add a secret/service-role key to
   browser code or commit environment files.
4. In Vercel, import the repository and set the same two variables for
   Production, Preview, and Development. Redeploy after changing variables.
5. Use `npm.cmd run build` locally before deploying. Vercel should use the
   detected Next.js build command.

## Data and security

Pain and recovery rows have a `user_id` foreign key to `auth.users`. RLS is
enabled on both tables. Every policy compares `user_id` with `auth.uid()`.
The client never writes a user id supplied by the user; it uses the verified
Supabase auth user id. Do not disable RLS and do not use a service-role key in
the browser.

## AI instructions

```text
This is a Next.js 16 App Router application deployed on Vercel with Supabase.
Use @supabase/ssr and @supabase/supabase-js. The root proxy.ts refreshes
cookie sessions; preserve its getAll/setAll cookie handling and getClaims call.
Never use @supabase/auth-helpers-nextjs, individual cookie get/set/remove
methods, localStorage for account data, or a Supabase service-role key in
client code.

All user-owned data must have a user_id foreign key to auth.users, RLS enabled,
and policies using auth.uid(). Use the existing browser client for client
components and the server client for Server Components, Server Actions, and
Route Handlers. Read NEXT_PUBLIC_SUPABASE_URL and
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY from environment variables only.

Before changing code, read CLAUDE.md and the docs/ files. Keep pain and
recovery schemas in supabase/schema.sql and update docs/DATA_FORMATS.md when
they change. Add a test for every new data contract, run npm.cmd test and
npm.cmd run build, and report any behavior that could not be verified without
live Supabase credentials.
```

Live authentication and queries require a configured Supabase project and
environment variables; they cannot be verified from this repository alone.
