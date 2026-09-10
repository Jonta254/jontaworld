/**
 * The About essay.
 *
 * Written to answer the questions a person actually has before working with
 * someone: how they think, how they decide, how they behave when they are
 * wrong, and what they mean by good. No credentials, no dates, no claims that
 * cannot be checked against the work itself.
 */

/** A quiet line between the sequence and the essay. */
export const ABOUT_STATEMENT =
  "Electrical work taught me to value clear decisions, reliable systems, and honest limits.";

export type EssayChapter = {
  title: string;
  body: string[];
};

export const ESSAY: EssayChapter[] = [
  {
    title: "How I begin",
    body: [
      "I first understand how the work happens now, what slows it down, and what a useful result should change. That keeps every design and engineering decision connected to a real need.",
    ],
  },
  {
    title: "What I leave out",
    body: [
      "Every feature creates work to maintain. I keep the parts that solve a recurring problem and remove the rest. A focused product is easier to use and easier to trust.",
    ],
  },
  {
    title: "How I work with people",
    body: [
      "I show work early, explain decisions plainly, and make changes while they are still inexpensive. If I disagree, I explain why, then support the direction we choose.",
    ],
  },
  {
    title: "What I mean by quality",
    body: [
      "Quality means the product stays clear on a small screen, under a poor connection, and in imperfect conditions. It also means maintainable code and limits that are stated honestly.",
    ],
  },
  {
    title: "What I am still learning",
    body: [
      "I keep improving how I structure products, write for different people, and decide when more work will no longer make the outcome better.",
    ],
  },
];
