# chat

提供 chatgpt、bing

# 记录问题 📝

由于 wasm 不能同步加载的问题，便做了以下操作：
修改了 `preload/dqbd_tiktoken.js` 来自 chatgpt 中的`@dqbd/tiktoken/dist/node/_tiktoken.js`

1. 去除顶部 import
   因为直接使用 `preload/dqbd_tiktoken.js` 就好了

```
const tiktoken = require("@dqbd/tiktoken")
```

1. 异步加载该代码：

```
// src/chatgpt-api.ts
tiktoken.get_encoding("cl100k_base");

为：
// src/chatgpt-api.ts
setTimeout(() => {
  wasm.get_encoding("cl100k_base");
}, 1000);
```
