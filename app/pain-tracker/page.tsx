"use client";

import { useEffect, useMemo, useState } from "react";

type PainEntry = {
  id: string;
  date: string;
  location: string;
  severity: string;
  notes: string;
};

const storageKey = "swimstrong-pain-entries";

const stretches: Record<string, string[]> = {
  shoulder: [
    "Sleeper stretch - Hold for 30 seconds each side",
    "Cross-body shoulder stretch - Pull arm across chest",
    "Doorway pectoral stretch - Lean forward gently",
    "Reverse shoulder shrug - Hold 10 seconds, repeat 10x"
  ],
  shoulder_rotator: [
    "Internal rotation - Hold arm at 90°, rotate inward",
    "External rotation - Hold arm at 90°, rotate outward",
    "Sleeper stretch - Hold for 30 seconds each side",
    "Band pull-aparts - 3 sets of 12 reps"
  ],
  neck: [
    "Neck tilt - Tilt ear toward shoulder, hold 20 seconds",
    "Neck rotation - Look over each shoulder, hold 15 seconds",
    "Chin tucks - 3 sets of 10 reps",
    "Neck flexion - Gently bring chin to chest, hold 20 seconds"
  ],
  lower_back: [
    "Child's pose - Hold for 30-45 seconds",
    "Knee to chest stretch - Hold each leg 30 seconds",
    "Cat-cow stretch - Flow between positions for 10 reps",
    "Piriformis stretch - Hold 30 seconds each side"
  ],
  lower: [
    "Child's pose - Hold for 30-45 seconds",
    "Knee to chest stretch - Hold each leg 30 seconds",
    "Cat-cow stretch - Flow between positions for 10 reps",
    "Piriformis stretch - Hold 30 seconds each side"
  ],
  back: [
    "Child's pose - Hold for 30-45 seconds",
    "Knee to chest stretch - Hold each leg 30 seconds",
    "Cat-cow stretch - Flow between positions for 10 reps",
    "Supine spinal twist - Hold 30 seconds each side"
  ],
  hip: [
    "Pigeon pose - Hold 45 seconds each side",
    "Hip flexor stretch - Lunge position, hold 30 seconds",
    "Butterfly stretch - Hold 30-45 seconds",
    "Lying figure-4 stretch - Hold 30 seconds each side"
  ],
  knee: [
    "Quad stretch - Pull foot to glute, hold 30 seconds",
    "Hamstring stretch - Bent knee, fold forward gently",
    "Calf stretch - Against wall or step, hold 30 seconds",
    "IT band stretch - Standing position, hold 30 seconds each side"
  ],
  ankle: [
    "Ankle circles - Rotate ankle 10 times each direction",
    "Calf stretch - Against wall or step, hold 30 seconds",
    "Plantar fascia roll - Use ball under foot, roll for 1 minute",
    "Shin stretch - Press top of foot down, hold 20 seconds"
  ],
  wrist: [
    "Wrist flexor stretch - Palm up, gently press back",
    "Wrist extensor stretch - Palm down, gently press down",
    "Pronation/supination - Rotate forearm palm up/down",
    "Prayer stretch - Hold hands in prayer position, slowly lower"
  ]
};

const locationsList = [
  "Shoulder",
  "Shoulder Rotator",
  "Neck",
  "Lower Back",
  "Back",
  "Hip",
  "Knee",
  "Ankle",
  "Wrist"
];
function getStretchesForLocation(location: string): string[] {
  if (!location.trim()) return [];
  const lowercased = location.toLowerCase();
  
  for (const [key, value] of Object.entries(stretches)) {
    if (lowercased.includes(key) || key.includes(lowercased.split(" ")[0] || "")) {
      return value;
    }
  }
  
  return [];
}

export default function PainTrackerPage() {
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("Moderate");
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
    if (!location.trim()) return;

    setEntries((current) => [
      {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        location,
        severity,
        notes
      },
      ...current
    ]);
    setLocation("");
    setSeverity("Moderate");
    setNotes("");
  }

  function handleClear() {
    if (confirm("Clear all pain tracker entries?")) {
      setEntries([]);
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
            <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6">
              <h3 className="text-lg font-semibold text-cyan-100">Recommended stretches for {location}:</h3>
              <ul className="mt-4 space-y-3">
                {getStretchesForLocation(location).length > 0 ? (
                  getStretchesForLocation(location).map((stretch, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300">
                      <span className="text-cyan-300 font-semibold">{idx + 1}.</span>
                      <span>{stretch}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-400">No specific stretches found. Consult your trainer for personalized advice.</li>
                )}
              </ul>
            </div>
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
