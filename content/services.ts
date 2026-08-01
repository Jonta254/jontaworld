/**
 * What I can be hired to do.
 *
 * A clean capability list, no images and no per item links. The evidence lives
 * elsewhere and is not repeated here: shipped products in the showcase and on
 * /portfolio, interface studies in the Lab. One closing line points to both.
 *
 * Copy is written without dashes, per the house style.
 */

export type Service = {
  num: string;
  title: string;
  body: string;
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Business web applications",
    body: "Platforms with real logic behind them: dashboards, user accounts, billing and admin. The kind of tool a business runs on rather than markets with.",
    deliverables: ["Full stack build", "Auth & accounts", "Dashboards", "Admin tooling", "Payments"],
  },
  {
    num: "02",
    title: "Mobile and offline apps",
    body: "Installable apps that keep working with no connection. Local storage, background sync, and interfaces you can use with one hand, in gloves, in bad light.",
    deliverables: ["PWA", "Offline storage", "Sync", "Geolocation", "Push"],
  },
  {
    num: "03",
    title: "Full stack engineering",
    body: "React and Next.js on the front, typed APIs and data on the back. Auth, databases, payments and third party integrations wired up and tested, on a fresh codebase or an existing one.",
    deliverables: ["React / Next.js", "TypeScript", "APIs & databases", "Auth & payments", "Testing"],
  },
  {
    num: "04",
    title: "Ecommerce and online stores",
    body: "Storefronts that are quick to browse and simple to buy from, with checkout, payments, inventory and orders handled properly. The parts a customer never notices, built to hold up under real use.",
    deliverables: ["Storefront", "Cart & checkout", "Payments", "Inventory", "Orders"],
  },
  {
    num: "05",
    title: "Marketing sites and landing pages",
    body: "Pages built to convert and to load instantly. Copy, layout and motion decided together, so the page reads as one thing rather than a template with content poured in.",
    deliverables: ["Landing pages", "Copy & layout", "SEO", "Analytics", "A/B ready"],
  },
  {
    num: "06",
    title: "Design systems and UI",
    body: "Tokens, components and the documentation that keeps them honest. Colour, type, spacing and motion decided once, so the tenth screen costs less to build than the first.",
    deliverables: ["Design tokens", "Component library", "Figma", "Documentation", "Dark mode"],
  },
  {
    num: "07",
    title: "Brand and visual identity",
    body: "Logos, wordmarks and the assets around them, from social templates to app icons to store graphics, drawn to work at every size they will actually appear at.",
    deliverables: ["Logo & wordmark", "App icons", "Social templates", "Store assets", "Brand guide"],
  },
];
