"use client";

import { useEffect, useMemo, useState } from "react";

type JournalEntry = {
  id: string;
  date: string;
  sleep: string;
  hydration: string;
  mood: string;
  notes: string;
};

const storageKey = "swimstrong-journal-entries";

export default function RecoveryJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sleep, setSleep] = useState("");
  const [hydration, setHydration] = useState("");
  const [mood, setMood] = useState("Good");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const json = window.localStorage.getItem(storageKey);
    if (json) {
      setEntries(JSON.parse(json));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries]);

  const recent = useMemo(() => [...entries].sort((a, b) => (a.date < b.date ? 1 : -1)), [entries]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sleepValue = sleep.trim();
    const hydrationValue = hydration.trim();
    if (!sleepValue || !hydrationValue || !date) return;

    setEntries((current) => [
      {
        id: crypto.randomUUID(),
        date: new Date(date).toISOString(),
        sleep: sleepValue,
        hydration: hydrationValue,
        mood,
        notes
      },
      ...current
    ]);
    setDate(new Date().toISOString().split("T")[0]);
    setSleep("");
    setHydration("");
    setMood("Good");
    setNotes("");
  }

  function handleClear() {
    if (confirm("Clear all recovery journal entries?")) {
      setEntries([]);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-white">Recovery Journal</h2>
            <p className="mt-2 text-slate-400">Record sleep, hydration, and recovery habits so you can see what helps you feel your best.</p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="self-start rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400 hover:text-white sm:self-auto"
          >
            Clear history
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-200">Date</label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200">Sleep hours</label>
            <input
              value={sleep}
              onChange={(event) => setSleep(event.target.value)}
              placeholder="e.g. 7.5"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200">Hydration</label>
            <input
              value={hydration}
              onChange={(event) => setHydration(event.target.value)}
              placeholder="e.g. 80 oz"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200">Mood</label>
            <select
              value={mood}
              onChange={(event) => setMood(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Okay</option>
              <option>Tired</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-200">Notes</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Stretching, rest day, therapy, or feel-good habits"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/50 transition hover:bg-cyan-200 hover:scale-105"
            >
              Save journal entry
            </button>
          </div>
        </form>
      </div>

      <section className="mt-10 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold text-white">Recent Recovery Notes</h3>
          <p className="text-sm text-slate-400">Stored locally in your browser.</p>
        </div>
        <div className="mt-6 space-y-4">
          {recent.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/70 p-8 text-slate-400">No recovery notes yet. Add one after practice or rest day.</p>
          ) : (
            recent.map((entry) => (
              <div key={entry.id} className="rounded-3xl border border-slate-800/80 bg-slate-950/90 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-sky-300">{new Date(entry.date).toLocaleString()}</p>
                    <h4 className="mt-2 text-xl font-semibold text-white">Sleep: {entry.sleep} hrs</h4>
                  </div>
                  <span className="rounded-full bg-slate-800/80 px-4 py-2 text-sm text-slate-200">{entry.mood}</span>
                </div>
                <p className="mt-3 text-slate-300">Hydration: {entry.hydration}</p>
                <p className="mt-3 text-slate-300">{entry.notes || "No notes added."}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}
