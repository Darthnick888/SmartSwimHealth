# Stored data

Supabase stores rows in two tables. Browser local storage is not the source of
truth for account data.

## `public.pain_entries`

Each row has `id`, `user_id`, `date`, `location`, `severity`, `notes`, and
`created_at`. `user_id` references `auth.users`. `severity` is one of `Low`,
`Moderate`, or `High`.

## `public.recovery_entries`

Each row has `id`, `user_id`, `date`, `sleep`, `hydration`, `mood`, `notes`, and
`created_at`. `user_id` references `auth.users`. `mood` is one of `Excellent`,
`Good`, `Okay`, or `Tired`.

The schema and RLS policies are defined in `supabase/schema.sql`. Existing
local-storage data is not migrated automatically; users must create new
account-backed entries.
