// import vue from '@vitejs/plugin-vue'
// import path from 'path';

// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default {
  base: './',
//   plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
  plugins: [
    vue(),
    // vue({
    //   template: { transformAssetUrls }
    // }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    // vuetify({
      // autoImport: true,
    //   styles: {
    //     configFile: 'src/styles/settings.scss',
    //   },
    // }),
    // ViteFonts({
    //   google: {
    //     families: [{
    //       name: 'Roboto',
    //       styles: 'wght@100;300;400;500;700;900',
    //     }],
    //   },
    // }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // extensions: [
    //   '.js',
    //   '.json',
    //   '.jsx',
    //   '.mjs',
    //   '.ts',
    //   '.tsx',
    //   '.vue',
    // ],
  },
  server: {
    port: 3000,
  },
}