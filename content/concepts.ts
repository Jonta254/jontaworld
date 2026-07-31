/**
 * The Lab — self-initiated interface concepts.
 *
 * These are DESIGN STUDIES, not shipped products and not client work. They
 * exist to show interface and design-system range across industries. Every
 * company name, logo, avatar and figure inside the screens is fictional sample
 * content — this is stated plainly on the page (see LAB_NOTE) so nothing here
 * can be mistaken for a real customer or a real deployment.
 *
 * This is the honest way to show the work: `creative-brief.md` allows
 * self-initiated pieces "provided they are honestly labelled as personal
 * projects" and §10 forbids presenting concepts as shipped client software.
 *
 * Images live in /public/lab/<slug>.png — a single captured board per concept.
 */

export type Concept = {
  slug: string;
  /** The concept's working name. A study title, not a brand. */
  name: string;
  /** The domain it explores. */
  category: string;
  /** One line: what interface problem the study takes on. */
  tagline: string;
  /** The screens shown in the board, so the breadth is legible without a link. */
  surfaces: string;
  /** Captured board in /public/lab. */
  image: string;
  /** Full description for anyone who can't see the image. */
  alt: string;
};

/** Shown prominently at the top of the page. Non-negotiable framing. */
export const LAB_NOTE =
  "Self-initiated interface studies, exploring one design discipline across different industries. These are design concepts, not shipped products or client work — every company name, logo and figure shown inside them is fictional sample data.";

export const CONCEPTS: Concept[] = [
  {
    slug: "atlas-ops",
    name: "Atlas Ops",
    category: "Business operations",
    tagline:
      "An operations console for a mid-size business — revenue, invoices, projects and work orders held in one calm, data-dense system.",
    surfaces:
      "Dashboard, customers, projects, calendar, invoices, reports, team directory, settings.",
    image: "/lab/atlas-ops.png",
    alt: "Atlas Ops design study: eight application screens for a business operations platform, including a revenue dashboard, a customer table, a project list, a calendar and a settings page. All data shown is fictional.",
  },
  {
    slug: "pulse-crm",
    name: "Pulse CRM",
    category: "Sales & CRM",
    tagline:
      "A relationship-management workspace built around the pipeline: deals, contacts, companies and the email timeline behind each one.",
    surfaces:
      "Sales pipeline, contact profile, companies, email timeline, calendar, opportunities, reports, settings.",
    image: "/lab/pulse-crm.png",
    alt: "Pulse CRM design study: nine screens for a sales CRM, including a deal pipeline board, a contact profile, a companies table and a sales report. All data shown is fictional.",
  },
  {
    slug: "sprintflow",
    name: "SprintFlow",
    category: "Project management",
    tagline:
      "Agile delivery made legible — a kanban board, a sprint backlog, a project timeline and a team-workload view that share one grammar.",
    surfaces:
      "Kanban board, sprint backlog, project timeline, calendar, team workload, issue list, velocity report, settings.",
    image: "/lab/sprintflow.png",
    alt: "SprintFlow design study: nine screens for a project-management tool, including a kanban board, a sprint backlog, a Gantt-style timeline and a velocity chart. All data shown is fictional.",
  },
  {
    slug: "insight-analytics",
    name: "Insight",
    category: "Analytics",
    tagline:
      "An analytics suite that stays readable as it deepens — executive overview, revenue analysis, geography and a drag-together report builder.",
    surfaces:
      "Executive dashboard, revenue analysis, customer insights, geographic analysis, forecasting, performance trends, KPI explorer, report builder.",
    image: "/lab/insight-analytics.png",
    alt: "Insight design study: eight screens for an analytics platform, including an executive dashboard, a revenue breakdown, a world map and a report builder, each on a distinct dark theme. All data shown is fictional.",
  },
  {
    slug: "commerceos",
    name: "CommerceOS",
    category: "E-commerce",
    tagline:
      "A store back office where the operator's day makes sense — products, orders, customers and channel analytics in one clean surface.",
    surfaces:
      "Store dashboard, product catalogue, orders, customer detail, analytics.",
    image: "/lab/commerceos.png",
    alt: "CommerceOS design study: five screens for an e-commerce admin, including a store dashboard, a product list, an orders table and a customer detail page. All data shown is fictional.",
  },
  {
    slug: "nimbus-admin",
    name: "Nimbus Admin",
    category: "Platform administration",
    tagline:
      "The control room of a SaaS platform — users, organizations, API keys, billing and live system health, each screen with its own accent world.",
    surfaces:
      "User management, organizations, API keys, billing & subscriptions, audit logs, system monitoring.",
    image: "/lab/nimbus-admin.png",
    alt: "Nimbus Admin design study: six screens for an enterprise admin portal, including user management, an API-keys table, a billing overview and a system-monitoring view. All data shown is fictional.",
  },
  {
    slug: "nova-design-system",
    name: "Nova",
    category: "Design system",
    tagline:
      "A design system documented as a product in itself — tokens, components and accessibility guidance, written to keep a team honest.",
    surfaces:
      "Typography, colour, buttons, forms, navigation, components, icons, accessibility.",
    image: "/lab/nova-design-system.png",
    alt: "Nova design study: eight documentation screens for a design system, covering a type scale, a colour palette, button variants, form components, an icon set and accessibility guidance.",
  },
  {
    slug: "ai-workspace",
    name: "Eight dashboards, one system",
    category: "Multi-domain · dark",
    tagline:
      "One visual language stress-tested across eight role-based dashboards — proof that a single system can dress very different jobs without coming apart.",
    surfaces:
      "Analytics, e-commerce, project management, CRM, finance, helpdesk, HR and learning dashboards — one dark theme.",
    image: "/lab/ai-workspace.png",
    alt: "A design study showing eight role-based dashboards — analytics, e-commerce, project management, CRM, finance, helpdesk, HR and learning — built on one shared dark-themed system. All data shown is fictional.",
  },
  {
    slug: "finance-platform",
    name: "Nine dashboards, one system",
    category: "Multi-domain · light",
    tagline:
      "The same exercise run again in a light theme — nine dashboards across different domains, sharing one component set so dense figures still read at a glance.",
    surfaces:
      "Analytics, sales, project, customer, finance, marketing, inventory, HR and support dashboards — one light theme.",
    image: "/lab/finance-platform.png",
    alt: "A design study showing nine light-themed dashboards — analytics, sales, finance, inventory, marketing, HR and support — unified by one component set. All data shown is fictional.",
  },
];
