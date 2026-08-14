# jontAWorld

A design and engineering portfolio for Josiah. The site presents shipped digital products, detailed case studies, interface studies, and writing about the overlap between electrical work, software architecture, and visual design.

**Live site:** [josiah-rawsignal.vercel.app](https://josiah-rawsignal.vercel.app)
**Contact:** [josiah@rawsignal.dev](mailto:josiah@rawsignal.dev)

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
- Resend for contact delivery
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

## Environment

Copy `.env.example` to `.env.local` and provide server-side values:

```bash
RESEND_API_KEY=re_replace_me
CONTACT_EMAIL=josiah@rawsignal.dev
CONTACT_FROM_EMAIL=jontAWorld Contact <hello@rawsignal.dev>
```

`CONTACT_FROM_EMAIL` must use a sender identity verified in Resend. If delivery is not configured or Resend rejects the request, the API returns an error and the interface tells the visitor to use the direct email address. It never reports a message as sent when delivery did not occur.

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

The project is designed for Vercel. Production requires the three contact environment variables above. A custom `rawsignal.dev` domain is the recommended canonical deployment target; until that migration is complete, metadata uses the current Vercel URL.

## License

The source is publicly visible as portfolio evidence. No reuse license is currently granted. All written content, visual identity, and generated editorial artwork remain reserved unless permission is provided explicitly.
