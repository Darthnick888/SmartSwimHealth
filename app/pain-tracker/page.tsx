"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getCauseGuideForLocation,
  getStretchesForLocation,
  locationsList
} from "../../lib/pain-tracker-data";
import { createClient, isSupabaseConfigured } from "../../lib/supabase/client";

type PainEntry = {
  id: string;
  date: string;
  location: string;
  severity: string;
  notes: string;
};

export default function PainTrackerPage() {
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("Moderate");
  const [notes, setNotes] = useState("");
  const [user, setUser] = useState<{ id: string } | null>(null);
  const supabase = useMemo(() => (isSupabaseConfigured ? createClient() : null), []);

  useEffect(() => {
    async function loadEntries() {
      if (!supabase) return;
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user ? { id: userData.user.id } : null);
      if (!userData.user) return;
      const { data } = await supabase.from("pain_entries").select("id,date,location,severity,notes").order("date", { ascending: false });
      setEntries((data as PainEntry[] | null) ?? []);
    }
    loadEntries();
  }, [supabase]);

  const recent = useMemo(() => [...entries].sort((a, b) => (a.date < b.date ? 1 : -1)), [entries]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!location.trim() || !user || !supabase) return;

    const { data } = await supabase.from("pain_entries").insert({ user_id: user.id, location, severity, notes }).select("id,date,location,severity,notes").single();
    if (data) setEntries((current) => [data as PainEntry, ...current]);
    setLocation("");
    setSeverity("Moderate");
    setNotes("");
  }

  function handleClear() {
    if (confirm("Clear all pain tracker entries?")) {
      if (!user || !supabase) return;
      supabase.from("pain_entries").delete().eq("user_id", user.id).then(() => setEntries([]));
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold text-white">Pain Tracker</h2>
              <p className="mt-2 text-slate-400">Log discomfort, rate severity, and monitor recovery over time.</p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400 hover:text-white"
            >
              Clear history
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {!user && <p className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-4 text-sm text-amber-100">Sign in to save entries to your account. <Link href="/auth" className="font-semibold underline">Open account</Link></p>}
            <div>
              <label className="block text-sm font-medium text-slate-200">Where does it hurt?</label>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
              >
                <option value="">Select a location</option>
                {locationsList.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Pain severity</label>
              <select
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
              >
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200">Notes</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="How did it feel during practice? Any warm-up changes?"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/50 transition hover:bg-cyan-200 hover:scale-105"
            >
              Save entry
            </button>
          </form>

          {location.trim() && (
            <>
              <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
                <h3 className="text-lg font-semibold text-cyan-100">Recommended stretches for {location}:</h3>
                <ul className="mt-4 space-y-3">
                  {getStretchesForLocation(location).length > 0 ? (
                    getStretchesForLocation(location).map((stretch, idx) => (
                      <li key={idx} className="flex gap-3 text-slate-300">
                        <span className="font-semibold text-cyan-300">{idx + 1}.</span>
                        <span>{stretch}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-400">No specific stretches found. Consult your trainer for personalized advice.</li>
                  )}
                </ul>
              </div>

              {(() => {
                const guide = getCauseGuideForLocation(location);
                if (!guide) return null;
                return (
                  <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/5 p-6">
                    <h3 className="text-lg font-semibold text-amber-100">Common causes: {guide.title}</h3>
                    {guide.context && <p className="mt-2 text-sm text-amber-100/80">{guide.context}</p>}
                    {guide.sections.map((section) => (
                      <div key={section.heading} className="mt-5">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">{section.heading}</h4>
                        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
                          {section.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
            <h3 className="text-2xl font-semibold text-white">Track often</h3>
            <p className="mt-3 text-slate-300">Use this page after practice, after meets, or when soreness changes. Consistent tracking helps you identify patterns fast.</p>
          </div>
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
            <h3 className="text-2xl font-semibold text-white">Recovery tip</h3>
            <p className="mt-3 text-slate-300">If pain is moderate or high, rest, ice, and ask a coach or trainer for advice before pushing through the next set.</p>
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold text-white">Recent Pain Entries</h3>
          <p className="text-sm text-slate-400">Stored in browser only.</p>
        </div>
        <div className="mt-6 space-y-4">
          {recent.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-slate-400">No entries yet. Add your first pain note above.</p>
          ) : (
            recent.map((entry) => (
              <div key={entry.id} className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-sky-300">{new Date(entry.date).toLocaleString()}</p>
                    <h4 className="mt-2 text-xl font-semibold text-white">{entry.location}</h4>
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-200">{entry.severity}</span>
                </div>
                <p className="mt-4 text-slate-300">{entry.notes || "No notes added."}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}
