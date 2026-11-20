# Platform Capabilities & Adapter Reference

HENU HUB enforces explicit, non-advertised capability detection across host operating systems. An installation or execution capability is never surfaced to end-users unless implemented and verified for that specific OS.

---

## 1. Capability Matrix

| Capability                        |     Windows Adapter      |     macOS Adapter      |        Linux Adapter        |  Web App Launcher  |
| :-------------------------------- | :----------------------: | :--------------------: | :-------------------------: | :----------------: |
| **Supported Package Formats**     |   `MSI`, `EXE`, `ZIP`    |  `DMG`, `PKG`, `ZIP`   | `APPIMAGE`, `DEB`, `TAR.GZ` | None (Browser URL) |
| **Silent Installation Arguments** |       `/qn`, `/S`        |    `installer -pkg`    |          `dpkg -i`          |        N/A         |
| **Running Process Detection**     |  Supported (`sysinfo`)   | Supported (`sysinfo`)  |    Supported (`sysinfo`)    |        N/A         |
| **In-Use File Lock Handling**     |     Queued in SQLite     |    Staged app swap     |      Chmod binary swap      |   Instant reload   |
| **Privilege Escalation**          |    Native Windows UAC    | Authorization Services |      `pkexec` / `sudo`      |        None        |
| **Installation Path**             | `C:\Program Files\HENU\` |    `/Applications/`    |        `/opt/henu/`         |    Browser Tab     |

---

## 2. Web Applications (`appType: 'web'`)

Web applications operate under strict separation from native desktop packages:

- **No Native Binary Downloads**: Web applications have an empty `packages` array and declare a valid `webAppUrl` (e.g. `https://records.henuos.com`).
- **No Installer Execution**: Web apps are registered into HENU HUB's local SQLite database with `isWebApp: true`.
- **Browser Sandboxing**: Launching a web application invokes the host OS browser with `noopener,noreferrer`.
- **Protocol Verification**: URLs starting with `javascript:`, `file:`, or data URIs are strictly rejected.
