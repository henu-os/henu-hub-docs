# HENU Platform Production Deployment Guide

This guide details the production deployment, containerization, environment hardening, and scaling architecture for the HENU Operating System platform.

---

## 1. Production Deployment Topology

```mermaid
flowchart TD
    subgraph Edge ["Edge & CDN Layer"]
        Cloudflare["Cloudflare / Reverse Proxy (TLS 1.3 Termination)"]
    end

    subgraph Compute ["Compute Clusters (Docker / Kubernetes)"]
        API["HENU Platform API (NestJS Cluster)"]
        Admin["HENU Admin Panel (Next.js Standalone)"]
    end

    subgraph DataTier ["Data Tier (High Availability)"]
        Postgres[("PostgreSQL 16 Managed (Primary + Read Replica)")]
        Redis[("Redis 7 (Rate Limiting & Pub/Sub)")]
    end

    Cloudflare --> API
    Cloudflare --> Admin
    API --> Postgres
    API --> Redis
```

---

## 2. Platform API Production Deployment

### Dockerfile (Multi-Stage Build)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

### Database Migration Deployment

In production pipelines (CI/CD), run:

```bash
npx prisma migrate deploy
```

> **Warning**: Never use `prisma migrate dev` in production as it may trigger schema resets.

---

## 3. Admin Panel Production Deployment

### Next.js Standalone Build

In `henu-addplo/next.config.js`:

```javascript
module.exports = {
  output: 'standalone',
  reactStrictMode: true,
};
```

Run build:

```bash
npm run build
```

Deploy the resulting `.next/standalone` directory with Node.js or via Docker:

```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
EXPOSE 3001
CMD ["node", "server.js"]
```

---

## 4. Production Security Checklist

- [ ] **Enforce TLS 1.3**: Terminate SSL at the edge load balancer. Reject unencrypted HTTP traffic with `301 Moved Permanently`.
- [ ] **Strict CORS**: Set `CORS_ORIGINS` to the exact production admin domain:
  ```env
  CORS_ORIGINS="https://admin.henuos.com"
  ```
- [ ] **Database Connection Pooling**: Set Prisma connection limit appropriate to instance memory:
  ```
  DATABASE_URL="postgresql://user:pass@pg-primary:5432/henu_platform?connection_limit=25&pool_timeout=10"
  ```
- [ ] **Zero Default Passwords**: Ensure bootstrap environment variables (`BOOTSTRAP_ADMIN_PASSWORD`) are deleted immediately after initial provisioning.
- [ ] **Audit Log Ingestion**: Stream structured stdout logs to a centralized log aggregator (Datadog, Grafana Loki, or CloudWatch).
- [ ] **Health Probes**: Configure orchestrator liveness checks on `/api/v1/health/live` and readiness checks on `/api/v1/health/ready`.
