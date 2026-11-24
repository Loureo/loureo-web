// Almenara's Spanish strings (English is in the HTML). The engine is src/shared/i18n.js.
import { initI18n as init } from "../shared/i18n.js";
export { t, getLang, onLang } from "../shared/i18n.js";

const EXTRA = {
  en: {
    "light.cap.working": "Working. Nothing needs you.",
    "light.cap.no": "Every question starts on No.",
    "light.cap.yesand": "Yes, and don't ask again.",
    "light.cap.yes": "Yes, just this once.",
  },
  es: {
    "light.cap.working": "Trabajando. Nada te necesita.",
    "light.cap.no": "Toda pregunta empieza en No.",
    "light.cap.yesand": "Sí, y no vuelvas a preguntar.",
    "light.cap.yes": "Sí, solo esta vez.",
  },
};

const ES = {
  skip: "Saltar al contenido",
  "nav.light": "Luz", "nav.design": "Diseño", "nav.how": "Cómo funciona", "nav.cta": "Lista de espera",
  cta: "Apúntate a la lista",
  "hero.title": "Cuando tu agente te necesita, se enciende una luz.",
  "hero.alt": "Almenara sobre una mesa de nogal: un dispositivo de aluminio con pantalla de cristal, una rueda y una luz violeta en el borde frontal.",
  statement: "Deja que tus agentes trabajen durante horas. Quédate con las decisiones que importan.",
  "light.title": "Habla con luz.",
  "chip.working": "Trabajando", "chip.no": "No", "chip.yes": "Sí", "chip.yesand": "Sí, y…",
  "light.hint": "Gira la rueda", "aria:light.knob": "Rueda",
  // the device's screen
  "ds.working": "Trabajando", "ds.workTitle": "Escribiendo el informe de la semana",
  "ds.asks": "Quiere enviar un correo", "ds.title": "Enviar el informe semanal a Ana",
  "ds.to": "Para", "ds.att": "Informe semanal.pdf",
  "ds.o1": "Sí", "ds.o2": "Sí, y no volver a preguntar", "ds.o3": "No",
  "ds.hint": "Gira para elegir · Pulsa para responder",
  "design.title": "Hecho para quedarse en tu mesa.",
  "design.knob.t": "Responde sin mirar.", "design.knob.p": "Un giro, un clic.",
  "design.knob.alt": "La rueda de aluminio, con un fino acabado circular.",
  "design.led.t": "Se ve desde la otra punta de la habitación.", "design.led.p": "Ninguna notificación que se pierda.",
  "design.led.alt": "La luz del borde frontal, encendida en ámbar.",
  "design.side.t": "Tan pequeño que te olvidas de él.", "design.side.p": "Hasta que te necesita.",
  "design.side.alt": "Almenara vista de lado, fina, sobre su peana redonda.",
  "inside.title": "Cada cosa en su sitio.",
  "inside.c1": "Todo lo que tocas, arriba.",
  "inside.c2": "Un pequeño ordenador que escucha a tu agente.",
  "inside.c3": "Una batería, para que vaya contigo.",
  "towers.title": "Las torres hablaban con fuego.",
  "towers.p1": "Una torre veía el peligro y encendía un fuego. La siguiente lo veía y encendía el suyo. El aviso cruzaba la costa en minutos. Esas torres se llamaban almenaras.",
  "towers.p2": "Almenara hace lo mismo con tu trabajo, estés donde estés.",
  "towers.alt": "Crestas de montaña al anochecer.",
  "how.title": "Cómo funciona.",
  "how.t1": "Tu agente se pone a trabajar.",
  "how.s1": "Le pides el informe semanal y te vas a comer.",
  "how.t2": "Te necesita.",
  "how.s2": "Antes de enviárselo a Ana, pregunta. La luz cambia.",
  "how.t3": "Respondes desde la cocina.",
  "how.s3": "Giras. Pulsas. Listo.",
  "how.t4": "Sigue con lo suyo.",
  "how.s4": "El correo sale. Vuelta al violeta.",
  "close.title": "Sé de los primeros en verla encenderse.",
  "close.p": "Te escribiremos cuando haya algo que enseñar.",
  "close.label": "Email",
  "close.submit": "Apuntarme",
  "close.note": "Loureo SL usará tu email solo para escribirte sobre Almenara. Puedes darte de baja cuando quieras.",
  "close.privacy": "Privacidad",
  "foot.legal": "Aviso legal y privacidad",
  "foot.tag": "Una luz para cuando tu agente te necesita.",
  "foot.studio": "El laboratorio",
  "foot.made": "Almenara está diseñado por Loureo en Madrid, España.",
  "foot.photo": "Foto del paisaje: Kaya Arro en Unsplash.",
};

export const initI18n = () => init({ es: ES, extra: EXTRA });
