import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import { buildAliasRedirects } from "./src/scripts/aliases-to-redirects.mjs";

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
    // workspace-product / public-form-product were stub entries that existed
    // only to populate the size:product card on /examples/. The grid now
    // synthesizes those cards directly from the productTypes collection, so
    // these slugs no longer resolve. Redirect to the real overviews in case
    // anything cached or bookmarked the old URLs from the PR preview.
    "/examples/workspace-product": "/examples/workspace",
    "/examples/public-form-product": "/examples/public-form",
    // Old "give-{background,context}-..." slugs once redirected to the
    // give-more-information-...-{a,b} variants. Those variants have since
    // been folded into question-page, so route directly there to avoid
    // a two-hop chain through the alias-derived redirects below.
    "/examples/give-background-information-before-asking-a-question":
      "/examples/question-page",
    "/examples/give-context-before-asking-a-long-answer-question":
      "/examples/question-page",
    // Auto-derived redirects from `aliases` frontmatter on examples and
    // productTypes entries. Single source of truth lives in MDX; adding
    // an alias to an entry creates the redirect on the next build.
    ...buildAliasRedirects(),
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
        // @astrojs/react registers its SSR renderer via the bare specifier
        // "@astrojs/react/server.js", which Vite then externalizes for the
        // prerender build instead of bundling it. Externalizing leaves the
        // package's internal `astro:react:opts` virtual import unresolved,
        // and Node crashes trying to load it directly at build time.
        // Aliasing to the absolute file path makes Vite treat it as local
        // source so it goes through the bundling pipeline like normal.
        {
          find: "@astrojs/react/server.js",
          replacement: require.resolve("@astrojs/react/server.js"),
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
