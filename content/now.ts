export type NowGroup = {
  label: string;
  intro: string;
  items: { title: string; note: string }[];
};

export const NOW: NowGroup[] = [
  {
    label: "Building",
    intro: "Real products, improved one useful decision at a time.",
    items: [
      { title: "ElectraCore", note: "Making electrical lessons, diagrams, and calculators clearer for the moment they are actually needed." },
      { title: "ApprenticeLog", note: "Reducing the distance between doing the work and recording it properly." },
      { title: "This portfolio", note: "Learning how much trust can come from better words, stronger proof, and quieter design." },
    ],
  },
  {
    label: "Learning",
    intro: "I do not separate learning from the work. Each new thing changes the next thing I build.",
    items: [
      { title: "From people", note: "A question, a hesitation, or the way someone uses a screen often teaches more than a long report." },
      { title: "From the trade", note: "Electrical work keeps teaching me about safety, sequence, accuracy, and making decisions that hold up." },
      { title: "From the code", note: "Every bug is a lesson in assumptions. Every refactor is a lesson in making the next change easier." },
    ],
  },
  {
    label: "Noticing",
    intro: "Every minute, something small can become a useful lesson if I pay attention.",
    items: [
      { title: "Why simple work feels difficult", note: "The clearest interface usually has the most thinking hidden behind it." },
      { title: "Where people pause", note: "Confusion often appears before anyone has the words to explain it." },
      { title: "What lasts", note: "Good systems, good tools, and good relationships all leave room for change." },
    ],
  },
];
