# jontAWorld

A design and engineering portfolio for Josiah. The site presents shipped digital products, detailed case studies, interface studies, and writing about the overlap between electrical work, software architecture, and visual design.

**Live site:** [jontaworld.com](https://jontaworld.com)
**Contact:** [jontaworld@gmail.com](mailto:jontaworld@gmail.com)

## What the site demonstrates

- Complete product work rather than isolated UI mockups
- Long-form case studies grounded in real constraints and verifiable outcomes
- A reusable design system with light and dark themes
- Responsive editorial art direction for technical writing
- Server-rendered pages with small, focused client-side islands
- Keyboard, reduced-motion, contrast, print, and screen-reader considerations
- Search metadata, structured data, sitemap, social cards, and a web manifest
- Continuous integration for types, linting, production builds, links, and Lighthouse budgets

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Positioning, selected work, principles, and services |
| `/portfolio` | All production projects |
| `/portfolio/[slug]` | Project evidence and case studies |
| `/lab` | Interface and product concept studies |
| `/about` | Background and working philosophy |
| `/blog` | Technical and design essays |
| `/now` | Current focus and availability |
| `/contact` | Direct contact details and enquiry form |

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- CSS Modules and a token-based design system
- `next/image` and `next/font`
- Web3Forms for contact delivery
- Vercel Analytics
- GitHub Actions and Lighthouse CI

The homepage and most content pages are React Server Components. Client JavaScript is reserved for interactions that require it, such as navigation state, theme control, copy-to-clipboard, and the contact form.

## Local development

Requirements:

- Node.js 20 or newer
- npm

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact delivery

The contact form sends through the free Web3Forms browser API. Its access key is a public form identifier by design, so no private runtime credential is required. The interface stays on the page and reports success only when Web3Forms accepts the message.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run check:links
npm run build
```

Pull requests also run mobile Lighthouse CI against the homepage, About, Work, a flagship case study, and Writing. Current enforced minimums are:

- Performance: 95
- Accessibility: 100
- Best practices: 95
- SEO: 100

## Content architecture

Reusable facts and editorial content live in `content/`. Components render that content without duplicating claims across routes. Project links are checked in CI, and sitemap entries are generated from the same content records that generate pages.

Writing artwork lives in `public/writing/`. Production pages reference optimized WebP files through `next/image`; high-resolution source PNGs are intentionally excluded from Git.

## Design principles

1. Evidence before claims.
2. Real products before decorative mockups.
3. Legibility before motion.
4. Accessible behavior is part of the design, not a later audit.
5. Performance is a user-experience constraint.
6. No fabricated metrics, research, testimonials, or outcomes.

## Deployment

The project is designed for Vercel. The canonical production domain is `jontaworld.com`, served through Cloudflare and connected to the deployment origin.

## License

The source is publicly visible as portfolio evidence. No reuse license is currently granted. All written content, visual identity, and generated editorial artwork remain reserved unless permission is provided explicitly.

