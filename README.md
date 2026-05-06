# aw-re.com

Static personal portfolio with featured GitHub projects and a private contact form.

## Projects

Featured projects are rendered from curated static content in `index.html` and enhanced in the browser with public GitHub metadata from `https://api.github.com/users/aw-re/repos`. If GitHub is unavailable, the static project cards remain visible.

## Contact Form

The site posts contact messages to `/api/contact`. The backend email address is not stored in the public HTML or JavaScript. Configure these environment variables in the hosting provider:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_SUBJECT_PREFIX` optional

The serverless endpoint uses Resend's Email API and requires a verified sender domain for production delivery.
