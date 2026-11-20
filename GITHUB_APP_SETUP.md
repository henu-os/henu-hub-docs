# GitHub App Integration Setup Guide

The **HENU Platform** uses an official GitHub App to securely discover repositories, validate permissions, and ingest release events without embedding personal or organization-wide access tokens in code or client applications.

---

## 1. Creating the GitHub App

1. In your GitHub Organization settings (`https://github.com/organizations/henu-os/settings/apps`), click **New GitHub App**.
2. Configure basic settings:
   - **GitHub App name**: `HENU Platform Release Orchestrator`
   - **Homepage URL**: `https://henuos.com`
   - **Callback URL**: `https://api.henuos.com/api/v1/auth/github/callback`
   - **Expire user authorization tokens**: Checked.

---

## 2. Webhook Configuration

Under the **Webhook** section:

- **Active**: Check `Active`.
- **Webhook URL**: `https://api.henuos.com/api/v1/webhooks/github` (or `http://localhost:3000/api/v1/webhooks/github` for development with a tunnel).
- **Webhook secret**: Generate a high-entropy string (minimum 32 characters):
  ```bash
  openssl rand -hex 32
  ```
  Set this exact string as `GITHUB_WEBHOOK_SECRET` in `henu-platform-api/.env`.

---

## 3. Permissions Configuration

Configure **least-privilege** permissions:

### Repository Permissions

| Permission   | Level       | Reason                                                      |
| :----------- | :---------- | :---------------------------------------------------------- |
| **Contents** | `Read-only` | Read release tags, commit SHAs, and release notes.          |
| **Metadata** | `Read-only` | Mandatory for all GitHub Apps to query repo basic info.     |
| **Releases** | `Read-only` | Ingest published release assets, metadata, and binary URLs. |

### Subscribe to Events

Under **Subscribe to events**, select:

- [x] **Release** (Triggers whenever a release is `published`, `edited`, or `deleted`).

---

## 4. Private Key Generation & Configuration

1. Scroll to **Private keys** and click **Generate a private key**.
2. Save the downloaded `.pem` file.
3. Configure `henu-platform-api/.env`:
   - Set `GITHUB_APP_ID` with the App ID displayed at the top of the app settings page.
   - For `GITHUB_APP_PRIVATE_KEY`, you can provide either:
     - The raw PEM string:
       ```env
       GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"
       ```
     - Or a base64-encoded string:
       ```bash
       base64 -w 0 private-key.pem
       ```

---

## 5. Installing the GitHub App

1. In the left navigation of your GitHub App page, select **Install App**.
2. Click **Install** next to the `henu-os` organization.
3. Choose **Only select repositories** and pick:
   - `henu-pa`
   - `henu-ai`
   - `henu-ide`
   - Additional future product repositories.
4. Record the **Installation ID** (visible in the browser URL after installation, e.g. `https://github.com/organizations/henu-os/settings/installations/12345678`).

---

## 6. How `henu-platform-api` Uses the App

1. **Short-Lived Installation Tokens**: When querying releases or repository metadata, the Platform API requests an installation access token using RS256 JWT authentication. Tokens expire automatically after 60 minutes and are renewed on-demand.
2. **Rate Limit Management**: The API tracks remaining GitHub API quota (`x-ratelimit-remaining`) and logs backoff warnings before exhaustion.
3. **Webhook Ingress Validation**: Incoming release payloads are intercepted by `GitHubSignatureGuard`, which computes the HMAC-SHA256 digest of the raw request body and verifies it in constant-time against `X-Hub-Signature-256`.
