/**
 * Component API Extraction Script
 *
 * Extracts props, events, and slots from Svelte component files and outputs
 * structured JSON matching the content model spec defined in Brief 1.
 *
 * Usage:
 *   npx tsx src/scripts/extract-api.ts button           # Extract single component
 *   npx tsx src/scripts/extract-api.ts button input     # Extract multiple components
 *   npx tsx src/scripts/extract-api.ts --all            # Extract all components
 *
 * Output: JSON files in docs/generated/component-apis/
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  getAllComponentNames,
} from "./extract-api/discovery";
import { extractComponentAPI } from "./extract-api/component-extractor";
import { saveComponentAPI } from "./extract-api/persistence";

// =============================================================================
// Configuration
// =============================================================================

// Resolve paths relative to the workspace root (ui-components/)
// This script lives at docs/src/scripts/ — three levels below the workspace root
const WORKSPACE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const UI_COMPONENTS_PATH = path.join(
  WORKSPACE_ROOT,
  "libs/web-components/src/components",
);
const OUTPUT_PATH = path.join(WORKSPACE_ROOT, "docs/generated/component-apis");
const DOCS_COMPONENT_CONTENT_PATH = path.join(
  WORKSPACE_ROOT,
  "docs/src/content/components",
);

function removeStaleApiFiles(validComponentNames: string[]): void {
  if (!fs.existsSync(OUTPUT_PATH)) return;

  const validFiles = new Set(validComponentNames.map((name) => `${name}.json`));
  const entries = fs.readdirSync(OUTPUT_PATH, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".json") && !validFiles.has(entry.name)) {
      fs.unlinkSync(path.join(OUTPUT_PATH, entry.name));
      console.log(`  Removed stale file: ${entry.name}`);
    }
  }
}

// =============================================================================
// CLI
// =============================================================================

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  npx tsx extract-api.ts button           # Extract single component");
    console.log(
      "  npx tsx extract-api.ts button input     # Extract multiple components",
    );
    console.log("  npx tsx extract-api.ts --all            # Extract all components");
    process.exit(1);
  }

  let componentNames: string[];

  if (args.includes("--all")) {
    componentNames = getAllComponentNames(UI_COMPONENTS_PATH, DOCS_COMPONENT_CONTENT_PATH);
    removeStaleApiFiles(componentNames);
  } else {
    componentNames = args;
  }

  console.log("\n Component API Extraction");
  console.log("═".repeat(50));
  console.log(`\nExtracting ${componentNames.length} component(s)...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const componentName of componentNames) {
    console.log(`Processing: ${componentName}`);
    try {
      const api = extractComponentAPI(componentName, WORKSPACE_ROOT, UI_COMPONENTS_PATH);
      if (api) {
        saveComponentAPI(api, OUTPUT_PATH);
        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`  Error: ${error}`);
      failCount++;
    }
  }

  console.log("\n" + "═".repeat(50));
  console.log(`Complete: ${successCount} succeeded, ${failCount} failed`);
  console.log(`Output: ${OUTPUT_PATH}\n`);
}

main();
