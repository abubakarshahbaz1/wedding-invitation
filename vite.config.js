import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Keep Vite's hashed JS/CSS out of /assets, which is reserved for the
    // invitation's own images and audio (public/assets).
    assetsDir: 'bundle',
  },
});
