# SwimStrong AI

A clean, modern Next.js app for high school swimmers to track recovery, log pain, and learn injury prevention.

## Run locally

1. Open a terminal in `C:\Users\np050\Desktop\MyAIProject`
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

5. Run the contract tests:

```bash
npm test
```

## Pages

- `/` — Home
- `/pain-tracker` — Pain Tracker
- `/recovery-journal` — Recovery Journal
- `/injury-education` — Injury Education
- `/auth` — Account sign in and registration

## Notes

- Pain and recovery data are stored per account in Supabase with row-level security.
- Configure Supabase and Vercel using [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).
- The app uses Next.js, React, and Tailwind CSS.
