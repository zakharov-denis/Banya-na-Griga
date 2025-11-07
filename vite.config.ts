import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            '> 0.5%',
            'last 2 versions',
            'Firefox ESR',
            'not dead',
            'not IE 11',
            'not OperaMini all',
            'Safari >= 10.1',
            'iOS >= 10.3',
          ]
        })
      ]
    }
  }
})
