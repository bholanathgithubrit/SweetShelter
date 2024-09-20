import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      css: {
        modules: {
          // This allows you to import CSS files as modules
          mode: 'icss',
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react-datepicker/dist/react-datepicker.css'],
  },
})