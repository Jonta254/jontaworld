export type Service = {
  num: string;
  title: string;
  promise: string;
  body: string;
  deliverables: string[];
  proof: string;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Design and build a complete product",
    promise: "From a rough idea to something people can use.",
    body: "I can shape the problem, design the experience, write the interface, and build the working product. One person keeps the thinking connected from the first conversation to launch.",
    deliverables: ["Product direction", "UX and interface", "Full stack build", "Launch"],
    proof: "ApprenticeLog and ElectraCore",
  },
  {
    num: "02",
    title: "Build a tool for real work",
    promise: "Clear software for a process that is slow, manual, or confusing.",
    body: "Dashboards, admin tools, offline workflows, calculators, and internal systems. I learn how the work happens first, then remove the parts that waste time or create mistakes.",
    deliverables: ["Workflow design", "Accounts and data", "Offline support", "Admin tools"],
    proof: "ApprenticeLog, SafeSignal, and TrailDesk",
  },
  {
    num: "03",
    title: "Create a site that earns trust",
    promise: "A fast, thoughtful website that explains the value clearly.",
    body: "For a business, product, shop, or personal brand. I bring the words, structure, visual identity, responsive design, and production build together so the result feels specific rather than templated.",
    deliverables: ["Content structure", "Visual direction", "Responsive build", "SEO and performance"],
    proof: "This portfolio and the shipped product sites",
  },
  {
    num: "04",
    title: "Improve an existing product",
    promise: "Find the weak points and make the whole experience stronger.",
    body: "I can join an existing codebase, understand what is already working, and improve the interface, product flow, accessibility, performance, or design system without throwing away its identity.",
    deliverables: ["Product audit", "UI refinement", "Engineering fixes", "Design system"],
    proof: "Continuous work across all five live products",
  },
];
