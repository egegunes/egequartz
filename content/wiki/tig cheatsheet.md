---
note-type: wiki
title: tig cheatsheet
created: 2026-09-14T15:51:38+03:00
tags:
  - git
---
**invocation**

```
tig                      # log of current branch
tig main..HEAD           # ← your review loop
tig --first-parent main..HEAD   # skip merged-in noise
tig <rev> -- path/       # scoped to a path
tig -S'funcName'         # pickaxe: commits touching that string
tig status               # stage view
tig blame file.go        # blame, navigable
tig show <rev>
tig stash / tig refs / tig grep <pat>
git whatever | tig       # pager mode, any git output
```

**core motion**

| key               | does                                                        |
| ----------------- | ----------------------------------------------------------- |
| `j` `k`           | line down/up                                                |
| `Enter`           | open selection (splits diff pane)                           |
| `J` `K`           | **next/prev commit in the parent view** — diff pane follows |
| `Tab`             | jump between panes                                          |
| `<`               | back to previous view                                       |
| `q` / `Q`         | close view / quit tig                                       |
| `Ctrl-D` `Ctrl-U` | half page                                                   |
| `Home` `End`      | top / bottom                                                |
| `/` `?` `n` `N`   | search fwd, search back, next, prev                         |
| `R`               | refresh                                                     |
| `O`               | maximize current pane                                       |

open `tig main..HEAD`, hit `Enter` once, then just hold `J` — you walk the branch commit by commit without ever leaving the diff.

**views** (from anywhere)

`m` main · `d` diff · `l` log · `t` tree · `b` blame · `s` status · `c` stage · `r` refs · `y` stash · `g` grep · `h` help

`t` is underused — tree view at the selected commit lets you see repo _state_ at that point, not just the delta. good for "wait, did this file even exist yet."

**in the diff**

| key     | does                             |
| ------- | -------------------------------- |
| `@`     | next chunk                       |
| `[` `]` | shrink / grow diff context       |
| `,`     | go to parent commit              |
| `u`     | stage/unstage chunk (stage view) |
| `!`     | revert chunk (stage view)        |
| `1`     | stage single line (stage view)   |

**toggles**

`%` file-filter on the selected file (limits the log to it — killer for "show me every commit that touched this") · `G` revision graph · `X` show sha · `D` date format · `W` ignore whitespace · `F` refs · `o` options menu

