# utools-chat

a utools plugin for chatgpt、bing AI chat; and collect Chatgpt-related resources

code from[Chanzhaoyu/chatgpt-web](https://github.com/chanzhaoyu/chatgpt-web.git)

# 问题

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

# TODO

[x] 错误信息，前端显示

# 第三方在线

https://ai.okmiku.com/

# resources

[Ice-Hazymoon/openai-scf-proxy](https://github.com/Ice-Hazymoon/openai-scf-proxy)

[transitive-bullshit/chatgpt-api#projects](https://github.com/transitive-bullshit/chatgpt-api#projects)

奶酪清单：https://github.com/runningcheese/Awesome-ChatGPT

[ddiu8081/chatgpt-demo](https://github.com/ddiu8081/chatgpt-demo)

[yihong0618/bilingual_book_maker](https://github.com/yihong0618/bilingual_book_maker)

[Kamigami55/awesome-chatgpt](https://github.com/Kamigami55/awesome-chatgpt)

[reorx/awesome-chatgpt-api](https://github.com/reorx/awesome-chatgpt-api)

# Prompt

[thinkingjimmy/Learning-Prompt](https://github.com/thinkingjimmy/Learning-Prompt)
[trigaten/Learn_Prompting](https://github.com/trigaten/Learn_Prompting)
