
// # OpenAI API Key - https://platform.openai.com/overview
const OPENAI_API_KEY = ''

// # change this to an `accessToken` extracted from the ChatGPT site's `https://chat.openai.com/api/auth/session` response
const OPENAI_ACCESS_TOKEN = ''

// # OpenAI API Base URL - https://api.openai.com
// const OPENAI_API_BASE_URL: string = 'https://openapi.ssiic.com'
const OPENAI_API_BASE_URL = ''

// # Reverse Proxy
const API_REVERSE_PROXY = ''
// const API_REVERSE_PROXY = 'https://chatgptapi.googlevideo.dev/api/conversation'

// # OpenAI API Model - https://platform.openai.com/docs/models
const OPENAI_API_MODEL: API_Model = 'gpt-3.5-turbo'

// # timeout
const TIMEOUT_MS = 100000

// # Socks Proxy Host
const SOCKS_PROXY_HOST = ''

// # Socks Proxy Port
const SOCKS_PROXY_PORT = ''

// # # HTTPS 代理，可选，支持 http，https，socks5
const HTTPS_PROXY = ''

// 感觉与 HTTPS_PROXY 重复了，所以去掉
// ALL_PROXY 支持 http，https, socks5，可选
// const ALL_PROXY = ''


// ========== add by chandlerver5 =====
// * ID of the model to use. Currently, only `gpt-3.5-turbo` and `gpt-3.5-turbo-0301` are supported.
export type API_Model = `gpt-3.5-turbo` | `gpt-3.5-turbo-0301`

// 开启 DEBUG
const DEBUG: boolean = false;

const API_MODEL_OPT = [`gpt-3.5-turbo`, `gpt-3.5-turbo-0301`]

export {
  API_MODEL_OPT,
  DEBUG,
  OPENAI_API_KEY,
  OPENAI_ACCESS_TOKEN,
  OPENAI_API_BASE_URL,
  API_REVERSE_PROXY,
  OPENAI_API_MODEL,
  TIMEOUT_MS,
  SOCKS_PROXY_HOST,
  SOCKS_PROXY_PORT,
}
