import * as fs from "fs";
import * as path from "path";
import { glob } from "glob";

interface DocIndex {
  id: string;
  title: string;
  description: string;
  content: string;
  component: string;
  filePath: string;
  urlPath: string;
  tags: string[];
}

interface FrontMatter {
  title?: string;
  tags?: string[];
  description?: string;
  [key: string]: any;
}

async function generateSearchIndex() {
  const docsPattern = "docs/src/pages/components/**/*.mdx";
  const docFiles = await glob(docsPattern, {
    cwd: process.cwd(),
    nodir: true,
  });

  console.log(`Found ${docFiles.length} documentation files`);

  const index: DocIndex[] = [];

  for (const filePath of docFiles) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      const content = fs.readFileSync(fullPath, "utf-8");

      const componentName = extractComponentName(filePath);
      const { frontMatter, bodyContent } = parseFrontMatter(content);
      const title = frontMatter.title || extractTitle(bodyContent);
      const tags = frontMatter.tags || [];
      const description = frontMatter.description || extractDescription(bodyContent);

      const docEntry: DocIndex = {
        id: componentName,
        title: title || componentName,
        description,
        content: bodyContent, // TODO: should we extract out everything after the title/description?
        component: componentName,
        filePath: filePath,
        urlPath: `components/${componentName}`,
        tags: tags,
      };

      index.push(docEntry);
      console.log(`  ✓ Indexed: ${componentName}`);
    } catch (error) {
      console.error(`  ✗ Error processing ${filePath}:`, error);
    }
  }

  const outputPath = path.join(process.cwd(), "docs", "search-index.json");
  const publicOutputPath = path.join(
    process.cwd(),
    "docs",
    "public",
    "search-index.json",
  );

  const indexJson = JSON.stringify(index, null, 2);
  fs.writeFileSync(outputPath, indexJson, "utf-8");

  if (!fs.existsSync(path.join(process.cwd(), "docs", "public"))) {
    fs.mkdirSync(path.join(process.cwd(), "docs", "public"), { recursive: true });
  }
  fs.writeFileSync(publicOutputPath, indexJson, "utf-8");

  console.log(`\n✓ Search index generated successfully!`);
  console.log(`  Location: ${outputPath}`);
  console.log(`  Public location: ${publicOutputPath}`);
  console.log(`  Total entries: ${index.length}`);
}

function extractComponentName(filePath: string): string {
  const parts = filePath.split(path.sep);
  const fileName = parts[parts.length - 1];

  return fileName.replace(".mdx", "");
}

function extractTitle(content: string): string {
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      return trimmed.substring(2).trim();
    }
  }

  return "";
}

// extract out the content between the h1 and first h2 tag
function extractDescription(content: string): string {
  const lines = content.split("\n");
  const desc: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      continue;
    }
    if (trimmed.startsWith("## ")) {
      break;
    }
    desc.push(trimmed);
  }

  return desc.join(" ");
}

function parseFrontMatter(content: string): {
  frontMatter: FrontMatter;
  bodyContent: string;
} {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, bodyContent: content };
  }

  const [, frontMatterText, bodyContent] = match;
  const frontMatter: FrontMatter = {};

  const lines = frontMatterText.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) continue;

    const key = trimmed.substring(0, colonIndex).trim();
    const value = trimmed.substring(colonIndex + 1).trim();

    if (key === "tags") {
      try {
        const tagsMatch = value.match(/\[(.*?)\]/);
        if (tagsMatch) {
          frontMatter.tags = tagsMatch[1]
            .split(",")
            .map((tag) => tag.trim().replace(/['"]/g, ""))
            .filter((tag) => tag.length > 0);
        }
      } catch (error) {
        console.warn(`Failed to parse tags for line: ${line}`);
      }
    } else {
      frontMatter[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }

  return { frontMatter, bodyContent };
}

generateSearchIndex().catch((error) => {
  console.error("Failed to generate search index:", error);
  process.exit(1);
});
