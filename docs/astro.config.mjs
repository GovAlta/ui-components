import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');

// https://astro.build/config
export default defineConfig({
  output: 'static',
  root: ".",
  outDir: "../dist/docs",

  server: {
    port: 4203,
    host: '0.0.0.0',
  },

  preview: {
    port: 4304,
    host: '0.0.0.0'
  },

  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(workspaceRoot, 'dist/libs/web-components/index.js'),
            dest: 'web-components'
          },
          {
            src: path.resolve(workspaceRoot, 'dist/libs/web-components/index.css'),
            dest: 'web-components'
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@abgov/react-components': path.resolve(workspaceRoot, 'libs/react-components/src/index.ts'),
        '@abgov/react-components/experimental': path.resolve(workspaceRoot, 'libs/react-components/src/experimental/index.ts'),
        '@abgov/ui-components-common': path.resolve(workspaceRoot, 'libs/common/src/index.ts'),
      }
    },
    optimizeDeps: {
      exclude: ['@abgov/web-components']
    },
    server: {
      fs: {
        allow: [workspaceRoot]
      }
    }
  },
  integrations: [react()],
});
