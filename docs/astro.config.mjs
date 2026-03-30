import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, "..");

// https://astro.build/config
export default defineConfig({
  site: "https://design.alberta.ca",
  root: ".",
  outDir: "../dist/docs",
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
