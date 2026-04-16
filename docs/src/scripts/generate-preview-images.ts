/**
 * Generate preview images for all examples.
 *
 * Uses Playwright to screenshot the live preview area of each example page.
 * Assumes the site is already built — run `npm run build` first, then:
 *
 *   npm run generate-previews
 *
 * Or against a running dev server:
 *
 *   npm run generate-previews -- --url http://localhost:4203
 */

import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { exec, type ChildProcess } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, "../..");
const EXAMPLES_DIR = path.resolve(DOCS_ROOT, "src/content/examples");
const OUTPUT_DIR = path.resolve(DOCS_ROOT, "public/images/examples");

// Parse CLI args
const args = process.argv.slice(2);
const urlFlag = args.indexOf("--url");
const externalUrl = urlFlag !== -1 ? args[urlFlag + 1] : null;
const filterArg = args.find(
  (a) => !a.startsWith("--") && args.indexOf(a) !== urlFlag + 1,
);
const dryRun = args.includes("--dry-run");
const updateFrontmatter = args.includes("--update-frontmatter");

// Examples with manual screenshots — skip these during generation.
// These are interactive examples (modals, drawers, notifications, progress indicators)
// that don't screenshot well with automation.
//
// To add a manual screenshot:
// 1. Set browser to 1280x800, take a screenshot showing the open/active state
// 2. Convert to WebP: node -e "require('sharp')('input.png').webp({quality:70}).toFile('output.webp')"
// 3. Save to public/images/examples/{slug}.webp
// 4. Add the slug to this list
const SKIP_EXAMPLES = new Set([
  "add-a-record-using-a-drawer",
  "add-and-edit-lots-of-filters",
  "add-another-item-in-a-modal",
  "confirm-a-change",
  "confirm-a-destructive-action",
  "confirm-before-navigating-away",
  "filter-a-list-using-a-push-drawer",
  "require-user-action-before-continuing",
  "show-a-notification",
  "show-a-notification-with-an-action",
  "show-a-user-progress",
  "show-a-user-progress-when-the-time-is-unknown",
  "warn-a-user-of-a-deadline",
]);

async function getExampleSlugs(): Promise<string[]> {
  const entries = fs.readdirSync(EXAMPLES_DIR, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

function startPreviewServer(): Promise<{ url: string; process: ChildProcess }> {
  return new Promise((resolve, reject) => {
    const server = exec("npx astro preview", { cwd: DOCS_ROOT });
    const timeout = setTimeout(
      () => reject(new Error("Preview server timed out")),
      30_000,
    );

    server.stdout?.on("data", (data: string) => {
      const match = data.match(/http:\/\/[\w.:]+/);
      if (match) {
        clearTimeout(timeout);
        resolve({ url: match[0], process: server });
      }
    });

    server.stderr?.on("data", (data: string) => {
      // Astro sometimes logs to stderr
      const match = data.match(/http:\/\/[\w.:]+/);
      if (match) {
        clearTimeout(timeout);
        resolve({ url: match[0], process: server });
      }
    });

    server.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

function addPreviewImageToFrontmatter(slug: string, imagePath: string): void {
  const mdxPath = path.join(EXAMPLES_DIR, slug, "index.mdx");
  if (!fs.existsSync(mdxPath)) return;

  let content = fs.readFileSync(mdxPath, "utf-8");

  // Check if previewImage already exists in frontmatter
  if (content.match(/^previewImage:/m)) {
    // Update existing
    content = content.replace(/^previewImage:.*$/m, `previewImage: ${imagePath}`);
  } else {
    // Add before the closing --- of frontmatter
    const endOfFrontmatter = content.indexOf("---", 3);
    if (endOfFrontmatter !== -1) {
      content =
        content.slice(0, endOfFrontmatter) +
        `previewImage: ${imagePath}\n` +
        content.slice(endOfFrontmatter);
    }
  }

  fs.writeFileSync(mdxPath, content);
}

async function main() {
  const slugs = await getExampleSlugs();
  const filtered = filterArg ? slugs.filter((s) => s.includes(filterArg)) : slugs;

  console.log(`Found ${slugs.length} examples, generating ${filtered.length} previews`);

  if (dryRun) {
    console.log("Dry run — would generate:");
    filtered.forEach((s) => console.log(`  ${s}.webp`));
    return;
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Start server if no external URL provided
  let baseUrl: string;
  let serverProcess: ChildProcess | null = null;

  if (externalUrl) {
    baseUrl = externalUrl.replace(/\/$/, "");
    console.log(`Using external server: ${baseUrl}`);
  } else {
    console.log("Starting preview server...");
    const server = await startPreviewServer();
    baseUrl = server.url.replace(/\/$/, "");
    serverProcess = server.process;
    console.log(`Preview server running at ${baseUrl}`);
  }

  // Launch browser
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 2,
  });

  let succeeded = 0;
  let failed = 0;
  const failures: string[] = [];

  try {
    for (const slug of filtered) {
      if (SKIP_EXAMPLES.has(slug)) {
        process.stdout.write(`  ⊘ ${slug} (manual)\n`);
        continue;
      }
      const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`);
      const page = await context.newPage();

      try {
        const url = `${baseUrl}/examples/${slug}`;
        await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

        // Hide dev toolbars that overlap the preview area
        await page.addStyleTag({
          content:
            "astro-dev-toolbar, [id*='netlify'], [class*='netlify'] { display: none !important; }",
        });

        // Wait for the preview container (inner content, no border)
        const previewArea = await page.waitForSelector(".preview-container", {
          timeout: 10_000,
        });
        if (!previewArea) {
          throw new Error("No .preview-container found");
        }

        // Wait for web components to render — check for child elements in the preview container
        await page.waitForFunction(
          () => {
            const container = document.querySelector(".preview-container");
            if (!container) return false;
            // Has visible children (not just the "Preview not available" span)
            return (
              container.children.length > 0 &&
              !container.querySelector(".preview-placeholder")
            );
          },
          { timeout: 10_000 },
        );

        // Brief pause for shadow DOM rendering
        await page.waitForTimeout(500);

        // Hide the preview border
        await page.evaluate(() => {
          const area = document.querySelector(".preview-area") as HTMLElement;
          if (area) {
            area.style.border = "none";
            area.style.borderRadius = "0";
          }
        });

        const pngBuffer = await previewArea.screenshot({ type: "png" });

        await sharp(pngBuffer).webp({ quality: 70 }).toFile(outputPath);

        // Update frontmatter if requested
        if (updateFrontmatter) {
          addPreviewImageToFrontmatter(slug, `/images/examples/${slug}.webp`);
        }

        succeeded++;
        process.stdout.write(`  ✓ ${slug}\n`);
      } catch (err) {
        failed++;
        const msg = err instanceof Error ? err.message : String(err);
        failures.push(`${slug}: ${msg}`);
        process.stdout.write(`  ✗ ${slug} — ${msg}\n`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    if (serverProcess) {
      serverProcess.kill();
    }
  }

  console.log(`\nDone: ${succeeded} succeeded, ${failed} failed`);
  if (failures.length > 0) {
    console.log("\nFailed examples:");
    failures.forEach((f) => console.log(`  ${f}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
