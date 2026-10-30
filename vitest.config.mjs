import { defineConfig } from "vite";

import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { playwright } from "@vitest/browser-playwright";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    retries: 3,
    exclude: [
      "**/node_modules",
      "apps",
      "libs/angular-components", // run angular via nx
    ],
    projects: [
      {
        plugins: [
          svelte({
            preprocess: vitePreprocess({ script: true }),
            include: ["**/*.svelte"],
            compilerOptions: {
              customElement: true,
            },
          }),
          svelteTesting(),
        ],
        resolve: {
          alias: {
            "@abgov/ui-components-common": resolve(
              __dirname,
              "./libs/common/src/index.ts",
            ),
          },
        },
        test: {
          name: "web-component-unit",
          globals: true,
          environment: "jsdom",
          include: ["libs/web-components/src/**/*.{test,spec}.ts"],
          setupFiles: ["vitest.web-component.setup.ts"],
        },
      },
      {
        plugins: [react()],
        resolve: {
          alias: {
            "@abgov/ui-components-common": resolve(
              __dirname,
              "./libs/common/src/index.ts",
            ),
          },
        },
        test: {
          name: "react-unit",
          globals: true,
          environment: "jsdom",
          include: ["libs/react-components/src/**/*.{test,spec}.tsx"],
        },
      },
      {
        plugins: [react()],
        resolve: {
          alias: {
            "@abgov/ui-components-common": resolve(
              __dirname,
              "./libs/common/src/index.ts",
            ),
          },
        },
        test: {
          name: "react-browser",
          globals: true,
          environment: "jsdom",
          fileParallelism: false,
          include: ["libs/react-components/**/*.browser.{test,spec}.tsx"],
          setupFiles: ["vitest.browser.setup.ts"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }, { browser: "firefox" }],
          },
          server: {
            deps: {
              inline: [/@abgov\/ui-components-common/],
            },
          },
        },
      },
      {
        plugins: [react()],
        resolve: {
          alias: {
            "@abgov/ui-components-common": resolve(
              __dirname,
              "./libs/common/src/index.ts",
            ),
          },
        },
        test: {
          name: "react-headless",
          globals: true,
          environment: "jsdom",
          fileParallelism: false,
          include: ["libs/react-components/**/*.browser.{test,spec}.tsx"],
          setupFiles: ["vitest.browser.setup.ts"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }, { browser: "firefox" }],
          },
          server: {
            deps: {
              inline: [/@abgov\/ui-components-common/],
            },
          },
        },
      },
    ],
  },
});
