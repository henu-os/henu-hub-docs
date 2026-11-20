# HENU Platform Backup & Disaster Recovery Guide

Procedures for safeguarding and restoring PostgreSQL database snapshots, cryptographic keys, and application catalogue revisions.

---

## 1. Backup Strategy Overview

| Asset                      | Frequency                             | Storage Location                                     | Retention                        |
| :------------------------- | :------------------------------------ | :--------------------------------------------------- | :------------------------------- |
| **PostgreSQL Database**    | Daily full + continuous WAL archiving | Encrypted cloud object storage (S3 / GCS)            | 30 days daily, 12 months monthly |
| **Prisma Migrations**      | On each commit                        | Git version control                                  | Permanent                        |
| **GitHub App Private Key** | Once on generation                    | Encrypted secret vault (AWS Secrets Manager / Vault) | Life of key                      |
| **Catalogue Revisions**    | On every publication                  | PostgreSQL `CatalogueRevision` table                 | Immutable permanent              |

---

## 2. Automated PostgreSQL Backups

### Creating a Full Database Dump

```bash
# Export compressed PostgreSQL snapshot
docker exec -t henu-postgres pg_dump -U henu_admin -d henu_platform -F c -b -v -f /tmp/henu_platform_$(date +%Y%m%d_%H%M%S).dump
```

### Automated Nightly Cron Job

```bash
0 2 * * * pg_dump -U $DB_USER -h $DB_HOST -d henu_platform -F c | gpg --encrypt -r backup@henuos.com | aws s3 cp - s3://henu-backups/db/$(date +\%Y\%m\%d).dump.gpg
```

---

## 3. Disaster Recovery & Restoration

### Restoring to a Fresh Database Instance

1. Create a clean database:
   ```bash
   createdb -U henu_admin -h localhost henu_platform
   ```
2. Decrypt and restore the dump:
   ```bash
   pg_restore -U henu_admin -h localhost -d henu_platform -v /tmp/henu_platform_backup.dump
   ```
3. Run Prisma deployment check:
   ```bash
   npx prisma migrate status
   ```

---

## 4. Catalogue Recovery

Because catalogue revisions are stored as immutable JSON blobs in the `CatalogueRevision` table:

1. Every historical state of the public catalogue is preserved.
2. In the event of catastrophic data corruption, restoring the database snapshot automatically restores every published catalogue revision.
3. If only a single application release was corrupted, use the **One-Click Rollback** feature in `henu-addplo` (`/catalogue/rollback`) without restoring the entire database.
