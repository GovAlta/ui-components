import * as fs from "fs";
import * as path from "path";
import { paths, WEB_COMPONENT_ONLY } from "../config";
import type {
  AnyRecord,
  ComponentRecord,
  ExampleRecord,
  FoundationRecord,
  GetStartedRecord,
  GuidanceRecord,
  ProductTypeRecord,
} from "../types";

// Markdown bundle output target.
//
// Same source and same transformed records as the MCP JSON output, but a
// different distribution: standalone Markdown for AI tools that don't speak
// MCP. The MCP resolves related guidance on demand and knows the caller's
// framework from the query; a static file can't, so this output denormalizes
// (guidance inlined as text) and splits by framework (one self-contained set
// per framework, so a consumer loads only what they use).

export interface FrameworkTarget {
  /** Folder name and frontmatter `framework` value. */
  id: string;
  /** Key into `api.frameworks`. */
  apiKey: string;
  /** Human label used in headings. */
  label: string;
  /**
   * Heading for the content-insertion section. Web components have native
   * slots; React passes content as ReactNode, Angular via Template Ref. Naming
   * it per framework stops an AI reaching for a `slot` attribute where the
   * framework uses a different mechanism.
   */
  slotsLabel: string;
  /** Frontmatter key for this framework's component identifier. */
  frontmatterKey: string;
  /** ComponentRecord field holding the identifier (e.g. `GoabButton`). */
  identifierKey: "reactClassName" | "angularSelector" | "webComponentTag" | "vueComponentName";
  /** Example source files to embed, in render order, with fence languages. */
  sources: { file: string; lang: string }[];
  /**
   * Attribute on `<PreviewContainer>` that holds this framework's per-variant
   * source URL, for page-scale examples whose source lives in variant
   * subfolders rather than sibling files. Omit for frameworks PreviewContainer
   * doesn't carry a source URL for.
   */
  variantSourceAttr?: string;
}

const FRAMEWORKS: FrameworkTarget[] = [
  {
    id: "react",
    apiKey: "react",
    label: "React",
    slotsLabel: "ReactNode",
    frontmatterKey: "react",
    identifierKey: "reactClassName",
    sources: [{ file: "react.tsx", lang: "tsx" }],
    variantSourceAttr: "reactSourceUrl",
  },
  {
    id: "angular",
    apiKey: "angular",
    label: "Angular",
    slotsLabel: "Template Ref",
    frontmatterKey: "angular",
    identifierKey: "angularSelector",
    sources: [
      { file: "angular.html", lang: "html" },
      { file: "angular.ts", lang: "typescript" },
    ],
    variantSourceAttr: "angularSourceUrl",
  },
  {
    id: "web-components",
    apiKey: "webComponents",
    label: "Web component",
    slotsLabel: "Slots",
    frontmatterKey: "webComponent",
    identifierKey: "webComponentTag",
    sources: [{ file: "web-components.html", lang: "html" }],
    // PreviewContainer has no webComponentsSourceUrl attribute, so the WC
    // bundle skips variant links rather than emit relative-only previews.
  },
  {
    id: "vue",
    apiKey: "webComponents",
    label: "Vue",
    slotsLabel: "Slots",
    frontmatterKey: "vue",
    identifierKey: "vueComponentName",
    sources: [{ file: "vue.vue", lang: "vue" }],
    // PreviewContainer has no vueSourceUrl attribute, so the Vue bundle
    // skips variant links rather than emit relative-only previews.
  },
];

// Mirrors ACCESSIBILITY_TOPICS in docs/src/lib/content-queries.ts (which drives
// the docs site's categorizeGuidance). The schema's topic enum lives in
// docs/src/content/config.ts. If that enum gains an accessibility topic,
// update this set so the bundle categorizes it the same way the site does.
const ACCESSIBILITY_TOPICS = new Set([
  "accessibility",
  "screen-readers",
  "keyboard",
  "focus",
]);

// Shape of the untyped `api` blob we navigate. Only the fields we render.
interface ApiItem {
  name: string;
  type?: string;
  default?: unknown;
  description?: string;
  required?: boolean;
}
interface FrameworkApi {
  props?: ApiItem[];
  events?: ApiItem[];
  slots?: ApiItem[];
  notes?: string[];
}
interface ApiBlob {
  frameworks?: Record<string, FrameworkApi>;
}

/**
 * Components for a framework's set. Web components carry the full set; other
 * frameworks drop the web-component-only utilities (no wrapper there), so an AI
 * is not shown a component it cannot use in that framework.
 */
export function componentsForTarget(
  components: ComponentRecord[],
  target: FrameworkTarget,
): ComponentRecord[] {
  if (target.id === "web-components") return components;
  return components.filter((c) => !WEB_COMPONENT_ONLY.has(c.id));
}

/** Generate the Markdown bundle: one self-contained set per framework. */
export function writeMdBundle(records: AnyRecord[]): { written: number } {
  const targets = FRAMEWORKS;

  // Include everything, like the MCP: hidden is a website-nav concept, not a
  // knowledge filter. Status (incl. deprecated) rides along in frontmatter so a
  // consumer sees it, same as the MCP exposes it as a filterable field.
  const components = records
    .filter((r): r is ComponentRecord => r.collection === "components")
    .sort((a, b) => cmp(a.id, b.id));
  const examples = records
    .filter((r): r is ExampleRecord => r.collection === "examples")
    .sort((a, b) => cmp(a.id, b.id));
  const foundations = records
    .filter((r): r is FoundationRecord => r.collection === "foundations")
    .sort((a, b) => cmp(a.id, b.id));
  const getStarted = records
    .filter((r): r is GetStartedRecord => r.collection === "get-started")
    .sort((a, b) => cmp(a.id, b.id));
  const productTypes = records
    .filter((r): r is ProductTypeRecord => r.collection === "productTypes")
    .sort((a, b) => cmp(a.id, b.id));
  const guidanceById = new Map<string, GuidanceRecord>(
    records
      .filter((r): r is GuidanceRecord => r.collection === "guidance")
      .map((g) => [g.id, g]),
  );

  const componentNameById = new Map(components.map((c) => [c.id, c.name]));
  const exampleTitleById = new Map(examples.map((e) => [e.id, e.title]));

  // Which examples reference each component (mirrors getExamplesForComponent).
  const examplesByComponent = new Map<string, ExampleRecord[]>();
  for (const ex of examples) {
    for (const cid of ex.components) {
      const list = examplesByComponent.get(cid) ?? [];
      list.push(ex);
      examplesByComponent.set(cid, list);
    }
  }

  // Clear the whole bundle before writing. The orchestrator's checks gate in
  // index.ts prevents reaching this point on validation errors, so a clean run
  // rebuilds from scratch with no orphans. A mid-write I/O failure would leave
  // a partial bundle, but the render functions are pure, so realistic failure
  // modes happen before this point, not during write.
  fs.rmSync(paths.output.mdBundle, { recursive: true, force: true });

  let written = 0;
  for (const target of targets) {
    const root = path.join(paths.output.mdBundle, target.id);
    const targetComponents = componentsForTarget(components, target);
    let chars = 0;
    let fileCount = 0;
    // Write a file and tally its size, so the index can report the set's weight.
    const emit = (file: string, md: string): void => {
      writeFile(file, md);
      chars += md.length;
      fileCount++;
      written++;
    };

    for (const c of targetComponents) {
      emit(
        path.join(root, "components", filename(c.id)),
        renderComponent(
          c,
          target,
          guidanceById,
          examplesByComponent.get(c.id) ?? [],
          componentNameById,
        ),
      );
    }
    for (const ex of examples) {
      emit(
        path.join(root, "examples", filename(ex.id)),
        renderExample(ex, target, componentNameById, exampleTitleById),
      );
    }
    for (const f of foundations) {
      emit(path.join(root, "foundations", filename(f.id)), renderFoundation(f));
    }
    for (const gs of getStarted) {
      emit(path.join(root, "get-started", filename(gs.id)), renderGetStarted(gs));
    }
    for (const pt of productTypes) {
      emit(
        path.join(root, "product-types", filename(pt.id)),
        renderProductType(pt, componentNameById),
      );
    }
    // Index last; it reports the set size, counting itself (hence fileCount + 1).
    emit(
      path.join(root, "index.md"),
      renderIndex(target, targetComponents, foundations, examples, getStarted, productTypes, {
        files: fileCount + 1,
        chars,
      }),
    );
  }

  return { written };
}

// --- Component ---------------------------------------------------------------

export function renderComponent(
  c: ComponentRecord,
  target: FrameworkTarget,
  guidanceById: Map<string, GuidanceRecord>,
  examples: ExampleRecord[],
  componentNameById: Map<string, string>,
): string {
  const identifier = c[target.identifierKey];
  const fm: [string, unknown][] = [
    ["id", c.id],
    ["name", c.name],
    ["framework", target.id],
    ["status", c.status],
    ["category", c.category],
    ["tags", c.tags],
  ];
  if (c.subcomponent) fm.push(["subcomponent", true]);
  if (identifier) fm.push([target.frontmatterKey, identifier]);
  if (c.figmaUrl) fm.push(["figma", c.figmaUrl]);

  const out: string[] = [frontmatter(fm), `# ${c.name}`];
  if (c.description) out.push(c.description);

  // Surface deprecation in the prose, not just frontmatter: a tool reading the
  // body top-to-bottom should see it. There's no replacedBy field in the source,
  // so point to Related components rather than naming a replacement.
  if (c.status === "deprecated") {
    const alt = c.relatedComponents?.length
      ? " See Related components for current options."
      : "";
    out.push(
      `> **Deprecated.** This component is no longer recommended for new work.${alt}`,
    );
  }

  // Properties
  const api = (c.api as ApiBlob | undefined)?.frameworks?.[target.apiKey];
  const propsTable = api?.props?.length ? apiTable(api.props, true) : "";
  const eventsTable = api?.events?.length ? apiTable(api.events, false) : "";
  const slotsTable = api?.slots?.length ? apiTable(api.slots, false) : "";
  if (propsTable || eventsTable || slotsTable) {
    out.push("## Properties");
    if (propsTable) out.push(propsTable);
    if (eventsTable) out.push("### Events", eventsTable);
    if (slotsTable) out.push(`### ${target.slotsLabel}`, slotsTable);
  } else {
    out.push("## Properties", "_No extracted API for this component._");
  }

  // Vue-specific conventions (e.g. version="2", boolean handling)
  if (target.id === "vue") {
    const vueNotes = (c.api as ApiBlob | undefined)?.frameworks?.vue?.notes;
    if (vueNotes?.length) {
      out.push("## Notes", vueNotes.map((n) => `> ${n}`).join("\n"));
    }
  }

  // Examples (pointers to files in this same bundle)
  if (examples.length) {
    const lines = [...examples]
      .sort((a, b) => cmp(a.id, b.id))
      .map((ex) => {
        const uses = ex.components
          .map((id) => componentNameById.get(id) ?? id)
          .join(", ");
        const usesText = uses ? ` Uses: ${uses}.` : "";
        return `- **${ex.title}** (${ex.size}).${usesText} See \`../examples/${filename(ex.id)}\`.`;
      });
    out.push("## Examples", lines.join("\n"));
  }

  // Guidance, inlined as text and split usage / accessibility (mirrors the site)
  const guidance = (c.relatedGuidance ?? [])
    .map((id) => guidanceById.get(id))
    .filter((g): g is GuidanceRecord => Boolean(g));
  const usage = guidance.filter((g) => !ACCESSIBILITY_TOPICS.has(g.topic));
  const accessibility = guidance.filter((g) => ACCESSIBILITY_TOPICS.has(g.topic));

  const usageSection = guidanceByTopic(usage);
  if (usageSection) out.push("## Usage guidelines", usageSection);
  const a11ySection = guidanceByTopic(accessibility);
  if (a11ySection) {
    out.push(
      "## Accessibility",
      "All GoA Design System components are built to meet WCAG 2.2 AA. These notes add component-specific context.",
      a11ySection,
    );
  }

  // Related components
  if (c.relatedComponents?.length) {
    const lines = c.relatedComponents.map((id) => {
      const name = componentNameById.get(id) ?? id;
      return `- ${name} (\`./${filename(id)}\`)`;
    });
    out.push("## Related components", lines.join("\n"));
  }

  return out.join("\n\n");
}

// Render a list of guidance grouped by topic, in a deterministic topic order.
function guidanceByTopic(guidance: GuidanceRecord[]): string {
  if (!guidance.length) return "";
  const byTopic = new Map<string, GuidanceRecord[]>();
  for (const g of guidance) {
    const list = byTopic.get(g.topic) ?? [];
    list.push(g);
    byTopic.set(g.topic, list);
  }
  const topics = [...byTopic.keys()].sort();
  const blocks: string[] = [];
  for (const topic of topics) {
    const items = byTopic
      .get(topic)!
      .sort((a, b) => cmp(a.id, b.id))
      .map((g) => {
        let line = `- **${guidanceLabel(g.type)}:** ${inline(g.description)}`;
        const prose = guidanceBodyProse(g.body);
        if (prose) {
          // Indent the prose so it stays attached to the bullet; nested lists
          // (e.g. an "overview" atom whose content lives in the body) carry over.
          line += "\n" + prose.split("\n").map((l) => (l ? `  ${l}` : l)).join("\n");
        }
        return line;
      });
    blocks.push(`### ${titleCase(topic)}\n\n${items.join("\n")}`);
  }
  return blocks.join("\n\n");
}

function guidanceLabel(type: string): string {
  if (type === "do") return "Do";
  if (type === "dont") return "Don't";
  return titleCase(type);
}

// Guidance bodies carry a <Preview> with web-component markup (a website visual)
// and sometimes extra prose. The description holds the rule; the body sometimes
// holds the substance (e.g. an "overview" atom). Drop the Preview, keep prose.
function guidanceBodyProse(body: string): string {
  return body
    .replace(/<Preview[\s\S]*?<\/Preview>/g, "")
    .replace(/<Preview[^>]*\/>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// --- Example -----------------------------------------------------------------

export function renderExample(
  ex: ExampleRecord,
  target: FrameworkTarget,
  componentNameById: Map<string, string>,
  exampleTitleById: Map<string, string>,
): string {
  const fm: [string, unknown][] = [
    ["id", ex.id],
    ["title", ex.title],
    ["framework", target.id],
    ["size", ex.size],
    ["status", ex.status],
    ["tags", ex.tags],
    ["components", ex.components],
  ];
  const out: string[] = [frontmatter(fm), `# ${ex.title}`];

  // Lift per-variant source URLs out of <PreviewContainer> blocks BEFORE we
  // strip MDX from the body. Otherwise page examples (e.g. error-pages) lose
  // their only pointer to source, which lives in variant subfolders rather
  // than alongside the example's index.mdx.
  const variantLinks = extractVariantLinks(ex.body, target);

  const cleanBody = mdxBodyProse(ex.body);
  if (cleanBody) out.push(cleanBody);

  if (ex.components.length) {
    const uses = ex.components.map((id) => componentNameById.get(id) ?? id).join(", ");
    out.push(`**Components used:** ${uses}`);
  }

  // Embed this framework's source where it exists on disk.
  const folder = path.join(paths.content.examples, ex.id);
  const codeBlocks: string[] = [];
  for (const src of target.sources) {
    const file = path.join(folder, src.file);
    if (fs.existsSync(file)) {
      const code = fs.readFileSync(file, "utf8").trimEnd();
      codeBlocks.push("```" + src.lang + "\n" + code + "\n```");
    }
  }
  if (codeBlocks.length) {
    out.push(`## Code (${target.label})`, codeBlocks.join("\n\n"));
  }

  // External links: top-level URLs on the record plus any variant URLs lifted
  // from the body's <PreviewContainer> blocks above.
  const links: string[] = [];
  if (ex.previewUrl) links.push(`- Live preview: ${ex.previewUrl}`);
  if (target.id === "react" && ex.reactSourceUrl)
    links.push(`- Source: ${ex.reactSourceUrl}`);
  if (target.id === "angular" && ex.angularSourceUrl)
    links.push(`- Source: ${ex.angularSourceUrl}`);
  if (target.id === "vue" && ex.vueSourceUrl)
    links.push(`- Source: ${ex.vueSourceUrl}`);
  if (ex.sourceUrl) links.push(`- Source: ${ex.sourceUrl}`);
  if (ex.stackblitzUrl) links.push(`- StackBlitz: ${ex.stackblitzUrl}`);
  links.push(...variantLinks);

  if (!codeBlocks.length && !links.length) {
    out.push("_Source for this pattern lives on the docs site._");
  } else if (links.length) {
    out.push("## Links", links.join("\n"));
  }

  // Related examples: example-to-example navigation the MCP carries. Components
  // already link to their examples; this closes the loop between examples.
  if (ex.relatedExamples.length) {
    const lines = ex.relatedExamples.map((id) => {
      const title = exampleTitleById.get(id) ?? id;
      return `- [${title}](./${filename(id)})`;
    });
    out.push("## Related examples", lines.join("\n"));
  }

  return out.join("\n\n");
}

// Pull per-variant source URLs out of <PreviewContainer> blocks in an MDX body,
// labelled by the nearest preceding heading. React/Angular read their own source
// attribute; Web Components has none, but its source sits next to react.tsx, so
// its URL is derived (and verified on disk) rather than left as a dead end.
export function extractVariantLinks(body: string, target: FrameworkTarget): string[] {
  const blocks = [...body.matchAll(/<PreviewContainer\b[\s\S]*?\/>/g)];
  const lines: string[] = [];
  for (const m of blocks) {
    const url = variantSourceUrl(m[0], target);
    if (!url) continue;
    const before = body.slice(0, m.index ?? 0);
    const headings = [...before.matchAll(/^#{2,4}\s+(.+)$/gm)];
    const label = headings.length ? headings[headings.length - 1][1].trim() : "Variant";
    lines.push(`- ${label}: ${url}`);
  }
  return lines;
}

// The per-variant source URL for one <PreviewContainer>. React/Angular each carry
// their own attribute. Web Components has no attribute, so derive its URL from
// reactSourceUrl (.../react.tsx -> .../web-components.html), but only when that
// file actually exists, so a missing variant fails safe to no link, not a 404.
function variantSourceUrl(block: string, target: FrameworkTarget): string | undefined {
  if (target.variantSourceAttr) {
    return block.match(new RegExp(`${target.variantSourceAttr}="([^"]+)"`))?.[1];
  }
  if (target.id === "web-components") {
    const reactUrl = block.match(/reactSourceUrl="([^"]+)"/)?.[1];
    const rel = reactUrl?.match(/\/docs\/src\/content\/examples\/(.+)\/react\.tsx$/)?.[1];
    if (!reactUrl || !rel) return undefined;
    if (!fs.existsSync(path.join(paths.content.examples, rel, "web-components.html"))) {
      return undefined;
    }
    return reactUrl.replace(/\/react\.tsx$/, "/web-components.html");
  }
  if (target.id === "vue") {
    const reactUrl = block.match(/reactSourceUrl="([^"]+)"/)?.[1];
    const rel = reactUrl?.match(/\/docs\/src\/content\/examples\/(.+)\/react\.tsx$/)?.[1];
    if (!reactUrl || !rel) return undefined;
    if (!fs.existsSync(path.join(paths.content.examples, rel, "vue.vue"))) {
      return undefined;
    }
    return reactUrl.replace(/\/react\.tsx$/, "/vue.vue");
  }
  return undefined;
}

// --- Foundation --------------------------------------------------------------

function renderFoundation(f: FoundationRecord): string {
  const fm: [string, unknown][] = [
    ["id", f.id],
    ["title", f.title],
    ["category", f.category],
    ["status", f.status],
    ["tags", f.tags],
  ];
  const out = [frontmatter(fm), `# ${f.title}`];
  if (f.description) out.push(f.description);
  const body = mdxBodyProse(f.body);
  if (body) out.push(body);
  return out.join("\n\n");
}

// --- Get-started -------------------------------------------------------------

function renderGetStarted(g: GetStartedRecord): string {
  const fm: [string, unknown][] = [
    ["id", g.id],
    ["title", g.title],
    ["section", g.section],
    ["order", g.order],
    ["status", g.status],
  ];
  const out = [frontmatter(fm), `# ${g.title}`];
  if (g.description) out.push(g.description);
  const body = mdxBodyProse(g.body);
  if (body) out.push(body);
  return out.join("\n\n");
}

// --- Product type ------------------------------------------------------------

export function renderProductType(
  pt: ProductTypeRecord,
  componentNameById: Map<string, string>,
): string {
  const fm: [string, unknown][] = [
    ["id", pt.id],
    ["title", pt.title],
    ["status", pt.status],
    ["tags", pt.tags],
  ];
  const out = [frontmatter(fm), `# ${pt.title}`];
  const summary = mdxBodyProse(pt.summary);
  if (summary) out.push(summary);
  const body = mdxBodyProse(pt.body);
  if (body) out.push(body);
  if (pt.components.length) {
    const uses = pt.components.map((id) => componentNameById.get(id) ?? id).join(", ");
    out.push(`**Components used:** ${uses}`);
  }
  const links: string[] = [];
  if (pt.demoUrl) links.push(`- Demo: ${pt.demoUrl}`);
  if (pt.sourceUrl) links.push(`- Source: ${pt.sourceUrl}`);
  if (links.length) out.push("## Links", links.join("\n"));
  return out.join("\n\n");
}

// Convert an MDX/HTML body to clean Markdown. Two record types (get-started
// and product-types) are authored as HTML-heavy MDX, so the body carries
// <h2 id="..."> headings, <pre><code>{`...`}</code></pre> code blocks, lowercase
// <goa-*> wrappers around prose, and styled <div>/<span> layout wrappers. This
// pipeline rewrites the structural pieces, unwraps prose wrappers, and drops
// layout-only chrome. Order matters: code blocks first (so their content isn't
// touched by later rules), then block-level rewrites, then inline.
export function mdxBodyProse(body: string): string {
  // Mask every code region to an opaque placeholder BEFORE any HTML/MDX
  // transform runs, then restore them verbatim at the very end. Without this,
  // the import strip and the capitalised-JSX strip below run over code that has
  // already been turned into a fence and gut real samples (for example, a
  // setup snippet collapsing to "render( , )"). SENTINEL can't occur in source and
  // is inert to every regex below, so the placeholder survives untouched. Block
  // code is padded with blank lines so its fence restores cleanly; inline code
  // stays inline.
  const codeBlocks: string[] = [];
  const SENTINEL = "@@CODEMASK@@";
  const maskBlock = (rendered: string): string => {
    codeBlocks.push(rendered);
    return `\n\n${SENTINEL}${codeBlocks.length - 1}${SENTINEL}\n\n`;
  };
  const maskInline = (rendered: string): string => {
    codeBlocks.push(rendered);
    return `${SENTINEL}${codeBlocks.length - 1}${SENTINEL}`;
  };

  let s = body;

  // Raw Markdown code fences authored directly in the body (```lang ... ```).
  // Masked verbatim, info string and all, so the import strip and capitalised-JSX
  // strip below cannot reach inside them. Without this, an import or capitalised
  // tag inside a fenced sample would be deleted, silently corrupting the code.
  s = s.replace(
    /^[ \t]{0,3}(`|~)\1{2,}[^\n]*\n[\s\S]*?\n[ \t]{0,3}\1{3,}[ \t]*$/gm,
    (m) => maskBlock(m),
  );

  // <pre><code>{`...`}</code></pre> — MDX template literal, kept raw.
  s = s.replace(
    /<pre>\s*<code\b[^>]*>\{`([\s\S]*?)`\}<\/code>\s*<\/pre>/g,
    (_, code) => maskBlock("```\n" + code.trim() + "\n```"),
  );
  // <pre><code>...</code></pre> — plain HTML, entity-decoded.
  s = s.replace(
    /<pre>\s*<code\b[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/g,
    (_, code) => maskBlock("```\n" + decodeEntities(code).trim() + "\n```"),
  );
  // Inline <code>{`...`}</code> — MDX template literal, kept raw.
  s = s.replace(
    /<code\b[^>]*>\{`([\s\S]*?)`\}<\/code>/g,
    (_, code) => maskInline("`" + code.trim() + "`"),
  );
  // Inline <code>...</code> — plain, entity-decoded.
  s = s.replace(
    /<code\b[^>]*>([\s\S]*?)<\/code>/g,
    (_, code) => maskInline("`" + decodeEntities(code).trim() + "`"),
  );

  // ESM imports/exports (only when they have a `from "..."` clause, so prose
  // that happens to start with "import" doesn't get stripped). Safe now that
  // the code samples above are masked.
  s = s.replace(/^(import|export)\s+[^\n]*?\bfrom\s+["'][^"']+["'][^\n]*$/gm, "");

  // Capitalised JSX components (PreviewContainer, GoabTemporaryNotificationCtrl,
  // etc.) are dropped, but any masked code placeholder nested inside one is kept:
  // a code sample wrapped in such a component must survive like code anywhere
  // else (otherwise the JSX strip would drop a code sample wrapped in one).
  s = s.replace(/<([A-Z][A-Za-z0-9]*)\b[\s\S]*?<\/\1>/g, (m) => {
    const kept = m.match(new RegExp(`${SENTINEL}\\d+${SENTINEL}`, "g"));
    return kept ? `\n\n${kept.join("\n\n")}\n\n` : "";
  });
  s = s.replace(/<[A-Z][A-Za-z0-9]*\b[^>]*?\/>/g, "");

  // <img> handled early so downstream wrappers (e.g. <goa-tab>) see the alt
  // text rather than empty content. Keep the alt as an italic descriptor so an
  // AI knows what the visual carried; drop the image element either way.
  s = s.replace(/<img\b[^>]*?\balt="([^"]+)"[^>]*?\/?>/g, "*[Image: $1]*");
  s = s.replace(/<img\b[^>]*?\/?>/g, "");

  // <goa-tab heading="X">...</goa-tab> -> #### X + content. Then <goa-tabs> unwraps.
  s = applyUntilStable(s, (t) =>
    t.replace(
      /<goa-tab\b[^>]*\sheading="([^"]+)"[^>]*>([\s\S]*?)<\/goa-tab>/g,
      (_, heading, content) => `\n#### ${heading}\n\n${content.trim()}\n`,
    ),
  );
  s = s.replace(/<goa-tabs\b[^>]*>([\s\S]*?)<\/goa-tabs>/g, "$1");

  // <goa-divider> -> horizontal rule. Handles paired-empty and self-closing.
  s = s.replace(/<goa-divider\b[^>]*?\/?>(?:<\/goa-divider>)?/g, "\n---\n");

  // goa-callout is handled near the end (after its inner content is Markdown),
  // so we prefix "> " onto clean lines instead of onto leftover tags.

  // <goa-button …>label</goa-button> -> **label**. The button's onclick URL is
  // already surfaced via demoUrl / Links elsewhere on the record.
  s = s.replace(
    /<goa-button\b[^>]*>([\s\S]*?)<\/goa-button>/g,
    (_, label) => `**${label.trim()}**`,
  );

  // <a href> -> Markdown link. Source uses an MDX expression with withBase
  // (the URL can be backtick-, single-, or double-quoted inside the call) or a
  // plain string href. Done before goa-text unwrap so links inside <goa-text>
  // bodies survive.
  s = s.replace(
    /<a\s+href=\{withBase\(['"`]([^'"`]+)['"`]\)\}[^>]*>([\s\S]*?)<\/a>/g,
    (_, url, text) => `[${text.trim()}](${url})`,
  );
  s = s.replace(
    /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g,
    (_, url, text) => `[${text.trim()}](${url})`,
  );

  // Layout/inline goa-* wrappers we haven't handled yet. <goa-table> wraps an
  // HTML <table>, <goa-container> is a styled box: both unwrap to inner.
  // <goa-badge> is a small inline label with its text in a `content` attribute.
  s = applyUntilStable(s, (t) =>
    t.replace(/<goa-table\b[^>]*>([\s\S]*?)<\/goa-table>/g, "$1"),
  );
  s = applyUntilStable(s, (t) =>
    t.replace(/<goa-container\b[^>]*>([\s\S]*?)<\/goa-container>/g, "$1"),
  );
  s = s.replace(
    /<goa-badge\b[^>]*?\bcontent="([^"]+)"[^>]*?\/?>(?:<\/goa-badge>)?/g,
    (_, content) => ` *${content}*`,
  );

  // <goa-text>: the site authors headings with this tag, so route by attribute
  // (heading -> Markdown heading, body size -> prose) instead of flattening all
  // of them to prose. Trim each line so accidental HTML-source indentation (the
  // bodies are often multi-line and indented) doesn't survive into the Markdown.
  s = applyUntilStable(s, (t) =>
    t.replace(/<goa-text\b([^>]*)>([\s\S]*?)<\/goa-text>/g, (_, attrs, c) =>
      goaText(attrs, trimLines(c)),
    ),
  );
  s = applyUntilStable(s, (t) =>
    t.replace(/<goa-link\b[^>]*>([\s\S]*?)<\/goa-link>/g, (_, c) => trimLines(c)),
  );

  // Headings: <h2|h3|h4|h5|h6 ...>Title</hN> -> "##.. Title"
  s = s.replace(/<h([2-6])\b[^>]*>([\s\S]*?)<\/h\1>/g, (_, level, content) => {
    return "#".repeat(Number(level)) + " " + content.trim();
  });

  // <br> / <br/> / <br /> -> newline.
  s = s.replace(/<br\s*\/?>/gi, "\n");

  // Inline formatting. (Inline <code> is masked up top with the other code.)
  s = s.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/g, "**$1**");
  s = s.replace(/<em\b[^>]*>([\s\S]*?)<\/em>/g, "*$1*");

  // HTML tables -> Markdown tables. Cells get any remaining raw tags stripped
  // defensively; pipes and newlines inside cells are escaped/normalised.
  s = s.replace(/<table\b[^>]*>([\s\S]*?)<\/table>/g, (_, t) => htmlTableToMd(t));

  // <ul>/<ol>/<li> -> Markdown bullets. Unwrap list wrappers first, then
  // convert <li> items iteratively: nested <li> matches the inner pair first,
  // then the outer becomes innermost on the next pass. Both list types render
  // as bullets (ordered semantics are rare here and an AI consumer reads
  // either correctly).
  s = applyUntilStable(s, (t) => t.replace(/<ul\b[^>]*>([\s\S]*?)<\/ul>/g, "$1"));
  s = applyUntilStable(s, (t) => t.replace(/<ol\b[^>]*>([\s\S]*?)<\/ol>/g, "$1"));
  s = applyUntilStable(s, (t) =>
    t.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/g, (_, item) => "- " + item.trim() + "\n"),
  );

  // <p> -> content + blank line; <span> -> inner content.
  s = applyUntilStable(s, (t) =>
    t.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/g, (_, c) => stripLeadingPerLine(c) + "\n"),
  );
  s = applyUntilStable(s, (t) => t.replace(/<span\b[^>]*>([\s\S]*?)<\/span>/g, "$1"));

  // <div>: drop empty/whitespace-only shells (layout chrome with no content),
  // then unwrap the rest. The unwrap strips per-line leading whitespace from
  // the inner content: the wrapper was carrying layout meaning, and HTML-source
  // indentation inside it would otherwise survive as content. (4+ leading
  // spaces in Markdown is an indented code block, which is wrong intent here.)
  // Run repeatedly because removing inner divs can make outer divs empty.
  s = applyUntilStable(s, (t) => t.replace(/<div\b[^>]*>\s*<\/div>/g, ""));
  s = applyUntilStable(s, (t) =>
    t.replace(/<div\b[^>]*>([\s\S]*?)<\/div>/g, (_, c) => stripLeadingPerLine(c)),
  );

  // <goa-callout heading="X">...</goa-callout> -> blockquote. Runs here, late,
  // so the inner content is already Markdown and we prefix "> " onto clean lines
  // (running it early doubled "> >" once goa-text later unwrapped). The heading
  // attribute becomes a bold first line. Trailing blank line stops prose after
  // the callout being pulled in by CommonMark lazy continuation.
  s = applyUntilStable(s, (t) =>
    t.replace(
      /<goa-callout\b([^>]*)>([\s\S]*?)<\/goa-callout>/g,
      (_, attrs, content) => {
        const heading = attrs.match(/\bheading="([^"]+)"/);
        const lines = content
          .trim()
          .split("\n")
          .map((l: string) => l.trim());
        if (heading) lines.unshift(`**${heading[1]}**`, "");
        const quoted = lines.map((l: string) => (l ? `> ${l}` : ">")).join("\n");
        return "\n\n" + quoted + "\n\n";
      },
    ),
  );

  s = decodeEntities(s);

  // Normalise: blank out whitespace-only lines, collapse internal runs of 2+
  // spaces to one (e.g. the stray space a goa-badge leaves), and collapse runs
  // of blank lines. The space-collapse requires a non-space on both sides, so it
  // leaves leading indentation (list nesting) and trailing hard breaks alone,
  // and code is still masked at this point so it is untouched.
  s = s
    .replace(/^[ \t]+$/gm, "")
    .replace(/(\S) {2,}(?=\S)/g, "$1 ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Restore masked code regions verbatim, after all transforms have run.
  const restore = new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, "g");
  return s.replace(restore, (_, i) => codeBlocks[Number(i)]);
}

// Run a transform until it reaches a fixed point or hits the iteration cap.
// Used for paired tags so nested same-tag pairs unwrap layer by layer.
function applyUntilStable(s: string, fn: (s: string) => string, max = 10): string {
  for (let i = 0; i < max; i++) {
    const next = fn(s);
    if (next === s) return s;
    s = next;
  }
  return s;
}

// Named entities the source actually uses, plus the common typographic ones.
// `amp` is deliberately absent here so it can be decoded last (below), which
// stops a literal "&amp;ndash;" from collapsing into "–".
const NAMED_ENTITIES: Record<string, string> = {
  apos: "'",
  quot: '"',
  lt: "<",
  gt: ">",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  nbsp: " ",
  copy: "©",
  reg: "®",
  trade: "™",
  deg: "°",
  times: "×",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
};

function decodeEntities(s: string): string {
  // Named entities (unknown ones are left untouched, not mangled).
  s = s.replace(/&([a-z]+);/gi, (m, name) => {
    const key = name.toLowerCase();
    return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, key)
      ? NAMED_ENTITIES[key]
      : m;
  });
  // Numeric: decimal &#NN; and hex &#xHH;.
  s = s.replace(/&#(\d+);/g, (_, n) => safeCodePoint(Number(n)));
  s = s.replace(/&#x([0-9a-f]+);/gi, (_, h) => safeCodePoint(parseInt(h, 16)));
  // &amp; last, so it doesn't enable a second decode pass on its neighbours.
  return s.replace(/&amp;/g, "&");
}

function safeCodePoint(cp: number): string {
  try {
    return String.fromCodePoint(cp);
  } catch {
    return "";
  }
}

// Trim leading/trailing whitespace on each line and on the whole string.
function trimLines(s: string): string {
  return s
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .trim();
}

// Render a <goa-text> element. The site authors headings with goa-text, so an
// explicit `as="hN"` wins; otherwise the size maps by role. heading-m sits at
// h2 (it is always authored with as="h2"); the smaller heading-s/heading-xs are
// h3 sub-headings (they never co-occur, so no level is lost, and the source
// nests real h4s beneath heading-xs). heading-xl is the page title in hero
// styling and is dropped, because the file's H1 already carries the title.
// Body sizes and anything unrecognised unwrap to plain prose.
function goaText(attrs: string, content: string): string {
  const level = goaTextHeadingLevel(attrs);
  if (level === null) return content; // body / non-heading -> prose
  if (level === 0) return ""; // heading-xl page title -> dropped
  return `\n\n${"#".repeat(level)} ${content.trim()}\n\n`;
}

function goaTextHeadingLevel(attrs: string): number | null {
  const asMatch = attrs.match(/\bas="h([1-6])"/);
  if (asMatch) return Number(asMatch[1]);
  const sizeMatch = attrs.match(/\bsize="(heading-[a-z]+)"/);
  if (!sizeMatch) return null;
  switch (sizeMatch[1]) {
    case "heading-xl":
      return 0; // page title; dropped (frontmatter H1 carries it)
    case "heading-l":
    case "heading-m":
      return 2;
    default:
      return 3; // heading-s, heading-xs, any future smaller heading size
  }
}

// Strip per-line leading whitespace, preserving line breaks and trailing
// content. Used when unwrapping layout containers whose HTML-source indentation
// shouldn't survive as content.
function stripLeadingPerLine(s: string): string {
  return s.split("\n").map((l) => l.replace(/^[ \t]+/, "")).join("\n");
}

// Convert an HTML <table> body (already stripped of the outer <table> tag) into
// a Markdown table. Detects the header row by whether the first <tr> uses <th>;
// strips any remaining HTML inside cells defensively so a stray inline tag
// can't shred the table layout.
function htmlTableToMd(content: string): string {
  const trMatches = [...content.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)];
  if (!trMatches.length) return "";
  const rowOf = (tr: string) =>
    [...tr.matchAll(/<t[hd]\b[^>]*>([\s\S]*?)<\/t[hd]>/g)].map((m) =>
      applyUntilStable(m[1], (t) => t.replace(/<[^>]+>/g, ""))
        .replace(/\\/g, "\\\\")
        .replace(/\|/g, "\\|")
        .replace(/\s+/g, " ")
        .trim(),
    );
  const rows = trMatches.map((m) => rowOf(m[1]));
  if (!rows.length || !rows[0].length) return "";

  const firstRowIsHeader = /<th\b/i.test(trMatches[0][1]);
  const cols = rows[0].length;
  const header = firstRowIsHeader ? rows[0] : new Array(cols).fill(" ");
  const body = firstRowIsHeader ? rows.slice(1) : rows;

  const lines = [
    "| " + header.join(" | ") + " |",
    "| " + header.map(() => "---").join(" | ") + " |",
    ...body.map((r) => "| " + r.join(" | ") + " |"),
  ];
  return "\n" + lines.join("\n") + "\n";
}

// --- Index -------------------------------------------------------------------

function renderIndex(
  target: FrameworkTarget,
  components: ComponentRecord[],
  foundations: FoundationRecord[],
  examples: ExampleRecord[],
  getStarted: GetStartedRecord[],
  productTypes: ProductTypeRecord[],
  stats: { files: number; chars: number },
): string {
  const out: string[] = [];
  out.push(`# GoA Design System knowledge bundle (${target.label})`);
  out.push(
    "This bundle gives an AI tool the knowledge to build interfaces with the Government of Alberta Design System without an MCP connection. It is generated from the design system's documentation source, so it stays in step with the components themselves.",
  );
  out.push(
    `This is the **${target.label}** set: component properties and example code are ${target.label}-specific. Sets for the other frameworks exist alongside this one.`,
  );
  out.push(sizeNote(stats.files, stats.chars));
  out.push(
    "## Advisory, not prescriptive\n\nThe design system provides strong defaults and guidance, not rigid rules. Treat the usage guidelines as \"consider this,\" and expect teams to mix design system components with their own where a service needs it.",
  );
  out.push(
    "## How to use this bundle\n\n" +
      "- Building with a component? Open its file in `components/`. It carries the properties, usage and accessibility guidance, and links to relevant examples.\n" +
      "- Want a worked pattern? Open the linked file in `examples/`. It includes runnable source.\n" +
      "- Need cross-cutting principles (accessibility, responsiveness, anti-patterns)? See `foundations/`.\n" +
      "- Setting up or migrating? See `get-started/`. For product-level patterns, see `product-types/`.",
  );

  // Components grouped by category
  const byCategory = new Map<string, ComponentRecord[]>();
  for (const c of components) {
    const list = byCategory.get(c.category) ?? [];
    list.push(c);
    byCategory.set(c.category, list);
  }
  const catBlocks: string[] = [];
  for (const category of [...byCategory.keys()].sort()) {
    const items = byCategory
      .get(category)!
      .sort((a, b) => cmp(a.name, b.name))
      .map((c) => {
        const marks: string[] = [];
        if (c.subcomponent) marks.push("subcomponent");
        if (c.status === "deprecated") marks.push("deprecated");
        const tag = marks.length ? ` (${marks.join(", ")})` : "";
        const desc = c.description ? ` — ${c.description}` : "";
        return `- [${c.name}](components/${filename(c.id)})${tag}${desc}`;
      });
    catBlocks.push(`### ${titleCase(category)}\n\n${items.join("\n")}`);
  }
  out.push(`## Components (${components.length})`, catBlocks.join("\n\n"));

  const foundationItems = foundations
    .map((f) => `- [${f.title}](foundations/${filename(f.id)})`)
    .join("\n");
  out.push(`## Foundations`, foundationItems);

  if (getStarted.length) {
    // Group by section, preserve declared order within section.
    const bySection = new Map<string, GetStartedRecord[]>();
    for (const g of getStarted) {
      const list = bySection.get(g.section) ?? [];
      list.push(g);
      bySection.set(g.section, list);
    }
    const sectionBlocks: string[] = [];
    for (const section of [...bySection.keys()].sort()) {
      const items = bySection
        .get(section)!
        .sort((a, b) => a.order - b.order || cmp(a.id, b.id))
        .map((g) => `- [${g.title}](get-started/${filename(g.id)})`);
      sectionBlocks.push(`### ${titleCase(section)}\n\n${items.join("\n")}`);
    }
    out.push(`## Get started (${getStarted.length})`, sectionBlocks.join("\n\n"));
  }

  if (productTypes.length) {
    const items = productTypes.map((pt) => {
      const summary = pt.summary ? inline(mdxBodyProse(pt.summary)) : "";
      return `- [${pt.title}](product-types/${filename(pt.id)})${summary ? ` — ${summary}` : ""}`;
    });
    out.push(`## Product types (${productTypes.length})`, items.join("\n"));
  }

  out.push(
    `## Examples (${examples.length})`,
    "Worked patterns live in `examples/`, each linked from the components it uses.",
  );

  return out.join("\n\n");
}

// --- Helpers -----------------------------------------------------------------

// Code-unit string comparison. Deterministic across Node/ICU versions so the
// freshness check that depends on byte-identical reruns doesn't have to absorb
// a locale-collation wobble.
function cmp(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

// Flatten nested ids (e.g. "designers/x") into a filesystem-safe filename, the
// same way mcp-json does. The canonical id lives in the file's frontmatter.
function filename(id: string): string {
  return id.replace(/\//g, "__") + ".md";
}

function writeFile(file: string, content: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content.trimEnd() + "\n", "utf8");
}

// Render an API item array (props, events, or slots) as a Markdown table.
function apiTable(items: ApiItem[], withDefault: boolean): string {
  const header = withDefault
    ? "| Name | Type | Default | Description |\n| --- | --- | --- | --- |"
    : "| Name | Type | Description |\n| --- | --- | --- |";
  const rows = items.map((it) => {
    const name = it.required ? `\`${it.name}\` (required)` : `\`${it.name}\``;
    const type = it.type ? `\`${cell(it.type)}\`` : "";
    const desc = cell(it.description ?? "");
    if (!withDefault) return `| ${name} | ${type} | ${desc} |`;
    const def =
      it.default === null || it.default === undefined || it.default === ""
        ? ""
        : `\`${cell(String(it.default))}\``;
    return `| ${name} | ${type} | ${def} | ${desc} |`;
  });
  return [header, ...rows].join("\n");
}

// Make a string safe inside a Markdown table cell: no newlines, escape
// backslashes (first, so they can't break the pipe escape) and pipes.
export function cell(s: string): string {
  return s.replace(/\r?\n/g, " ").replace(/\\/g, "\\\\").replace(/\|/g, "\\|").trim();
}

// Collapse a guidance description to a single line (it renders in a bullet).
function inline(s: string): string {
  return s.replace(/\r?\n/g, " ").trim();
}

// One-line size note for a set's index, so a consumer can weigh the context cost
// before loading. Tokens are a rough chars/4 estimate; the thousands separator
// is applied by hand to stay deterministic across locales and ICU versions.
export function sizeNote(files: number, chars: number): string {
  const tokens = Math.round(chars / 4);
  const grouped = tokens.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `This set is ${files} files, roughly ${grouped} tokens. Load the index plus the files you need, not the whole set.`;
}

function titleCase(slug: string): string {
  return slug
    .split(/[-\s]/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

// Minimal YAML frontmatter. Quotes string values only when needed; emits real
// booleans and numbers unquoted so they round-trip as the right type.
function frontmatter(pairs: [string, unknown][]): string {
  const lines = ["---"];
  for (const [key, value] of pairs) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.map((v) => yamlScalar(String(v))).join(", ")}]`);
    } else if (typeof value === "boolean" || typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${yamlScalar(String(value))}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

export function yamlScalar(s: string): string {
  // Quote when the value could be misread as YAML structure or type-coerced
  // to something that isn't a string. The numeric and keyword cases (e.g. tags
  // like 401 / true / no / null) would otherwise round-trip to a non-string,
  // and a leading indicator character (- @ ` * & ? ! % | >) would be read as a
  // sequence item, alias, tag, or block scalar rather than plain text.
  if (
    s === "" ||
    /[:#\[\]{},"']/.test(s) ||
    /^[-@`*&?!%|>]/.test(s) ||
    /^\s|\s$/.test(s) ||
    /^-?\d+(\.\d+)?$/.test(s) ||
    /^(true|false|yes|no|on|off|null|~)$/i.test(s)
  ) {
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return s;
}
