import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // {
  //   test: {
  //     // an example of file based convention,
  //     // you don't have to follow it
  //     include: [
  //       'tests/unit/**/*.{test,spec}.ts',
  //       'tests/**/*.unit.{test,spec}.ts',
  //     ],
  //     name: 'unit',
  //     environment: 'node',
  //   },
  // },
  {
    test: {
      globals: true,
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
