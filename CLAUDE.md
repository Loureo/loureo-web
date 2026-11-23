# loureo.com · context for Claude Code

Read this first in every session. Then read [PRODUCT.md](PRODUCT.md) (who Loureo is, voice, copy rules) and
[DESIGN.md](DESIGN.md) (visual system) before touching copy or UI.

## Working with Jaime
- Answer in Spanish in chat; everything written to the repo (code, comments, docs, commits) in English.
- Don't agree by default: if a decision is weak, say so and propose an alternative. Cite sources for non-obvious claims.
- Check your work before calling it done: `npm run build` and look at the page in a browser (desktop and phone width).
- Never delete or overwrite what you did not create in the current task without asking. Commit or push only when asked.

## What this repo is
The website of Loureo, an innovation lab: the lab's home at `/` and one page per project (today Almenara, No. 01, at
`/almenara/`). Static multi-page site, Vite 8, vanilla JS, no framework.

| Path | What it is |
| --- | --- |
| `index.html`, `src/studio/` | The lab's home page (paper and ink; opening card, project loops, values, footer) |
| `almenara/index.html`, `almenara/specs/index.html`, `src/almenara/` | Almenara's product page and specs (black stage, render sequences) |
| `public/almenara/` | Almenara's assets: `seq/<shot>/{lg,sm}/####.webp` + `anchors.json`, `img/`, `video/` (catalogue loops) |
| `src/shared/i18n.js` | Language engine shared by every page (EN in HTML, ES dictionaries per page, choice saved as `loureo.lang`) |
| `vite.config.js` | One `rollupOptions.input` entry per page: add new pages there |

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
```

## Conventions
- New project: folder `/<project>/` + `src/<project>/` + `public/<project>/`; add the HTML to `vite.config.js`; add a tile to
  the home catalogue with a looping video cut from its renders (ping-pong, H.264 MP4 + WebP poster); give it the next
  number (No. 02…). Its page gets the Loureo mark in the nav linking to `/`.
- Translations: every visible string has `data-i18n` (or `data-i18n-alt` / `data-i18n-aria`); add the Spanish to the
  page's `ES` dictionary. The values' titles stay in English.
- Pin exact dependency versions in `package.json`.
- Respect `prefers-reduced-motion` in anything that moves.

## Almenara's renders
Made in `Loureo/almenara-hardware` (`~/Developer/Loureo/almenara-hardware/web-renders`, Blender Cycles from the CAD model in `3d_model/`).
Export into this repo with `WEB_PUBLIC=<this repo>/public/almenara zsh tools/render/export_web.sh` (run from `web-renders/`).
The catalogue loops are cut from `tools/render/out/hero` and `out/explode` frames 0–89 with ffmpeg (24 fps, ping-pong).

## Hosting and repos
- Code: GitHub `Loureo/loureo-web` (public; README says all rights reserved). Infra: `Loureo/loureo-infra` (private,
  Terraform Cloud org "Loureo", workspace `loureo-infra`, Route 53 + ACM). The old GitLab remotes (`origin`) are legacy.
- Deploy: Vercel (Hobby), production from `main`; `vercel.json` sets the Vite build. DNS in Route 53: apex A
  `76.76.21.21`, `www` CNAME `cname.vercel-dns.com`.
- Almenara's waitlist needs `VITE_WAITLIST_ENDPOINT` (see `.env.example`); without it the form says it is not connected.
