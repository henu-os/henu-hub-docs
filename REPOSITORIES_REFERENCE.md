# HENU Repositories Reference

Detailed breakdown of all six core repositories in the HENU Operating System platform.

---

## 1. `henu-platform-api`

- **Location**: `https://github.com/henu-os/henu-platform-api`
- **Primary Tech**: Node.js LTS, NestJS, TypeScript, PostgreSQL, Prisma ORM, Redis
- **Key Responsibilities**:
  - Central backend and source of truth for the ecosystem.
  - Multi-tenant RBAC (`SUPER_ADMIN`, `ADMIN`, `RELEASE_MANAGER`, `OPERATOR`, `AUDITOR`).
  - GitHub App integration and installation access token vending.
  - Release webhook ingress with constant-time HMAC-SHA256 signature verification.
  - Release state machine and streaming SHA-256 package validation.
  - Dynamic catalogue compilation, revision numbering, and content hashing.
  - Server-Sent Events (SSE) server for live client updates.

---

## 2. `henu-addplo`

- **Location**: `https://github.com/henu-os/henu-addplo`
- **Primary Tech**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Key Responsibilities**:
  - Comprehensive administrative web dashboard (20 distinct routes).
  - Application registration and lifecycle management.
  - GitHub repository connections and regex asset matching rules.
  - Release approval/rejection pipeline.
  - Catalogue staging preview, revision publishing, and one-click rollback.
  - Team user management and audit log visualization.

---

## 3. `henu-hub`

- **Location**: `https://github.com/henu-os/henu-hub`
- **Primary Tech**: Tauri 2, React 18, TypeScript, Rust, SQLite
- **Key Responsibilities**:
  - Universal cross-platform desktop application orchestrator.
  - 8 core views: Home, App Store, Installed, Updates, Downloads, Activity, Settings, About.
  - Dynamic catalogue discovery with ETag conditional caching and offline failover.
  - Real-time SSE listener with automatic reconnect and notification deduplication.
  - Native platform adapters for Windows, macOS, and Linux with running-process safety.
  - Cryptographic pre-execution SHA-256 digest validation.

---

## 4. `henu-app-catalog`

- **Location**: `https://github.com/henu-os/henu-app-catalog`
- **Primary Tech**: JSON Schema (Draft 2020-12), TypeScript
- **Key Responsibilities**:
  - Versioned JSON Schema governing public application manifests.
  - Immutable catalogue revisions and canonical SHA-256 content hashes.
  - Sample application fixtures for HENU PA, AI, IDE, Record Management, and Social.
  - Automated manifest validation and rollback test harnesses.

---

## 5. `henu-common-actions`

- **Location**: `https://github.com/henu-os/henu-common-actions`
- **Primary Tech**: GitHub Actions, Node.js, Shell, Jest
- **Key Responsibilities**:
  - Reusable CI/CD workflows for Linux, Windows, and macOS compilation.
  - Streaming SHA-256 checksum generation and `SHA256SUMS` formatting.
  - SLSA Build Attestation generation via GitHub OIDC.
  - Release contract compliance validator (`validate-release-contract.js`).
  - HMAC-signed Platform API release notification webhook dispatcher.
  - Independent product release decoupling (HENU PA releases do not rebuild HENU AI, IDE, or HUB).

---

## 6. `henu-hub-docs`

- **Location**: `https://github.com/henu-os/henu-hub-docs`
- **Primary Tech**: Technical Markdown, Mermaid Diagrams
- **Key Responsibilities**:
  - Centralized operational, architectural, and development documentation.
  - Step-by-step guides for adding applications, setup, publishing, security, and troubleshooting.
