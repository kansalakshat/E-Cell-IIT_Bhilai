/* POST /api/contact — delivers the form to the E-Cell inbox via Resend.
   Called over HTTPS from the Resend REST API directly rather than through
   their SDK, so this stays dependency-free. */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const TO = process.env.CONTACT_TO || 'ecell@iitbhilai.ac.in'
/* Must be an address on a domain verified in Resend. Their shared
   onboarding@resend.dev sender only delivers to the account owner. */
const FROM = process.env.CONTACT_FROM || 'E-Cell Website <onboarding@resend.dev>'

const LIMITS = { name: 120, email: 200, message: 5000 }

const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, message } = req.body ?? {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  if (!looksLikeEmail(String(email))) {
    return res.status(400).json({ message: 'Enter a valid email address' })
  }
  /* Trust boundary: these strings end up in an outbound email, so cap them
     rather than relaying whatever arrives. */
  if (
    String(name).length > LIMITS.name ||
    String(email).length > LIMITS.email ||
    String(message).length > LIMITS.message
  ) {
    return res.status(400).json({ message: 'That message is too long to send' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    /* Fail loudly. Returning success with no key is how messages get lost
       silently — the sender believes they've been heard. */
    console.error('RESEND_API_KEY is not set; contact form cannot deliver')
    return res.status(503).json({
      message: `Mail isn't configured yet. Please email ${TO} directly.`,
    })
  }

  const body = {
    from: FROM,
    to: [TO],
    /* So hitting reply in the inbox goes to the sender, not to the site */
    reply_to: String(email),
    subject: `Website enquiry from ${String(name).trim()}`,
    text: [
      `Name:  ${name}`,
      `Email: ${email}`,
      '',
      String(message),
      '',
      '— sent from the E-Cell website contact form',
    ].join('\n'),
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      /* Log the provider's reason server-side; don't leak it to the client */
      console.error('Resend rejected the message:', response.status, await response.text())
      return res.status(502).json({
        message: `Couldn't send that. Please email ${TO} directly.`,
      })
    }

    return res.status(200).json({ message: 'Message received successfully' })
  } catch (err) {
    console.error('Contact form delivery failed:', err)
    return res.status(502).json({
      message: `Couldn't send that. Please email ${TO} directly.`,
    })
  }
}
