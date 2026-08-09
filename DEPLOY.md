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

## Contact form: submissions go nowhere

The function validates input and returns success, but doesn't store or send
anything — the Express version only logged too. Messages appear in the Vercel
function logs and are lost after the retention window.

Before real use, add a delivery path in `api/contact.js`:

- **Resend** or **SendGrid** to email `ecell@iitbhilai.ac.in`
- or a database (Vercel Postgres, Supabase) to store them

Either needs an API key set under **Project → Settings → Environment
Variables**. Never commit it — `.env` files are gitignored.

## Notes

- `robot-face.glb` is 2.9 MB and served from `public/`. It's fetched lazily
  after first paint, so it doesn't block the page, but it is the largest
  asset on the site.
- The three.js chunk is ~213 kB gzipped and also loads after the shell.
