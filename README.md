# HeimerClean — marketing site

A ground-up redesign of [heimerclean.com](https://heimerclean.com): a fast, animated, mobile-first landing page for the HeimerClean Windows PC optimizer.

**Stack:** Vue 3 (`<script setup>` + TypeScript) · Vite · Tailwind CSS v4 · [Motion for Vue](https://motion.dev/docs/vue) (spring physics) · [Reka UI](https://reka-ui.com) (accessible dialog & accordion) · Lucide icons · Inter / Geist Mono.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4317
npm run build      # type-check + production build into dist/
npm run preview    # serve the build on http://localhost:4318
```

## Pages

| Route | What it is |
|---|---|
| `/` | Marketing home (hero, product tour, features, AI optimizer, story, testimonials, pricing, FAQ, contact) |
| `/store` | Plans with annual / monthly / 30-day trial billing, seat picker, competitor discount, live order summary, comparison table |
| `/download` | Free-trial download flow, install steps, system requirements, Defender notice |
| `/docs/:slug` | Documentation with sidebar, search (⌘K / Ctrl+K), table of contents and prev/next — content in `src/data/docs.ts` |
| `/support` | Help search, topics, contact options and contact form |
| `/legal/:slug` | Company, Terms of Use, Privacy Policy and Cookie Policy — content in `src/data/legal.ts` |

The site is a single-page app: `vercel.json` and `public/_redirects` rewrite all routes to `index.html` on Vercel / Netlify.

### Publish on GitHub Pages

1. Push this repo to GitHub.
2. In the repo go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` and publishes to `https://<user>.github.io/<repo>/` (or your custom domain).

The workflow builds with the right base path automatically. Reference files from `public/` through `$asset('/images/…')` in templates or `asset()` from `src/lib/asset.ts` in scripts so they keep working under a sub-path.

Set the real links in `src/data/site.ts`: `brand.installerUrl` (direct `.exe` download) and `brand.checkoutUrl` (payment page — `plan`, `billing`, `seats` and `offer` are appended as query params).

## Social links, footer and languages

- **Social profiles, footer columns and legal links** live in `src/data/social.ts`. The 11 channels (Web, YouTube, Instagram, LinkedIn, X, TikTok, Discord, Telegram, WhatsApp, GitHub, Email) power both the footer avatars and the Community section. Clear a network's `url` to hide it everywhere. TikTok, Discord, Telegram, GitHub and Product Hunt URLs are guessed from the `heimerclean` handle — confirm them before launch.
- **Startup listings & press** (Community section: StartupList, F6S, Crunchbase, Product Hunt; TÜBİTAK, BTM, EU Seal of Excellence) live in `src/data/press.ts`. The F6S profile URL is a guess — replace it with the real link.
- **Transition colors**: every gradient, ring and glow runs between `--tr-a` `#f0ff00` and `--tr-b` `#ba00ff` (a direct two-stop blend, no other hues in between). Use the `bg-transition`, `bg-transition-soft`, `ring-transition` and `text-accent-gradient` utilities in `src/style.css`.
- **Language picker** (header, mobile menu, footer) uses Google Translate: the widget script only loads after a visitor picks a language, the choice is kept in the `googtrans` cookie, and English reloads the original page. Add or remove languages in `languages`. Elements marked `translate="no"` (brand name, counters, prices) are never translated.
- **Legal pages** are plain-language summaries — have them reviewed before relying on them.

## Structure

```
src/
  style.css              Design tokens (colors, type scale, shadows) + utilities
  data/site.ts           All copy, stats, plans and FAQ — edit content here
  composables/           Theme, active-section tracking, pricing loader
  components/ui/         Primitives: Button, Reveal, SpotlightCard, FloatingField, Skeleton, Mascot
  components/*.vue       Page sections (Header, Hero, Stats, Features, AI Optimizer,
                         Pricing, FAQ, Contact, CTA, Footer, mobile action bar,
                         floating help assistant, animated hero mascot)
```

## Images

```
public/images/
  screens/   Real app screenshots (dashboard idle/run, report, performance, settings)
  mascot/    Heimer mascot cut-outs (poses + faces), transparent WebP
  stickers/  Sticker pack (38 transparent WebP) — used in the draggable newsletter block
  social/    Round mascot avatars per platform
  banners/   Profile cover, YouTube and "follow us" banners (Community section)
  highlights/ Circle story highlights (Community profile card)
  steps/     "Get started" illustrations (mascot on brand-blue panels)
  brand/     Microsoft Defender notice from the original site
```

Use the mascot through `<UiMascot pose="wave" anim="float" />` (`components/ui/UiMascot.vue`). Poses: `hero`, `wave`, `scan`, `done`, `point`, `help`, `search`, `boost`, `energy`, `thanks`, `support`; faces: `face-excited`, `face-happy`, `face-smile`, `face-wink`, `face-thinking`, `face-surprised`, `face-sad`. `anim` is `float`, `bob` or `wave`.

Screenshots are 1024×576 WebP. Replace them with same-named files to update the site; the personal email in `settings.webp` is masked.

## Notes

- **Brand colors:** purple (`--accent`, `#ba00ff` light / `#cf5cff` dark) paired with lime `#f0ff00` for transitions, the mascot's golden hair as the secondary `--sun` color, on violet-tinted neutrals.
- **Theme:** dark by default, light mode via the header toggle (persisted in `localStorage`).
- **Pricing** is loaded through `usePlans()` with a simulated delay so the skeleton state is visible. Append `?pricing=error` to the URL to preview the error/retry state. Monthly prices in `data/site.ts` are placeholders — only the annual "from" prices come from the live store.
- **Contact form** validates inline and uses a mock transport; wire `submit()` in `ContactSection.vue` to your support endpoint.
- **Motion** respects `prefers-reduced-motion`.
