/* Vercel serverless replacement for the Express POST /api/contact route.
   Vercel has no long-running server, so the one endpoint the frontend
   actually calls lives here instead. Local dev still proxies to
   backend/server.js via vite.config.js. */
export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  /* Nothing is persisted or emailed — same as the Express version, which
     only logged. Submissions land in the Vercel function logs and nowhere
     else. Wire an email service or a database here before relying on it. */
  console.log('Contact message:', { name, email, message })

  return res.status(200).json({ message: 'Message received successfully' })
}
