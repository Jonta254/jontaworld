/**
 * Writing. Content as data — the pages carry no prose of their own.
 *
 * No dates: posts are ordered by array position, newest first, and carry a
 * reading time rather than a publish date (docs/design-system.md §10).
 */

export type Post = {
  slug: string;
  title: string;
  /** One-line standfirst, used in the index and metadata. */
  excerpt: string;
  topic: string;
  readingTime: string;
  /** A short first-person note on why the piece exists. */
  note: string;
  /** Paragraphs. Plain strings — no markup in the data. */
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "nothing-announces-itself",
    title: "Nothing announces itself",
    excerpt:
      "Working systems are silent. No alert, no pause, no warning. Everything simply exists until the moment it does not, and that silence is the thing worth designing around.",
    topic: "Systems",
    readingTime: "8 min",
    note: "I wrote this after a long stretch of thinking about why the best work is usually the work nobody notices.",
    body: [
      "When I was young I wanted to know what was behind things. Not what they did, but what made them do it. I opened what I was allowed to open and a few things I was not. Most of it went back together. Some of it did not, and those were the useful ones, because a thing that fails teaches you more in an afternoon than a thing that works teaches you in a year.",
      "What pulled me in was that physical things do not argue. A wire carries current or it does not. There is no opinion in it, no persuading it, no partial credit for good intentions. For a young person that is enormously clarifying. You are either right or you are wrong, and the thing itself tells you which, immediately, without being asked.",
      "So I went into the trade, and the trade turned out to be a long apprenticeship in consequences. You learn to read a fault the way other people read handwriting. You learn that the panel in front of you is not one decision but a record of every decision anyone ever made about that building, including the ones made badly, made quickly, or made at the end of a Friday when everybody wanted to go home.",
      "What I see daily has not changed much since I moved into software. The work is different. The failures rhyme. Somebody needed a thing to work and did not have the time to make it work well. Somebody solved the problem in front of them and left the cost with a person they would never meet. Somebody labelled nothing, because at the time they knew where everything was, and knowing where everything was felt permanent.",
      "It never is. That is the first lesson, and it arrives slowly. The knowledge that holds a system together lives in a head, and heads move on. What survives is what was written down, laid out clearly, and made obvious to the next person. Everything else is a rumour that happens to be true for a while.",
      "The second lesson took me much longer, and it is the one I keep returning to. Systems do not warn you. There is no alert before the fault. There is no pause before the failure, no moment where the thing you built raises its hand and says it is about to stop. It all simply exists, quietly, doing what it does, until the day it does not. The silence is not safety. The silence is only silence.",
      "This is easy to say and hard to feel until you have stood in front of something that was fine yesterday. A circuit that carried load for years. A script that ran every night without anyone thinking about it. Neither of them gave notice. Neither of them was ever going to. Working and failing look identical right up until the moment they stop looking identical.",
      "Once you accept that, it changes what you build. If the system will not warn you, the warning has to be designed in. That does not mean more alerts. Alerts that fire constantly are the same as no alerts at all, and a person who has learned to ignore a warning is in a worse position than a person who never had one. It means building so that failure shows up early, reads clearly when it arrives, and can be survived while it is being fixed.",
      "It also means being honest about the conditions. Software written for a desk behaves very differently in a roof space with one bar of signal and cold hands. The failure case is not an edge case out there. For the people I build for it is most of the day. Designing for the worst realistic condition is not pessimism. It is just paying attention to where the work actually happens.",
      "There is a quiet part of this that took me a while to make peace with. The best compliment work of this kind receives is that nobody notices it. Nobody thanks a circuit for holding. Nobody praises an app for opening. The entire craft points at an outcome where the person using it never thinks about you at all, and never has cause to. You are working toward your own invisibility, and you have to find that satisfying, because it is the only reward the job reliably pays.",
      "So that is where I am now. I build tools for people who work with their hands, in conditions that do not forgive guesswork, for a standard I did not invent and cannot argue with. Test it. Verify it. Write it down. Leave it better than you found it. Assume no warning is coming, because none is.",
      "It works, or it does not. Everything else is commentary.",
    ],
  },
  {
    slug: "wiring-panel-architecture",
    title: "What wiring a panel taught me about architecture",
    excerpt:
      "Every circuit is a module and every breaker is a boundary. The mental model transfers more than you would think, and it moves in both directions.",
    topic: "Craft",
    readingTime: "7 min",
    note: "I wrote this after spending three hours retracing a fault in a distribution board that looked exactly like a circular dependency.",
    body: [
      "There is a moment you will recognise if you have worked with complex systems of any kind. You stare at something and realise you are not looking at one problem but at a record of every decision ever made about it. A breaker panel does this to me. So does a legacy codebase.",
      "Both are accumulations of intent. The person who wired this panel had reasons. The developer who structured this module had reasons. The question, the same question in both cases, is whether those reasons are still visible, still legible, still right.",
      "In electrical work we call a bad installation a rat's nest: a tangle of wire with no discernible logic, where things work but nobody can tell you why, and nobody is sure what will happen if you change one thing. Software engineers call this technical debt. The name changes. The texture of the frustration does not.",
      "What the trade taught me is this: the quality of an installation is measured not by whether it works on the day it is finished, but by whether someone can understand it, maintain it, and extend it safely later. Every wire labelled. Every circuit protected. Every join accessible.",
      "Good architecture, whether in code, in buildings, or in electrical systems, is an act of communication with the future. You are writing a message to someone you will never meet who will need to trust your work. That shifts how you think about the shortcuts.",
      "When I started coding seriously, I found I already understood separation of concerns. I had just been calling them circuits. I understood fault isolation; I had been calling it a fuse. I understood the difference between a patch and a repair.",
      "The deeper lesson is about respect for the system. A good electrician never assumes. They test. They verify. They document. They leave the installation better than they found it. That is not a skill. That is a disposition, and it is the most transferable thing I own.",
    ],
  },
  {
    slug: "design-second-language",
    title: "Design as a second language",
    excerpt:
      "Learning to design after years of writing code was like learning to speak after years of only reading. The grammar was already there. Fluency took practice.",
    topic: "Design",
    readingTime: "5 min",
    note: "I wrote this after re-reading my first Figma file. I have archived it for everyone's protection.",
    body: [
      "When you learn a language as an adult there is a specific frustration that children are spared: you know what you want to say, but you do not have the words. You have the thought fully formed, and it dissolves at the point of articulation.",
      "That is exactly what learning design felt like coming from code. I could look at a good interface and understand it, intellectually and structurally. I could feel what was working. I just could not make it myself. The gap between what I could perceive and what I could produce was humbling.",
      "The breakthrough came when I stopped trying to learn design and started trying to learn to see. The design came after. First I had to understand why things looked the way they looked. Why that particular grey felt off. Why that button placement felt wrong. Why that much whitespace felt generous rather than empty.",
      "Code taught me that systems have logic. They follow rules, and the rules are discoverable. Design has the same quality. The rules are less explicit but equally real. Once you start to feel them, you start to use them. And then you start to break them on purpose.",
      "The thing that made it click: an electrical schematic is one of the most carefully designed objects in the world. Not beautiful in the conventional sense, but every line, every symbol, every annotation is there for a reason. Nothing is arbitrary. Every convention serves legibility. That is design.",
      "I was already a designer. I just had not known what to call it.",
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
