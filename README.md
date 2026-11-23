# loureo.com

Loureo is an innovation lab in Madrid, Spain. This is its website: the lab's home at `/` and one page per project
(today, Almenara at `/almenara/`). Static, multi-page, built with Vite; deployed on Vercel (`vercel.json`).

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
```

| Path | What it is |
| --- | --- |
| `index.html`, `src/studio/` | The lab's home page (paper and ink, serif statements, looping catalogue) |
| `almenara/`, `src/almenara/` | Almenara's product page (dark, scroll-driven render sequences) |
| `public/almenara/` | Almenara's renders: `seq/<shot>/{lg,sm}/####.webp` (+ `anchors.json`) and `img/` |
| `src/shared/i18n.js` | EN in the HTML, ES applied on top; each page passes its own Spanish strings. The choice is shared across pages |

Context for working on the site: [CLAUDE.md](CLAUDE.md), [PRODUCT.md](PRODUCT.md) (voice) and [DESIGN.md](DESIGN.md) (design system).

The renders are made in `Loureo/almenara-hardware` (`web-renders/`, Blender Cycles from the CAD model) and exported here with
`WEB_PUBLIC=<this repo>/public/almenara zsh tools/render/export_web.sh` (from `web-renders/`).

Almenara's waitlist posts to `VITE_WAITLIST_ENDPOINT` (see `.env.example`); without it the form says it is not connected.
Pages move with cross-document view transitions (the home page's Almenara card opens into the product's hero), with a fade
for browsers that do not support them.

## Licence

© 2026 Loureo. All rights reserved. The source is public so the site can be built and reviewed; it is not licensed
for reuse. That includes the code, the copy, the Almenara renders and the Loureo and Almenara names and marks.
