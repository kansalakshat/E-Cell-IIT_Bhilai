# Deploying to Vercel

The site is a Vite SPA plus one serverless function. There is no long-running
server in production — Vercel doesn't host one.

## One-time setup

1. <https://vercel.com/new> → import **kansalakshat/E-Cell-IIT_Bhilai**
2. **Root Directory: `frontend`** — this is the setting that matters. The repo
   root holds `frontend/` and `backend/`, so pointing Vercel at the repo root
   builds nothing.
3. Leave the rest alone. Vercel detects Vite and infers `npm run build` →
   `dist`.
4. Deploy.

Every push to `master` redeploys; pull requests get preview URLs.

## What's in the repo for this

- **`frontend/vercel.json`** — rewrites every unmatched path to `index.html`.
  React Router owns the routing, so without this a hard refresh on `/about`
  or `/events` returns 404. The `(?!api/)` guard keeps API paths out of it;
  static files are matched before rewrites, so assets are unaffected.
- **`frontend/api/contact.js`** — the one endpoint the frontend actually
  calls. Vercel turns any file under `api/` into a serverless function, so
  `POST /api/contact` works with no configuration.

## The backend

`backend/server.js` is **not deployed**. Of its four routes, the frontend only
ever calls `/api/contact` — `EventsPage` renders a hardcoded array rather than
fetching `/api/events`. That one route is reimplemented as the serverless
function above.

Local development is unchanged: `npm run dev` still proxies `/api` to the
Express server on port 5000 (see `vite.config.js`).

If you later want `/api/events` and `/api/stats` live, add `api/events.js` and
`api/stats.js` alongside `contact.js` — same pattern, no config.

## Contact form: needs two env vars before it delivers

`api/contact.js` emails submissions to `ecell@iitbhilai.ac.in` through
[Resend](https://resend.com), called over its REST API so there's no extra
dependency.

**Until `RESEND_API_KEY` is set the form returns 503** and tells visitors to
email directly. That's deliberate — returning success with no key is how
messages get lost silently, with the sender believing they've been heard.

### Setup

1. Create a Resend account.
2. **Verify a domain you control** under Resend → Domains, and add the DNS
   records it gives you. This is the step that can't be skipped: Resend's
   shared `onboarding@resend.dev` sender only delivers to the address that
   owns the Resend account, so it will *not* reach the E-Cell inbox.
   - If `iitbhilai.ac.in` DNS isn't yours to change, ask whoever runs it for
     the records, or verify a domain the club does own.
3. In Vercel → **Settings → Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | `re_...` from Resend → API Keys |
   | `CONTACT_FROM` | `E-Cell <noreply@your-verified-domain>` |

   `CONTACT_TO` is optional and defaults to `ecell@iitbhilai.ac.in`.
4. Redeploy — env vars are read at runtime, but existing deployments don't
   pick up new ones.

Never commit the key; `.env` files are gitignored.

### Behaviour

- Replies go to the sender: the mail sets `reply_to` to whatever address the
  visitor typed, so hitting reply in the inbox reaches them, not the site.
- Inputs are length-capped (name 120, email 200, message 5000) since they're
  relayed into an outbound email.
- Provider errors are logged server-side; visitors get "email us directly"
  rather than the raw reason.

### Not included

There's no rate limiting — serverless functions hold no shared state, so it
needs a store (Vercel KV, Upstash) to count against. If the form starts
attracting spam, that plus a honeypot field are the first two things to add.

## Notes

- `robot-face.glb` is 2.9 MB and served from `public/`. It's fetched lazily
  after first paint, so it doesn't block the page, but it is the largest
  asset on the site.
- The three.js chunk is ~213 kB gzipped and also loads after the shell.
