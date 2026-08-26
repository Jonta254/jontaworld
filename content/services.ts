export type Service = {
  num: string;
  title: string;
  description: string;
  includes: string[];
};

export const SERVICES: Service[] = [
  { num: "01", title: "Personal and portfolio websites", description: "A custom site for your work, profile, or personal brand that feels specific to you.", includes: ["Visual design", "Project pages", "Contact setup", "SEO basics", "Social previews", "Deployment"] },
  { num: "02", title: "Business websites", description: "A clear company website that explains the business properly and turns visits into enquiries.", includes: ["Service pages", "Pricing", "Lead forms", "Booking enquiries", "Mobile design", "Analytics"] },
  { num: "03", title: "Web apps and internal tools", description: "Working software for real workflows, including dashboards, portals, admin tools, and learning platforms.", includes: ["Application UI", "Accounts", "Forms", "Workflows", "Data views", "Exports", "Offline use"] },
  { num: "04", title: "Online stores", description: "A focused storefront that makes products easy to find, understand, and buy.", includes: ["Product catalogue", "Storefront", "Cart", "Checkout", "Payment integration", "Order flow"] },
  { num: "05", title: "Landing pages and launches", description: "A focused page for a product, app, campaign, or launch with one clear action.", includes: ["Visual direction", "Message structure", "Responsive build", "Forms", "Calls to action", "Launch support"] },
  { num: "06", title: "Logo and visual identity", description: "A focused identity for a product, business, or personal brand, with the rules needed to use it consistently.", includes: ["Logo direction", "Wordmark", "Monogram", "Typography", "Colour system", "App icon", "Social assets"] },
  { num: "07", title: "Existing website improvement", description: "Improve what already exists without rebuilding it unnecessarily.", includes: ["Design review", "Responsive fixes", "Performance", "Accessibility", "Content structure", "Interface refinement"] },
];
