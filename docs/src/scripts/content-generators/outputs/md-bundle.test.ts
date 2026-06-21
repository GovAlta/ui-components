import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mdxBodyProse,
  renderComponent,
  renderExample,
  renderProductType,
  componentsForTarget,
  sizeNote,
  extractVariantLinks,
  cell,
  yamlScalar,
  type FrameworkTarget,
} from "./md-bundle";
import type {
  ComponentRecord,
  ExampleRecord,
  GuidanceRecord,
  ProductTypeRecord,
} from "../types";

const REACT_TARGET: FrameworkTarget = {
  id: "react",
  apiKey: "react",
  label: "React",
  slotsLabel: "ReactNode",
  frontmatterKey: "react",
  identifierKey: "reactClassName",
  sources: [{ file: "react.tsx", lang: "tsx" }],
  variantSourceAttr: "reactSourceUrl",
};

const WC_TARGET: FrameworkTarget = {
  id: "web-components",
  apiKey: "webComponents",
  label: "Web component",
  slotsLabel: "Slots",
  frontmatterKey: "webComponent",
  identifierKey: "webComponentTag",
  sources: [{ file: "web-components.html", lang: "html" }],
};

// Regression: the MDX cleanup pipeline must not strip content from inside code
// samples. Without care, <pre><code> blocks get fenced and then the ESM-import
// strip and capitalised-JSX strip run over the fenced text, gutting real code
// (e.g. a setup snippet collapsing to `render( , )`).

test("mdxBodyProse keeps imports and JSX inside a <pre><code> code sample", () => {
  const input = [
    "<pre><code>{`// main.tsx",
    'import { GoabThemeProvider } from "@abgov/react-components";',
    "render(",
    "  <GoabThemeProvider><App /></GoabThemeProvider>,",
    ");`}</code></pre>",
  ].join("\n");

  const out = mdxBodyProse(input);

  assert.match(out, /```/, "expected a fenced code block");
  assert.match(
    out,
    /import \{ GoabThemeProvider \} from "@abgov\/react-components";/,
    "import line was stripped from inside the code block",
  );
  assert.match(
    out,
    /<GoabThemeProvider><App \/><\/GoabThemeProvider>/,
    "JSX was stripped from inside the code block",
  );
});

// A code sample written as a raw Markdown fence (rather than <pre><code>) must
// survive the same way. The import strip and capitalised-JSX strip run over the
// body, so without masking they reach inside the fence and gut the sample.
test("mdxBodyProse keeps imports and JSX inside a raw Markdown code fence", () => {
  const input = [
    "Set it up like this:",
    "",
    "```jsx",
    'import { GoabIconButton } from "@abgov/react-components";',
    "",
    '<GoabIconButton icon="trash" ariaLabel="Delete item" />',
    "```",
    "",
    "Done.",
  ].join("\n");

  const out = mdxBodyProse(input);

  assert.match(
    out,
    /import \{ GoabIconButton \} from "@abgov\/react-components";/,
    "import line was stripped from inside the fenced block",
  );
  assert.match(
    out,
    /<GoabIconButton icon="trash" ariaLabel="Delete item" \/>/,
    "self-closing JSX was stripped from inside the fenced block",
  );
});

test("mdxBodyProse renders inline <code>{`...`}</code> as clean inline code", () => {
  const input = "Use <code>{`var(--goa-color-text)`}</code> for theme-aware values.";

  const out = mdxBodyProse(input);

  assert.match(out, /`var\(--goa-color-text\)`/, "expected clean inline code");
  assert.doesNotMatch(out, /\{`/, "raw MDX template-literal braces leaked");
});

// goa-text headings: the site authors headings with <goa-text>, sometimes with
// an explicit as="hN", sometimes only a size. They must not flatten to prose.
test("mdxBodyProse maps goa-text headings to Markdown levels", () => {
  assert.equal(
    mdxBodyProse('<goa-text as="h2" size="heading-m">Section</goa-text>').trim(),
    "## Section",
  );
  assert.equal(
    mdxBodyProse('<goa-text size="heading-xs">Sub label</goa-text>').trim(),
    "### Sub label",
    "heading-xs (no as=) should be a level-3 sub-heading",
  );
  assert.equal(
    mdxBodyProse('<goa-text as="h4">Deep</goa-text>').trim(),
    "#### Deep",
    "explicit as= is authoritative",
  );
});

test("mdxBodyProse drops the heading-xl page title (the H1 comes from frontmatter)", () => {
  assert.equal(
    mdxBodyProse('<goa-text size="heading-xl">Page Title</goa-text>').trim(),
    "",
  );
});

test("mdxBodyProse leaves body-size goa-text as prose, not a heading", () => {
  const out = mdxBodyProse('<goa-text size="body-m">Just prose.</goa-text>').trim();
  assert.equal(out, "Just prose.");
  assert.doesNotMatch(out, /^#/, "body text must not become a heading");
});

// Entities: decode named and numeric HTML entities, not just a handful, or the
// rest leak into prose as raw `&...;`.
test("mdxBodyProse decodes named and numeric HTML entities", () => {
  assert.equal(
    mdxBodyProse("False positives &ndash; a problem").trim(),
    "False positives – a problem",
  );
  assert.equal(mdxBodyProse("reach me at john&#64;example.com").trim(), "reach me at john@example.com");
  assert.equal(mdxBodyProse("more &mdash; detail &hellip; end").trim(), "more — detail … end");
  // &amp; still decoded, and not double-decoded
  assert.equal(mdxBodyProse("Tom &amp; Jerry").trim(), "Tom & Jerry");
});

// Callout: renders as a single clean blockquote carrying its heading, with no
// doubled "> >" markers and no leftover tags.
test("mdxBodyProse renders goa-callout as a clean blockquote with its heading", () => {
  const input =
    '<goa-callout type="important" heading="Heads up"><goa-text size="body-m">Be careful here.</goa-text></goa-callout>';
  const out = mdxBodyProse(input);
  assert.match(out, /> \*\*Heads up\*\*/, "callout heading should surface");
  assert.match(out, /> Be careful here\./, "callout body should be quoted");
  assert.doesNotMatch(out, /> >/, "no doubled blockquote markers");
  assert.doesNotMatch(out, /goa-text/, "no leftover tags");
});

// Badge: the inline badge must not leave a stray double space on the heading
// it trails.
test("mdxBodyProse collapses the stray double space a goa-badge leaves", () => {
  const out = mdxBodyProse(
    '<goa-text as="h3">Standard migration <goa-badge content="Recommended default"></goa-badge></goa-text>',
  ).trim();
  assert.equal(out, "### Standard migration *Recommended default*");
});

// Paragraphs: <p> content is left-aligned, not carried through with the
// HTML-source indentation it was authored with.
test("mdxBodyProse left-aligns <p> prose (no stray source indentation)", () => {
  const out = mdxBodyProse("<p>\n  Line one wraps\n  onto line two.\n</p>").trim();
  assert.doesNotMatch(out, /^[ \t]+\S/m, "paragraph lines must not stay indented");
  assert.match(out, /Line one wraps/);
});

// Examples cross-link to their related examples, closing the example-to-example
// loop the MCP carries.
test("renderExample links related examples for example-to-example navigation", () => {
  const ex: ExampleRecord = {
    id: "add-a-filter-chip",
    collection: "examples",
    title: "Add a filter chip",
    body: "",
    size: "interaction",
    tags: [],
    components: [],
    relatedExamples: ["filter-data-in-a-table"],
    aliases: [],
    status: "published",
  };
  const titles = new Map([["filter-data-in-a-table", "Filter data in a table"]]);
  const out = renderExample(ex, REACT_TARGET, new Map(), titles);
  assert.match(out, /## Related examples/);
  assert.match(out, /- \[Filter data in a table\]\(\.\/filter-data-in-a-table\.md\)/);
});

// The index states the set's size, so a consumer can weigh the context cost
// before loading.
test("sizeNote reports file count and an approximate token estimate", () => {
  const note = sizeNote(75, 240000);
  assert.match(note, /75 files/);
  assert.match(note, /60,000 tokens/);
});

// Web components has no source attribute, but the file exists next to
// react.tsx, so derive the WC link from reactSourceUrl (verified on disk).
const ERR_401 =
  "https://github.com/GovAlta/ui-components/blob/dev/docs/src/content/examples/error-pages/401/react.tsx";

test("extractVariantLinks derives WC variant URLs from reactSourceUrl", () => {
  const body = `## Restricted access (401)\n<PreviewContainer reactSourceUrl="${ERR_401}" />`;
  assert.deepEqual(extractVariantLinks(body, WC_TARGET), [
    "- Restricted access (401): " +
      "https://github.com/GovAlta/ui-components/blob/dev/docs/src/content/examples/error-pages/401/web-components.html",
  ]);
});

test("extractVariantLinks emits no WC link when the web-components source is absent", () => {
  const body =
    '## X\n<PreviewContainer reactSourceUrl="https://github.com/GovAlta/ui-components/blob/dev/docs/src/content/examples/nonexistent-xyz/react.tsx" />';
  assert.deepEqual(extractVariantLinks(body, WC_TARGET), []);
});

// Masking must survive code nested inside a capitalised-JSX wrapper. The JSX
// strip would otherwise delete the wrapper AND the placeholder inside it,
// losing the code (the same code-loss hazard, in a nested form).
test("mdxBodyProse preserves inline code masked inside a capitalised-JSX wrapper", () => {
  const out = mdxBodyProse("Wrap: <GoabButton>see <code>{`<App/>`}</code> here</GoabButton> done.");
  assert.match(out, /`<App\/>`/, "inline code in a capitalised wrapper must survive");
});

test("mdxBodyProse preserves a code block masked inside a capitalised-JSX wrapper", () => {
  const out = mdxBodyProse("<Tabs><pre><code>const x = 1;</code></pre></Tabs>");
  assert.match(out, /```[\s\S]*const x = 1;[\s\S]*```/, "fenced code in a wrapper must survive");
});

// Code scanning: escape the escape character first, so a backslash in the input
// can't break the table-cell or YAML-scalar escaping.
test("cell escapes backslashes before pipes", () => {
  assert.equal(cell("a\\b|c"), "a\\\\b\\|c");
});

test("yamlScalar escapes backslashes (valid double-quoted YAML)", () => {
  assert.equal(yamlScalar('a\\b"c'), '"a\\\\b\\"c"');
});

// A value whose first character is a YAML indicator (@, *, &, ?, !, %, |, >, `,
// or a leading "- ") must be quoted, or a parser reads it as an alias, tag,
// block scalar, or sequence item rather than plain text.
test("yamlScalar quotes values that begin with a YAML indicator character", () => {
  assert.equal(yamlScalar("@abgov/foo"), '"@abgov/foo"');
  assert.equal(yamlScalar("*bold"), '"*bold"');
  assert.equal(yamlScalar("- experimental"), '"- experimental"');
});

test("mdxBodyProse table cells escape backslashes and pipes", () => {
  const out = mdxBodyProse("<table><tr><th>H</th></tr><tr><td>a\\b|c</td></tr></table>");
  assert.match(out, /a\\\\b\\\|c/);
});

// --- renderComponent ---------------------------------------------------------

function componentFixture(overrides: Partial<ComponentRecord> = {}): ComponentRecord {
  return {
    id: "button",
    collection: "components",
    body: "",
    name: "Button",
    status: "published",
    category: "Actions",
    tags: [],
    aliases: [],
    relatedComponents: [],
    ...overrides,
  };
}

function guidanceFixture(
  overrides: Partial<GuidanceRecord> & { id: string },
): GuidanceRecord {
  return {
    collection: "guidance",
    body: "",
    type: "do",
    description: "",
    topic: "content",
    tags: [],
    relatedProps: [],
    status: "published",
    ...overrides,
  };
}

test("renderComponent renders props and events tables for the target framework", () => {
  const c = componentFixture({
    api: {
      frameworks: {
        react: {
          props: [
            {
              name: "type",
              type: "GoabButtonType",
              required: true,
              description: "Sets the button style.",
            },
          ],
          events: [
            { name: "onClick", type: "(e: Event) => void", description: "Fires on click." },
          ],
        },
      },
    },
  });
  const out = renderComponent(c, REACT_TARGET, new Map(), [], new Map());
  assert.match(out, /## Properties/);
  assert.match(
    out,
    /\| `type` \(required\) \| `GoabButtonType` \|.*\| Sets the button style\. \|/,
    "required prop should render in the props table with backticked name and type",
  );
  assert.match(out, /### Events/);
  assert.match(out, /\| `onClick` \|/, "event should render as a table row");
  assert.match(out, /Fires on click\./);
});

test("renderComponent splits guidance into usage and accessibility by topic", () => {
  const guidanceById = new Map<string, GuidanceRecord>([
    [
      "g-usage",
      guidanceFixture({ id: "g-usage", type: "do", description: "Use a clear, action-led label.", topic: "content" }),
    ],
    [
      "g-a11y",
      guidanceFixture({ id: "g-a11y", type: "dont", description: "Don't rely on colour alone.", topic: "screen-readers" }),
    ],
  ]);
  const c = componentFixture({ relatedGuidance: ["g-usage", "g-a11y"] });
  const out = renderComponent(c, REACT_TARGET, guidanceById, [], new Map());

  assert.match(out, /## Usage guidelines/);
  assert.match(out, /## Accessibility/);
  const [beforeA11y, afterA11y] = out.split("## Accessibility");
  assert.match(beforeA11y, /Use a clear, action-led label\./, "usage guidance belongs above Accessibility");
  assert.match(afterA11y, /Don't rely on colour alone\./, "screen-reader guidance belongs under Accessibility");
  assert.doesNotMatch(beforeA11y, /Don't rely on colour alone\./, "a11y guidance must not leak into usage");
});

test("renderComponent shows a deprecation banner pointing to related components", () => {
  const c = componentFixture({ status: "deprecated", relatedComponents: ["new-thing"] });
  const out = renderComponent(c, REACT_TARGET, new Map(), [], new Map([["new-thing", "New Thing"]]));
  assert.match(
    out,
    /> \*\*Deprecated\.\*\* This component is no longer recommended for new work\. See Related components for current options\./,
  );
});

test("renderProductType omits a summary that renders to empty", () => {
  // Guard parity with the body and foundation paths: a summary that is non-empty
  // as input but strips to "" once rendered must not be pushed as a blank block.
  const base: ProductTypeRecord = {
    id: "pt",
    collection: "productTypes",
    body: "Real body.",
    title: "PT",
    summary: "",
    tags: [],
    components: [],
    status: "stable",
  };
  const names = new Map<string, string>();
  // "<Foo />" is a capitalised JSX component the prose pipeline strips to "".
  const noSummary = renderProductType(base, names);
  const emptyRenderedSummary = renderProductType({ ...base, summary: "<Foo />" }, names);
  assert.equal(
    emptyRenderedSummary,
    noSummary,
    "a summary that renders empty should be omitted, matching an absent summary",
  );
});

test("renderComponent labels the content-insertion section per framework", () => {
  const c = componentFixture({
    api: {
      frameworks: {
        react: { slots: [{ name: "content", type: "ReactNode", description: "Body." }] },
        webComponents: { slots: [{ name: "content", type: "", description: "Body." }] },
      },
    },
  });
  // React calls it ReactNode (not "Slots", which would push an AI toward a slot attribute).
  const reactOut = renderComponent(c, REACT_TARGET, new Map(), [], new Map());
  assert.match(reactOut, /### ReactNode/, "React content section should be ReactNode");
  assert.doesNotMatch(reactOut, /### Slots/, "React must not use the Slots heading");
  // Web components keep the native Slots wording.
  const wcOut = renderComponent(c, WC_TARGET, new Map(), [], new Map());
  assert.match(wcOut, /### Slots/, "Web components keep Slots");
});

test("componentsForTarget drops web-component-only components from non-web-component frameworks", () => {
  const all = [
    componentFixture({ id: "button", name: "Button" }),
    componentFixture({ id: "focus-trap", name: "Focus Trap" }),
    componentFixture({ id: "scrollable", name: "Scrollable" }),
  ];
  assert.deepEqual(
    componentsForTarget(all, REACT_TARGET).map((c) => c.id),
    ["button"],
    "React drops focus-trap and scrollable",
  );
  assert.deepEqual(
    componentsForTarget(all, WC_TARGET)
      .map((c) => c.id)
      .sort(),
    ["button", "focus-trap", "scrollable"],
    "Web components keep the full set",
  );
});
