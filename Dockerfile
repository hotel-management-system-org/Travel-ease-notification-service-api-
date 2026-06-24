FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

RUN mkdir -p /app/logs && chown -R node:node /app

COPY --from=builder /app/dist ./dist

USER node

EXPOSE 3007

CMD ["node", "dist/server.js"]