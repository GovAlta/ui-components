import { defineWorkspace } from 'vitest/config'
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import react from "@vitejs/plugin-react";

export default defineWorkspace([
  {
    plugins: [
      react(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      name: 'react-unit',
      include: [
        'libs/react-components/src/**/*.{test,spec}.tsx',
      ],
    },
  },
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
      globals: true,
      environment: "jsdom",
      alias: [{ find: /^svelte$/, replacement: "svelte/internal" }],
      name: 'web-component-unit',
      include: [
        'libs/web-components/src/**/*.{test,spec}.ts',
      ],
      setupFiles: ["vitest.web-component.setup.ts"],
    },
  },
  {
    test: {
      globals: true,
      environment: "jsdom",
      include: [
        'libs/react-components/**/*.browser.{test,spec}.tsx',
      ],
      setupFiles: ["vitest.browser.setup.ts"],
      name: 'react-browser',
      browser: {
        name: "chrome",
        enabled: true,
        // instances: [
        //   { browser: 'chromium' },
        // ],
      },
    },
  },
])
