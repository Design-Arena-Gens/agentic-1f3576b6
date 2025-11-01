# Alfox.ai Agentic Studio

See the root `README.md` for a project overview. This folder contains the Next.js application deployed to Vercel.

## Commands

```bash
npm run dev    # local development
npm run build  # production build (run before deploy)
npm run start  # serve production build locally
npm run lint   # lint with Next.js configuration
```

## Environment Variables

Set the following variables locally or in Vercel before running the API route that dispatches emails:

```
RESEND_API_KEY
LEAD_NOTIFICATION_EMAIL
LEAD_FROM_EMAIL
```

Without them, the lead endpoint falls back to logging submissions and returns success without sending email.

---

Crafted for the Alfox.ai growth team.
