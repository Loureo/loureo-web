# Loureo · design system

The visual system of loureo.com, derived from what is built (`src/studio/studio.css`, `src/almenara/styles/`).
Voice and content rules: [PRODUCT.md](PRODUCT.md). When this file and the code disagree, fix one of them in the same change.

## Two worlds

| | The lab (`/`) | A project's page (`/almenara/`) |
| --- | --- | --- |
| Feel | An editorial, serious lab: paper and ink | A stage for the object: black, Apple-like |
| Background | Paper `#f5f4ef`, dark blocks `#141413` | Pure black `#000` |
| Type | Newsreader (serif) + Inter Tight (grotesk) | The object's own pair (Almenara: Funnel Display + Funnel Sans) |
| Imagery | Loops and stills of the objects, thin gutters | Scroll-driven render sequences, full bleed |

They meet in the page transition: the lab's catalogue tile and the object's hero share
`view-transition-name: almenara-hero`, so the image carries over. Each project page links back to the lab with the
Loureo mark in its nav.

## Lab tokens (`src/studio/studio.css`, `:root`; the folder keeps its first name)

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#f5f4ef` | Page background (warm off-white) |
| `--ink` | `#141413` | Text, icon strokes, rules at full strength |
| `--ink-2` | `#5e5d59` | Secondary text |
| `--ink-3` | `#8f8d86` | Labels, meta |
| `--line` | `rgb(20 20 19 / .12)` | Hairlines between cells and sections |
| `--dark` / `--on-dark` / `--on-dark-2` | `#141413` / `#f5f4ef` / `#a3a29c` | Footer and the opening card |
| `--blue` | `#0acbff` | Loureo blue. **A signal only** (something is open or live: the status dot). Never a fill, never decoration |
| `--gutter` | `clamp(1.25rem, 4vw, 3rem)` | Page side padding |
| `--gap` | `10px` | Between images (contact-sheet gutters) |
| `--max` | `1360px` | Content width |
| `--ease` / `--ease-io` | `cubic-bezier(.22,1,.36,1)` / `cubic-bezier(.65,0,.35,1)` | Arrivals / exchanges |

No border radius on images or cells on the lab's pages. No shadows. No gradients except scrims over images.

## Type

- **Statements and titles: Newsreader** (variable, optical sizes on), weight 400. Never bold.
- **Everything else: Inter Tight** (variable), 400 for text, 500 for names and emphasis.
- The lead statement mixes both, as Anthropic does: a sans lead in 500, then the sentence continues in serif
  ("**Loureo is an innovation lab in Madrid, Spain.** We explore new ways of working…").
- Scale: statement `clamp(1.9rem, 3.9vw, 3.4rem)/1.18`; section title `clamp(2rem, 4vw, 3.4rem)/1.1`; value title
  `clamp(1.4rem, 2vw, 1.75rem)/1.15`; body `1rem/1.5`; nav `0.875rem`; labels `0.75rem` uppercase, `0.04em` tracking.
- Large serif gets slight negative tracking (`-0.015em` to `-0.02em`); the sans lead `-0.035em`.

## Layout

- Nav: fixed, `3rem` tall, translucent paper with blur; logo mark + "Loureo", then small links (Projects, Values,
  Contact), language toggle on the right. A hairline appears once the page scrolls.
- Sections breathe: ~10–16vh vertical padding. Statements sit left, max ~24em wide.
- The catalogue is full bleed with `--gap` gutters: a 2:1 grid (main tile 16:10 + side tile), then a caption row
  aligned to the content column: `No. 01 · Name · one line · status · →`.
- Ruled grids (values): cells separated by `--line` hairlines, three columns → two (≤900px) → one (≤560px).

## Components

- **Opening card** (`.intro`): once per visit (sessionStorage `loureo.intro`), dark full screen with one line
  ("Loureo is an innovation lab"), it fades in, holds, then lifts away with a clip; the nav, statement and
  catalogue settle in underneath with staggered delays. Skipped with reduced motion.
- **Catalogue tile** (`.tile`): an object is never shown still. Each tile plays a muted, looping, inline video cut
  from the object's own renders (`public/<object>/video/*.mp4` + a WebP poster), played only while on screen.
  Loops are ping-pong (forward then back) so they never jump. Hover eases the video from 1.02 to 1 scale.
- **Status** (`.status`): uppercase label with a blue dot. Only for real states (Waitlist open).
- **Values** (`.values`): ruled cells with a large line icon, a serif title, a short grey line.
- **Footer** (`.sfoot`): dark, three columns: logo + legal (bottom) · link list with hairlines and arrows ·
  "Our purpose" statement and contact by type. On mobile: links, purpose, then brand.

## Icons

Line icons drawn for each idea, never from an icon set:
- `viewBox="0 0 64 64"`, `fill: none`, `stroke: currentColor/ink`, `stroke-width: 0.9` (in viewBox units: ~1.3px at
  ~96px), round caps and joins. Shown large: `clamp(4.5rem, 7vw, 6rem)`.
- Geometric and literal enough to read (a circle and a dot; three overlapping circles; an orbit; a branching path;
  a spiral; a person). One idea per icon, at most three shapes.
- They draw themselves in on entry: every shape has `pathLength="1"` and animates `stroke-dashoffset` 1 → 0,
  shapes staggered by 0.18s. Do **not** use `vector-effect: non-scaling-stroke` with this animation (it breaks dash
  lengths into 1px dashes).

## Motion

- Arrivals rise `1.4rem` and fade in over 1s with `--ease` (IntersectionObserver adds `.is-in`).
- Smooth scroll with Lenis (`lerp 0.1`).
- Page changes: cross-document view transitions (`@view-transition { navigation: auto }`); browsers without them get a
  0.38s fade through black (`.veil`).
- Language swap: a 0.22s cross-fade of the translated nodes.
- `prefers-reduced-motion`: no smooth scroll, no opening card, no looping videos (posters stay), icons shown drawn.

## Object pages (Almenara)

- Black stage; tokens in `src/almenara/styles/main.css` (`--bg #000`, `--ink #f5f5f7`, `--ink-2 #a1a1a6`,
  LED colours `--violet #a46bff`, `--red #ff5a50`, `--green #2fd07a`, `--blue #4d8dff`, `--amber #ffad2e`).
- Every image of the device is a Blender Cycles render of the real CAD model (made in `Loureo/almenara-hardware`,
  `web-renders/tools/render`). No stock photos, no AI images of the product.
- Scroll plays pre-rendered sequences on a canvas (`src/almenara/sequence.js`). Live elements are layered on top of a
  render rather than baked in: the device screen is HTML mapped onto the glass with a perspective matrix; the LED is
  its own light render, tinted and added (`lighter`) so colours change continuously.
- Things that float over an image use Apple-style glass (`.glass`: blur + saturation, bright top rim, sheen;
  `.glass--dark` over light surfaces).

## Accessibility

- Text contrast: `--ink` and `--ink-2` on paper pass AA; `--ink-3` is for labels only, never body text.
- Every image has an alt (translated with `data-i18n-alt`); decorative videos are `aria-hidden` and their links carry
  an `aria-label`.
- Focus is always visible (`:focus-visible` outline in ink).
