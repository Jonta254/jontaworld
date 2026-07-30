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
  "The trade did not teach me to write software. It taught me what it costs when something fails, and who ends up paying for it.";

export type EssayChapter = {
  title: string;
  body: string[];
};

export const ESSAY: EssayChapter[] = [
  {
    title: "How I approach a problem",
    body: [
      "I start by going to where the work happens. Not a meeting about the work, the work itself. On site that meant standing in the room with the fault, with the panel open, in the conditions the fault actually lives in. In software it means watching somebody use the thing they use today and paying attention to the moment they sigh, or reach for a workaround, or quietly give up and do it on paper instead.",
      "That moment is the brief. Most of what people ask for is a solution they have already half designed in their head, and if you build exactly that you often solve the wrong thing very well. The more useful question is what they were doing when they decided they needed it.",
    ],
  },
  {
    title: "How I decide what not to build",
    body: [
      "Every feature is a promise to keep something working forever, so the first question is whether the problem is real and recurring or whether it happened once and felt urgent at the time. If I cannot say who has the problem and when it last cost them something, I leave it alone.",
      "I would rather ship four things that are correct than twelve that are roughly right, because the four are the ones somebody will trust at the moment it matters. Deciding what to leave out is most of the job. It is also the part that took me longest to get comfortable with, because a short list looks like less work to everyone except the person maintaining it.",
    ],
  },
  {
    title: "How I work with other people",
    body: [
      "I try to be easy to correct. In practice that means showing work early, while it is still cheap to change, and describing what I did in plain language so that somebody without my context can tell me I have got it wrong.",
      "I do not use jargon as a shield. If I cannot explain a decision to the person who has to live with it, I usually do not understand it well enough yet. When I disagree I say so once, clearly, with the reason attached, and then I commit to whatever we decide. Being quietly right afterwards is worth nothing to anybody.",
    ],
  },
  {
    title: "What quality means to me",
    body: [
      "Quality is not polish. It is what the thing does on a bad day. Whether it still works with no connection, on an old phone, in bright sun, for somebody who is tired and holding something in the other hand.",
      "It is whether the next person who opens the code can see why it is shaped the way it is. It is whether the limits are stated honestly, so nobody discovers them at the worst possible moment. Most of that work is invisible when it is done properly, which is the point. Nobody thanks a circuit for holding.",
    ],
  },
  {
    title: "What I am still learning",
    body: [
      "A fair amount. How much structure a project needs before the structure quietly becomes the work. How to write for people who are not me, which is far harder than it sounds and which I get wrong regularly.",
      "And when to stop. There is always one more thing that could be better, and knowing which one actually matters is a judgement I do not think anybody finishes developing.",
    ],
  },
];
