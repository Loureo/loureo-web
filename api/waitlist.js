// POST /api/waitlist · adds an email to Almenara's waitlist in Brevo (a Vercel function; the API key never reaches
// the browser). Single opt-in: the contact goes straight onto the list, with the page's language in LANG.
//
// Env (Vercel → Project → Settings → Environment Variables):
//   BREVO_API_KEY   required. Brevo → Settings → SMTP & API → API keys.
//   BREVO_LIST_ID   optional, defaults to 3 ("Almenara waitlist").
//
// Answers: 200 on the list (new or already there) · 400 bad email · 503 not configured · 502 Brevo failed.

const BREVO = "https://api.brevo.com/v3";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const json = (status, body) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request) {
  const key = process.env.BREVO_API_KEY;
  if (!key) return json(503, { error: "not_configured" });

  let body;
  try { body = await request.json(); } catch (_) { return json(400, { error: "bad_request" }); }
  // a hidden field people never see: bots fill it in. Answer as if it worked and store nothing.
  if (body?.company) return json(200, { ok: true });
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return json(400, { error: "invalid_email" });
  const lang = body?.lang === "es" ? "es" : "en";

  const brevo = (path, payload) => fetch(`${BREVO}${path}`, {
    method: "POST",
    headers: { "api-key": key, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const contact = {
    email,
    listIds: [Number(process.env.BREVO_LIST_ID || 3)],
    attributes: { LANG: lang },
    updateEnabled: true,  // already a contact: add them to the list instead of failing
  };

  try {
    let r = await brevo("/contacts", contact);
    // first sign-up on a fresh account: the LANG attribute does not exist yet. Create it once and try again.
    if (r.status === 400 && /attribute/i.test(await r.clone().text())) {
      await brevo("/contacts/attributes/normal/LANG", { type: "text" });
      r = await brevo("/contacts", contact);
    }
    if (r.ok) return json(200, { ok: true });
    console.error("brevo", r.status, await r.text());
    return json(502, { error: "upstream" });
  } catch (e) {
    console.error("brevo", e);
    return json(502, { error: "upstream" });
  }
}
