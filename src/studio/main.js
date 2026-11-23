import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/inter-tight";
import "./studio.css";
import Lenis from "lenis";
import { initI18n } from "../shared/i18n.js";
import { carry } from "../shared/carry.js";

// Spanish strings for the lab's home page (English is in the HTML). The values' titles stay in English.
const ES = {
  skip: "Saltar al contenido",
  intro: "Loureo es un laboratorio de innovación",
  "nav.objects": "Proyectos", "nav.values": "Valores", "nav.contact": "Contacto",
  "lede.lead": "Loureo es un laboratorio de innovación en Madrid, España.",
  "lede.rest": "Exploramos nuevas formas de trabajar con la tecnología y convertimos las buenas en cosas reales, desde el primer prototipo hasta la caja.",
  "product.line": "Una luz para cuando tu agente te necesita.",
  "status.open": "Lista de espera abierta",
  "values.title": "En qué creemos.",
  "aria:values": "Valores",
  v1: "Menos es más. Tecnología que se nota por lo poco que te pide.",
  v2: "Análisis, empatía e intuición. Las personas antes que la técnica.",
  v3: "Firmes donde importa, adaptables en todo lo demás.",
  v4: "Primero la curiosidad. Tomamos el camino poco habitual cuando lleva a algo mejor.",
  v5: "Prototipamos, medimos y volvemos a probar. Equivocarse rápido, aprender rápido.",
  v6: "Debe simplificarte la vida, no llenártela. La hacemos con quien la usa.",
  "foot.made": "Diseñado y hecho en Madrid, España.",
  "foot.specs": "Especificaciones de Almenara",
  "foot.write": "Escríbenos",
  "foot.purpose.t": "Nuestro propósito",
  "foot.purpose.p": "La tecnología debería simplificar la vida, no llenarla. Probamos ideas nuevas hasta que lo consiguen y construimos las que se ganan un sitio en tu día.",
  "foot.contact.t": "Contacto",
  "foot.general": "Consultas generales",
};

const html = document.documentElement;
html.classList.remove("no-js");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

initI18n({ es: ES });

// the opening card: once per visit (the class is set before first paint, in index.html)
if (html.classList.contains("is-intro")) {
  try { sessionStorage.setItem("loureo.intro", "1"); } catch (_) { /* private mode */ }
  setTimeout(() => html.classList.remove("is-intro"), 3500);
}

const lenis = reduced ? null : new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
const nav = $(".snav");
function raf(t) {
  lenis?.raf(t);
  nav.classList.toggle("is-scrolled", scrollY > 8);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// the main tile and Almenara's hero are one image across the page change (when both are on screen)
const isAlmenara = (p) => p === "/almenara/" || p === "/almenara/index.html";
carry("almenara-hero", () => $(".tile--main .tile__video"), isAlmenara);
// warm the hero's first frame as soon as the visitor shows interest, so the page opens on it
$(".objects")?.addEventListener("pointerenter", () => {
  new Image().src = `/almenara/seq/hero/${innerWidth <= 900 ? "sm" : "lg"}/0000.webp`;
}, { once: true });

// the catalogue moves only while it is on screen (and not at all with reduced motion: the posters stay)
const videos = $$(".tile__video");
if (!reduced) {
  const vio = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause();
  }, { threshold: 0.15 });
  videos.forEach((v) => vio.observe(v));
}

const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
$$(".rise, .value").forEach((el) => io.observe(el));

$$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
  const el = $(a.getAttribute("href"));
  if (!el) return;
  e.preventDefault();
  const y = el.getBoundingClientRect().top + scrollY - 40;
  lenis ? lenis.scrollTo(y, { duration: 1.1 }) : scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
}));

// to a product page: browsers without cross-document view transitions get a fade through black
const veil = $(".veil");
if (!("onpagereveal" in window) && !reduced) {
  $$('a[href^="/almenara"]').forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    veil.classList.add("is-on");
    setTimeout(() => { location.href = a.href; }, 380);
  }));
}
addEventListener("pageshow", () => veil.classList.remove("is-on"));
