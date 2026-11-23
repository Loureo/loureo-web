// Fires on the ridges of a real photograph, and the warning crossing between them like shooting stars.
// Coordinates are in the photo's own pixels (2400 × 1600); the SVG uses the same viewBox with `slice`,
// so the points stay on the hilltops at any crop.
const NS = "http://www.w3.org/2000/svg";
const el = (n, a = {}, p) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); p?.appendChild(e); return e; };

// hilltops, in the order the warning travels
const FIRES = [
  [905, 372, 1],    // the near summit
  [838, 172, 0.7],  // the tall peak behind
  [298, 226, 0.55], // the far left
  [1400, 333, 0.6], // the middle ridge
  [1808, 238, 0.5], // the far right
];

export function createTowers(svg) {
  const defs = el("defs", {}, svg);
  const halo = el("radialGradient", { id: "fx-halo" }, defs);
  el("stop", { offset: "0", "stop-color": "#ffcf7a", "stop-opacity": "0.95" }, halo);
  el("stop", { offset: "0.25", "stop-color": "#ffad2e", "stop-opacity": "0.45" }, halo);
  el("stop", { offset: "1", "stop-color": "#ff8a1e", "stop-opacity": "0" }, halo);
  const blur = el("filter", { id: "fx-soft", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
  el("feGaussianBlur", { stdDeviation: "1.4" }, blur);

  const fires = FIRES.map(([x, y, s]) => {
    const g = el("g", { transform: `translate(${x} ${y})`, opacity: 0 }, svg);
    el("circle", { r: 70 * s, fill: "url(#fx-halo)" }, g);
    el("circle", { r: 5 * s, fill: "#fff2d6" }, g);
    return { x, y, s, g };
  });

  // a trail is a bright head travelling along an arc, with a fading tail behind it
  const trails = [];
  for (let i = 0; i < fires.length - 1; i++) {
    const a = fires[i], b = fires[i + 1];
    const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - 160 - Math.abs(a.x - b.x) * 0.12;
    const d = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
    const path = el("path", { d, fill: "none", stroke: "none" }, svg);
    const len = path.getTotalLength();
    const tail = el("path", { d, fill: "none", stroke: "#ffd796", "stroke-width": 2.2, "stroke-linecap": "round", filter: "url(#fx-soft)", opacity: 0 }, svg);
    const head = el("circle", { r: 4, fill: "#fff6e0", opacity: 0 }, svg);
    trails.push({ path, len, tail, head });
  }

  // one cycle: fire 0 lights, the star flies to 1, it lights, and so on; then everything rests and repeats
  const LIGHT = 0.5, FLY = 1.1, REST = 2.4;
  const cycle = fires.length * LIGHT + (fires.length - 1) * FLY + REST;
  let t0 = 0, raf = 0, running = false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function frame(now) {
    const t = ((now - t0) / 1000) % cycle;
    let cursor = 0;
    for (let i = 0; i < fires.length; i++) {
      const lit = Math.min(1, Math.max(0, (t - cursor) / LIGHT));
      const fade = t > cycle - REST * 0.6 ? Math.max(0, 1 - (t - (cycle - REST * 0.6)) / (REST * 0.6)) : 1;
      const flicker = 0.88 + 0.12 * Math.sin(now / 90 + i * 2.1) * Math.sin(now / 37 + i);
      fires[i].g.setAttribute("opacity", (lit * fade * flicker).toFixed(3));
      cursor += LIGHT;
      if (i < trails.length) {
        const tr = trails[i];
        const k = (t - cursor) / FLY;
        if (k > 0 && k < 1.35) {
          const e = Math.min(1, k);
          const ease = 1 - Math.pow(1 - e, 3);
          const pt = tr.path.getPointAtLength(ease * tr.len);
          tr.head.setAttribute("cx", pt.x); tr.head.setAttribute("cy", pt.y);
          tr.head.setAttribute("opacity", k < 1 ? 1 : 0);
          const tailLen = tr.len * 0.35;
          const end = ease * tr.len, start = Math.max(0, end - tailLen);
          tr.tail.setAttribute("stroke-dasharray", `0 ${start} ${end - start} ${tr.len}`);
          tr.tail.setAttribute("opacity", (k < 1 ? 0.9 : Math.max(0, 1 - (k - 1) / 0.35) * 0.9).toFixed(3));
        } else {
          tr.head.setAttribute("opacity", 0);
          tr.tail.setAttribute("opacity", 0);
        }
        cursor += FLY;
      }
    }
    if (running) raf = requestAnimationFrame(frame);
  }

  function showStatic() { fires.forEach((f) => f.g.setAttribute("opacity", 1)); }

  const io = new IntersectionObserver(([e]) => {
    if (reduced) { showStatic(); return; }
    if (e.isIntersecting && !running) { running = true; t0 = performance.now(); raf = requestAnimationFrame(frame); }
    else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
  }, { threshold: 0.25 });
  io.observe(svg);
}
