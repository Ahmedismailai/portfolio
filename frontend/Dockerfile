FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S portfolio && adduser -S portfolio -G portfolio
COPY --from=builder --chown=portfolio:portfolio /app/public ./public
COPY --from=builder --chown=portfolio:portfolio /app/.next/standalone ./
COPY --from=builder --chown=portfolio:portfolio /app/.next/static ./.next/static
USER portfolio
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
