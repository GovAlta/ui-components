/**
 * Builds clean Markdown for a component page.
 * Used by the /components/[slug].md endpoint so AI agents get structured
 * text instead of rendered HTML with custom elements.
 */
import type { CollectionEntry } from "astro:content";
import type {
  ComponentApi,
  PropDefinition,
  EventDefinition,
  SlotDefinition,
  FrameworkApiData,
} from "./content-queries";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ComponentMarkdownInput {
  slug: string;
  component: CollectionEntry<"components">;
  api: ComponentApi | null;
  usageGuidance: Record<string, CollectionEntry<"guidance">[]>;
  accessibilityGuidance: Record<string, CollectionEntry<"guidance">[]>;
  componentExamples: CollectionEntry<"examples">[];
  relatedComponents: CollectionEntry<"components">[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCategory(category: string): string {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Escape pipe characters so they don't break Markdown table column alignment. */
function cell(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
}

/** Truncate a type string to a readable length for table cells, then escape. */
function formatType(type: string, maxLen = 80): string {
  if (!type) return "";
  const truncated = type.length > maxLen ? type.slice(0, maxLen - 1) + "…" : type;
  return cell(truncated);
}

function propsTable(props: PropDefinition[]): string {
  if (props.length === 0) return "_No props._\n";

  const rows = props.map((p) => {
    const name = `\`${cell(p.name)}\``;
    const type = formatType(p.type);
    const def = p.default !== null && p.default !== "" ? `\`${cell(p.default)}\`` : "(none)";
    const req = p.required ? "Yes" : "No";
    const desc = [cell(p.description ?? ""), p.deprecated ? "*(deprecated)*" : ""]
      .filter(Boolean)
      .join(" ") || "(none)";
    return `| ${name} | ${type} | ${def} | ${req} | ${desc} |`;
  });

  return [
    "| Prop | Type | Default | Required | Description |",
    "|------|------|---------|----------|-------------|",
    ...rows,
  ].join("\n");
}

function eventsSection(events: EventDefinition[]): string {
  if (events.length === 0) return "";

  const rows = events.map(
    (e) => `| \`${cell(e.name)}\` | ${cell(e.type) || "(none)"} | ${cell(e.description ?? "") || "(none)"} |`,
  );

  return [
    "### Events",
    "",
    "| Event | Type | Description |",
    "|-------|------|-------------|",
    ...rows,
  ].join("\n");
}

function slotsSection(slots: SlotDefinition[]): string {
  if (slots.length === 0) return "";

  const rows = slots.map((s) => {
    const name = s.name || "(default)";
    const req = s.required ? "Yes" : "No";
    return `| \`${cell(name)}\` | ${req} | ${cell(s.description ?? "") || "(none)"} |`;
  });

  return [
    "### Slots",
    "",
    "| Slot | Required | Description |",
    "|------|----------|-------------|",
    ...rows,
  ].join("\n");
}

function frameworkSection(
  heading: string,
  tag: string | null,
  data: FrameworkApiData,
  propLabel = "Props",
): string {
  const parts: string[] = [`## ${heading}`, ""];

  if (tag) {
    parts.push(`Tag: \`${tag}\``, "");
  }

  parts.push(`### ${propLabel}`, "", propsTable(data.props), "");

  const ev = eventsSection(data.events);
  if (ev) parts.push(ev, "");

  const sl = slotsSection(data.slots);
  if (sl) parts.push(sl, "");

  return parts.join("\n");
}

const GUIDANCE_PREFIX: Record<string, string> = {
  do: "[Do]",
  dont: "[Don't]",
  tip: "[Tip]",
  warning: "[Warning]",
  info: "[Note]",
};

function guidanceSection(
  heading: string,
  grouped: Record<string, CollectionEntry<"guidance">[]>,
): string {
  if (Object.keys(grouped).length === 0) return "";

  const lines: string[] = [`## ${heading}`, ""];

  for (const [topic, items] of Object.entries(grouped)) {
    const topicLabel = topic
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    lines.push(`### ${topicLabel}`, "");

    for (const item of items) {
      const prefix = GUIDANCE_PREFIX[item.data.type] ?? "[Note]";
      lines.push(`- **${prefix}** ${item.data.description}`);
    }

    lines.push("");
  }

  return lines.join("\n");
}

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildComponentMarkdown(input: ComponentMarkdownInput): string {
  const { slug, component, api, usageGuidance, accessibilityGuidance, componentExamples, relatedComponents } = input;
  const { data } = component;

  const parts: string[] = [
    `# ${data.name}`,
    "",
  ];

  if (data.description) {
    parts.push(data.description, "");
  }

  parts.push(
    `**Status:** ${data.status} | **Category:** ${formatCategory(data.category)} | **Docs:** https://design.alberta.ca/components/${slug}`,
    "",
    "---",
    "",
  );

  if (!api) {
    parts.push("_API data not available for this component._", "");
  } else {
    const wcTag = `goa-${slug}`;

    parts.push(
      frameworkSection("React", null, api.frameworks.react),
      "---",
      "",
      frameworkSection("Angular", null, api.frameworks.angular),
      "---",
      "",
      frameworkSection("Web Components", wcTag, {
        ...api.frameworks.webComponents,
        props: api.frameworks.webComponents.props.filter((p) => p.name !== "version"),
      }, "Attributes"),
    );

    if (api.subComponents && api.subComponents.length > 0) {
      parts.push("---", "");
      for (const sub of api.subComponents) {
        parts.push(`## ${sub.name}`, "");
        if (sub.description) parts.push(sub.description, "");
        parts.push(`Tag: \`${sub.webComponentTag}\``, "");
        parts.push(
          frameworkSection("React (subcomponent)", null, sub.frameworks.react),
          frameworkSection("Angular (subcomponent)", null, sub.frameworks.angular),
          frameworkSection("Web Components (subcomponent)", sub.webComponentTag, {
            ...sub.frameworks.webComponents,
            props: sub.frameworks.webComponents.props.filter((p) => p.name !== "version"),
          }, "Attributes"),
        );
      }
    }

    if (api.staticMethods && api.staticMethods.length > 0) {
      parts.push("---", "", "## Static methods", "");
      for (const method of api.staticMethods) {
        parts.push(`### \`${method.signature}\``, "");
        if (method.description) parts.push(method.description, "");
        parts.push(`**Returns:** ${method.returnType}`, "");
        if (method.params.length > 0) {
          const paramRows = method.params.map(
              (p) => `| \`${cell(p.name)}\` | ${cell(p.type)} | ${p.required ? "Yes" : "No"} | ${cell(p.description ?? "")} |`,
          );
          parts.push(
            "| Parameter | Type | Required | Description |",
            "|-----------|------|----------|-------------|",
            ...paramRows,
            "",
          );
        }
      }
    }
  }

  const usageBlock = guidanceSection("Usage guidance", usageGuidance);
  if (usageBlock) {
    parts.push("---", "", usageBlock);
  }

  const a11yBlock = guidanceSection("Accessibility guidance", accessibilityGuidance);
  if (a11yBlock) {
    parts.push("---", "", a11yBlock);
  }

  if (componentExamples.length > 0) {
    parts.push("---", "", "## Examples", "");
    for (const example of componentExamples) {
      const exSlug = example.data.slug || example.id;
      const desc = example.data.description ? `: ${example.data.description}` : "";
      parts.push(`- [${example.data.title}](/examples/${exSlug})${desc}`);
    }
    parts.push("");
  }

  if (relatedComponents.length > 0) {
    parts.push("---", "", "## Related components", "");
    for (const related of relatedComponents) {
      const relSlug = related.data.slug || related.id;
      const desc = related.data.description ? `: ${related.data.description}` : "";
      parts.push(`- [${related.data.name}](/components/${relSlug})${desc}`);
    }
    parts.push("");
  }

  return parts.join("\n");
}
