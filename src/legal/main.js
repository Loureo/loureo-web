import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/inter-tight";
import "../studio/studio.css";
import "./legal.css";
import { initI18n } from "../shared/i18n.js";

// The legal text is written out in both languages in the HTML (it has links and lists that a string swap would lose);
// this only translates the shared nav and footer.
const ES = {
  skip: "Saltar al contenido",
  "nav.objects": "Proyectos", "nav.values": "Valores", "nav.contact": "Contacto",
  "foot.made": "Diseñado y hecho en Madrid, España.",
  "foot.write": "Escríbenos",
  "foot.legal": "Aviso legal y privacidad",
  "foot.purpose.t": "Nuestro propósito",
  "foot.purpose.p": "La tecnología debería simplificar la vida, no llenarla. Probamos ideas nuevas hasta que lo consiguen y construimos las que se ganan un sitio en tu día.",
  "foot.contact.t": "Contacto",
  "foot.general": "Consultas generales",
};

document.documentElement.classList.remove("no-js");
initI18n({ es: ES });
const nav = document.querySelector(".snav");
addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });
// the Spanish anchor for links that point at #privacy
if (location.hash === "#privacy" && document.documentElement.lang === "es") document.getElementById("privacidad")?.scrollIntoView();
