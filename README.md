# Portfolio Website

A production-oriented full-stack portfolio with a Next.js frontend, Express API, MongoDB, Cloudinary uploads, and an authenticated admin dashboard.

## What is included

- Public portfolio, projects, services, skills, testimonials, and published blog pages
- Admin dashboard for content, analytics, messages, subscribers, SEO, settings, resume, and notifications
- HTTP-only cookie authentication, protected admin APIs, rate limiting, input hardening, and secure upload limits
- Aggregated and cached homepage API, server-rendered public listing pages, optimized images, and reduced-motion support

## Local setup

1. Start MongoDB (Docker):

   ```bash
   docker compose up -d mongodb
   ```

2. Configure, seed, and start the backend:

   ```bash
   cd backend
   npm ci
   cp .env.example .env
   # Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in .env first.
   npm run setup
   npm run dev
   ```

3. In a second terminal, configure and start the frontend:

   ```bash
   cd frontend
   npm ci
   cp .env.example .env.local
   npm run dev
   ```

The frontend runs at `http://localhost:3000` and the API at `http://localhost:5000`.

## Environment

Backend requires `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL`. Cloudinary variables are required for uploads. Email variables are optional. On a reverse-proxy host, set `TRUST_PROXY=1`.

Frontend requires:

- `BACKEND_API_URL`, containing the backend URL including `/api` (server-only)
- `NEXT_PUBLIC_SITE_URL`, containing the public site origin

Browser API requests always use the same-origin `/api/backend` bridge, so admin
sessions stay in an HTTP-only cookie and no backend URL or token is exposed to
client-side JavaScript.

Never commit `.env` files. Both apps include safe `.env.example` templates.

## Admin bootstrap

The public admin-registration endpoint is disabled. Set `ADMIN_NAME`, `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` in the backend `.env`. `npm run setup` seeds professional content and creates the first admin when it does not exist. To create only an admin, run:

```bash
npm run create-admin
```

Once logged in, an existing admin can create another admin through the protected API if needed.

## Verification

```bash
cd backend
npm test

cd ../frontend
npm test
npm run lint
npm run build
```

## Deployment

- Deploy `backend/` to a Node host, run `npm run seed` once, then `npm start`.
- Deploy `frontend/` to Vercel or another Next.js host and run `npm run build` then `npm start`.
- Set frontend `BACKEND_API_URL` to the deployed API URL.
- Set `FRONTEND_URL` to the exact frontend origins, comma-separated when more than one origin is required.
- Use `GET /health` for process health and `GET /ready` for database readiness.
- Rotate any MongoDB, Cloudinary, email, or JWT credentials that were ever shared in an archive or committed to source control.
