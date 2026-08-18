---
title: 'Required variable'
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

