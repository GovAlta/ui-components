import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({

  test: {
    retries: 3,
    exclude: [
      "**/node_modules",
      "apps",
      "libs/angular-components",  // run angular via nx
    ],
  },
});
