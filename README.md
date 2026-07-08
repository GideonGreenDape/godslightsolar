# Godslight Solars

Monorepo for the Godslight Solars marketing site: React (Vite + Tailwind) frontend
and an Express backend. No authentication — the backend only exists to handle the
contact form and generate the Solar Sizer PDF quote.

## Structure

```
/backend    Express API (contact form, PDF quote generation, serves the built frontend in production)
/frontend   React + Vite + Tailwind CSS + lucide-react
```

## Local development

```bash
npm run install:all   # installs both frontend and backend dependencies
npm run dev            # runs backend (port 5000) and frontend (port 5173) together
```

The Vite dev server proxies `/api/*` requests to `http://localhost:5000`, so the
frontend can call relative paths like `/api/contact` in both dev and production.

Copy `backend/.env.example` to `backend/.env` and fill in SMTP details if you want
contact form submissions emailed to you. Without SMTP configured, submissions are
simply logged to the server console.

## Production build

```bash
npm run build   # builds frontend/dist and installs backend deps
npm start        # starts Express, which serves frontend/dist and the /api routes
```

## Deploying to Render

This repo is set up as a **single Render Web Service** — Express serves both the
API and the built React static files, so there's no separate static site to
configure and no CORS to worry about.

1. Push this repo to GitHub.
2. In Render, create a new **Web Service** from the repo (or use the included
   `render.yaml` Blueprint).
3. Settings:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Add environment variables (optional, for contact form email delivery):
   `CONTACT_TO_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`.

Render will run the build command once, then start the Express server, which
serves the SPA and API from the same origin.
