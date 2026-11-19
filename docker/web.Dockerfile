FROM node:24-alpine

WORKDIR /workspace

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
COPY prisma/schema.prisma prisma/schema.prisma
RUN npm ci

COPY apps/web apps/web

ENV NG_CLI_ANALYTICS=false
EXPOSE 4200

CMD ["npm", "run", "start", "--workspace", "@stock-market/web", "--", "--host", "0.0.0.0", "--proxy-config", "proxy.conf.docker.json"]
