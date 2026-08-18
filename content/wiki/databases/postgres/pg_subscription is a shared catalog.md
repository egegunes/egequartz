---
title: pg_subscription is a shared catalog
---
How is this possible??

```
postgres=# alter subscription "pgo_lr_sub_l1_myapp_875a65d6" enable;
ERROR:  subscription "pgo_lr_sub_l1_myapp_875a65d6" does not exist

postgres=# select * from pg_subscription;
-[ RECORD 1 ]-------+----------------------------------------------------------------------------------------------------------------------------------
oid                 | 24664
subdbid             | 16502
subskiplsn          | 0/0
subname             | pgo_lr_sub_l1_myapp_875a65d6
subowner            | 10
subenabled          | f
subbinary           | f
substream           | p
subtwophasestate    | d
subdisableonerr     | t
subpasswordrequired | t
subrunasowner       | f
subfailover         | f
subconninfo         | user=logicalrepl host='cluster1-primary.pg-26033.svc' port=5432 sslmode='verify-ca' sslrootcert='/pgconf/tls/ca.crt' dbname=myapp
subslotname         | pgo_lr_slot_l1_myapp_875a65d6
subsynccommit       | off
subpublications     | {pgo_lr_pub_l1_myapp_875a65d6}
suborigin           | any
```

Because `pg_subscription` is a **shared** catalog, so you can see every subscription from any database. You need run `ALTER SUBSCRIPTION` in the database referenced in `subdbid`.

```sql
postgres=# select datname from pg_database where oid = 16502;
 datname
---------
 myapp
(1 row)

postgres=# \c myapp
You are now connected to database "myapp" as user "postgres".

myapp=# alter subscription "pgo_lr_sub_l1_myapp_875a65d6" enable;
ALTER SUBSCRIPTION
```