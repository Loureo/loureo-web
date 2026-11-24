# Emails

Brevo templates for Almenara's waitlist, in the site's look: black, the device render, Funnel type, few words.
Each file is a complete HTML email (tables and inline styles, so it holds up in Gmail and Outlook). Paste it into
Brevo → Templates → New template → "Paste your code", with the subject and preheader from the comment at its top.

| File | What | When |
| --- | --- | --- |
| `welcome.en.html`, `welcome.es.html` | "You are on the list" | Brevo automation: contact added to list 3, branch on `LANG` |
| `update.en.html`, `update.es.html` | Base for news (replace the `[…]` text) | Campaigns to list 3, one per language (segment on `LANG`) |

- The image is `public/almenara/email/almenara.jpg` served from loureo.com (made by `export_web.sh` from the
  `waitlist` render). Email clients do not show WebP: keep it a JPG.
- `{{ unsubscribe }}` is Brevo's unsubscribe link. Every email must keep it, and the company and address in the footer.
- Voice: PRODUCT.md. No promises of dates or prices until they are real.
