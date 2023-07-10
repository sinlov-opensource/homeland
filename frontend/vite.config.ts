import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

// https://tdesign.tencent.com/vue-next/getting-started
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // https://vitejs.dev/config/#server-options
  // server: {
  //   host: '0.0.0.0',
  //   port: 9000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       ws: true, // 配置ws跨域
  //       secure: false, // https
  //       rewrite: (path) => path.replace('/api', '')
  //     }
  //   }
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output:{
        manualChunks: {
          'highlight.js': ['highlight.js', 'github-markdown-css'],
          'marked': ['marked'],
          'lodash-es': ['lodash-es'],
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    AutoImport({
      dts: resolve(__dirname, './types/auto-imports.d.ts'),
      imports: ['vue', 'vue-router'],
      dirs: [],
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      dts: resolve(__dirname, './types/components.d.ts'),
      dirs: [],
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
  ],
})
