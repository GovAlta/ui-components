import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');

// https://astro.build/config
export default defineConfig({
  root: '.',
  outDir: '../dist/docs',
  server: {
    port: 4203,
    host: '0.0.0.0',
  },
  preview: {
    port: 4304,
    host: '0.0.0.0'
  },
  vite: {
    server: {
      fs: {
        allow: [workspaceRoot]
      }
    }
  }
});
