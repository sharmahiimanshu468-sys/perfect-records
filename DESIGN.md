# Design Brief

## Direction

White Room — an Apple-clean light studio site: pure white page, dark neutral ink, soft gray surfaces, with a restrained metallic-gold / electric-blue accent layer drawn from the studio emblem.

## Tone

Refined minimalism executed with conviction: generous whitespace, hairline borders, soft shadows, and large imagery — the gold/blue accents are punctuation, never scenery.

## Differentiation

A dark-backed circular emblem (gold headstock, black vinyl, blue wings) anchoring a white editorial page, with a slow one-directional gold sheen sweeping its metallic surfaces and a scroll-driven cover-open settle on the video-album poster that replays on every viewport pass.

## Color Palette

| Token      | OKLCH           | Role                                              |
| ---------- | --------------- | ------------------------------------------------- |
| background | 1 0 0           | pure white page                                   |
| foreground | 0.21 0.006 265  | primary dark neutral ink                          |
| card       | 0.985 0.0015 265| elevated surfaces, header/footer bands            |
| primary    | 0.24 0.008 265  | near-black structural ink: CTAs, wordmark         |
| accent     | 0.955 0.003 265 | quiet neutral hover/active wash                   |
| gold       | 0.72 0.135 85   | metallic gold accent: hairlines, dots, sheen      |
| blue       | 0.55 0.17 258   | electric blue accent: chips, wing motifs          |
| muted      | 0.965 0.002 265 | secondary surfaces, chips, dividers               |
| border     | 0.92 0.003 265  | hairline separation between zones                 |
| destructive| 0.55 0.2 27     | form validation errors                            |
| success    | 0.55 0.14 152   | form success feedback                             |

## Typography

- Display: Space Grotesk — hero wordmark, section headings, oversized numerals
- Body: General Sans — paragraphs, card copy, nav, form fields
- Mono: Geist Mono — stats strip numerals, uppercase tracked section labels
- Scale: hero `text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `font-mono text-xs font-medium tracking-[0.28em] uppercase text-muted-foreground`, body `text-base md:text-lg text-muted-foreground`

## Elevation & Depth

Depth comes from layered white/gray surfaces, hairline borders, and soft neutral shadows (`shadow-subtle`, `shadow-elevated`); the emblem sits on a dark circular backing plate so its gold linework and black vinyl hold contrast.

## Structural Zones

| Zone    | Background                            | Border              | Notes                                                              |
| ------- | ------------------------------------- | ------------------- | ------------------------------------------------------------------ |
| Header  | `bg-card/80 backdrop-blur-xl`         | `border-b` hairline | sticky, translucent; emblem + wordmark left, links center, pill right |
| Content | `bg-background` base                  | —                   | alternate `bg-muted/30` bands; gold/blue hairline accents per band |
| Footer  | `bg-muted/40`                         | `border-t` hairline | studio blurb, service links, contact block, small emblem, copyright |

## Spacing & Rhythm

Sections breathe at `py-24 md:py-32` with `container` gutters; card grids gap `6`–`8`; micro-spacing is tight (`gap-2`–`gap-3`) inside chips, labels, and stat groups.

## Component Patterns

- Buttons: primary = near-black solid, `rounded-md`, white text, hover lift + `shadow-elevated`; secondary = 1px hairline outline, transparent, hover border warms to gold
- Cards: `rounded-lg` on `bg-card` with hairline border; hover lifts 6px and warms the border; poster cards get a gold top edge
- Badges: pill chips — `rounded-full`, `bg-blue-soft/60`, hairline border, blue text, gold dot
- Brand mark: emblem on a `rounded-full` dark plate, `brand-sheen` overlay for the metallic sweep

## Motion

- Entrance: scroll-reveal via IntersectionObserver toggling `[data-reveal]` → `[data-revealed]` — fade + 40px translate + 0.985 scale, 0.85s `cubic-bezier(0.16,1,0.3,1)`; observer must re-arm on exit so it replays in both scroll directions
- Poster: `[data-reveal="cover"]` adds a scroll-driven cover-open settle (rotateY −12° → 0°, rotateZ −2° → 0°, scale 0.94 → 1) that replays on every viewport entry
- Stagger: `.stagger-1`…`.stagger-6` set `--reveal-delay` 80ms–480ms for card/text-line cascades
- Parallax: `.parallax-layer` with `--parallax-y` written on scroll for hero and section background depth
- Decorative: `animate-brand-sheen` one-directional metallic sweep across the emblem, `animate-waveform` audio bars, `animate-float` / `animate-pulse-glow` ambient orbs, `animate-marquee` genre ribbon
- Reduced motion: `@media (prefers-reduced-motion: reduce)` forces all reveal/parallax content (including `cover`) to final state and disables decorative animations

## Constraints

- Light-first only: white page, dark neutral ink; no dark-mode toggle and no dark theme
- Gold and blue are ACCENTS ONLY — the page stays white and Apple-clean; no full-page gradients, no purple, no neon
- All color via semantic OKLCH tokens; no hex, `rgb()`, or arbitrary Tailwind color classes in components
- The emblem must keep its circular aspect ratio and sit on a dark backing plate on light surfaces
- Do not build a video album gallery with multiple posters/lightbox, or a dark-mode toggle

## Signature Detail

The dark-plate emblem with a slow gold sheen sweep against the pure white page — the "gold record under gallery light" moment that anchors the brand.
