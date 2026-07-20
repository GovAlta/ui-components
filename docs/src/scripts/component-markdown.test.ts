/**
 * Tests for buildComponentMarkdown()
 *
 * The function has no Astro runtime dependencies (CollectionEntry is a type-
 * only import, erased by tsx), so it runs in plain Node without an Astro server.
 *
 * Run with: npm test (from docs/)
 * Or directly: npx tsx --test 'src/scripts/component-markdown.test.ts'
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildComponentMarkdown } from "../lib/component-markdown.js";
import type { ComponentMarkdownInput } from "../lib/component-markdown.js";
import type { ComponentApi } from "../lib/content-queries.js";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

/** Minimal CollectionEntry<"components"> shape the function actually reads. */
function componentEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: "button",
    data: {
      name: "Button",
      description: "Carry out an important action or navigate to another page.",
      status: "stable",
      category: "inputs-and-actions",
      relatedComponents: [],
      ...overrides,
    },
  } as ComponentMarkdownInput["component"];
}

/** Minimal ComponentApi using the real button.json shape (subset). */
const buttonApi: ComponentApi = {
  componentSlug: "button",
  extractedFrom: "libs/web-components/src/components/button/Button.svelte",
  frameworks: {
    react: {
      props: [
        {
          name: "type",
          type: "GoabButtonType",
          required: false,
          default: "primary",
          description:
            'Sets the visual style of the button. Use "primary" for main actions.',
        },
        {
          name: "disabled",
          type: "boolean",
          required: false,
          default: null,
          description: "When true, prevents user interaction.",
        },
      ],
      events: [
        {
          name: "onClick",
          type: "() => void",
          description: "Callback fired when the button is clicked.",
          frameworks: ["react"],
        },
      ],
      slots: [],
    },
    angular: {
      props: [
        {
          name: "type",
          type: "GoabButtonType",
          required: false,
          default: "primary",
          description: "Sets the visual style of the button.",
        },
      ],
      events: [
        {
          name: "onClick",
          type: "() => void",
          description: "Emits when the button is clicked.",
          frameworks: ["angular"],
        },
      ],
      slots: [],
    },
    webComponents: {
      props: [
        {
          name: "type",
          type: '"primary" | "secondary" | "tertiary" | "start" | "text"',
          typeLabel: "GoabButtonType",
          values: ["primary", "secondary", "tertiary", "start", "text"],
          required: false,
          default: "primary",
          description: "Sets the visual style of the button.",
        },
        {
          name: "version",
          type: '"1" | "2"',
          required: false,
          default: "1",
          description: "Design system version for styling.",
        },
      ],
      events: [
        {
          name: "_click",
          type: "CustomEvent",
          description: "",
          frameworks: ["webComponents"],
        },
      ],
      slots: [],
    },
  },
};

function baseInput(overrides: Partial<ComponentMarkdownInput> = {}): ComponentMarkdownInput {
  return {
    slug: "button",
    component: componentEntry(),
    api: buttonApi,
    usageGuidance: {},
    accessibilityGuidance: {},
    componentExamples: [],
    relatedComponents: [],
    ...overrides,
  };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

test("output starts with the component name as an H1", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /^# Button/);
});

test("output includes the component description", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /Carry out an important action or navigate to another page\./);
});

test("output includes a status/category/docs metadata line", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /\*\*Status:\*\* stable/);
  assert.match(out, /\*\*Category:\*\* Inputs And Actions/);
  assert.match(out, /https:\/\/design\.alberta\.ca\/components\/button/);
});

test("output has H2 sections for all three frameworks", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /^## React$/m);
  assert.match(out, /^## Angular$/m);
  assert.match(out, /^## Web Components$/m);
});

test("web components section includes the goa- tag", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /Tag: `goa-button`/);
});

test("props tables contain prop names and types", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /\| `type` \|/);
  assert.match(out, /GoabButtonType/);
  assert.match(out, /\| `disabled` \|/);
});

test("props table shows the default value when present", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.match(out, /`primary`/);
});

test("props table shows (none) when default is null", () => {
  const out = buildComponentMarkdown(baseInput());
  // disabled has default: null — should render as (none)
  assert.match(out, /\| `disabled` \| boolean \| \(none\) \|/);
});

test("events section appears under each framework", () => {
  const out = buildComponentMarkdown(baseInput());
  const reactIdx = out.indexOf("## React");
  const angularIdx = out.indexOf("## Angular");
  const wcIdx = out.indexOf("## Web Components");

  const reactSection = out.slice(reactIdx, angularIdx);
  const wcSection = out.slice(wcIdx);

  assert.match(reactSection, /### Events/);
  assert.match(reactSection, /`onClick`/);
  assert.match(wcSection, /`_click`/);
  // _click has empty description — should render (none) not an empty cell
  assert.match(wcSection, /`_click`.*\(none\)/);
});

test("usage guidance section appears when guidance is provided", () => {
  const out = buildComponentMarkdown(
    baseInput({
      usageGuidance: {
        types: [
          {
            id: "g1",
            data: {
              id: "g1",
              type: "do",
              description: "Use a button for important actions.",
              topic: "types",
              status: "published",
            },
          } as ComponentMarkdownInput["usageGuidance"][string][number],
        ],
      },
    }),
  );
  assert.match(out, /## Usage guidance/);
  assert.match(out, /\[Do\]\*\* Use a button for important actions\./)
});

test("accessibility guidance section appears when guidance is provided", () => {
  const out = buildComponentMarkdown(
    baseInput({
      accessibilityGuidance: {
        keyboard: [
          {
            id: "a1",
            data: {
              id: "a1",
              type: "dont",
              description: "Don't trap keyboard focus.",
              topic: "keyboard",
              status: "published",
            },
          } as ComponentMarkdownInput["accessibilityGuidance"][string][number],
        ],
      },
    }),
  );
  assert.match(out, /## Accessibility guidance/);
  assert.match(out, /\[Don't\]\*\* Don't trap keyboard focus\./)
});

test("examples section lists examples with links", () => {
  const out = buildComponentMarkdown(
    baseInput({
      componentExamples: [
        {
          id: "button-with-icon",
          data: {
            id: "button-with-icon",
            title: "Button with Icon",
            size: "interaction",
            components: ["button"],
            status: "published",
          },
        } as ComponentMarkdownInput["componentExamples"][number],
      ],
    }),
  );
  assert.match(out, /## Examples/);
  assert.match(out, /\[Button with Icon\]\(\/examples\/button-with-icon\)/);
});

test("related components section lists with links", () => {
  const out = buildComponentMarkdown(
    baseInput({
      relatedComponents: [
        {
          id: "button-group",
          data: {
            name: "Button Group",
            description: "Groups related buttons.",
            status: "stable",
            category: "inputs-and-actions",
          },
        } as ComponentMarkdownInput["relatedComponents"][number],
      ],
    }),
  );
  assert.match(out, /## Related components/);
  assert.match(out, /\[Button Group\]\(\/components\/button-group\)/);
  assert.match(out, /Groups related buttons\./);
});

test("no raw HTML or goa-* elements appear in the output", () => {
  const out = buildComponentMarkdown(baseInput());
  assert.doesNotMatch(out, /<[a-z]/i, "found raw HTML or web component tags in output");
});

test("gracefully handles null api", () => {
  const out = buildComponentMarkdown(baseInput({ api: null }));
  assert.match(out, /# Button/);
  assert.match(out, /API data not available/);
  assert.doesNotMatch(out, /## React/);
});

test("pipe characters in union types are escaped so table columns don't break", () => {
  const apiWithUnion: ComponentApi = {
    ...buttonApi,
    frameworks: {
      ...buttonApi.frameworks,
      webComponents: {
        ...buttonApi.frameworks.webComponents,
        props: [
          {
            name: "type",
            type: '"primary" | "secondary" | "tertiary"',
            required: false,
            default: "primary",
            description: "Sets the visual style.",
          },
        ],
      },
    },
  };
  const out = buildComponentMarkdown(baseInput({ api: apiWithUnion }));
  // Each row must have exactly 5 pipe-delimited columns (name|type|default|required|desc)
  // An unescaped union like "primary" | "secondary" would create extra columns.
  const wcSection = out.slice(out.indexOf("## Web Components"));
  const tableRows = wcSection
    .split("\n")
    .filter((l) => l.startsWith("| `type`"));
  assert.equal(tableRows.length, 1, "should find exactly one type row");
  const columns = tableRows[0].split(/(?<!\\)\|/).filter((c) => c.trim() !== "");
  assert.equal(columns.length, 5, "type row should have exactly 5 columns (name, type, default, required, desc)");
  assert.match(tableRows[0], /\\|/, "pipe in union type should be escaped with backslash");
});

test("version attribute is filtered out of the Web Components table", () => {
  const out = buildComponentMarkdown(baseInput());
  const wcSection = out.slice(out.indexOf("## Web Components"));
  const angularIdx = out.indexOf("## Angular");
  const wcOnlySection = wcSection.slice(0, wcSection.indexOf("---") || wcSection.length);
  assert.doesNotMatch(wcOnlySection, /\| `version` \|/, "version attr should not appear in WC Attributes table");
});

test("guidance prefixes are ASCII-safe (no emoji)", () => {
  const out = buildComponentMarkdown(
    baseInput({
      usageGuidance: {
        types: [
          {
            id: "g1",
            data: { id: "g1", type: "do", description: "Use buttons for actions.", topic: "types", status: "published" },
          } as ComponentMarkdownInput["usageGuidance"][string][number],
          {
            id: "g2",
            data: { id: "g2", type: "dont", description: "Don't overuse.", topic: "types", status: "published" },
          } as ComponentMarkdownInput["usageGuidance"][string][number],
          {
            id: "g3",
            data: { id: "g3", type: "tip", description: "Use descriptive labels.", topic: "types", status: "published" },
          } as ComponentMarkdownInput["usageGuidance"][string][number],
        ],
      },
    }),
  );
  // Must contain ASCII bracket prefixes
  assert.match(out, /\[Do\]/);
  assert.match(out, /\[Don't\]/);
  assert.match(out, /\[Tip\]/);
  // Must not contain any character above U+007F
  assert.doesNotMatch(out, /[^\x00-\x7F]/, "output must be pure ASCII");
});


test("deprecated props are flagged in the table", () => {
  const apiWithDeprecated: ComponentApi = {
    ...buttonApi,
    frameworks: {
      ...buttonApi.frameworks,
      react: {
        ...buttonApi.frameworks.react,
        props: [
          ...buttonApi.frameworks.react.props,
          {
            name: "oldProp",
            type: "string",
            required: false,
            default: null,
            description: "An old prop.",
            deprecated: true,
          },
        ],
      },
    },
  };
  const out = buildComponentMarkdown(baseInput({ api: apiWithDeprecated }));
  assert.match(out, /\*\(deprecated\)\*/);
});
