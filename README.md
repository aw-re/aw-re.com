# AW-RE Tech

Bilingual company website for [aw-re.com](https://aw-re.com), built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Lucide. English and Arabic routes render with the appropriate document language and direction. Fonts are self-hosted through Fontsource; pages require no third-party font or animation CDN.

## Development

Use Node.js 24 LTS and npm. Work in the existing checkout; a separate worktree is unnecessary.

```sh
npm ci
npm run dev
```

The root redirects to `/en`. Arabic is at `/ar`; the language switch preserves the current page, including project pages. Standard pages are Home, Services, Projects, About, and Contact. Project data lives in `data/site.ts`; reusable UI and illustrations live in `components/`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

For browser tests after building:

```sh
npx playwright install chromium
npm run test:e2e
```

The test configuration uses `/usr/bin/chromium` when available and otherwise the Playwright browser. Browser tests start a separate production server with email credentials disabled; they never send email. They cover both languages, responsive overflow, menu keyboard behavior, language switching, form validation/error states, metadata, API validation, and automated accessibility checks. Automated checks complement visual and keyboard review; they do not certify accessibility or Core Web Vitals.

## Contact delivery

The existing Resend integration has been migrated to `app/api/contact/route.ts`. Set these in the hosting provider's secure environment configuration (or an ignored `.env.local` file):

- `RESEND_API_KEY`: Resend API credential.
- `CONTACT_TO_EMAIL`: actual destination inbox.
- `CONTACT_FROM_EMAIL`: a sender on your verified Resend domain.
- `CONTACT_SUBJECT_PREFIX`: optional enquiry subject prefix.

Never commit real values. `.env.example` documents the names only. The form returns an honest unavailable state with direct email/WhatsApp alternatives until credentials are configured. Frontend and backend share validation. Organization is a normal optional field; `website` is the separate hidden spam trap. The endpoint bounds requests to 12 KiB, sends plain text, and times out external requests. Use hosting-level rate limiting/bot protection for public traffic. Real delivery must be verified separately with an authorized test after configuring the sender.

## Content and visuals

The three project summaries and technology labels follow the supplied brief. Dashboard compositions are original HTML/CSS illustrations, explicitly identified as illustrations on the projects and detail pages. They are not customer screenshots. Case-study descriptions and results must be replaced with approved project information; no metrics or testimonials are invented. LinkedIn and YouTube remain noninteractive placeholders until real URLs are provided. GitHub and WhatsApp are linked.

The supplied About-page portrait is stored at `public/images/abdulwahab-al-reyashi.jpg`; responsive framing preserves its natural colors and keeps the face visible. The wordmark in `public/brand/aw-re-tech.png` is a transparent rendition prepared from the supplied company logo. `Logo` in `components/ui.tsx` is shared by the header, footer, and hero/about illustrations. CSS frames its visible artwork without stretching it or reversing its lettering in RTL. The original raster still contains edge texture; replace it with the original clean SVG export when available for exact vector fidelity.

## Deployment

Deploy as a Node-capable Next.js application (for example Vercel), with `npm ci` and `npm run build`. Static-only hosting is insufficient for the contact API. For self-hosting run `npm start` behind a TLS reverse proxy. Canonical URLs, language alternates, Organization schema, generated social image, robots, and sitemap use `https://aw-re.com`; update the centralized metadata and sitemap if the domain changes.

Keep dependencies and the lockfile together. Publish only after reviewing the content, configuring email delivery, and verifying the production domain. No deployment is performed by local build or tests.
