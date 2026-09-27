# Project Guidance

## User Preferences

- Apple-like light visual style: clean, minimal, generous whitespace, white background, dark neutral text, soft gray surfaces, subtle borders and shadows
- Scroll-triggered animations must replay every time a section re-enters the viewport, in both scroll directions
- Site name: Perfect Records Official
- Include a Video Editing branch and a Poster Design branch
- Include the YouTube channel link and studio stats
- Official emblem logo (gold guitar headstock, black vinyl disc, blue wings, gold signal arcs) is the brand mark; present it on a dark backing plate so it reads on the light theme
- Gold and blue brand accents are allowed as accents only; the page stays white and Apple-clean

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- With [canisters.backend.migrations] check-limit = 1, a develop pass must fold new state into the existing baseline migration file rather than adding a second migration file; two pending migrations fail the stable-compatibility gate.
- A frozen/read-only baseline migration file (mode 0444) must be made writable (chmod u+w) before it can be rewritten; use unlink to remove a superseded migration file.
- Replay-on-every-scroll requires an IntersectionObserver that resets the node to [data-revealed='false'] on exit; a one-shot observer only fires once and cannot replay in both directions.
- CountUp must reset its displayed value to 0 when the observed node leaves the viewport so counters re-run on every re-entry.
- Cross-section prefill via a window CustomEvent keeps a CTA and a form decoupled without shared state.
- lib/site.ts is the single source for footer and floating-button contact details; a section component keeping its own contact map must be updated together to avoid drift.
- Biome's a11y rules rewrite div[role=dialog] into a native <dialog open> element and in-page <a href="#id"> into a <button>; write the native forms from the start.
- An auto-derived OQL entity whose record has a variant field needs a <Type>Value.mo module exporting _toRow : T -> OQL.Value, imported top-level in the entity-declaring file.
- getApiDoc must live in its own mixin as a bare top-level mixin () block returning a static Markdown literal directly from the function body — never bound to a top-level let, which would be stable state and trap at runtime.
- The local preflight tester blocks off-origin navigation and external-communication submits, so external link destinations and form submit confirmations may be reported inconclusive even when the app is correct.
- Retuning the :root OKLCH tokens plus removing <html class="dark"> and the dark meta tags converts the whole site to light because every app component uses semantic classes; only the ui/* dark: variants and bg-black/50 overlays remain dark-tuned.
- The .dark token block can be deleted entirely once the root html class is removed, since nothing toggles it at runtime.
- shadow-subtle and shadow-elevated are the light-theme shadow tokens in tailwind.config.js; reuse them for form surfaces and hover states instead of a removed shadow-accent.
- The uploaded emblem PNG has a solid black background (not transparent), so render it inside a dark circular plate with object-cover and a slight scale-up to crop the black square into a clean disc.
- SITE.emblem in lib/site.ts is the single source for the emblem path and alt text; navbar, footer, and hero all read from it to avoid drift.
- RevealDirection must include 'cover' in types/index.ts or the Reveal direction prop rejects it; the CSS variant alone is not enough.
- A dedicated VIDEO_ALBUM_POSTER slot in lib/site.ts keeps the branch poster swappable without touching layout or the SERVICES cards.
- Accent ramps live as raw extra custom properties in :root (--gold/--blue/--brand plus -soft/-strong/-foreground) surfaced in tailwind.config.js as nested gold/blue/brand color objects; use those tokens instead of hardcoded hex.
- Confirming brand images survived the build's asset-pruning scan is a two-step check: ls dist/assets/generated/ for the file AND grep the compiled dist/assets/*.js for the path string.
