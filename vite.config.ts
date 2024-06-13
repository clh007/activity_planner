import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      // options
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      imports: ['vue', 'vue-router'],

    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep'],
        }),
      ],
    }),

    Icons({
      autoInstall: true,
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },

  },
  server: {
    // proxy:{
    //   '/api':{
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite:path => path.replace(/^\/api/, ''),
    //   }
    // }
  },
  base: '/activity_planner/',
  // base: "./",
  build: {
    outDir: 'docs',
  }
})
