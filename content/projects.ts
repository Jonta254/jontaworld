/**
 * The portfolio's evidence base.
 *
 * Every `url` here returned HTTP 200 when verified against the live deployment
 * and cross-checked against the Vercel account. Nothing in this file is
 * aspirational, and nothing carries a date.
 *
 * Copy is drawn from each product's own description , not invented.
 * See docs/design-system.md §1 for the verification record.
 */

/** One decision, tagged so the case study can group design and engineering. */
export type Decision = {
  kind: "Design" | "Engineering";
  step: string;
  detail: string;
};

/**
 * A full case study for a flagship project.
 *
 * Every field is written to be truthful. "Research" means genuine observation
 * and lived trade experience, never invented user studies. "Results" carries
 * only what a visitor can verify by opening the link: no metrics, no adoption
 * numbers, nothing that cannot be checked.
 */
export type CaseStudy = {
  /** One-line role. No dates, no duration. */
  role: string;
  /** The problem, stated plainly. */
  problem: string;
  /** What a good outcome had to achieve. */
  objective: string;
  /** How the problem was understood before building. Observation, not fiction. */
  research: string;
  /** Design and engineering decisions, grouped by kind in the render. */
  decisions: Decision[];
  /** The honest constraints and what was traded for what. */
  challenges: string;
  /** The one decision that changed the outcome, in the maker's own voice.
      Pulled out mid-story as the "show thinking" beat. */
  turningPoint: string;
  /** What shipped and what it does. One click from proof. */
  solution: string;
  /** Only verifiable results. If it cannot be checked, it is not here. */
  results: string;
  /** The retrospective. The highest-trust section on the page. */
  lessons: string;
};

export type Project = {
  slug: string;
  name: string;
  /** What it does, for whom. Never a stack list. */
  outcome: string;
  /** Longer positioning, used on the project page. */
  summary: string;
  url: string;
  /** Shown next to the link , the domain, not the scheme. */
  displayUrl: string;
  /** Public source. Verified against the GitHub account before linking. */
  repo?: string;
  stack: string[];
  /** Short facts that can be verified in the live product. */
  evidence: string[];
  /** Flagships lead the page and get full case studies. */
  tier: "flagship" | "supporting";
  shot: {
    desktop: string;
    /** A second desktop frame, scrolled past the hero to a real working screen. */
    feature: string;
    mobile: string;
    /** Describes the desktop screenshot for anyone who cannot see it. */
    alt: string;
    /** Describes the feature screenshot. */
    featureAlt: string;
  };
  /** Optional real product screens that show meaningful depth beyond the lead view. */
  depth?: {
    src: string;
    alt: string;
    label: string;
  }[];
  /** Present on flagships. Drives the /portfolio/[slug] case study. */
  study?: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    slug: "apprenticelog",
    name: "ApprenticeLog",
    outcome:
      "Keeps apprenticeship work records, competency links, review states, and exports together in one clear local workspace.",
    summary:
      "A practical apprenticeship record preview for New Zealand trades. Entries, competencies, review history, and backups stay in the current browser. No account or cloud sync is active.",
    url: "https://apprentice-log-xi.vercel.app",
    displayUrl: "apprentice-log-xi.vercel.app",
    repo: "https://github.com/Jonta254/apprentice-log",
    stack: ["Next.js", "TypeScript", "Local browser storage", "Export and restore"],
    evidence: ["4 record states", "Export and restore", "On-device preview"],
    tier: "flagship",
    shot: {
      desktop: "/showcase/apprenticelog-desktop.webp",
      feature: "/showcase/apprenticelog-feature.webp",
      mobile: "/showcase/apprenticelog-mobile.webp",
      alt: "ApprenticeLog current professional apprenticeship workspace, with clear navigation for work entries, competencies, reviews and reports.",
      featureAlt: "ApprenticeLog apprenticeship overview showing recorded time, approved time, awaiting review and the next action for a new work entry.",
    },
    study: {
      role: "Sole designer and engineer. Product definition, interface, and build.",
      problem:
        "Apprenticeship records are easy to postpone. A useful log needs enough structure for work details, competency links, evidence, and review history without turning each entry into a long administrative task.",
      objective:
        "Make everyday record keeping clear on a phone and useful during review. Keep the current preview honest about what is stored locally and what still needs a configured production service.",
      research:
        "I mapped the information an apprentice, supervisor, and assessor need at different points in the record. That led to separate entry, competency, review, report, and backup views instead of one oversized form.",
      decisions: [
        {
          kind: "Design",
          step: "Start with the next useful action",
          detail:
            "The dashboard shows recorded time, review status, and a direct route to a new entry. It keeps the first screen about progress and the next task rather than filling it with administration.",
        },
        {
          kind: "Design",
          step: "Make review state visible",
          detail:
            "Draft, submitted, returned, and approved records use text labels as well as colour. The history stays attached to the entry so a change can be understood later.",
        },
        {
          kind: "Engineering",
          step: "Treat local storage as a real constraint",
          detail:
            "The open preview stores records in the current browser. Export, restore, validation, and safe migration paths are part of the product because local data can disappear when browser storage is cleared.",
        },
        {
          kind: "Engineering",
          step: "Separate preview and server capabilities",
          detail:
            "Account, organization, evidence upload, and migration routes check their configuration before claiming to work. The public interface says clearly when those services are unavailable.",
        },
      ],
      challenges:
        "The main tradeoff is usefulness without pretending the preview is a connected apprenticeship service. Local records make the workflow testable now, but they do not provide shared access, notifications, secure cloud evidence, or an independent audit trail.",
      turningPoint:
        "The product became more credible when the storage limits moved into the interface instead of being left in technical notes.",
      solution:
        "A responsive apprenticeship workspace for entries, competencies, review states, reports, backups, and an explicit future migration path. The public preview works locally and labels every connected capability that is not active.",
      results:
        "The current deployment lets anyone create and review sample apprenticeship records in their own browser, export a backup, restore it, and inspect the full workflow without creating an account.",
      lessons:
        "Clear limits build more trust than an ambitious feature list. The next production step is not more interface. It is a configured identity, database, storage, and notification service with the same honesty at every failure state.",
    },
  },
  {
    slug: "electracore",
    name: "ElectraCore",
    outcome:
      "Electrical calculations, circuit design, reference guides, and structured lessons gathered into one practical learning workspace.",
    summary:
      "A technical learning preview for students, apprentices, engineers, and trade workers, with eight calculators, a circuit designer, structured lessons, diagrams, knowledge checks, and saved local progress.",
    url: "https://electracore.vercel.app",
    displayUrl: "electracore.vercel.app",
    repo: "https://github.com/Jonta254/electracore",
    stack: ["Next.js", "TypeScript", "React", "SVG diagrams", "Local progress"],
    evidence: ["8 calculators", "Circuit design workflow", "Saved local results"],
    tier: "flagship",
    shot: {
      desktop: "/showcase/electracore-desktop.webp",
      feature: "/showcase/electracore-feature.webp",
      mobile: "/showcase/electracore-mobile.webp",
      alt: "ElectraCore landing page for an electrical calculators and guides platform, built from real site experience.",
      featureAlt: "ElectraCore electrical calculators route showing real Ohm's law, power, voltage-drop and cable-sizing tools with saved calculations.",
    },
    depth: [
      {
        src: "/showcase/electracore-design.webp",
        label: "Circuit designer",
        alt: "ElectraCore circuit designer showing a structured path from load details to a checked cable design.",
      },
      {
        src: "/showcase/electracore-learning.webp",
        label: "Lesson and progress system",
        alt: "ElectraCore Electrical Fundamentals course with lesson modules, progress controls, diagrams, exercises, and knowledge checks.",
      },
    ],
    study: {
      role: "Sole designer and engineer. Scope, interface, calculators, and build.",
      problem:
        "The reference tools an electrician needs are scattered. One calculator lives on a forum, a wiring chart in a PDF, the theory in a textbook that assumes you are sitting an exam rather than standing in front of a panel. Nothing pulled the everyday calculations and guides into one place written for the job instead of the classroom.",
      objective:
        "One place an electrician, an apprentice, or a student can reach for the calculation they need and trust the answer. Fast enough to use mid job, clear enough to learn from, and transparent enough that someone can inspect the method, assumptions, source notes, and review status before using it.",
      research:
        "I did not need to invent the requirements. I have done the trade. The research was cataloguing the calculations I actually reach for and the guides I wished existed, then checking each against how it comes up on site. The comparison set was the scattered tools already out there, which told me the gap was not another single calculator but a coherent set written for the work.",
      decisions: [
        {
          kind: "Design",
          step: "Scope came from the work, not a whiteboard",
          detail:
            "The tools included are the ones actually reached for on site, like voltage drop, cable sizing, and load analysis. Each earns its place by being something I have genuinely needed on a job, not by rounding out a feature list to look complete.",
        },
        {
          kind: "Design",
          step: "The answer first, the reasoning underneath",
          detail:
            "Every calculator gives the number first and the working below it. Someone mid job needs the result now. Someone learning needs to see how it was reached. The same screen serves both without slowing down either.",
        },
        {
          kind: "Design",
          step: "Learning paths, not a wall of videos",
          detail:
            "The guides run from fundamentals upward so an apprentice has a route through them, rather than a search box over a pile of disconnected articles. Structure is the feature.",
        },
        {
          kind: "Engineering",
          step: "Typed calculation logic, kept honest",
          detail:
            "The calculators are pure, typed functions separated from the interface, so the maths can be reasoned about and corrected on its own. In a tool people trust for real electrical work, a wrong answer is worse than no answer, so correctness sits at the centre rather than the edge.",
        },
      ],
      challenges:
        "The real risk was breadth. The temptation is to keep adding calculators until the tool claims to do everything, which is the fastest way to make it do nothing well. I traded coverage for trust: fewer tools, each one correct and clearly explained, rather than a long menu I could not stand behind. Serving a student and a working electrician on the same screen was the other tension, resolved by leading with the result and letting the reasoning stay one glance away.",
      turningPoint:
        "The decision that mattered was the one to leave tools out. A short, correct set earns more trust than a long one I could not stand behind.",
      solution:
        "A platform of circuit calculators, wiring guides, and structured learning paths, live and free for the core tools. It describes itself, accurately, as built by an electrician with real site experience, because it was.",
      results:
        "The live product includes eight working calculators, a circuit design workflow, structured lessons, knowledge checks, and saved local results. Each can be opened and checked directly without relying on an adoption claim.",
      lessons:
        "Leaving tools out was the discipline that mattered most, and it was harder than adding them. Next time I would push that further and lead even harder with the three or four calculations that come up every day, treating the rest as depth for the people who go looking. Restraint reads as confidence, and it is usually right.",
    },
  },
  {
    slug: "traildesk",
    name: "TrailDesk",
    outcome:
      "Route maps, gear lists and emergency contacts that still work where there is no signal.",
    summary:
      "Offline first trip planning for people who take going outside seriously. Everything needed on the trail is available without a connection.",
    url: "https://traildesk.vercel.app",
    displayUrl: "traildesk.vercel.app",
    repo: "https://github.com/Jonta254/traildesk",
    stack: ["Next.js", "Offline first", "Mapping"],
    evidence: ["Offline-first planning", "Routes and gear lists", "Emergency contacts"],
    tier: "supporting",
    shot: {
      desktop: "/showcase/traildesk-desktop.webp",
      feature: "/showcase/traildesk-feature.webp",
      mobile: "/showcase/traildesk-mobile.webp",
      alt: "TrailDesk landing page showing offline trip planning with route mapping and gear checklists.",
      featureAlt: "TrailDesk destination catalogue showing international route discovery, regional filters and researched trip-planning context.",
    },
  },
  {
    slug: "safesignal",
    name: "SafeSignal",
    outcome:
      "Runs timed lone worker check ins, captures optional location evidence, and keeps a clear session record on the current device.",
    summary:
      "An on device lone working preview with timed check ins, optional GPS captures, local records, and clearly labelled sample supervisor states. It does not monitor, message, call, or dispatch help.",
    url: "https://safesignal-beta.vercel.app",
    displayUrl: "safesignal-beta.vercel.app",
    repo: "https://github.com/Jonta254/safesignal",
    stack: ["Next.js", "TypeScript", "Geolocation", "Local browser storage"],
    evidence: ["4 visible safety states", "Timed check-ins", "On-device records"],
    tier: "supporting",
    shot: {
      desktop: "/showcase/safesignal-desktop.webp",
      feature: "/showcase/safesignal-feature.webp",
      mobile: "/showcase/safesignal-mobile.webp",
      alt: "SafeSignal landing page explaining timed personal check ins and the limits of its on device preview.",
      featureAlt: "SafeSignal supervisor dashboard preview showing active check-ins, due-soon and overdue states, and an illustrative incident record clearly labelled as sample data.",
    },
  },
  {
    slug: "digilearn",
    name: "DigiLearn",
    outcome:
      "Structured paths through coding, AI, automation, and data science, built around real projects rather than video playlists.",
    summary:
      "A digital skills platform covering the ground a modern developer actually needs, organised into paths with real outcomes.",
    url: "https://digilearn-five.vercel.app",
    displayUrl: "digilearn-five.vercel.app",
    repo: "https://github.com/Jonta254/digilearn",
    stack: ["Next.js", "TypeScript", "Learning paths"],
    evidence: ["72 courses", "864 guided lessons", "Open access"],
    tier: "supporting",
    shot: {
      desktop: "/showcase/digilearn-desktop.webp",
      feature: "/showcase/digilearn-feature.webp",
      mobile: "/showcase/digilearn-mobile.webp",
      alt: "DigiLearn landing page showing learning paths across coding, AI and data science.",
      featureAlt: "DigiLearn open course library showing searchable, filterable structured courses with lesson counts and access status.",
    },
  },
];

export const FLAGSHIPS = PROJECTS.filter((p) => p.tier === "flagship");
export const SUPPORTING = PROJECTS.filter((p) => p.tier === "supporting");
