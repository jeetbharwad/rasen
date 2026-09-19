# Implementation Notes

## Previous work (Hero section)

Recreated the homepage hero from a screenshot: dark navy-to-teal gradient
background running behind both the header and hero, with a header (logo,
nav, sign-in/CTA buttons), an announcement badge, a serif headline, a CTA
button, and a row of partner "logo" pill placeholders.

**Components**
- `components/layout/Header.tsx` — logo, nav, auth buttons
- `components/layout/OceanBackground.tsx` — CSS-gradient stand-in for the
  aerial ocean photo (no real photo asset was supplied)
- `components/sections/Hero.tsx` — badge, headline, CTA, logo row
- `components/ui/Button.tsx` — `filled` / `outline` pill button
- `components/ui/Container.tsx` — centered `max-w-container` wrapper

**Design decisions / tokens** (`tailwind.config.ts`)
- `navy.{950,900,800}`, `teal.{600,400,200}`, `foam` — hero palette
- `rounded-pill`, `max-w-container` (1280px)
- `font-display` (Playfair Display, headline/logo serif) and `font-sans`
  (Inter, UI text), wired up via `next/font` in `app/layout.tsx`

## This task (Product overview section)

Added the second homepage section: "Rasen is made to / Understand & speak
not just answer." — a two-column block with a heading + product chat-UI
preview card on the left, and a description, divider and two stats
("Accuracy rate 98%", "Supported languages 135+") on the right, sitting on
a white background with a soft teal-to-white fade at the very top
(continuing the hero's wave imagery).

### Files created
- `components/sections/ProductOverview.tsx` — the section: eyebrow,
  heading, description, divider, stats grid; owns the top fade-in
  background treatment
- `components/sections/ProductPreviewCard.tsx` — lightweight recreation of
  the product screenshot (chat UI: nav rail, list panel, chat input,
  source tags). Built with divs/Tailwind, not an image, since no real
  product screenshot asset was supplied — see Assumptions.
- `components/ui/Stat.tsx` — reusable `{ label, value }` stat block, used
  via `.map()` over `PRODUCT_STATS` (no duplicated JSX for the two stats)
- `IMPLEMENTATION_NOTES.md` — this file

### Files modified
- `lib/constants.ts` — added `PRODUCT_OVERVIEW_CONTENT`, `PRODUCT_STATS`,
  `PRODUCT_PREVIEW_TAGS` data (copy lives in data, not hardcoded in JSX,
  matching the existing `HERO_CONTENT` / `PARTNER_LOGOS` pattern)
- `tailwind.config.ts` — added one new token, `lavender.{100,400}`, for the
  preview card's top bar / input-border accent. The dark sidebar in the
  card reuses the existing default Tailwind `teal-800`/`teal-50` shades
  (available because `colors.teal` is merged via `extend`, not replaced)
  rather than introducing another color family
- `app/page.tsx` — rendered `<ProductOverview />` directly under the
  existing hero block (hero markup itself is unchanged)

### Components reused
- `Container` for the centered max-width wrapper
- Existing `font-sans` token for all text in this section (the heading
  here uses the grotesque sans in the screenshot, not `font-display`,
  since this section's typography differs from the hero's serif)
- Existing color tokens (`teal-50`, `teal-800`, `neutral-*` from Tailwind's
  default palette) wherever they already matched the screenshot instead of
  adding new ones

### New reusable pieces
- `Stat` (`components/ui/Stat.tsx`) — reusable for any future stats row
- `lavender.{100,400}` token — reusable for future lavender/purple accents

### Integration point
`app/page.tsx`, directly after the hero block:
```tsx
<div className="relative">
  <OceanBackground />
  <Header />
  <Hero />
</div>
<ProductOverview />
```

### Assets required/added
No new binary assets were added. `ProductPreviewCard` is a CSS/markup
recreation of the product screenshot rather than an image file. If a real
product screenshot becomes available, replace the card's internals with a
single `next/image` (fixed aspect ratio, `object-cover`) inside the same
outer rounded/bordered wrapper, and the component's public shape
(no props, self-contained) won't need to change.

### Assumptions / limitations
- The card's chat UI (sidebar icons, list-panel skeleton rows, input,
  tags) is a simplified faithful recreation, not a pixel-traced copy —
  exact icon glyphs and skeleton-row counts inside the product mockup
  were approximated.
- The top-of-section teal-to-white fade is a CSS gradient tuned to match
  the screenshot's colors, not a cropped continuation of an actual photo
  asset (consistent with the hero's `OceanBackground` approach).
- Card aspect ratio (`aspect-[7/4]`) is derived from the screenshot's
  approximate pixel dimensions.

### Confirmation
The hero section (`Header`, `OceanBackground`, `Hero`) was not modified —
only wrapped in a `<div className="relative">` in `page.tsx` so the new
white section can sit below it without altering the hero's own layout or
styles.