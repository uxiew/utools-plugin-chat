# utools-chat

A Utools plugin for ChatGPT and Bing AI; also collects some resources related to ChatGPT or AI.

一个 chatgpt、bing AI 的 utools 插件;顺便收集了一些 chatgpt、AI 相关资源

code from[Chanzhaoyu/chatgpt-web](https://github.com/chanzhaoyu/chatgpt-web.git)

![演示](。/../demo/chat-config-set.png)
![演示](。/../demo/chat.png)

# 功能

1. 借助 utools 本地操作（只需要填写接口配置即可）
2. 所有参数可配置（所有配置存储在utools数据库中）
3. 方便快捷，随用随走

# 配置

初次进入可配置以下配置：

| 配置                  | 描述                | 备注                                                                                                                                |
| --------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OPENAI_API_KEY`      | `OpenAI API` 二选一 | 二选一 , 使用 `OpenAI API` 所需的 `apiKey` [(获取 apiKey)](https://platform.openai.com/overview)                                    |
| `OPENAI_ACCESS_TOKEN` | `Web API` 二选一    | 二选一 , 同时存在时，`OPENAI_API_KEY` 优先, [(获取 accessToken)](https://chat.openai.com/api/auth/session)                          |
| `OPENAI_API_BASE_URL` | API 接口地址        | 可选，设置 `OPENAI_API_KEY` 时可用                                                                                                  |
| `OPENAI_API_MODEL`    | API 模型            | 可选，设置 `OPENAI_API_KEY` 时可用                                                                                                  |
| `API_REVERSE_PROXY`   | 反向代理            | 可选，设置 `OPENAI_ACCESS_TOKEN` 时可用，`Web API` [反向代理地址](https://github.com/transitive-bullshit/chatgpt-api#reverse-proxy) |
| `TIMEOUT`             | 超时                | 可选 ，单位 s                                                                                                                       |
| `SOCKS_PROXY_HOST`    | Socks 代理          | 可选，和 `SOCKS_PROXY_PORT` 一起时生效                                                                                              |
| `SOCKS_PROXY_PORT`    | Socks 代理端口      | 可选，和 `SOCKS_PROXY_HOST` 一起时生效                                                                                              |

# TODO

[x] 错误信息，前端显示
[x] 所有数据存储在utools本地
[x] 接入 Bing AI
[x] 同步所有数据

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
