# HENU Admin Panel Setup Guide

`henu-addplo` is the administrative web dashboard for the HENU Operating System ecosystem. Built with Next.js 14, React 18, and Tailwind CSS, it connects securely to `henu-platform-api`.

---

## 1. Prerequisites

- **Node.js**: v20+ LTS
- Running instance of **`henu-platform-api`** (default: `http://localhost:3000`)

---

## 2. Environment Configuration

Create `.env.local` in `henu-addplo`:

```bash
cd henu-addplo
cp .env.example .env.local
```

Configure the Platform API endpoint:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

---

## 3. Development & Production Run

### Local Development

```bash
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Production Build

```bash
npm run build
npm run start -- -p 3001
```

---

## 4. Administration Pages Reference

The Admin Panel provides 20 specialized operational routes:

| Route                      | Feature Area          | Description                                                                                          |
| :------------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------- |
| **`/login`**               | Authentication        | Email/password login with Argon2id verification and rate-limiting protection.                        |
| **`/mfa`**                 | Security              | TOTP two-factor authentication verification and recovery code support.                               |
| **`/`**                    | Dashboard             | Real-time ecosystem statistics: registered apps, pending releases, failed webhooks, active revision. |
| **`/applications`**        | Application Inventory | Paginated, searchable listing of all registered applications across channels.                        |
| **`/applications/add`**    | App Provisioning      | Comprehensive form for metadata, platforms, architectures, channels, and dependencies.               |
| **`/applications/[id]`**   | App Management        | Edit details, toggle active/maintenance/hidden status, archive application.                          |
| **`/repositories`**        | GitHub Connections    | Manage connected GitHub repositories, asset regex matching, and webhook bindings.                    |
| **`/releases`**            | Release Pipeline      | Overview of incoming releases across `PENDING_APPROVAL`, `APPROVED`, and `REJECTED`.                 |
| **`/releases/[id]`**       | Release Details       | Deep inspection of platform binaries, streaming SHA-256 digests, and approval triggers.              |
| **`/channels`**            | Channels              | Channel-level routing rules and default tier assignments (`stable`, `beta`, `nightly`).              |
| **`/platforms`**           | Compatibility Matrix  | View and configure supported operating systems and CPU architectures.                                |
| **`/catalogue/preview`**   | Catalogue Preview     | Dynamic JSON preview of the pending catalogue state before publishing.                               |
| **`/catalogue/publish`**   | Publishing            | Publish a new immutable catalogue revision with cryptographic content hashes.                        |
| **`/catalogue/revisions`** | Revision History      | Complete audit trail of published catalogue revisions.                                               |
| **`/catalogue/rollback`**  | Rollback Controls     | Safe one-click rollback to any previously verified catalogue revision.                               |
| **`/users`**               | Admin Users           | Manage administrative team accounts, status, and role assignments.                                   |
| **`/roles`**               | RBAC Permissions      | Role-Based Access Control matrix (`SUPER_ADMIN`, `ADMIN`, `RELEASE_MANAGER`, `OPERATOR`, `AUDITOR`). |
| **`/audit`**               | Audit Trail           | Immutable ledger of administrative actions, user logins, and publishing events.                      |
| **`/webhooks`**            | Webhook Events        | Incoming delivery event ledger with payload inspection and replay capabilities.                      |
| **`/settings`**            | System Settings       | Configure system-wide notification policies, CORS origins, and session timeouts.                     |

---

## 5. Security & Session Management

- **Short-Lived Access Tokens**: Stored in memory; valid for 15 minutes.
- **Rotating Refresh Tokens**: Stored securely; automatically rotated upon each token refresh request.
- **Immediate Invalidation**: Logging out revokes the refresh token family on the server immediately.
- **Role Enforcement**: User actions and page views are enforced on both the client UI and the backend API guards.
