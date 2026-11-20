# HENU Platform Central Documentation

Welcome to the central technical, architectural, operational, and governance documentation for **HENU OS PRIVATE LIMITED** ([https://www.henuos.in/](https://www.henuos.in/)).

---

## 1. Required Operational Guides

| Document                                                                     | Primary Focus                                                                                                                                     |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **[`CORPORATE_SUPPORT.md`](./CORPORATE_SUPPORT.md)**                         | **Corporate & Legal**: CIN, GSTIN, headquarters, communication desks, SLA matrix, and executive consultation booking.                             |
| **[`ADDING_A_NEW_HENU_APPLICATION.md`](./ADDING_A_NEW_HENU_APPLICATION.md)** | **Master Guide**: Step-by-step from creating a GitHub repo to publishing in HENU Admin & discovery in HUB.                                        |
| **[`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md)**                     | Component topology, data flow, trust boundaries, and repository interactions.                                                                     |
| **[`API_SETUP.md`](./API_SETUP.md)**                                         | `henu-platform-api` backend setup, PostgreSQL, migrations, and bootstrap admin provisioning.                                                      |
| **[`ADMIN_SETUP.md`](./ADMIN_SETUP.md)**                                     | `henu-addplo` admin panel setup and reference of all 21 administration pages.                                                                     |
| **[`HUB_SETUP.md`](./HUB_SETUP.md)**                                         | `henu-hub` cross-platform desktop application setup, native compilation, and testing.                                                             |
| **[`GITHUB_APP_SETUP.md`](./GITHUB_APP_SETUP.md)**                           | GitHub App creation, permissions, RSA keys, and webhook integration.                                                                              |
| **[`RELEASE_GUIDE.md`](./RELEASE_GUIDE.md)**                                 | Release contract, asset naming rules, format packaging (EXE, MSI, ZIP, DMG, PKG, AppImage, DEB, TAR.GZ), package verification, and state machine. |
| **[`CATALOGUE_GUIDE.md`](./CATALOGUE_GUIDE.md)**                             | Public catalogue schema, staging preview, immutable revisions, and rollback.                                                                      |
| **[`SECURITY_GUIDE.md`](./SECURITY_GUIDE.md)**                               | Secrets hygiene, Argon2id, JWT rotation, TOTP MFA, HMAC signing, and sandboxing.                                                                  |
| **[`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)**                           | Production topology, Docker containers, reverse proxies, and TLS hardening.                                                                       |
| **[`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md)**                             | Diagnostic runbooks for webhooks, releases, auth, checksums, and database errors.                                                                 |
| **[`REPOSITORIES_REFERENCE.md`](./REPOSITORIES_REFERENCE.md)**               | Breakdown of all 6 HENU platform repositories and their architectural roles.                                                                      |
| **[`BACKUP_AND_RECOVERY.md`](./BACKUP_AND_RECOVERY.md)**                     | Disaster recovery runbooks, WAL-E snapshots, and state recovery.                                                                                  |
| **[`CHANNELS_AND_VERSIONING.md`](./CHANNELS_AND_VERSIONING.md)**             | Stable, Beta, and Nightly promotion gates and SemVer enforcement.                                                                                 |
| **[`PLATFORM_CAPABILITIES.md`](./PLATFORM_CAPABILITIES.md)**                 | OS, CPU architecture, and packaging capabilities matrix.                                                                                          |

---

## 2. Topic Index (23 Core Documentation Sections)

1. **System Architecture**: Detailed in [`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md).
2. **Repository Responsibilities**: Detailed in [`REPOSITORIES_REFERENCE.md`](./REPOSITORIES_REFERENCE.md).
3. **Local Development Setup**: Detailed in [`API_SETUP.md`](./API_SETUP.md), [`ADMIN_SETUP.md`](./ADMIN_SETUP.md), and [`HUB_SETUP.md`](./HUB_SETUP.md).
4. **Environment Configuration**: Detailed in [`API_SETUP.md`](./API_SETUP.md) and [`ADMIN_SETUP.md`](./ADMIN_SETUP.md).
5. **Database Setup and Migrations**: Detailed in [`API_SETUP.md`](./API_SETUP.md).
6. **Admin Authentication**: Detailed in [`API_SETUP.md`](./API_SETUP.md), [`ADMIN_SETUP.md`](./ADMIN_SETUP.md), and [`SECURITY_GUIDE.md`](./SECURITY_GUIDE.md).
7. **GitHub App Creation**: Detailed in [`GITHUB_APP_SETUP.md`](./GITHUB_APP_SETUP.md).
8. **GitHub Repository Connection**: Detailed in [`ADDING_A_NEW_HENU_APPLICATION.md`](./ADDING_A_NEW_HENU_APPLICATION.md) and [`GITHUB_APP_SETUP.md`](./GITHUB_APP_SETUP.md).
9. **Webhook Configuration**: Detailed in [`GITHUB_APP_SETUP.md`](./GITHUB_APP_SETUP.md) and [`SECURITY_GUIDE.md`](./SECURITY_GUIDE.md).
10. **Adding a New Application**: Step-by-step in [`ADDING_A_NEW_HENU_APPLICATION.md`](./ADDING_A_NEW_HENU_APPLICATION.md).
11. **Preparing a Product Release**: Detailed in [`RELEASE_GUIDE.md`](./RELEASE_GUIDE.md).
12. **Release Asset Naming Rules**: Detailed in [`RELEASE_GUIDE.md`](./RELEASE_GUIDE.md).
13. **Package Verification**: Detailed in [`RELEASE_GUIDE.md`](./RELEASE_GUIDE.md) and [`SECURITY_GUIDE.md`](./SECURITY_GUIDE.md).
14. **Stable, Beta and Nightly Channels**: Detailed in [`CHANNELS_AND_VERSIONING.md`](./CHANNELS_AND_VERSIONING.md).
15. **Catalogue Publication**: Detailed in [`CATALOGUE_GUIDE.md`](./CATALOGUE_GUIDE.md).
16. **Catalogue Rollback**: Detailed in [`CATALOGUE_GUIDE.md`](./CATALOGUE_GUIDE.md).
17. **HENU HUB Installation & Updates**: Detailed in [`HUB_SETUP.md`](./HUB_SETUP.md).
18. **Platform-Specific Capabilities**: Detailed in [`PLATFORM_CAPABILITIES.md`](./PLATFORM_CAPABILITIES.md).
19. **Security and Secrets**: Detailed in [`SECURITY_GUIDE.md`](./SECURITY_GUIDE.md).
20. **Production Deployment**: Detailed in [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md).
21. **Troubleshooting**: Diagnostic matrix in [`TROUBLESHOOTING.md`](./TROUBLESHOOTING.md).
    22: **Backup and Recovery**: Procedures in [`BACKUP_AND_RECOVERY.md`](./BACKUP_AND_RECOVERY.md).
22. **Corporate Governance and Support**: Complete corporate registry, CIN, GSTIN, headquarters address, direct escalation phone, WhatsApp, and email desks in [`CORPORATE_SUPPORT.md`](./CORPORATE_SUPPORT.md).

---

## 3. Implementation Status Matrix

In accordance with strict technical integrity standards:

| Capability                                 |     Status      | Notes                                                                                                    |
| :----------------------------------------- | :-------------: | :------------------------------------------------------------------------------------------------------- |
| **Platform API (NestJS + PostgreSQL)**     | **Implemented** | Full identity, RBAC, webhooks, release ingestion, catalogue publishing, and SSE live stream.             |
| **Admin Panel (Next.js 14 / React 18)**    | **Implemented** | 21 administration routes, real-time metrics, release approvals, and rollback controls.                   |
| **HENU HUB Desktop (Tauri 2 / React)**     | **Implemented** | 8 native views, dynamic ETag catalogue sync, live SSE updates, running-app safety, SHA-256 verification. |
| **App Catalog Schema & Fixtures**          | **Implemented** | JSON Schema Draft 2020-12, immutable revision tracking, and 5 product fixtures.                          |
| **Common Actions (Reusable Workflows)**    | **Implemented** | Multi-OS build workflows, SHA-256 generation, SLSA attestation, and webhook notification.                |
| **Corporate Governance & Support Desk**    | **Implemented** | Registered CIN `U62099RJ2025PTC109150`, GSTIN `08AAICH3195C1ZL`, direct phone/WhatsApp desk.             |
| **Multi-Region Database Replication**      |    _Roadmap_    | Single primary PostgreSQL with read replica supported in configuration.                                  |
| **Hardware Security Module (HSM) Signing** |    _Roadmap_    | Currently uses software RSA / OIDC build attestation keys.                                               |

---

_Copyright &copy; 2026 HENU OS PRIVATE LIMITED. All rights reserved._
