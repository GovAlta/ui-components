import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({

  test: {
    exclude: [
      "**/node_modules",
      "playground",
      "libs/angular-components",  // run angular via nx
    ],
  },
});
