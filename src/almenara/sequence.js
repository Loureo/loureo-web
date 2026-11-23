// A pre-rendered image sequence on a canvas, scrubbed by scroll (the way Apple's product pages do it).
// Frames load progressively: the first one, then a coarse pass (every 8th), then the rest, so scrubbing
// works early and sharpens as frames arrive. Drawing always uses the nearest frame already loaded.
//
// Two ways to fit the frames:
// - default: studio shots on pure black. Contained on landscape screens, so nothing is ever cut on wide
//   windows; overscaled on portrait screens (`portraitWidth`).
// - `photo`: full-bleed photographs (the desk). Cover on landscape, keeping the device in view with
//   `photo.focusX(p)` (0..1 across the image); on portrait the photo sits low and its top melts into black.

const pad = (n) => String(n).padStart(4, "0");

export function createSequence(canvas, { name, frames, portraitWidth = 1.6, offsetY = 0, top = 0, photo = null, after = null }) {
  const ctx = canvas.getContext("2d");
  const size = innerWidth <= 900 ? "sm" : "lg";
  let imgs, ready, order, gen = 0;
  let current = -1, want = 0, prog = 0, dpr = 1, cw = 0, ch = 0;
  let fade = null;                     // { from, t0 } while cross-fading over a jump
  const geom = { dx: 0, dy: 0, dw: 1, dh: 1 };   // last drawn image rect, CSS px

  function reset(n) {
    name = n;
    gen++;
    imgs = new Array(frames);
    ready = new Array(frames).fill(false);
    order = [0];
    for (const step of [8, 4, 2, 1]) for (let i = 0; i < frames; i += step) if (!order.includes(i)) order.push(i);
    current = -1;
  }
  reset(name);

  function load(i, g) {
    const img = new Image();
    img.decoding = "async";
    img.src = `/almenara/seq/${name}/${size}/${pad(i)}.webp`;
    imgs[i] = img;
    return img.decode().then(() => {
      if (g !== gen) return;
      ready[i] = true;
      if (current < 0 || Math.abs(i - want) < Math.abs(current - want)) draw(want, true);
    }).catch(() => {});
  }

  let started = false;
  async function start() {
    if (started) return;
    started = true;
    const g = gen;
    let k = 0;
    const worker = async () => { while (g === gen && k < order.length) await load(order[k++], g); };
    await Promise.all([worker(), worker(), worker(), worker()]);
  }

  /** switch to another set of frames (e.g. the other language) and reload */
  function reload(n) {
    if (n === name) return;
    const keep = current >= 0 ? imgs[current] : null;
    reset(n);
    if (keep) fade = { from: keep, t0: performance.now() };
    started = false;
    start();
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    cw = canvas.clientWidth; ch = canvas.clientHeight;
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    current = -1;
    draw(want, true);
  }

  function nearestReady(i) {
    for (let d = 0; d < frames; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < frames && ready[i + d]) return i + d;
    }
    return -1;
  }

  function rect(img) {
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const W = canvas.width, H = canvas.height;
    const portrait = cw < ch;
    let s, dx, dy;
    if (photo) {
      const fx = photo.focusX(prog);
      s = portrait ? (W * portraitWidth) / iw : Math.max(W / iw, (H * 0.8) / ih);
      const dw = iw * s;
      dx = Math.min(0, Math.max(W - dw, W / 2 - fx * dw));
      // portrait: below the copy at first, then (photo.centerY(p) → 1) in the middle of the screen
      const low = H - ih * s, mid = (H - ih * s) / 2, k = photo.centerY ? photo.centerY(prog) : 0;
      dy = portrait ? low + (mid - low) * k : mid;
    } else {
      // landscape: contained in the band below the section's title (`top`, a share of the height)
      s = portrait ? (W * portraitWidth) / iw : Math.min(W / iw, (H * (1 - top)) / ih);
      dx = (W - iw * s) / 2;
      dy = portrait ? (H - ih * s) / 2 + H * offsetY : H * top + (H * (1 - top) - ih * s) / 2;
    }
    return { dx, dy, dw: iw * s, dh: ih * s, portrait };
  }

  function paint(img, alpha = 1) {
    const r = rect(img);
    const W = canvas.width, H = canvas.height;
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, r.dx, r.dy, r.dw, r.dh);
    ctx.globalAlpha = 1;
    if (photo) {
      // melt the photo's edges into the page's black wherever they show
      const band = (y0, y1, fromBlack) => {
        const g = ctx.createLinearGradient(0, y0, 0, y1);
        g.addColorStop(0, fromBlack ? "#000" : "rgba(0,0,0,0)");
        g.addColorStop(1, fromBlack ? "rgba(0,0,0,0)" : "#000");
        ctx.fillStyle = g;
        ctx.fillRect(0, y0, W, y1 - y0);
      };
      const e = r.dh * (r.portrait ? 0.4 : 0.22);
      if (r.dy > 0) band(r.dy, r.dy + e, true);
      if (r.dy + r.dh < H - 1) band(r.dy + r.dh - e, r.dy + r.dh, false);
    }
    geom.dx = r.dx / dpr; geom.dy = r.dy / dpr; geom.dw = r.dw / dpr; geom.dh = r.dh / dpr;
    if (after && alpha === 1) after(ctx, r);     // layers that live on top of the frame (the LED's light)
  }

  function draw(i, force = false) {
    want = i;
    const f = nearestReady(i);
    if (f < 0 || (f === current && !force && !fade)) return;
    // a jump of several frames (a new state, not a scrub) cross-fades instead of cutting
    if (current >= 0 && Math.abs(f - current) > 3 && !force && imgs[current]) fade = { from: imgs[current], t0: performance.now() };
    current = f;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (fade) {
      const t = Math.min(1, (performance.now() - fade.t0) / 450);
      paint(fade.from);
      paint(imgs[f], t * t * (3 - 2 * t));
      if (t < 1) requestAnimationFrame(() => draw(want, true));
      else fade = null;
    } else paint(imgs[f]);
  }

  /** p ∈ [0, 1] → frame */
  function set(p) {
    prog = p;
    const i = Math.max(0, Math.min(frames - 1, Math.round(p * (frames - 1))));
    if (i !== want || current < 0) draw(i);
  }
  /** show a frame by index (p only matters for photo framing) */
  function setFrame(i, p = prog) {
    prog = p;
    if (i !== want || current < 0) draw(i);
  }
  /** repaint the current frame (when a layer drawn by `after` changes) */
  const redraw = () => { if (current >= 0) draw(want, true); };
  /** image coordinates (0..1 from the top left) → CSS px inside the canvas */
  const toScreen = (u, v) => [geom.dx + u * geom.dw, geom.dy + v * geom.dh];

  addEventListener("resize", resize);
  resize();
  return { start, set, setFrame, resize, reload, redraw, toScreen, drawn: () => current >= 0, frame: () => (current < 0 ? want : current) };
}
