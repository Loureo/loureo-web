# loureo.com

Loureo is a hardware studio. This is its website: the studio at `/` and one page per product
(today, Almenara at `/almenara/`). Static, multi-page, built with Vite; deployed on Vercel (`vercel.json`).

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # → dist/
```

| Path | What it is |
| --- | --- |
| `index.html`, `src/studio/` | The studio page (light: paper, ink, mono labels) |
| `almenara/`, `src/almenara/` | Almenara's product page and specs (dark, scroll-driven render sequences) |
| `public/almenara/` | Almenara's renders: `seq/<shot>/{lg,sm}/####.webp` (+ `anchors.json`) and `img/` |
| `src/shared/i18n.js` | EN in the HTML, ES applied on top; each page passes its own Spanish strings. The choice is shared across pages |

The renders are made in the Almenara repo (`website/tools/render`, Blender Cycles from the CAD model) and exported here with
`WEB_PUBLIC=<this repo>/public/almenara zsh website/tools/render/export_web.sh`.

Almenara's waitlist posts to `VITE_WAITLIST_ENDPOINT` (see `.env.example`); without it the form says it is not connected.
Pages move with cross-document view transitions (the studio's Almenara card opens into the product's hero), with a fade
for browsers that do not support them.

## Licence

© 2026 Loureo. All rights reserved. The source is public so the site can be built and reviewed; it is not licensed
for reuse. That includes the code, the copy, the Almenara renders and the Loureo and Almenara names and marks.
