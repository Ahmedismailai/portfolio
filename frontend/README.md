# Portfolio Frontend

Next.js App Router frontend for the portfolio and admin dashboard.

## Commands

```bash
npm ci
cp .env.example .env.local
npm run dev
npm run lint
npm run build
npm start
```

Set `BACKEND_API_URL` to the backend URL including `/api`, keep `NEXT_PUBLIC_API_URL=/api/backend`, and set `NEXT_PUBLIC_SITE_URL` to the public frontend origin. The built-in API bridge keeps login cookies same-origin while forwarding requests to Express. See the root README for full setup and deployment guidance.
