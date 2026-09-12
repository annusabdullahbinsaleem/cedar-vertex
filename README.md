# Cedar Vertex Website

A Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 marketing site for Cedar Vertex.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Notes

- Fonts are bundled locally via `@fontsource` (Space Grotesk for display, Inter for body) so the site works without any external network calls.
- `public/logo/cedar-vertex-logo.svg` (navbar + footer) and `cedar-vertex-mark.svg` (favicon) are the official Cedar Vertex logo files as supplied, unmodified except for a tightened `viewBox` (the source files ship on a 1000×1000 canvas with the artwork occupying only part of it — cropping the *frame*, not the artwork, was needed so the logo doesn't render tiny with huge padding).
- **Known issue in the supplied logo files themselves:** the wordmark text uses `font-family: HelveticaNeue-Bold` / `HelveticaNeue-Roman`, a licensed font that isn't bundled with the site (or installed on most Windows/Linux machines). Each letter's position is hard-coded to that font's exact character widths, so on any system without Helvetica Neue installed, the browser substitutes a fallback font and the letters overlap — "CEDAR VERTEX" renders as "CEDAR VRTEX" with the R/T colliding. This reproduces even in isolated SVG rendering, independent of this site's code. Fix: in Illustrator/Figma, select the text and use "Create Outlines" (Illustrator) or "Flatten"/"Outline stroke" (Figma) to convert the letters to vector paths, then re-export — that removes the font dependency entirely with no visual change, and I can drop the corrected file straight in.
- Project thumbnails in the "Work" section are abstract colour blocks, not real screenshots, since no real case-study images or client names were supplied — replace `src/components/Work.tsx` content and add real images under `public/images` when you have them.
- All copy is original placeholder copy written for Cedar Vertex; replace with real project details once available.
