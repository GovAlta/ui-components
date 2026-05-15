import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "..");

// https://astro.build/config
export default defineConfig({
  site: process.env.PREVIEW_SITE || "https://design.alberta.ca",
  base: process.env.PREVIEW_BASE || "/",
  root: ".",
  outDir: "../dist/docs",
  redirects: {
    "/components/circular-progress-indicator": "/components/circular-progress",
    "/components/file-uploader": "/components/file-upload-input",
    "/components/header": "/components/app-header",
    "/components/icons": "/components/icon",
    "/components/linear-progress-indicator": "/components/linear-progress",
    "/components/notification-banner": "/components/notification",
    "/components/radio": "/components/radio-group",
    "/components/skeleton-loader": "/components/skeleton",
    "/design-tokens": "/tokens",
    "/get-started/support": "/support",
    "/examples/show-multiple-actions-in-a-table":
      "/examples/show-multiple-actions-in-a-compact-table",
    "/examples/communicate-a-future-service-outage":
      "/examples/notify-the-user-of-a-future-service-outage",
    "/examples/give-background-information-before-asking-a-question":
      "/examples/give-more-information-before-asking-a-question-a",
    "/examples/give-context-before-asking-a-long-answer-question":
      "/examples/give-more-information-before-asking-a-question-b",
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 4203,
    host: "0.0.0.0",
  },

  preview: {
    port: 4304,
    host: "0.0.0.0",
  },

  vite: {
    resolve: {
      alias: [
        // More specific aliases must come first
        // allow to use import { withBase } from '@/lib/base-url' instead of '../../lib/base-url'
        {
          find: /^@\/(.*)$/,
          replacement: path.resolve(__dirname, "src/$1"),
        },
        {
          find: "@abgov/react-components/experimental",
          replacement: path.resolve(
            workspaceRoot,
            "libs/react-components/src/experimental/index.ts",
          ),
        },
        {
          find: "@abgov/react-components",
          replacement: path.resolve(workspaceRoot, "libs/react-components/src/index.ts"),
        },
        {
          find: "@abgov/web-components",
          replacement: path.resolve(workspaceRoot, "dist/libs/web-components/"),
        },
        {
          find: "@abgov/ui-components-common",
          replacement: path.resolve(workspaceRoot, "libs/common/src/index.ts"),
        },
        {
          find: "@abgov/style",
          replacement: path.resolve(workspaceRoot, "dist/libs/web-components/index.css"),
        },
        // Design tokens V2 for docs styling (via npm alias)
        {
          find: "@design-tokens",
          replacement: path.resolve(
            workspaceRoot,
            "node_modules/@abgov/design-tokens-v2/dist",
          ),
        },
      ],
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
      force: true,
    },
    server: {
      fs: {
        allow: [workspaceRoot],
      },
    },
    ssr: {
      noExternal: ["@astrojs/react", "@astrojs/mdx"],
    },
  },

  integrations: [react(), mdx()],
});
