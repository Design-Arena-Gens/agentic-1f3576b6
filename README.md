# Alfox.ai Agentic Studio

Marketing site and lead capture agent for Alfox.ai. The application highlights the studio's 15 core service lines, showcases differentiators, and captures qualified leads via a rich intake form that emails both the internal team and the prospective client.

## Stack

- [Next.js 14 (App Router, TypeScript, Tailwind CSS)](https://nextjs.org)
- Vercel deployment ready
- [Resend](https://resend.com) transactional email integration
- Zod validation for the lead intake API

## Getting Started

```bash
cd web
npm install
npm run dev
```

Navigate to `http://localhost:3000` to view the site.

### Required environment variables

Configure the following variables for email delivery (e.g. via `.env.local` or Vercel project settings):

```
RESEND_API_KEY=your_resend_api_key
LEAD_NOTIFICATION_EMAIL=ops@alfox.ai
LEAD_FROM_EMAIL=studio@alfox.ai
```

If these variables are omitted the API will gracefully log the lead payload but skip outbound email.

## Key Features

- **Hero & positioning** – elevator pitch, value props, impact KPIs.
- **Services grid** – detailed coverage of 15 offerings from AI calling agents to business automation.
- **Why Alfox.ai section** – differentiators focused on unified delivery, automation, and security.
- **Lead capture flow** – multi-select initiatives, budget/timeline qualifiers, context field, client-side + server zod validation, Resend email notifications + acknowledgements.
- **CTA band & footer** – integration focus and quick contact channels.

## Deployment

1. Build locally before deployment:
   ```bash
   cd web
   npm run build
   ```
2. Deploy to Vercel (token must be available as `VERCEL_TOKEN`):
   ```bash
   vercel deploy --prod --yes --token "$VERCEL_TOKEN" --name agentic-1f3576b6
   ```
3. Verify production after DNS propagates:
   ```bash
   curl https://agentic-1f3576b6.vercel.app
   ```

## Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── api/lead/route.ts  # Lead submission endpoint
│   │   ├── layout.tsx         # Global metadata + fonts
│   │   └── page.tsx           # Landing page + client lead form
│   └── lib/email.ts           # Resend helper + email templates
├── public/                    # Static assets
├── package.json
└── tailwind / config files
```

---

Built autonomously by Codex for the Alfox.ai growth team.
