import { defineWorkspace } from "vitest/config";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";

export default defineWorkspace([
  {
    plugins: [
      svelte({
        preprocess: vitePreprocess(),
        include: ["**/*.svelte"],
        compilerOptions: {
          customElement: true,
        },
      }),
    ],
    test: {
      name: "web-component-unit",
      globals: true,
      environment: "jsdom",
      alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
      include: [
        "libs/web-components/src/**/*.{test,spec}.ts",
      ],
      setupFiles: ["vitest.web-component.setup.ts"],
    },
  },
  {
    plugins: [
      react(),
    ],
    test: {
      name: "react-unit",
      globals: true,
      environment: "jsdom",
      include: [
        "libs/react-components/src/**/*.{test,spec}.tsx",
      ],
    },
  },
  {
    test: {
      name: "react-browser",
      globals: true,
      environment: "jsdom",
      include: [
        "libs/react-components/**/*.browser.{test,spec}.tsx",
      ],
      setupFiles: ["vitest.browser.setup.ts"],
      browser: {
        provider: "playwright",
        name: "chromium",
        enabled: true,
      },
    },
  },
  {
    test: {
      name: "react-headless",
      globals: true,
      environment: "jsdom",
      include: [
        "libs/react-components/**/*.browser.{test,spec}.tsx",
      ],
      setupFiles: ["vitest.browser.setup.ts"],
      browser: {
        provider: "playwright",
        name: "chromium",
        enabled: true,
        headless: true,
      },
    },
  },
]);
