import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');

// https://astro.build/config
export default defineConfig({
  root: '.',
  outDir: '../dist/docs',
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 4203,
    host: '0.0.0.0',
  },

  preview: {
    port: 4304,
    host: '0.0.0.0'
  },

  vite: {
    resolve: {
      alias: {
        '@abgov/web-components': path.resolve(workspaceRoot, 'dist/libs/web-components/'),
        '@abgov/ui-components-common': path.resolve(workspaceRoot, 'libs/common/src/index.ts'),
        '@abgov/react-components': path.resolve(workspaceRoot, 'libs/react-components/src/index.ts'),
        '@abgov/react-components/experimental': path.resolve(workspaceRoot, 'libs/react-components/src/experimental/index.ts'),
        '@abgov/style': path.resolve(workspaceRoot, "dist/libs/web-components/index.css"),
      }
    },
    server: {
      fs: {
        allow: [workspaceRoot]
      }
    }
  },

  integrations: [react(), mdx()]
});
