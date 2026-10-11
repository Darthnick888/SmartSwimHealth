import Link from "next/link";

const stats = [
  { label: "Track pain", value: "Daily notes" },
  { label: "Journal recovery", value: "Muscle care habits" },
  { label: "Learn injury prevention", value: "Smart swim health" }
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-sky-800 via-cyan-700 to-slate-950/90 p-10 shadow-[0_25px_80px_-50px_rgba(14,165,233,0.6)]">
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.3),transparent_55%)]"></div>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100">
              Pool-ready recovery
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Smart Swim Health helps student athletes monitor recovery and strengthen injury awareness.
            </h2>
            <p className="mt-6 max-w-2xl text-cyan-100/80 sm:text-lg">
              Use the Pain Tracker and Recovery Journal to capture how you feel. Explore Injury Education for prevention tips, stretches, and care habits designed for swimmers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/pain-tracker" className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/40 transition duration-200 hover:scale-[1.02] hover:bg-cyan-200">
                Log pain now
              </Link>
              <Link href="/injury-education" className="inline-flex items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950/80 px-6 py-3 text-cyan-100 transition hover:border-cyan-300 hover:text-white">
                Injury tips
              </Link>
            </div>
          </div>
          <div className="relative z-10 space-y-4 rounded-3xl bg-slate-950/70 p-8 shadow-xl shadow-slate-950/20 border border-cyan-500/10">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-cyan-500/10 bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8">
          <h3 className="text-xl font-semibold text-white">Why track pain?</h3>
          <p className="mt-4 text-slate-300">Recording discomfort early can help you spot patterns and adjust training before small issues become bigger injuries.</p>
        </article>
        <article className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8">
          <h3 className="text-xl font-semibold text-white">Recovery journal</h3>
          <p className="mt-4 text-slate-300">Capture rest, hydration, sleep, and stretching so you can understand what supports better days in the pool.</p>
        </article>
        <article className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8">
          <h3 className="text-xl font-semibold text-white">Learn prevention</h3>
          <p className="mt-4 text-slate-300">Read easy athlete-focused injury education to protect shoulders, knees, and lower back during swim season.</p>
        </article>
      </div>
    </section>
  );
}
