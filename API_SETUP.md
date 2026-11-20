# HENU Platform API Setup Guide

`henu-platform-api` is the NestJS backend and source of truth for identity, application inventory, GitHub release ingestion, and catalogue management.

---

## 1. Prerequisites

- **Node.js**: v20+ LTS
- **Docker**: For local PostgreSQL (or external PostgreSQL 15+ database)
- **Git**

---

## 2. Environment Configuration

Copy the example environment file and configure local credentials:

```bash
cd henu-platform-api
cp .env.example .env
```

### Essential Environment Variables

| Variable                 | Description                                  | Example (Development)                                                                     |
| :----------------------- | :------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `NODE_ENV`               | Runtime environment                          | `development`                                                                             |
| `PORT`                   | API server listen port                       | `3000`                                                                                    |
| `DATABASE_URL`           | PostgreSQL Prisma connection string          | `postgresql://henu_admin:<strong-db-password>@localhost:5432/henu_platform?schema=public` |
| `JWT_ACCESS_SECRET`      | Secret key for access token signing          | `minimum_32_characters_random_secret_key_123`                                             |
| `JWT_ACCESS_EXPIRATION`  | Access token lifespan                        | `15m`                                                                                     |
| `JWT_REFRESH_SECRET`     | Secret key for rotating refresh tokens       | `another_minimum_32_characters_refresh_secret`                                            |
| `JWT_REFRESH_EXPIRATION` | Refresh token lifespan                       | `7d`                                                                                      |
| `GITHUB_APP_ID`          | GitHub App ID                                | `123456`                                                                                  |
| `GITHUB_APP_PRIVATE_KEY` | RSA Private Key for GitHub App auth          | Base64 or PEM string                                                                      |
| `GITHUB_WEBHOOK_SECRET`  | HMAC Webhook secret                          | `your_github_webhook_secret_here`                                                         |
| `CORS_ORIGINS`           | Permitted origins for frontend communication | `http://localhost:3001,http://localhost:5173`                                             |

---

## 3. Database Initialization & Migrations

Start the local PostgreSQL container via Docker Compose:

```bash
docker-compose up -d postgres
```

Verify PostgreSQL is running:

```bash
docker ps
```

Apply Prisma database migrations:

```bash
npm run prisma:migrate:dev
```

Generate Prisma client:

```bash
npm run prisma:generate
```

---

## 4. Initial Admin User Provisioning

To prevent insecure default credentials, `henu-platform-api` does **not** provide a public admin registration endpoint. Use the secure CLI seeding script to provision your initial Super Admin:

```bash
# Provide temporary bootstrap credentials via environment variables
BOOTSTRAP_ADMIN_EMAIL="admin@henuos.com" \
BOOTSTRAP_ADMIN_PASSWORD="<choose-a-strong-secret-password-min-12-chars>" \
BOOTSTRAP_ADMIN_NAME="System Administrator" \
npm run seed:admin
```

The script:

1. Hashes the password using **Argon2id** (memory cost 64MB, 3 iterations, 4 parallelism).
2. Assigns the `SUPER_ADMIN` role.
3. Generates TOTP MFA recovery codes.

---

## 5. Starting the Service

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

---

## 6. Verification & Probes

| Endpoint                                     | Method | Expected Status | Purpose                                     |
| :------------------------------------------- | :----- | :-------------- | :------------------------------------------ |
| `http://localhost:3000/api/v1/health/live`   | `GET`  | `200 OK`        | Liveness probe                              |
| `http://localhost:3000/api/v1/health/ready`  | `GET`  | `200 OK`        | Readiness probe (verifies database)         |
| `http://localhost:3000/api/docs`             | `GET`  | `200 OK`        | Interactive Swagger/OpenAPI documentation   |
| `http://localhost:3000/api/v1/hub/catalogue` | `GET`  | `200 OK`        | Public application catalogue (ETag enabled) |

---

## 7. Automated Testing

```bash
# Unit tests
npm test

# End-to-end integration tests (requires test database)
npm run test:e2e
```
