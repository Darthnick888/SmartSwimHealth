"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else router.push("/pain-tracker");
    setBusy(false);
  }

  async function signUp() {
    setBusy(true);
    setMessage("");
    const { error } = await createClient().auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    setMessage(error ? error.message : "Check your email to confirm your account.");
    setBusy(false);
  }

  return (
    <section className="mx-auto max-w-xl px-6 pb-16 sm:px-10">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
        <h2 className="text-3xl font-semibold text-white">Your Smart Swim Health account</h2>
        <p className="mt-2 text-slate-400">Sign in to save pain and recovery entries across your devices.</p>
        <form onSubmit={signIn} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-200">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100" /></label>
          <label className="block text-sm font-medium text-slate-200">Password<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100" /></label>
          <div className="flex flex-wrap gap-3">
            <button disabled={busy} className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 disabled:opacity-50">Sign in</button>
            <button type="button" disabled={busy} onClick={signUp} className="rounded-full border border-slate-600 px-6 py-3 text-slate-200 disabled:opacity-50">Create account</button>
          </div>
        </form>
        {message && <p className="mt-5 rounded-2xl bg-slate-950/80 p-4 text-slate-300">{message}</p>}
        <Link href="/" className="mt-6 inline-block text-sm text-sky-300 hover:text-white">Return home</Link>
      </div>
    </section>
  );
}
