import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import utools from '../vite-plugin-utools-v5/dist/index.mjs';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        'utools': path.resolve(process.cwd(), 'utools'),
      },
    },
    plugins: [
      vue(),
      utools({
        pluginFile: './utools/plugin.json',
        external: ['@dqbd/tiktoken', 'uTools'],
        preload: {
          watch: true,
          name: 'preload',
          // fix wasm load, replace
          onGenerate: function () {
            // @ts-ignore
            // TODO 待优化
            this.replace('tiktoken.get_encoding("cl100k_base");', `null;\nsetTimeout(() => {
              tokenizer = wasm.get_encoding("cl100k_base")
              }, 1000);`)
            return this.toString()
          },
        },
        // buildUpx: false,
        buildUpx: {
          outDir: 'upx',
          outName: '[pluginName]_[version].upx',
        },
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/@dqbd/tiktoken/dist/node/_tiktoken_bg.wasm',
            dest: '.'
          }
        ]
      })
    ],
    server: {
      host: '0.0.0.0',
      port: 1002,
      open: false,
      proxy: {
        '/api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/api/', '/'),
        },
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
