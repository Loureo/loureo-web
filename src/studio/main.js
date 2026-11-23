import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/funnel-display";
import "./studio.css";
import Lenis from "lenis";
import { initI18n, onLang } from "../shared/i18n.js";

// Spanish strings for the studio page (English is in the HTML).
const ES = {
  skip: "Saltar al contenido",
  "nav.studio": "Estudio", "nav.contact": "Contacto",
  "hero.label": "Estudio de hardware · España",
  "hero.title": "Objetos pequeños para la forma en que trabajamos hoy.",
  "status.open": "Lista de espera abierta",
  "product.line": "Una luz para cuando tu agente te necesita.",
  "product.cta": "Descubre Almenara",
  "alt:product.alt": "Almenara sobre una mesa de nogal: un dispositivo de aluminio con pantalla de cristal, una rueda y una luz violeta.",
  "studio.label": "El estudio",
  "studio.title": "Hacemos las herramientas que nos faltaban.",
  "studio.intro": "Loureo empezó como estudio de software. Ahora hacemos nuestro propio hardware, un objeto cada vez, desde la primera protoboard hasta la caja.",
  "r1.t": "Hacemos lo que necesitamos.", "r1.p": "Almenara nació en nuestras mesas, esperando a los agentes.",
  "r2.t": "Lo probamos usándolo.", "r2.p": "Cada versión pasa por nuestro trabajo real antes de llegar al tuyo.",
  "r3.t": "Una cosa cada vez.", "r3.p": "Sin catálogo. Cada objeto tiene el tiempo que necesita.",
  "alt:bench.alt": "La placa de circuito de Almenara, cara superior.",
  "bench.cap": "En el banco · Almenara, placa rev. 11",
  "contact.label": "Contacto", "contact.title": "Escríbenos.",
  "foot.made": "Diseñado y hecho en España.",
};

const html = document.documentElement;
html.classList.remove("no-js");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

initI18n({ es: ES });

// the headline arrives word by word
const title = $(".shero__title");
const splitTitle = () => {
  title.innerHTML = title.textContent.trim().split(/\s+/).map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(" ");
};
splitTitle();
onLang(() => requestAnimationFrame(splitTitle));

const lenis = reduced ? null : new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
const nav = $(".snav");
function raf(t) {
  lenis?.raf(t);
  nav.classList.toggle("is-scrolled", scrollY > 8);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}, { rootMargin: "0px 0px -10% 0px" });
$$(".rise").forEach((el) => io.observe(el));

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
