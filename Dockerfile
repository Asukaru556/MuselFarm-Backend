FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY prisma ./prisma
COPY prisma.config.ts ./

ENV DATABASE_URL="postgresql://mock:mock@localhost:5432/mock"

RUN npx prisma generate
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

COPY start.sh ./
RUN chmod +x start.sh

EXPOSE 3000
CMD ["node", "dist/src/main.js"]
