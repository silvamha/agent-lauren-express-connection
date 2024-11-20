import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from `.env` file
dotenv.config();

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    open: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  }
});
