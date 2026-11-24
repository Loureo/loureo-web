// The waitlist sheet (<dialog class="wl">). Every [data-waitlist] link or button opens it, and so does arriving at
// /almenara/#waitlist. The form posts {email, lang, company} as JSON to /api/waitlist (api/waitlist.js → Brevo), or to
// VITE_WAITLIST_ENDPOINT if set. `company` is a hidden field only bots fill in. When the server is not configured
// (503) the sheet says so: it never pretends an email was saved.
import { getLang } from "./i18n.js";

const T = {
  en: { invalid: "That email does not look right.", fail: "It did not go through. Try again in a moment.", off: "The waitlist is not connected yet. Your email was not sent anywhere." },
  es: { invalid: "Ese email no parece correcto.", fail: "No ha salido. Prueba otra vez en un momento.", off: "La lista de espera aún no está conectada. Tu email no se ha enviado a ningún sitio." },
};

/**
 * @param {HTMLDialogElement} dialog
 * @param {{ onOpen?: () => void, onClose?: () => void }} [hooks]  e.g. pause smooth scrolling while it is open
 */
export function initWaitlist(dialog, { onOpen, onClose } = {}) {
  if (!dialog) return { open() {} };
  const form = dialog.querySelector("form");
  const input = form.querySelector("input[type=email]");
  const btn = form.querySelector("button[type=submit]");
  const msg = form.querySelector(".wl__msg");
  const say = (key, tone = "") => { msg.textContent = key ? T[getLang()][key] : ""; msg.dataset.tone = tone; };

  const open = () => {
    if (dialog.open) return;
    if (!dialog.classList.contains("is-done")) { say(""); input.removeAttribute("aria-invalid"); }
    dialog.showModal();
    onOpen?.();
    // on touch screens the keyboard would cover the device: let them tap the field
    if (!dialog.classList.contains("is-done") && matchMedia("(pointer: fine)").matches) input.focus({ preventScroll: true });
  };
  const close = () => dialog.close();
  dialog.addEventListener("close", () => onClose?.());
  dialog.querySelector("[data-wl-close]").addEventListener("click", close);
  dialog.addEventListener("click", (e) => { if (e.target === dialog) close(); });   // the dark around the sheet
  document.querySelectorAll("[data-waitlist]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); open(); }));

  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (msg.dataset.tone === "err") say("");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (btn.disabled) return;
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      input.setAttribute("aria-invalid", "true");
      say("invalid", "err");
      input.focus();
      return;
    }
    btn.disabled = true;
    say("");
    try {
      const r = await fetch(import.meta.env.VITE_WAITLIST_ENDPOINT || "/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, lang: getLang(), company: form.querySelector("[name=company]")?.value || "" }),
      });
      if (r.status === 503) { say("off", "err"); return; }
      if (r.status === 400) { input.setAttribute("aria-invalid", "true"); say("invalid", "err"); return; }
      if (!r.ok) throw new Error(String(r.status));
      form.reset();
      dialog.classList.add("is-done");
      // focus the confirmation so screen readers hear it
      setTimeout(() => dialog.querySelector(".wl__done .wl__title").focus({ preventScroll: true }), 500);
    } catch (_) {
      say("fail", "err");
    } finally {
      btn.disabled = false;
    }
  });

  return { open };
}
