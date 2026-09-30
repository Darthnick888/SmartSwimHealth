const topics = [
  {
    title: "Shoulder strength",
    description: "Learn simple dryland and pool exercises to protect the rotator cuff and keep your shoulders strong during swim season.",
    highlight: "Ideal for butterfly and freestyle swimmers."
  },
  {
    title: "Knee care",
    description: "Understand common knee strain sources and practice mobility habits that support flips, starts, and leg-driven strokes.",
    highlight: "Helpful for breaststroke and flip turn recovery."
  },
  {
    title: "Recovery habits",
    description: "Build a routine around rest, hydration, foam rolling, and sleep to lower injury risk and support muscle healing.",
    highlight: "Small adjustments make big differences."
  }
];

const faqs = [
  {
    question: "When should I rest?",
    answer: "If pain is sharp, persistent, or keeps you from normal practice, take time to rest and speak to a coach or athletic trainer."
  },
  {
    question: "How often should I track pain?",
    answer: "Log pain after workouts and after any change in training load so you can spot trends early."
  },
  {
    question: "Can I use this in season?",
    answer: "Yes. This app is built for athletes to use throughout practice, meets, and recovery days without any account or database."
  }
];

export default function InjuryEducationPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-10">
      <div className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-10 shadow-lg shadow-slate-950/10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-sky-500/15 px-4 py-2 text-sm font-semibold text-sky-200">
              Injury education
            </span>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Stay strong with healthy habits and simple injury prevention.</h2>
            <p className="mt-6 max-w-2xl text-slate-300 sm:text-lg">Explore practical guidance for swimmers who want to protect shoulders, knees, and recovery routines while training hard.</p>
          </div>
          <div className="rounded-3xl bg-slate-950/90 p-8 shadow-xl shadow-slate-950/20">
            <p className="text-slate-300">This page is designed for quick action: read the key points, then add a pain note or recovery log to keep your training healthy.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {topics.map((topic) => (
          <article key={topic.title} className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{topic.title}</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">{topic.title}</h3>
            <p className="mt-4 text-slate-300">{topic.description}</p>
            <p className="mt-6 rounded-2xl bg-slate-950/90 px-4 py-3 text-sm text-slate-400">{topic.highlight}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-lg shadow-slate-950/10">
        <h3 className="text-2xl font-semibold text-white">Quick questions</h3>
        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-6">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{faq.question}</p>
              <p className="mt-3 text-slate-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
