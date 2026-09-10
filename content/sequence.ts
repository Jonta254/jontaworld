/**
 * The Sequence , trade → code → craft, with no calendar.
 *
 * Progression is carried by order and numbering, never by dates. See
 * docs/design-system.md §10: this removes any invitation to compute years of
 * experience, and it can never go stale.
 */

export type Chapter = {
  num: string;
  title: string;
  body: string;
};

export const SEQUENCE: Chapter[] = [
  {
    num: "01",
    title: "The trade",
    body: "Electrical work taught me to trace problems carefully and build systems that must work in real conditions.",
  },
  {
    num: "02",
    title: "The first tool",
    body: "I started building software to improve the paperwork and repeated tasks around practical work.",
  },
  {
    num: "03",
    title: "The craft",
    body: "Design gave those tools clearer structure, language, and interfaces. Engineering made them dependable.",
  },
  {
    num: "04",
    title: "The work now",
    body: "Today I design and build websites, applications, and tools for real workflows and everyday use.",
  },
];

/** How I work. Values stated as practice, not as adjectives. */
export const PRINCIPLES = [
  {
    title: "Precision before speed",
    body: "Do it right, then do it fast. The reverse compounds, because shortcuts in a system are interest you pay forever.",
  },
  {
    title: "Constraints are the brief",
    body: "No signal, cold hands, bright sun, an ageing Android. Design for the worst realistic condition and the good conditions take care of themselves.",
  },
  {
    title: "Remove until it breaks",
    body: "The last thing removed should hurt. Anything that survives that test has earned its place on the page.",
  },
  {
    title: "Show, do not claim",
    body: "Every product here is live and open to anyone. Judgement should rest on what you can open, not on what I say about it.",
  },
] as const;
