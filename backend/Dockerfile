FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN addgroup -S portfolio && adduser -S portfolio -G portfolio && chown -R portfolio:portfolio /app
USER portfolio
EXPOSE 5000
CMD ["sh", "-c", "node scripts/validateProductionEnv.js && node server.js"]
