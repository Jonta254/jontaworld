# /public/lab — drop the nine concept boards here

The Lab page (`app/lab/page.tsx`) expects one image per concept, at these exact
filenames. Save each board you pasted into chat as the matching file below.
PNG is fine — Next/Image serves optimised WebP/AVIF automatically. WebP is even
smaller if you can export it (just keep the same base name, e.g. `atlas-ops.webp`,
then update the `image:` path in `content/concepts.ts`).

Recommended: capture/export each board at ~1600px wide or larger. The page frames
them on a fixed 3:2 plate and contains them, so slightly different source ratios
letterbox cleanly with no layout shift.

| Save as | Concept |
|---|---|
| `atlas-ops.png`          | Atlas Ops — Business operations |
| `pulse-crm.png`          | Pulse CRM — Sales & CRM |
| `sprintflow.png`         | SprintFlow — Project management |
| `insight-analytics.png`  | Insight — Analytics |
| `commerceos.png`         | CommerceOS — E-commerce |
| `nimbus-admin.png`       | Nimbus Admin — Platform administration |
| `nova-design-system.png` | Nova — Design system |
| `ai-workspace.png`       | Eight dashboards, one system — multi-domain, dark theme (image 8) |
| `finance-platform.png`   | Nine dashboards, one system — multi-domain, light theme (image 9) |

Once the files are here, run `npm run dev` (or build) and visit `/lab`.
Delete this file afterwards — it is not needed at runtime.
