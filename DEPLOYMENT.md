# Production deployment

This project can be deployed as two services (frontend and backend) or with the supplied Docker Compose stack.

## Docker Compose

1. Copy `.env.production.example` to `.env` on the server and set every required value.
2. Set `FRONTEND_URL` to the public portfolio address, `CADDY_DOMAIN` to the domain name without `https://`, and keep `BACKEND_PUBLIC_URL` equal to `FRONTEND_URL`.
3. Run `docker compose -f compose.production.yaml up -d --build`.
4. Run the seed once after MongoDB is healthy:

   ```bash
   docker compose -f compose.production.yaml exec backend npm run seed
   ```

5. Set the first admin credentials as environment variables, then run `npm run create-admin` in the backend container.

## Required production checks

- `https://your-domain.com/api/backend/ready` returns HTTP 200.
- Login succeeds at `/login` and dashboard content can be created, updated, and deleted.
- Project, blog, testimonial, avatar, and resume uploads are stored in Cloudinary.
- Replace template text and illustrative testimonials with your verified portfolio content before publishing.

The Caddy layer terminates HTTPS and forwards the public portfolio domain to Next.js. It sends `/uploads/*` directly to Express. The frontend sends browser API requests to `/api/backend`; its server-side bridge forwards them to Express, keeping the HTTP-only admin cookie on the public portfolio domain.
