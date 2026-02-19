import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/apps/digital-service-demo",

  server: {
    port: 4220,
    host: "0.0.0.0",
  },

  preview: {
    port: 4320,
    host: "localhost",
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: "../../dist/apps/digital-service-demo",
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
