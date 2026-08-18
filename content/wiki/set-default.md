---
title: 'SET DEFAULT'
tags: ["mysql"]
---

To set a global system variable value to the compiled-in MySQL default value or a session system variable to the current corresponding global value, set the variable to the value DEFAULT:

```
SET @@SESSION.max_join_size = DEFAULT;
```
