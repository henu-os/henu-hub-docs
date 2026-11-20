# HENU Platform Security & Secrets Guide

This document establishes the security architecture, credential management protocols, encryption standards, and threat model across the HENU Operating System ecosystem.

---

## 1. Secrets Management & Credential Hygiene

1. **No Hardcoded Credentials**: No passwords, API keys, private keys, or tokens may be hardcoded or committed to git.
2. **Gitignore Protection**: All repositories enforce strict `.gitignore` patterns rejecting `.env`, `.env.*` (except `.env.example`), `*.pem`, `*.key`, and credential files.
3. **Client-Side Zero Secrets**: The `henu-hub` desktop application contains **no** administrator GitHub tokens, **no** database passwords, and **no** private keys. It communicates only with public catalogue APIs and authenticated HTTPS endpoints.
4. **CI/CD Secrets Isolation**: Workflows in `henu-common-actions` read secrets exclusively through GitHub Secrets (`${{ secrets.HENU_WEBHOOK_SECRET }}`).

---

## 2. Authentication & Identity Protection

### Password Hashing

All administrative passwords are saved using **Argon2id** (the winner of the Password Hashing Competition):

- Memory cost: `65536` KiB (64 MB)
- Iterations (Time cost): `3`
- Parallelism: `4` threads
- Salt: 16 bytes cryptographically random bytes generated via OS CSPRNG.

### Token Architecture

- **Access Tokens**: Short-lived (15 minutes), signed with HMAC-SHA256 (`JWT_ACCESS_SECRET`). Carries user ID, email, role, and MFA verification claims.
- **Refresh Tokens**: Stored in PostgreSQL with rotating UUID tokens. Using a refresh token automatically invalidates it and issues a new token family. If an expired or replayed refresh token is presented, the entire token family is immediately revoked to thwart token theft.
- **Session Revocation**: User logout instantly deletes the refresh token record.

### Multi-Factor Authentication (MFA)

- Time-based One-Time Passwords (TOTP RFC 6238) using HMAC-SHA1 and 30-second windows.
- Single-use recovery codes generated upon enrollment and hashed before storage.

---

## 3. Webhook Cryptographic Verification

All webhooks received by `henu-platform-api` (`/api/v1/webhooks/github`) undergo cryptographic verification before any processing occurs:

```typescript
const computedSignature =
  'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
const isValid = crypto.timingSafeEqual(
  Buffer.from(signatureHeader),
  Buffer.from(computedSignature),
);
```

- **Constant-Time Comparison**: Mitigates timing attacks on HMAC string comparison.
- **Raw Request Preservation**: The raw bytes of the incoming request are preserved verbatim to guarantee valid digest calculation.
- **Replay Protection**: Every incoming delivery ID (`X-GitHub-Delivery`) is stored in a database idempotency table. Duplicate IDs are rejected with `already_processed`.

---

## 4. Package Integrity & Execution Sandboxing

1. **Pre-Execution SHA-256 Digest Verification**:
   - `henu-hub` downloads packages to a temporary staging folder.
   - Streams the binary bytes through SHA-256 hashing.
   - Compares the computed digest with the signed catalogue manifest.
   - If a single bit differs, the package is deleted immediately and flagged as a verification failure in the local audit log.
2. **OS-Native Privilege Escalation**:
   - Installers requiring administrative privileges invoke OS-native mechanisms (Windows UAC, macOS Authorization Services, Linux `pkexec` / `sudo`).
   - HENU HUB never bypasses OS security gates or runs unattended background services with unrestricted system privileges.
3. **Web Application Isolation**:
   - Web applications (`appType: 'web'`) are verified to use `https:` or `http:` schemes only (`javascript:` and `file:` URIs are rejected).
   - Launched in the user's default browser with `noopener,noreferrer`.
   - Never triggers binary downloads or local native execution.
