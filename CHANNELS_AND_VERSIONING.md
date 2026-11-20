# Release Channels & Semantic Versioning

This document outlines the versioning strategy, release channels, and distribution policies across the HENU Operating System ecosystem.

---

## 1. Release Channel Definitions

| Channel     | Target Audience                  | Stability                                       | Versioning Convention                            | Update Cadence         |
| :---------- | :------------------------------- | :---------------------------------------------- | :----------------------------------------------- | :--------------------- |
| **Stable**  | General production users         | Highly stable; extensively verified             | `MAJOR.MINOR.PATCH` (e.g. `1.0.0`)               | Monthly / as validated |
| **Beta**    | Early adopters and QA testers    | Feature complete; may contain non-critical bugs | `MAJOR.MINOR.PATCH-beta.N` (e.g. `1.1.0-beta.1`) | Bi-weekly              |
| **Nightly** | Internal developers & automation | Bleeding edge; automated trunk builds           | `MAJOR.MINOR.PATCH-nightly.YYYYMMDD`             | Daily / continuous     |

---

## 2. Channel Enforcement Rules

1. **Pre-Release Tags Blocked from Stable**:
   The validation engine in `henu-common-actions` and `henu-platform-api` enforces that versions containing `-beta`, `-alpha`, `-rc`, or `-nightly` **cannot** be published to the `stable` channel.
2. **Channel Isolation**:
   In `henu-hub`, users select their preferred channel (`Settings` &rarr; `Preferred Release Channel`). Users subscribed to `stable` will never receive automated updates for beta or nightly releases.
3. **Multi-Channel Manifest Publication**:
   A single application in the catalogue manifest may provide distinct releases for all three channels simultaneously:
   ```json
   "channels": {
     "stable": { "version": "1.0.0", "packages": [...] },
     "beta": { "version": "1.1.0-beta.2", "packages": [...] },
     "nightly": { "version": "1.2.0-nightly.20261119", "packages": [...] }
   }
   ```
