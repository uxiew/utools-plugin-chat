
import { ChatGPTAPI, ChatGPTAPIOptions, ChatGPTUnofficialProxyAPI } from 'chatgpt'
import type { ChatGPTUnofficialProxyAPIOptions } from 'utools/types';
import { SocksProxyAgent } from 'socks-proxy-agent'

// @ts-ignore ATTENTION: external chatgpt's '@dqbd/tiktoken' package, to fix wasm related problem, use modified version
import * as tiktoken from './dqbd_tiktoken.js'
import { db_init, retrieve, update } from './db';
import { DEBUG } from './config.js';

let GPTAPI: ChatGPTAPI | ChatGPTUnofficialProxyAPI

initServer()

function initServer() {
  const { OPENAI, SOCKS_PROXY_HOST, SOCKS_PROXY_PORT, HTTPS_PROXY } = retrieve() || {}
  if (!OPENAI) return db_init()
  if (!OPENAI.API_KEY && !OPENAI.ACCESS_TOKEN) return

  // throw new Error('Missing OPENAI.API_KEY or OPENAI.ACCESS_TOKEN environment variable')

  // TODO 从数据库中获取
  // More Info: https://github.com/transitive-bullshit/chatgpt-api

  if (OPENAI.API_KEY) {
    const model = (typeof OPENAI.API_MODEL === 'string' && OPENAI.API_MODEL.length > 0)
      ? OPENAI.API_MODEL
      : 'gpt-3.5-turbo'


    const options: ChatGPTAPIOptions = {
      apiKey: OPENAI.API_KEY,
      completionParams: { model },
      debug: DEBUG,
    }

    if (OPENAI.API_BASE_URL && OPENAI.API_BASE_URL.trim().length > 0)
      options.apiBaseUrl = OPENAI.API_BASE_URL

    if (SOCKS_PROXY_HOST && SOCKS_PROXY_PORT) {
      const agent = new SocksProxyAgent({
        hostname: SOCKS_PROXY_HOST,
        port: SOCKS_PROXY_PORT,
      })
      options.fetch = (url, options) => {
        // @ts-ignore
        return fetch(url, { agent, ...options })
      }
    }

    GPTAPI = new ChatGPTAPI({ ...options })
    update('config', { OPENAI: { API_MODEL: model, MODEL: 'ChatGPTAPI', } })
  }
  else {
    const options: ChatGPTUnofficialProxyAPIOptions = {
      accessToken: OPENAI.ACCESS_TOKEN || '',
      debug: DEBUG,
    }

    if (OPENAI.API_MODEL && typeof OPENAI.API_MODEL === 'string')
        options.model = OPENAI.API_MODEL



    if (SOCKS_PROXY_HOST && SOCKS_PROXY_PORT) {
      const agent = new SocksProxyAgent({
        hostname: SOCKS_PROXY_HOST,
        port: SOCKS_PROXY_PORT,
      })
      options.fetch = (url, options) => {
        // @ts-ignore
        return fetch(url, { agent, ...options })
      }
    }

    if (HTTPS_PROXY) {
      const agent = new HttpsProxyAgent(httpsProxy)
      options.fetch = (url, options) => {
        return fetch(url, { agent, ...options })
      }
    }

    if (OPENAI.API_REVERSE_PROXY) options.apiReverseProxyUrl = OPENAI.API_REVERSE_PROXY

    GPTAPI = new ChatGPTUnofficialProxyAPI({ ...options })
    update('config', { OPENAI: { MODEL: 'ChatGPTUnofficialProxyAPI' } })
  }
}

export { tiktoken, initServer, GPTAPI }
