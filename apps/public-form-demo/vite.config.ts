import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/public-form-demo",

  server: {
    port: 4210,
    host: "0.0.0.0",
  },

  preview: {
    port: 4310,
    host: "localhost",
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: "../../dist/apps/public-form-demo",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
