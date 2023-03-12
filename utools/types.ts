import type { FetchFn } from 'chatgpt'
import type { API_Model } from './preload/config'

export interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}

export interface ChatGPTUnofficialProxyAPIOptions {
  accessToken: string
  apiReverseProxyUrl?: string
  model?: string
  debug?: boolean
  headers?: Record<string, string>
  fetch?: FetchFn
}

export interface ModelConfig {
  GPT: { Model: Model },
  Bing: object,
  apiModel?: API_Model
  reverseProxy?: string
  timeout?: number
  socksProxy?: string
}

export type Model = 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI' | undefined

