import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  outDir: '../dist/docs',
  server: {
    port: 4203,
    host: '0.0.0.0'
  },
  preview: {
    port: 4303,
    host: '0.0.0.0'
  }
});
