import { defineConfig } from "vite";
import { copyFileSync, cpSync, existsSync } from "fs";
import { builtinModules } from "module";
import * as path from "path";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

// Copies the generated data records and the README beside the bundle once it is
// written, so dist/libs/design-system-mcp is the complete publishable package.
// Throws (failing the build) when the data is missing, instead of producing a
// server with an empty brain.
function copyPackageAssets() {
  return {
    name: "copy-package-assets",
    closeBundle() {
      const dataSrc = path.join(__dirname, "../../docs/generated/mcp");
      const outDir = path.join(__dirname, "../../dist/libs/design-system-mcp");
      if (!existsSync(path.join(dataSrc, "components"))) {
        throw new Error(
          `copy-package-assets: no generated data at ${dataSrc}. ` +
            `Run design-system-mcp:generate-data first (the build target depends on it).`,
        );
      }
      cpSync(dataSrc, path.join(outDir, "data"), { recursive: true });
      copyFileSync(path.join(__dirname, "README.md"), path.join(outDir, "README.md"));
    },
  };
}

export default defineConfig({
  root: __dirname,
  cacheDir: "../../node_modules/.vite/libs/design-system-mcp",

  plugins: [nxViteTsPaths(), copyPackageAssets()],

  // A Node stdio server, not a browser library: target Node, keep Node builtins
  // external, and leave the two runtime dependencies to npm (they are declared
  // in package.json and installed with the package).
  build: {
    outDir: "../../dist/libs/design-system-mcp",
    emptyOutDir: true,
    reportCompressedSize: true,
    target: "node20",
    minify: false,
    lib: {
      entry: "src/main.ts",
      fileName: () => "main.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        /^node:/,
        ...builtinModules,
        /^@modelcontextprotocol\/sdk/,
        "zod",
      ],
      output: {
        banner: "#!/usr/bin/env node",
      },
    },
  },
});
