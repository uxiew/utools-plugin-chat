import { merge } from 'merge-anything'
import { Model } from 'utools/types';
import { OPENAI_API_KEY, API_REVERSE_PROXY, OPENAI_ACCESS_TOKEN, OPENAI_API_BASE_URL, OPENAI_API_MODEL, SOCKS_PROXY_HOST, SOCKS_PROXY_PORT, TIMEOUT_MS } from './config';
import type { API_Model } from './config';

interface OpenAI_Config {
  MODEL?: Model;
  API_KEY?: string,
  ACCESS_TOKEN?: string,
  API_MODEL?: API_Model,
  API_BASE_URL?: string,
  API_REVERSE_PROXY?: string
}
interface Bing_Config {
  COOKIE?: string;
}

export interface DB_Config {
  OPENAI: OpenAI_Config,
  BING: Bing_Config,
  TIMEOUT: number;
  // DEBUG: boolean;
  // AUTH_SECRET_KEY: string;
  SOCKS_PROXY_HOST: string;
  SOCKS_PROXY_PORT: string;
}

export interface DB_Setting {
  avatarLink: string,
  name: string,
  description: string
  theme: string,
  language: string,
}

type DB_TYPE = 'config' | 'setting' | 'lastSetting'
const PREFIX = 'V5Chat/';


export const DEFAULT_CONFIG = {
  OPENAI: {
    API_KEY: OPENAI_API_KEY,
    API_BASE_URL: OPENAI_API_BASE_URL,
    API_MODEL: OPENAI_API_MODEL,
    ACCESS_TOKEN: OPENAI_ACCESS_TOKEN,
    API_REVERSE_PROXY: API_REVERSE_PROXY,
  },
  BING: {
    COOKIE: ''
  },
  TIMEOUT: (TIMEOUT_MS / 1000),
  SOCKS_PROXY_HOST,
  SOCKS_PROXY_PORT,
}

// 初始化
function db_init() {
  if (!retrieve()) {
    update('config', DEFAULT_CONFIG)
  }
}



// TODO 恢复上一次设置
// function restoreConfig(type: DB_TYPE, config: DB_Config) {
//   const dbName = PREFIX + type
// }


function update(type: DB_TYPE, config: Partial<DB_Config> = {}) {
  const dbName = PREFIX + type
  config.TIMEOUT = !isNaN(+config.TIMEOUT!) ? +config.TIMEOUT! : (TIMEOUT_MS / 1000)
  utools.dbStorage.setItem(dbName, merge(utools.dbStorage.getItem(dbName), config))
}

function retrieve(type: DB_TYPE = 'config'): DB_Config {
  return utools.dbStorage.getItem(PREFIX + type)
}


export {
  db_init,
  update,
  retrieve
}
