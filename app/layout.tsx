import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smart Swim Health",
  description: "Track recovery, pain, and injury prevention for student athletes.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pain-tracker", label: "Pain Tracker" },
  { href: "/recovery-journal", label: "Recovery Journal" },
  { href: "/injury-education", label: "Injury Education" },
  { href: "/auth", label: "Account" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),transparent_45%),linear-gradient(180deg,#0f172a_0%,#020617_100%)]">
          <header className="mx-auto max-w-7xl px-6 py-6 sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Smart Swim Health</p>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Recovery & Injury Support</h1>
              </div>
              <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-slate-700 px-4 py-2 transition hover:bg-slate-800/70 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-slate-800/70 py-6 text-center text-sm text-slate-500">
            Built for high school athletes to track recovery and stay injury-aware.
            <div className="mt-2">Powered by GitHub Copilot.</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
