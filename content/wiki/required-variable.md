---
title: 'Required variable'
created: 2026-07-31T19:49:38+03:00
modified: 2026-07-31T19:49:38+03:00
tags: ["bash"]
---

Instead of doing this:
```
local pod=$1
if [[ -z ${pod} ]]; then
  echo "pod is required, aborting!"
  return
fi
```

You can just do this:
```
local pod="${1:?pod is required, aborting!}" 
```

