const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 12 * 1024;

function setJsonHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

function sendJson(res, statusCode, payload) {
  setJsonHeaders(res);
  return res.status(statusCode).json(payload);
}

function clean(value, maxLength) {
  return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

async function readBody(req) {
  if (req.body) {
    if (typeof req.body === 'string') return JSON.parse(req.body);
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_BYTES) {
        reject(new Error('Request body is too large.'));
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return sendJson(res, 405, { ok: false, message: 'Method not allowed.' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    return sendJson(res, 400, { ok: false, message: 'Invalid request body.' });
  }

  const company = clean(body.company, 120);
  const startedAt = Number(body.started_at);
  const submittedTooFast = Number.isFinite(startedAt) && Date.now() - startedAt < 1200;

  if (company || submittedTooFast) {
    return sendJson(res, 200, { ok: true });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 160);
  const message = String(body.message || '').trim().slice(0, 2000);

  if (name.length < 2 || !isEmail(email) || message.length < 10) {
    return sendJson(res, 422, {
      ok: false,
      message: 'Please complete the form with a valid name, email, and message.'
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return sendJson(res, 503, {
      ok: false,
      message: 'The contact service is not configured yet.'
    });
  }

  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || 'New portfolio message';
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
  const sourceIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown';

  const text = [
    `${subjectPrefix}`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    message,
    '',
    `Source IP: ${sourceIp}`
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
      <h2 style="margin:0 0 16px">New portfolio message</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <div style="margin-top:20px;padding:16px;border:1px solid #e5e7eb;border-radius:8px">
        ${safeMessage}
      </div>
      <p style="margin-top:20px;color:#6b7280;font-size:12px">Source IP: ${escapeHtml(sourceIp)}</p>
    </div>
  `;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `${subjectPrefix}: ${name}`,
        html,
        text
      })
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend contact email failed:', details);
      return sendJson(res, 502, {
        ok: false,
        message: 'Unable to send the message right now. Please try again later.'
      });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return sendJson(res, 502, {
      ok: false,
      message: 'Unable to send the message right now. Please try again later.'
    });
  }
};
