import "@fontsource-variable/funnel-display";
import "@fontsource-variable/funnel-sans";
import "./styles/main.css";
import "./styles/specs.css";
import Lenis from "lenis";
import { initI18n } from "./i18n.js";

document.documentElement.classList.remove("no-js");
initI18n();
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduced) {
  const lenis = new Lenis({ lerp: 0.09, autoRaf: true });
  void lenis;
}

// rows rise into place as they enter, one after another
const io = new IntersectionObserver((entries) => {
  let n = 0;
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    e.target.style.transitionDelay = `${Math.min(n++, 6) * 60}ms`;
    e.target.classList.add("is-in");
    io.unobserve(e.target);
  }
}, { rootMargin: "0px 0px -8% 0px" });
document.querySelectorAll(".in").forEach((el) => io.observe(el));

// the fire in the wordmark is amber here: waiting for you to come back
document.documentElement.style.setProperty("--led", "var(--amber)");

const veil = document.querySelector(".veil");
const supportsVT = CSS.supports?.("view-transition-name: none") && "onpagereveal" in window;
document.querySelectorAll('a[href^="/"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    if (supportsVT || reduced || a.target) return;
    e.preventDefault();
    veil.classList.add("is-on");
    setTimeout(() => { location.href = a.href; }, 420);
  });
});
addEventListener("pageshow", () => veil.classList.remove("is-on"));
