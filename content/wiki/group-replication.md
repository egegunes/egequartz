---
title: MySQL Group Replication
created: 2026-08-01T11:11:11+03:00
modified: 2026-08-23T14:14:11+03:00
tags:
  - mysql
---
Group replication (GR) can operate in two modes:
1. Single primary (default)
2. Multiple primaries

GR uses [[Paxos]] in the background.

The communication protocol uses something called atomic broadcast. Every update is sent through an atomic broadcast and either all members of the group receive the transaction or none do. All members receive the same set of transactions in the same order. The primary will acknowledge the commit as soon as the update is sent to members. This means secondaries might be lagging behind the primary with transactions waiting to be applied. See [[monitoring group replication lag on secondaries]] for a handy query.

First commit wins for conflicts. Conflict detection is called **certification**. 


