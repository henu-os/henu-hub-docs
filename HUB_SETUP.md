# HENU HUB Desktop Application Setup Guide

`henu-hub` is the native cross-platform application launcher, manager, and update client for the HENU Operating System.

---

## 1. System Requirements

### General

- **Node.js**: v18+ LTS (Tested on Node.js v24)
- **npm**: v10+

### Native Compilation (Tauri 2)

To build or package the native desktop application binaries:

- **Rust Toolchain**: `rustc` and `cargo` (v1.75+). Install via [rustup.rs](https://rustup.rs).
- **Windows**: Microsoft Visual Studio Build Tools with the "Desktop development with C++" workload.
- **macOS**: Xcode Command Line Tools (`xcode-select --install`).
- **Linux**: Standard build tools and webkit2gtk libraries:
  ```bash
  sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
  ```

---

## 2. Directory Structure

```
henu-hub/
├── src/
│   ├── components/         # Titlebar, Sidebar, AppCard, Modals, Toasts
│   ├── context/            # AppContext (Catalogue & lifecycle), NotificationContext
│   ├── services/
│   │   ├── api.ts          # ETag-conditional catalogue fetching & caching
│   │   ├── sse.ts          # Server-Sent Events listener & reconnect backoff
│   │   ├── lifecycle.ts    # Streaming SHA-256 verifier & install manager
│   │   ├── storage.ts      # SQLite / localStorage abstraction layer
│   │   └── platform/       # Windows, macOS, Linux, and Web adapters
│   ├── views/              # 8 core views: Home, Store, Installed, Updates, etc.
│   └── types/              # Strict TypeScript interfaces
├── src-tauri/              # Rust native desktop runtime
│   ├── src/
│   │   ├── database.rs     # SQLite schema and migration logic
│   │   ├── verifier.rs     # Cryptographic streaming hash calculation
│   │   ├── events.rs       # System notifications & event bridge
│   │   └── platform/       # Native process detection and execution
│   ├── Cargo.toml          # Rust dependencies (rusqlite, sysinfo, reqwest, tauri)
│   └── tauri.conf.json     # Window configurations & security CSP
└── test/                   # Jest test suites (27 tests)
```

---

## 3. Local Development

### Web Development Mode (Fast UI Iteration)

You can run and test the complete user interface in browser mode without installing Rust:

```bash
cd henu-hub
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). In web mode, `StorageService` seamlessly uses `localStorage`, and `PlatformAdapter` safely mocks process detection.

### Native Desktop Development (Tauri 2)

To run the native desktop shell with the Rust background core:

```bash
npm run tauri dev
```

---

## 4. Building Native Production Packages

```bash
# Compile and package native installer for current host OS
npm run tauri build
```

Target installer outputs:

- **Windows**: `src-tauri/target/release/bundle/msi/*.msi` and `*.exe`
- **macOS**: `src-tauri/target/release/bundle/dmg/*.dmg` and `*.app`
- **Linux**: `src-tauri/target/release/bundle/appimage/*.AppImage` and `*.deb`

---

## 5. Automated Testing & Verification

```bash
# Run complete test suite (Catalogue sync, SSE, Windows/Mac/Linux lifecycle, UI)
npm test

# Verify TypeScript compilation and Vite packaging
npm run build

# Code style and linting (enforces 0 warnings)
npm run lint
npm run format
```

---

## 6. Core Operational Mechanics

### Dynamic ETag Caching

1. On startup or refresh, HENU HUB sends `If-None-Match: <cached-etag>` to the catalogue URL.
2. If the catalogue is unchanged, the server returns `304 Not Modified`, saving bandwidth.
3. If the server is unreachable, HENU HUB seamlessly falls back to the locally cached SQLite snapshot, alerting the user with an "Offline Mode" badge.

### Safe In-Use Update Scheduling

1. Before updating an application, HENU HUB queries the native platform adapter to check if the app's process is currently running.
2. If running, the user is warned and the update is safely queued in SQLite rather than replacing files currently locked by the operating system.
3. Once the user exits the running application, the scheduled update applies cleanly.
