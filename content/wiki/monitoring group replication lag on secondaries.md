---
note-type: wiki
title: monitoring group replication lag on secondaries
created: 2026-08-01T11:09:38+03:00
tags:
  - mysql
---
query:
```sql
SELECT
  a.MEMBER_ROLE,
  a.MEMBER_ID,
  a.MEMBER_HOST,
  b.COUNT_TRANSACTIONS_IN_QUEUE AS certifier_queue,
  b.COUNT_TRANSACTIONS_REMOTE_IN_APPLIER_QUEUE AS applier_queue,
  ROUND(
    (
      b.COUNT_TRANSACTIONS_REMOTE_IN_APPLIER_QUEUE / NULLIF(
        @@GLOBAL.group_replication_flow_control_applier_threshold,
        0
      )
    ) * 100,
    2
  ) AS threshold_pct,
  b.COUNT_TRANSACTIONS_LOCAL_PROPOSED AS proposed,
  b.COUNT_TRANSACTIONS_REMOTE_APPLIED AS applied
FROM
  performance_schema.replication_group_members AS a
  JOIN performance_schema.replication_group_member_stats AS b ON a.MEMBER_ID = b.MEMBER_ID
ORDER BY
  MEMBER_HOST;
```

result:
```
+-------------+--------------------------------------+------------------------------------------+-----------------+---------------+---------------+----------+---------+
| MEMBER_ROLE | MEMBER_ID                            | MEMBER_HOST                              | certifier_queue | applier_queue | threshold_pct | proposed | applied |
+-------------+--------------------------------------+------------------------------------------+-----------------+---------------+---------------+----------+---------+
| PRIMARY     | dee7e5c2-9657-11f1-8053-9e64564a262c | cluster1-mysql-0.cluster1-mysql.pd-15166 |               0 |             0 |          0.00 |     7373 |       0 |
| SECONDARY   | fc8a9945-9657-11f1-97c9-8adb648bdccb | cluster1-mysql-1.cluster1-mysql.pd-15166 |               0 |             0 |          0.00 |        0 |    7302 |
| SECONDARY   | 1a56293c-9658-11f1-a660-fab5a415aaf2 | cluster1-mysql-2.cluster1-mysql.pd-15166 |               0 |             0 |          0.00 |        0 |    7295 |
+-------------+--------------------------------------+------------------------------------------+-----------------+---------------+---------------+----------+---------+
3 rows in set (0.00 sec)
```