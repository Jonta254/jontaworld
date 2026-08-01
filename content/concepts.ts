/**
 * The Lab. Independent interface concepts.
 *
 * These are DESIGN STUDIES, not shipped products and not client work. They
 * exist to show interface and design system range across industries. Every
 * company name, logo, avatar and figure inside the screens is fictional sample
 * content, stated plainly on the page (see LAB_NOTE) so nothing here can be
 * mistaken for a real customer or a real deployment.
 *
 * Each concept carries a value line, three professional notes on what it
 * demonstrates, and the screens it spans, so the work reads like case material
 * rather than a gallery.
 *
 * Images live in /public/lab/<slug>.png.
 */

export type Concept = {
  slug: string;
  /** The concept's working name. A study title, not a brand. */
  name: string;
  /** The domain it explores. */
  category: string;
  /** One line: the value the interface sets out to deliver. */
  tagline: string;
  /** Three professional notes on what the study demonstrates. */
  highlights: string[];
  /** The screens spanned, so the breadth is legible without a link. */
  surfaces: string;
  /** Captured board in /public/lab. */
  image: string;
  /** Full description for anyone who cannot see the image. */
  alt: string;
};

/** Shown prominently at the top of the page. Non negotiable framing. */
export const LAB_NOTE =
  "Independent interface studies that explore one design discipline across different industries. These are design concepts, not shipped products or client work. Every company name, logo and figure shown inside them is fictional sample data.";

export const CONCEPTS: Concept[] = [
  {
    slug: "atlas-ops",
    name: "Atlas Ops",
    category: "Business operations",
    tagline:
      "A control surface for a whole business, where revenue, invoices, projects and work orders stay calm at high density.",
    highlights: [
      "A revenue, invoice and work order overview that stays scannable as the data thickens",
      "One accent colour carrying status across eight screens, so meaning never rests on hue alone",
      "Tables, charts and schedules sharing a single spacing rhythm",
    ],
    surfaces:
      "Dashboard, customers, projects, calendar, invoices, reports, team directory, settings.",
    image: "/lab/atlas-ops.png",
    alt: "Atlas Ops design study: eight screens for a business operations platform, including a revenue dashboard, a customer table, a project list and a settings page. All data shown is fictional.",
  },
  {
    slug: "pulse-crm",
    name: "Pulse CRM",
    category: "Sales and CRM",
    tagline:
      "A relationship workspace built around the pipeline, so a deal, its people and its history sit together.",
    highlights: [
      "A pipeline board that reads as a funnel before you read a single label",
      "Contact profiles that surface the next action, not only the record",
      "An email timeline woven into the deal rather than parked in a separate inbox",
    ],
    surfaces:
      "Pipeline, contact profile, companies, email timeline, calendar, opportunities, reports, settings.",
    image: "/lab/pulse-crm.png",
    alt: "Pulse CRM design study: nine screens for a sales CRM, including a deal pipeline, a contact profile, a companies table and a sales report. All data shown is fictional.",
  },
  {
    slug: "sprintflow",
    name: "SprintFlow",
    category: "Project management",
    tagline:
      "Agile delivery made legible, from the kanban board to the backlog to the velocity a lead actually checks.",
    highlights: [
      "Kanban, backlog, timeline and workload views built from the same components",
      "Status carried by shape and label together, never by colour on its own",
      "A velocity view that answers the one question a delivery lead keeps asking",
    ],
    surfaces:
      "Kanban board, sprint backlog, timeline, calendar, team workload, issue tracker, reports, settings.",
    image: "/lab/sprintflow.png",
    alt: "SprintFlow design study: nine screens for a project management tool, including a kanban board, a sprint backlog, a project timeline and a velocity report. All data shown is fictional.",
  },
  {
    slug: "insight-analytics",
    name: "Insight",
    category: "Analytics",
    tagline:
      "An analytics suite that stays readable as it deepens, from a ten second overview to a full report builder.",
    highlights: [
      "An executive overview a non analyst can read in ten seconds",
      "A report builder that stays calm while offering real depth",
      "Each theme tuned so dense figures never fight the eye",
    ],
    surfaces:
      "Executive dashboard, revenue, customer insights, geography, forecasting, performance, KPI explorer, report builder.",
    image: "/lab/insight-analytics.png",
    alt: "Insight design study: eight screens for an analytics platform, including an executive dashboard, a revenue breakdown, a geographic view and a report builder. All data shown is fictional.",
  },
  {
    slug: "commerceos",
    name: "CommerceOS",
    category: "Commerce",
    tagline:
      "A store back office shaped around the operator's day, with products, orders, inventory and shipping one move apart.",
    highlights: [
      "Products, orders, inventory and shipping all reachable in a single move",
      "A dashboard that leads with the numbers a shop owner opens first",
      "Eight screens that stay consistent across very different tasks",
    ],
    surfaces:
      "Store dashboard, products, orders, customers, inventory, discounts, shipping, analytics.",
    image: "/lab/commerceos.png",
    alt: "CommerceOS design study: eight screens for a store back office, including a dashboard, a product catalogue, orders, inventory, shipping and analytics. All data shown is fictional.",
  },
  {
    slug: "nimbus-admin",
    name: "Nimbus Admin",
    category: "Platform administration",
    tagline:
      "The control room of a platform, where users, keys, billing and live health each get room to breathe.",
    highlights: [
      "Users, organizations, keys and billing each given their own clear space",
      "A live system view that reads as reassuring rather than alarming",
      "Audit and security surfaces designed to be trusted at a glance",
    ],
    surfaces:
      "Users, organizations, API keys, billing, audit logs, system monitoring.",
    image: "/lab/nimbus-admin.png",
    alt: "Nimbus Admin design study: six screens for a platform admin, including user management, an API keys table, a billing overview and a system monitor. All data shown is fictional.",
  },
  {
    slug: "nova-design-system",
    name: "Nova",
    category: "Design system",
    tagline:
      "A design system documented as a product in itself, with tokens, components and accessibility guidance in one place.",
    highlights: [
      "Tokens, components and accessibility guidance treated as one product",
      "Every colour pair carrying a stated contrast ratio, not an assumed one",
      "Guidance written to be used, not filed",
    ],
    surfaces:
      "Typography, colour, buttons, forms, navigation, components, icons, accessibility.",
    image: "/lab/nova-design-system.png",
    alt: "Nova design study: eight documentation screens for a design system, covering a type scale, a colour palette, buttons, forms, an icon set and accessibility guidance.",
  },
  {
    slug: "ai-workspace",
    name: "Eight dashboards, one system",
    category: "Cross domain, dark",
    tagline:
      "One visual language stress tested across eight role based dashboards, to prove a single system can dress very different jobs.",
    highlights: [
      "Eight role based dashboards built on a single component set",
      "One dark theme holding analytics, commerce, finance and support together",
      "Consistency that reads as intent rather than repetition",
    ],
    surfaces:
      "Analytics, ecommerce, project, CRM, finance, helpdesk, HR and learning dashboards, one dark theme.",
    image: "/lab/ai-workspace.png",
    alt: "A design study of eight role based dashboards, from analytics and commerce to finance, HR and support, built on one dark theme. All data shown is fictional.",
  },
  {
    slug: "finance-platform",
    name: "Nine dashboards, one system",
    category: "Cross domain, light",
    tagline:
      "The same exercise in a light theme, nine dashboards across different domains sharing one component set.",
    highlights: [
      "Nine dashboards unified by one spacing and type system",
      "Dense figures kept legible on a bright ground",
      "A light counterpart that proves the system travels across modes",
    ],
    surfaces:
      "Analytics, sales, project, customer, finance, marketing, inventory, HR and support dashboards, one light theme.",
    image: "/lab/finance-platform.png",
    alt: "A design study of nine dashboards across different domains, built on one light theme. All data shown is fictional.",
  },
];
