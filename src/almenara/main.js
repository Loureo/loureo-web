import "@fontsource-variable/funnel-display";
import "@fontsource-variable/funnel-sans";
import "./styles/main.css";
import Lenis from "lenis";
import { initI18n, onLang, getLang, t } from "./i18n.js";
import { initWaitlist } from "./waitlist.js";
import { createSequence } from "./sequence.js";
import { createTowers } from "./towers.js";
import { carry } from "../shared/carry.js";

const html = document.documentElement;
html.classList.remove("no-js");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const smooth = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
const range = (p, a, b) => smooth((p - a) / (b - a));

initI18n();

// ---------- images that exist per language (the device's screen is in the render) ----------
function langImages() {
  $$("img[data-src]").forEach((img) => {
    const src = img.dataset.src.replace("{lang}", getLang());
    if (img.getAttribute("src") !== src) img.src = src;
  });
}
langImages();

// ---------- smooth scroll ----------
const lenis = reduced ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
function raf(time) { lenis?.raf(time); tick(); requestAnimationFrame(raf); }

// ---------- sequences ----------
const heroEl = $(".hero"), lightEl = $(".light"), insideEl = $(".inside");
// The hero is one take of 210 frames: pull back (0–89), lift and turn (90–149), dive into the screen (150–209).
const HERO_LAST = 196, HERO_PULL = 89 / HERO_LAST;
const hero = createSequence($(".seq", heroEl), {
  name: "hero", frames: HERO_LAST + 1, portraitWidth: 1.75,       // frames after HERO_LAST are never shown
  photo: {
    focusX: (p) => 0.5 + 0.16 * (1 - smooth(p / HERO_PULL)),   // the device starts on the right
    centerY: (p) => smooth(p / (HERO_PULL * 0.6)),              // phones: it rises to the middle as the copy leaves
  },
});
// The light section is one render, live: the frames only turn the wheel (-12°..72°, screen and LED off).
// The LED is the render of its own light (led.webp), tinted here and added on top, so its colour moves
// continuously; the screen is HTML mapped onto the glass. Nothing swaps between states.
const LIGHT_FRAMES = 29, LIGHT_A0 = -12, LIGHT_STEP = 3;
const LED_RGB = { violet: [164, 107, 255], red: [255, 90, 80], green: [47, 208, 122], blue: [77, 141, 255] };
const ledImg = new Image();
ledImg.src = `/almenara/seq/light/${innerWidth <= 900 ? "sm" : "lg"}/led.webp`;
const tintCv = document.createElement("canvas"), tintCtx = tintCv.getContext("2d");
let ledRGB = [...LED_RGB.violet], ledKey = "", ledLevel = 1;
function tintedLed() {
  if (!ledImg.naturalWidth) return null;
  const key = ledRGB.map((v) => Math.round(v + (255 - v) * 0.12)).join();   // a little white in the core, as an LED has
  if (key !== ledKey) {
    tintCv.width = ledImg.naturalWidth; tintCv.height = ledImg.naturalHeight;
    tintCtx.drawImage(ledImg, 0, 0);
    tintCtx.globalCompositeOperation = "multiply";
    tintCtx.fillStyle = `rgb(${key})`;
    tintCtx.fillRect(0, 0, tintCv.width, tintCv.height);
    tintCtx.globalCompositeOperation = "source-over";
    ledKey = key;
  }
  return tintCv;
}
const light = createSequence($(".seq", lightEl), {
  name: "light", frames: LIGHT_FRAMES, blend: true, portraitWidth: 2.1, photo: { focusX: () => 0.6 },   // the device sits right of centre
  after: (ctx, r) => {
    const led = tintedLed();
    if (!led) return;
    ctx.globalCompositeOperation = "lighter";     // light adds up: base + colour × the LED's own light
    ctx.globalAlpha = ledLevel;
    ctx.drawImage(led, r.dx, r.dy, r.dw, r.dh);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  },
});
ledImg.onload = () => light.redraw();
const inside = createSequence($(".seq", insideEl), { name: "explode", frames: 90, portraitWidth: 1.9, offsetY: 0.04, top: 0.15 });
hero.start();
// the hero and the lab's project tile are one image across the page change: the canvas once it has drawn,
// the first-frame poster under it before that (on arrival, the canvas is still empty)
const heroPoster = $(".hero__poster img");
carry("almenara-hero",
  () => (hero.drawn() ? $(".seq", heroEl) : heroPoster),
  (p) => p === "/" || p === "/index.html",
  () => hero.drawn() || (heroPoster.complete && heroPoster.naturalWidth > 0));
const soon = (el, f) => new IntersectionObserver(([e], o) => { if (e.isIntersecting) { f(); o.disconnect(); } }, { rootMargin: "150% 0px" }).observe(el);
soon(lightEl, () => light.start());
soon(insideEl, () => inside.start());
const json = (url) => fetch(url).then((r) => r.json()).catch(() => null);
let knobAt = null, exAt = null;
json("/almenara/seq/light/anchors.json").then((a) => { knobAt = a; });
json("/almenara/seq/explode/anchors.json").then((a) => { exAt = a; });

const progress = (el) => {
  const r = el.getBoundingClientRect();
  return clamp01(-r.top / Math.max(1, r.height - innerHeight));
};

// ---------- the statement lights up word by word ----------
const statement = $(".statement__text");
function splitWords() {
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  last.lit = -1;
}

// ---------- light: the wheel ----------
// Scroll turns the wheel through its detents (0° No, 30° Yes and don't ask, 60° Yes), dwelling on each.
// A chip, the arrow keys or dragging the wheel take the section over without moving the page (moving it is what
// made the scroll jump); as soon as the visitor scrolls again, scroll takes it back. The angle on screen always
// eases toward its target, so the wheel never jumps either.
const STATES = ["working", "no", "yesand", "yes"];
const DETENT = ["no", "yesand", "yes"];
const LED = { working: "violet", no: "red", yes: "green", yesand: "blue" };
const WORK = 0.2, END = 0.92;                     // share of the section spent on "working", and where turning ends
const stair = (x) => { x = Math.max(0, Math.min(2, x)); const k = Math.min(1, Math.floor(x)); return k + smooth((x - k - 0.35) / 0.3); };
const angleAt = (pl) => (pl < WORK ? null : 30 * stair(clamp01((pl - WORK) / (END - WORK)) * 2.6 - 0.3));
const chips = $$(".chip");
const caption = $(".light__caption");
const knob = $(".knob");
let lightState = "", drag = null;
let manual = null;                  // { angle, working, y }: set by a chip, the keys or the wheel
let shown = 0;                      // the wheel's angle on screen
const TAKEOVER = 48;                // px of scroll that hand the section back to the page
function setLight(state, force = false) {
  if (state === lightState && !force) return;
  lightState = state;
  chips.forEach((c) => { const on = c.dataset.state === state; c.classList.toggle("is-on", on); c.setAttribute("aria-selected", String(on)); });
  caption.textContent = t(`light.cap.${state}`);
  html.style.setProperty("--led", `var(--${LED[state]})`);
  knob.setAttribute("aria-valuenow", String(Math.max(0, DETENT.indexOf(state))));
  lightEl.classList.toggle("is-asking", state !== "working");
  dscreen.dataset.state = state;
  const sel = { yes: 0, yesand: 1, no: 2 }[state];
  dsOpts.forEach((li, i) => li.classList.toggle("is-on", i === sel));
}
// the screen's perspective: the 960 x 1280 panel → the four rendered corners of the glass
const dscreen = $(".dscreen"), dsOpts = $$(".ds__opts li");
function placeScreen() {
  if (!knobAt?.screen) return;
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = knobAt.screen.map(([u, v]) => light.toScreen(u, v));
  const key = [x0, y0, x2, y2].map((v) => v.toFixed(1)).join();
  if (key === last.screen) return;
  last.screen = key;
  // unit square → quad (Heckbert), then scaled to the panel's pixels
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2, sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (sx * dy2 - dx2 * sy) / den, h = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
  const W = 960, H = 1280;
  dscreen.style.transform = `matrix3d(${a / W},${d / W},0,${g / W},${b / H},${e / H},0,${h / H},0,0,1,0,${x0},${y0},0,1)`;
  dscreen.classList.add("is-placed");
}
const goState = (state) => {
  const working = state === "working";
  manual = { angle: working ? 0 : DETENT.indexOf(state) * 30, working, y: scrollY };
  if (!working) lightEl.classList.add("has-turned");
};
chips.forEach((c) => c.addEventListener("click", () => goState(c.dataset.state)));
function lightTarget() {
  if (manual && !drag && Math.abs(scrollY - manual.y) > TAKEOVER) manual = null;   // the visitor scrolled: hand back
  if (manual) return manual;
  const a = angleAt(progress(lightEl));
  return { angle: a ?? 0, working: a == null };
}

function knobGeom() {
  if (!knobAt) return null;
  const [cx, cy] = light.toScreen(...knobAt.knob);
  const [xx, xy] = light.toScreen(...knobAt.knob_x);
  const [yx, yy] = light.toScreen(...knobAt.knob_y);
  return { cx, cy, rx: Math.hypot(xx - cx, xy - cy), ry: Math.hypot(yx - cx, yy - cy) };
}
let kg = null;
const pointerAngle = (e) => {
  const r = knob.parentElement.getBoundingClientRect();
  const dx = e.clientX - r.left - kg.cx, dy = (e.clientY - r.top - kg.cy) * (kg.rx / kg.ry);
  return (-Math.atan2(dy, dx) * 180) / Math.PI;   // counter-clockwise on screen = positive, as in the render
};
const band = (raw) => {                       // past the ends the wheel resists instead of stopping dead
  const lo = LIGHT_A0, hi = LIGHT_A0 + (LIGHT_FRAMES - 1) * LIGHT_STEP, L = 12;
  if (raw < 0) return Math.max(lo, -L * (1 - 1 / (1 + -raw / L)));
  if (raw > 60) return Math.min(hi, 60 + L * (1 - 1 / (1 + (raw - 60) / L)));
  return raw;
};
knob.addEventListener("pointerdown", (e) => {
  if (!kg) return;
  e.preventDefault();
  knob.setPointerCapture(e.pointerId);
  drag = { raw: shown, angle: shown, last: pointerAngle(e), active: true };
  manual = { angle: shown, working: false, y: scrollY };
  lightEl.classList.add("has-turned", "is-turning");
});
knob.addEventListener("pointermove", (e) => {
  if (!drag?.active) return;
  const a = pointerAngle(e);
  let d = a - drag.last;
  if (d > 180) d -= 360; else if (d < -180) d += 360;
  drag.last = a;
  drag.raw += d;
  drag.angle = band(drag.raw);
  manual.angle = drag.angle;
});
const release = () => {
  if (!drag?.active) return;
  lightEl.classList.remove("is-turning");
  // into the nearest detent: the eased angle in tick() does the settling
  manual = { angle: Math.max(0, Math.min(2, Math.round(drag.angle / 30))) * 30, working: false, y: scrollY };
  drag = null;
};
knob.addEventListener("pointerup", release);
knob.addEventListener("pointercancel", release);
knob.addEventListener("keydown", (e) => {
  const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }[e.key];
  if (!step) return;
  e.preventDefault();
  const cur = Math.max(0, DETENT.indexOf(lightState));
  lightEl.classList.add("has-turned");
  goState(DETENT[Math.max(0, Math.min(2, (lightState === "working" ? -1 : cur) + step))]);
});

// ---------- explode: a line from each caption to its layer ----------
const insideStick = $(".inside__stick");
const lineEls = $$(".inside__lines path"), dotEls = $$(".inside__lines circle");
lineEls.forEach((p) => p.setAttribute("pathLength", "1"));
const insideCaps = $$(".inside__cap").map((el, i) => {
  const [a, b] = el.dataset.at.split(" ").map(Number);
  return { el, a, b, v: -1, anchor: el.dataset.anchor, path: lineEls[i], dot: dotEls[i] };
});
function drawLine(c) {
  if (!exAt || c.v <= 0.001) { c.path.style.opacity = 0; c.dot.style.opacity = 0; return; }
  const box = insideStick.getBoundingClientRect(), r = c.el.getBoundingClientRect();
  const [ax, ay] = inside.toScreen(...exAt[c.anchor][Math.min(89, inside.frame())]);
  let d;
  if (innerWidth > 900) {
    const x0 = r.right - box.left + 18, y0 = r.top - box.top + r.height / 2;
    d = `M${x0} ${y0} H${x0 + (ax - x0) * 0.42} L${ax} ${ay}`;
  } else {
    const x0 = r.left - box.left + r.width / 2, y0 = r.top - box.top - 14;
    d = `M${x0} ${y0} V${y0 - (y0 - ay) * 0.4} L${ax} ${ay}`;
  }
  c.path.setAttribute("d", d);
  c.path.style.opacity = c.v;
  c.path.style.strokeDashoffset = 1 - c.v;
  c.dot.setAttribute("cx", ax); c.dot.setAttribute("cy", ay);
  c.dot.style.opacity = c.v;
}

// ---------- how it works: the light passes from step to step ----------
const howLine = $(".how__line"), howSteps = $$(".how__step"), howEl = $(".how"), howClock = $(".how__clock");
// the line's colours change exactly where each step begins (with a short blend before it)
function paintLine() {
  const H = howLine.offsetHeight || 1;
  const color = (s) => getComputedStyle(s).getPropertyValue("--c").trim();
  const pct = (y) => `${((Math.max(0, y) / H) * 100).toFixed(2)}%`;
  const stops = howSteps.map((s, i) =>
    i === 0 ? `${color(s)} 0%` : `${color(howSteps[i - 1])} ${pct(s.offsetTop - 60)}, ${color(s)} ${pct(s.offsetTop)}`);
  howLine.style.setProperty("--grad", `linear-gradient(${stops.join(", ")})`);
}
paintLine();
addEventListener("resize", paintLine);

// ---------- per-frame ----------
const last = {};
splitWords();
setLight("working", true);
onLang((l) => { langImages(); requestAnimationFrame(splitWords); setLight(lightState, true); requestAnimationFrame(paintLine); });

function tick() {
  // hero: pull back → lift → into the screen; the copy on the left leaves first
  const ph = progress(heroEl);
  // frames past ~196 have the camera so close the glass catches a glow: stop there, inside the black ring
  const hp = clamp01(ph / 0.94);
  hero.setFrame(Math.round(hp * HERO_LAST), hp);
  const black = range(ph, 0.88, 0.97);
  if (black !== last.black) { heroEl.style.setProperty("--black", black.toFixed(3)); last.black = black; }
  const out = range(ph, 0.02, 0.2);
  if (out !== last.out) { heroEl.style.setProperty("--out", out.toFixed(3)); heroEl.classList.toggle("is-out", out > 0.995); last.out = out; }

  // statement
  const sr = statement.getBoundingClientRect();
  const sp = clamp01((innerHeight * 0.85 - sr.top) / (innerHeight * 0.6 + sr.height));
  const words = statement.querySelectorAll(".w");
  const lit = Math.round(sp * words.length * 1.05);
  if (lit !== last.lit) { words.forEach((w, i) => w.classList.toggle("is-lit", i < lit)); last.lit = lit; }

  // light: the wheel's angle comes from the drag when there is one, otherwise from scroll
  const lr = lightEl.getBoundingClientRect();
  if (lr.bottom > 0 && lr.top < innerHeight) {
    const target = lightTarget();
    if (drag) shown = drag.angle;                                         // under the finger: 1:1
    else {
      const d = target.angle - shown;                                     // otherwise ease toward the target
      shown = reduced || Math.abs(d) < 0.05 ? target.angle : shown + d * 0.16;
    }
    setLight(target.working ? "working" : DETENT[Math.max(0, Math.min(2, Math.round(shown / 30)))]);
    light.setFrame(Math.max(0, Math.min(LIGHT_FRAMES - 1, (shown - LIGHT_A0) / LIGHT_STEP)));
    // the LED eases to its colour and breathes while the agent works, as the firmware does
    const to = LED_RGB[LED[lightState]];
    let moved = false;
    ledRGB = ledRGB.map((v, i) => { const n = v + (to[i] - v) * 0.16; if (Math.abs(n - v) > 0.4) moved = true; return Math.abs(to[i] - n) < 0.5 ? to[i] : n; });
    const level = lightState === "working" && !reduced ? 0.8 + 0.2 * Math.sin(performance.now() / 650) : 1;
    if (moved || Math.abs(level - ledLevel) > 0.004) { ledLevel = level; light.redraw(); }
    placeScreen();
    kg = knobGeom();
    if (kg) {
      const key = `${kg.cx | 0},${kg.cy | 0},${kg.rx | 0},${kg.ry | 0}`;
      if (key !== last.knob) {
        Object.assign(knob.style, { left: `${kg.cx - kg.rx}px`, top: `${kg.cy - kg.ry}px`, width: `${2 * kg.rx}px`, height: `${2 * kg.ry}px` });
        last.knob = key;
      }
    }
  }

  // inside
  const pi = progress(insideEl);
  inside.set(range(pi, 0.04, 0.8));
  const ir = insideEl.getBoundingClientRect();
  if (ir.bottom > 0 && ir.top < innerHeight) {
    for (const c of insideCaps) {
      const v = Math.min(clamp01((pi - c.a) / 0.05), clamp01((c.b - pi) / 0.05));
      if (Math.abs(v - c.v) > 0.002) { c.el.style.setProperty("--v", v.toFixed(3)); c.v = v; }
      drawLine(c);
    }
  }

  // how it works
  const hr = howLine.getBoundingClientRect();
  if (hr.bottom > -innerHeight && hr.top < innerHeight * 2) {
    const fill = Math.max(0, Math.min(hr.height, innerHeight * 0.55 - hr.top));
    if (fill !== last.fill) {
      howLine.style.setProperty("--fill", `${fill.toFixed(1)}px`);
      let active = -1;
      howSteps.forEach((s, i) => { const on = s.offsetTop <= fill + 8; s.classList.toggle("is-on", on); if (on) active = i; });
      const c = active >= 0 ? getComputedStyle(howSteps[active]).getPropertyValue("--c").trim() : "#2a2a2d";
      howEl.style.setProperty("--head", c);
      howClock.textContent = howSteps[Math.max(0, active)].querySelector("time").textContent;
      last.fill = fill;
    }
  }
}
requestAnimationFrame(raf);

// ---------- entrances ----------
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -12% 0px" });
$$(".rise, .tile, .towers").forEach((el) => io.observe(el));

createTowers($(".towers__fx"));

// ---------- jumps: near = glide, far = a quick fade (never race through the whole page) ----------
const veil = $(".veil");
function jumpTo(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + scrollY;
  if (Math.abs(top - scrollY) < innerHeight * 3 || reduced) {
    lenis ? lenis.scrollTo(top, { duration: 1.2 }) : scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    return;
  }
  veil.classList.add("is-on");
  setTimeout(() => {
    lenis ? lenis.scrollTo(top, { immediate: true, force: true }) : scrollTo(0, top);
    requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.remove("is-on")));
  }, 420);
}
$$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); jumpTo(a.getAttribute("href")); }));

addEventListener("pageshow", () => veil.classList.remove("is-on"));

initWaitlist($(".waitlist"));

if (location.hash) requestAnimationFrame(() => jumpTo(location.hash));
