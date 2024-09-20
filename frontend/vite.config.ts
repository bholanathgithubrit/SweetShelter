import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react-datepicker/dist/react-datepicker.css'],
    },
  },
});