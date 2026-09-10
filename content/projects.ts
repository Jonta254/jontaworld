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

const PROJECT_CATALOG: Project[] = [
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
    tier: "flagship",
    shot: {
      desktop: "/showcase/electracore-desktop.webp",
      feature: "/showcase/electracore-feature.webp",
      mobile: "/showcase/electracore-mobile.webp",
      alt: "ElectraCore landing page for an electrical calculators and guides platform, built from real site experience.",
      featureAlt: "ElectraCore electrical calculators route showing real Ohm's law, power, voltage drop and cable sizing tools with saved calculations.",
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
        "Live at electracore.vercel.app and open to anyone. Every calculator and guide is there to be used and checked right now. There are no usage figures on this page because I would rather you tested the tools than took my word for a number.",
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
    tier: "supporting",
    shot: {
      desktop: "/showcase/traildesk-desktop.webp",
      feature: "/showcase/traildesk-feature.webp",
      mobile: "/showcase/traildesk-mobile.webp",
      alt: "TrailDesk landing page showing offline trip planning with route mapping and gear checklists.",
      featureAlt: "TrailDesk destination catalogue showing international route discovery, regional filters and researched trip planning context.",
    },
    study: {
      role: "Sole designer and engineer. Product structure, interface, and build.",
      problem:
        "Trip plans often sit across map tabs, notes, gear lists, and messages. That becomes a practical problem when the connection disappears and the important detail is no longer easy to reach.",
      objective:
        "Bring route context, preparation, and essential contacts into one calm mobile workspace that remains useful beyond reliable coverage.",
      research:
        "I mapped what changes between planning at home and checking a plan outdoors. The useful information became a short sequence: choose a destination, understand the route, prepare the kit, and keep essential details close.",
      decisions: [
        {
          kind: "Design",
          step: "Organise around the trip",
          detail:
            "Destinations lead into route context and preparation instead of exposing separate tools. The interface follows the way a plan is assembled, so the next useful action stays clear.",
        },
        {
          kind: "Design",
          step: "Let mobile set the hierarchy",
          detail:
            "Wide screens keep destination context visible beside the work. On a phone, the same information becomes a direct reading order with actions placed where they are needed.",
        },
        {
          kind: "Engineering",
          step: "Keep critical information portable",
          detail:
            "Route details, lists, and contacts are structured as durable trip data rather than a collection of temporary screens. The product is designed to remain understandable after a connection drops.",
        },
        {
          kind: "Engineering",
          step: "Separate saved facts from changing conditions",
          detail:
            "The interface does not present cached planning information as live conditions. That distinction keeps an offline tool useful without giving old information false authority.",
        },
      ],
      challenges:
        "Offline access creates a responsibility as well as a convenience. A saved route can support preparation, but it cannot guarantee current weather, access, or emergency coverage. The design has to keep those limits visible without making every screen feel like a warning.",
      turningPoint:
        "The product became clearer when I stopped treating the map as the product. The real product is a prepared trip that still makes sense when the map cannot update.",
      solution:
        "A responsive trip planning workspace that brings destination discovery, route context, gear preparation, and essential contacts into one continuous flow.",
      results:
        "The live product can be opened today to browse destinations, inspect the planning structure, and compare the complete desktop and mobile experience.",
      lessons:
        "Offline design is less about adding a cache badge and more about deciding what remains trustworthy. Future development should deepen saved route detail while preserving a clear boundary around information that can change.",
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
    tier: "supporting",
    shot: {
      desktop: "/showcase/safesignal-desktop.webp",
      feature: "/showcase/safesignal-feature.webp",
      mobile: "/showcase/safesignal-mobile.webp",
      alt: "SafeSignal landing page explaining timed personal check ins and the limits of its on device preview.",
      featureAlt: "SafeSignal supervisor dashboard preview showing active check ins, due soon and overdue states, and an illustrative incident record clearly labelled as sample data.",
    },
    study: {
      role: "Product design and engineering.",
      problem:
        "Lone workers need a clear way to record check ins. A preview must not imply that anyone is actively monitoring it.",
      objective:
        "Make the timer, status, next action, and product limits clear at a glance.",
      research:
        "I mapped four timer states: normal, approaching, grace, and overdue. Each needed a name, time, and next action.",
      decisions: [
        {
          kind: "Design",
          step: "Name every state",
          detail:
            "Colour supports the status, but text carries the meaning. Time and action stay together.",
        },
        {
          kind: "Design",
          step: "Put the limitation beside the promise",
          detail:
            "The preview states that it cannot monitor, call, message, or dispatch help. Sample data is labelled in place.",
        },
        {
          kind: "Engineering",
          step: "Derive status from one timer model",
          detail:
            "One deadline and grace period determine every visible state, keeping the interface consistent.",
        },
        {
          kind: "Engineering",
          step: "Keep evidence optional and local",
          detail:
            "Location is optional. Session records stay on the current device.",
        },
      ],
      challenges:
        "An overdue state must feel urgent without suggesting that an alert has been sent. The interface says exactly what has and has not happened.",
      turningPoint:
        "The product became clearer when its limits moved into the main interface.",
      solution:
        "A local preview with timed check ins, optional location, session history, and four clear timer states.",
      results:
        "Visitors can start a session, record a check in, and inspect the local history. The limits remain visible throughout.",
      lessons:
        "A working interface is not a monitored safety service. Real alerts require a tested notification and response system.",
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
    tier: "supporting",
    shot: {
      desktop: "/showcase/digilearn-desktop.webp",
      feature: "/showcase/digilearn-feature.webp",
      mobile: "/showcase/digilearn-mobile.webp",
      alt: "DigiLearn landing page showing learning paths across coding, AI and data science.",
      featureAlt: "DigiLearn open course library showing searchable, filterable structured courses with lesson counts and access status.",
    },
    study: {
      role: "Sole designer and engineer. Learning model, content structure, interface, and build.",
      problem:
        "Digital learning is easy to start and hard to navigate. Tutorials, videos, and tools accumulate without showing what to learn next or what a learner should be able to make at the end.",
      objective:
        "Turn a broad modern development curriculum into clear learning paths, visible project outcomes, and a course library that can be searched without losing the larger direction.",
      research:
        "I mapped the capabilities behind practical web, automation, AI, and data work, then grouped them by dependency rather than popularity. The audit exposed two needs: a guided path for direction and an open library for deliberate lookup.",
      decisions: [
        {
          kind: "Design",
          step: "Lead with paths, not volume",
          detail:
            "The first choice is a direction with an outcome. Course counts and individual lessons remain visible, but they support the path instead of becoming the product headline.",
        },
        {
          kind: "Design",
          step: "Make the library useful on its own",
          detail:
            "Search, topic filters, lesson counts, and access status let someone find a specific course while still understanding where it belongs in the wider programme.",
        },
        {
          kind: "Engineering",
          step: "Protect saved progress",
          detail:
            "Local progress is parsed defensively, checked for the expected version and record shape, and reduced to unique lesson identifiers. Invalid data returns to a safe empty state instead of breaking the experience.",
        },
        {
          kind: "Engineering",
          step: "Model learning as structured content",
          detail:
            "Paths, courses, lessons, and outcomes have distinct roles in the data model. That keeps navigation and progress behaviour consistent as the library grows.",
        },
      ],
      challenges:
        "Breadth can quickly make a learning platform feel generic. The tradeoff was to show the range of disciplines while keeping each route anchored to a concrete outcome. Local progress also keeps the preview simple, but it does not follow a learner across devices.",
      turningPoint:
        "The information architecture settled when projects became the destination and lessons became the route. That gave the catalogue a reason to exist beyond its size.",
      solution:
        "A responsive digital learning platform with outcome led paths, a searchable course library, lesson level structure, and defensively stored progress in the current browser.",
      results:
        "The live product exposes its paths and course library for direct inspection. Visitors can browse by topic, review lesson depth and access status, and test the learning structure on desktop or mobile.",
      lessons:
        "A credible curriculum needs stronger sequencing, not more categories. The next improvement should deepen project assessment and make progress portable only when an account system is ready to support it reliably.",
    },
  },
];

const DISPLAY_ORDER = [
  "digilearn",
  "apprenticelog",
  "electracore",
  "traildesk",
  "safesignal",
] as const;

export const PROJECTS: Project[] = [...PROJECT_CATALOG].sort(
  (a, b) => DISPLAY_ORDER.indexOf(a.slug as (typeof DISPLAY_ORDER)[number]) - DISPLAY_ORDER.indexOf(b.slug as (typeof DISPLAY_ORDER)[number]),
);

export const FLAGSHIPS = PROJECTS.filter(
  (project) => project.slug === "digilearn" || project.tier === "flagship",
);
export const SUPPORTING = PROJECTS.filter(
  (project) => !FLAGSHIPS.includes(project),
);
