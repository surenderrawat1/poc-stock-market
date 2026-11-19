FROM node:24-alpine

WORKDIR /workspace

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY prisma/schema.prisma prisma/schema.prisma
RUN npm ci

COPY apps/api apps/api
RUN npm run api:build

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "api:start"]
