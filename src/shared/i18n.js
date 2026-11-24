// Shared by every page of the site: English lives in the HTML, Spanish is applied on top with a soft
// cross-fade. Each page passes its Spanish dictionary (and strings set from code, `extra`).
const EN = {};
let ES = {}, EXTRA = {};
let lang = "en";
const listeners = new Set();
function store(v) { try { localStorage.setItem("loureo.lang", v); } catch (_) { /* private mode */ } }
function stored() { try { return localStorage.getItem("loureo.lang"); } catch (_) { return null; } }

export function t(key) {
  return EXTRA[lang]?.[key] ?? (lang === "es" ? ES[key] : EN[key]) ?? EN[key] ?? key;
}

function apply(next) {
  lang = next;
  document.documentElement.lang = next;
  const dict = next === "es" ? ES : EN;
  document.querySelectorAll("[data-i18n]").forEach((el) => { const v = dict[el.dataset.i18n]; if (v != null) el.textContent = v; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { const v = dict[`aria:${el.dataset.i18nAria}`]; if (v != null) el.setAttribute("aria-label", v); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { const v = dict[`alt:${el.dataset.i18nAlt}`] ?? dict[el.dataset.i18nAlt]; if (v != null) el.alt = v; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { const v = dict[`ph:${el.dataset.i18nPh}`]; if (v != null) el.placeholder = v; });
  const tg = document.querySelector("[data-lang-toggle]");
  if (tg) tg.setAttribute("aria-label", next === "es" ? "Switch to English" : "Cambiar a español");
  listeners.forEach((f) => f(next));
}

export function initI18n({ es = {}, extra = {} } = {}) {
  ES = es; EXTRA = extra;
  document.querySelectorAll("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] = el.textContent; });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { EN[`aria:${el.dataset.i18nAria}`] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { EN[`alt:${el.dataset.i18nAlt}`] = el.alt; });
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => { EN[`ph:${el.dataset.i18nPh}`] = el.placeholder; });
  const want = stored() || ((navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en");
  if (want === "es") apply("es");
  document.querySelector("[data-lang-toggle]")?.addEventListener("click", () => {
    const next = lang === "en" ? "es" : "en";
    store(next);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { apply(next); return; }
    document.documentElement.classList.add("is-swapping");
    setTimeout(() => { apply(next); requestAnimationFrame(() => document.documentElement.classList.remove("is-swapping")); }, 230);
  });
}

export const getLang = () => lang;
export const onLang = (f) => listeners.add(f);
