export type PainLocation =
  | "Shoulder"
  | "Shoulder Rotator"
  | "Neck"
  | "Lower Back"
  | "Back"
  | "Hip"
  | "Knee"
  | "Ankle"
  | "Wrist";

export const locationsList: PainLocation[] = [
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

export const stretches: Record<string, string[]> = {
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

export function getStretchesForLocation(location: string): string[] {
  if (!location.trim()) return [];
  const lowercased = location.toLowerCase();

  for (const [key, value] of Object.entries(stretches)) {
    if (lowercased.includes(key) || key.includes(lowercased.split(" ")[0] || "")) {
      return value;
    }
  }

  return [];
}

export type CauseGuide = {
  title: string;
  context?: string;
  sections: { heading: string; items: string[] }[];
};

export const causeGuides: Record<string, CauseGuide> = {
  shoulder: {
    title: 'Shoulder ("Swimmer\'s Shoulder")',
    context: "Most common injury",
    sections: [
      {
        heading: "Common injuries",
        items: ["Rotator cuff inflammation", "Shoulder impingement", "Tendinitis"]
      },
      {
        heading: "Causes",
        items: ["Thousands of overhead arm movements", "Poor stroke technique", "Weak shoulder stabilizers"]
      }
    ]
  },
  knee: {
    title: "Knee (\"Breaststroker's Knee\")",
    context: "Especially common in breaststroke.",
    sections: [
      {
        heading: "Causes",
        items: ["Repetitive whip kick", "Stress on the medial collateral ligament (MCL)", "Hip and knee rotation"]
      }
    ]
  },
  lower_back: {
    title: "Lower back pain",
    context: "Common in butterfly and breaststroke.",
    sections: [
      {
        heading: "Causes",
        items: ["Repeated back extension", "Weak core muscles"]
      }
    ]
  },
  neck: {
    title: "Neck pain",
    sections: [
      {
        heading: "Causes",
        items: ["Repeated breathing to one side", "Poor body position"]
      }
    ]
  },
  hip: {
    title: "Hip injuries",
    context: "Often seen in breaststrokers because of repeated external hip rotation.",
    sections: []
  }
};

export function getCauseGuideForLocation(location: string): CauseGuide | null {
  const normalized = location.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized.startsWith("shoulder")) return causeGuides.shoulder;
  if (normalized.startsWith("knee")) return causeGuides.knee;
  if (normalized === "lower back") return causeGuides.lower_back;
  if (normalized === "back") return causeGuides.lower_back;
  if (normalized.startsWith("neck")) return causeGuides.neck;
  if (normalized.startsWith("hip")) return causeGuides.hip;
  return null;
}
