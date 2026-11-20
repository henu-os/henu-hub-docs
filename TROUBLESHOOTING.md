# HENU Platform Troubleshooting Guide

Diagnostic procedures, common error scenarios, and resolutions across the HENU ecosystem.

---

## 1. Webhook Ingress & GitHub Integration Issues

### Problem: `401 Unauthorized - Invalid HMAC signature`

- **Symptom**: GitHub delivery history logs HTTP 401 when sending release webhooks to `henu-platform-api`.
- **Cause**: The `X-Hub-Signature-256` header does not match the computed digest of the raw body.
- **Resolution**:
  1. Verify that `GITHUB_WEBHOOK_SECRET` in `henu-platform-api/.env` matches the secret in GitHub App settings exactly.
  2. Ensure reverse proxies (Nginx, Traefik, Cloudflare) do not rewrite, parse, or re-encode incoming JSON request bodies before passing them to the NestJS application. NestJS must receive the verbatim raw buffer.

### Problem: `Release ingested but status marked as REJECTED`

- **Symptom**: Release appears in Admin Panel as `REJECTED`.
- **Cause**:
  - Missing mandatory platform package (e.g. repo configured for Windows, macOS, and Linux, but Linux package was missing).
  - Version contains pre-release suffix (e.g. `1.0.0-beta.1`) while channel was set to `stable`.
  - Binary asset naming does not match the configured regular expression pattern.
- **Resolution**:
  1. Inspect release details at `/releases/[id]`.
  2. Verify all asset names conform to the contract: `{productId}-{version}-{os}-{arch}.{format}`.
  3. Re-run failed CI/CD workflow or replay the webhook event via **Admin Panel &rarr; Webhook Events &rarr; Replay Delivery**.

---

## 2. Admin Authentication & Session Issues

### Problem: `Account Locked: Too many failed login attempts`

- **Symptom**: User receives HTTP 429 / Account Locked after multiple incorrect password attempts.
- **Cause**: Built-in brute-force protection locks the account for 15 minutes after 5 consecutive failures.
- **Resolution**:
  1. Wait for the lockout period to expire.
  2. Or, a Super Admin can reset the user's failed attempt counter in **Admin Panel &rarr; Admin Users &rarr; Unlock**.

### Problem: `Invalid TOTP Code`

- **Symptom**: Correct authenticator app code is rejected.
- **Cause**: Clock drift on either the host server or the client device.
- **Resolution**:
  1. Synchronize the host server system clock with NTP:
     ```bash
     sudo chronyd -q 'server pool.ntp.org iburst'
     ```
  2. Use one of the 8 single-use recovery codes generated during initial MFA setup.

---

## 3. HENU HUB Client Issues

### Problem: `SHA-256 Checksum Verification Failed`

- **Symptom**: HUB aborts installation with "Integrity check failed: Expected SHA-256 ...".
- **Cause**: Downloaded file was truncated, corrupted by an intermediate caching proxy, or the GitHub release asset was re-uploaded without updating the catalogue manifest.
- **Resolution**:
  1. Check the local activity log in **HENU HUB &rarr; Activity**.
  2. Clear cached downloads in temporary directory.
  3. If the binary on GitHub Releases was replaced, publish a new catalogue revision in the Admin Panel to update the expected content hash.

### Problem: `Application is currently running: Please close it to apply the update`

- **Symptom**: Attempting to update an installed application yields an in-use warning.
- **Cause**: Operating systems (especially Windows) lock executable files while processes are running, preventing file replacement.
- **Resolution**:
  - Close the target application.
  - Alternatively, HENU HUB automatically queues the update in SQLite. Once the user exits the running application, the scheduled update applies automatically.

### Problem: `Offline Cache (Catalogue Live indicator gray)`

- **Symptom**: HENU HUB shows an amber "Offline Cache" pill.
- **Cause**: The catalogue API endpoint cannot be reached or the SSE stream timed out.
- **Resolution**:
  1. Verify the configured catalogue URL in **HENU HUB &rarr; Settings**.
  2. Verify `henu-platform-api` is accessible from the client machine.
  3. The client will automatically retry with exponential backoff and resume live updates once connectivity is restored.

---

## 4. Database & Prisma Issues

### Problem: `PrismaClientKnownRequestError: P1001 Can't reach database server`

- **Resolution**:
  1. Ensure the PostgreSQL Docker container is running:
     ```bash
     docker-compose ps
     ```
  2. Verify credentials and port 5432 in `DATABASE_URL`.
