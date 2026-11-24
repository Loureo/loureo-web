// Waitlist form. It posts {email, lang, company} as JSON to /api/waitlist (api/waitlist.js → Brevo), or to
// VITE_WAITLIST_ENDPOINT if set. `company` is a hidden field only bots fill in.
// When the server is not configured (503) it says so: it never pretends an email was saved.
import { getLang } from "./i18n.js";

const T = {
  en: { invalid: "That email does not look right. Check it and try again.", sending: "Sending…", ok: "You are on the list. We will write when there is something to show.", fail: "It did not go through. Try again in a moment.", off: "The waitlist is not connected yet. Your email was not sent anywhere." },
  es: { invalid: "Ese email no parece correcto. Revísalo y vuelve a probar.", sending: "Enviando…", ok: "Estás en la lista. Te escribiremos cuando haya algo que enseñar.", fail: "No ha salido. Prueba otra vez en un momento.", off: "La lista de espera aún no está conectada. Tu email no se ha enviado a ningún sitio." },
};

export function initWaitlist(form, onSuccess) {
  const input = form.querySelector("input");
  const msg = form.querySelector(".waitlist__msg");
  const btn = form.querySelector("button");
  const say = (key, tone = "") => { msg.textContent = T[getLang()][key]; msg.dataset.tone = tone; };
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    if (msg.dataset.tone === "err") { msg.textContent = ""; msg.dataset.tone = ""; }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      input.setAttribute("aria-invalid", "true");
      say("invalid", "err");
      input.focus();
      return;
    }
    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT || "/api/waitlist";
    btn.disabled = true;
    say("sending");
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, lang: getLang(), company: form.querySelector("[name=company]")?.value || "" }),
      });
      if (r.status === 503) { say("off", "err"); return; }
      if (r.status === 400) { input.setAttribute("aria-invalid", "true"); say("invalid", "err"); return; }
      if (!r.ok) throw new Error(String(r.status));
      say("ok", "ok");
      form.reset();
      onSuccess?.();
    } catch (_) {
      say("fail", "err");
    } finally {
      btn.disabled = false;
    }
  });
}
