/**
 * /llms.txt — AI agent discovery index
 *
 * Follows the llms.txt convention (https://llmstxt.org).
 * Lists every significant page in the site so agents can build
 * a navigation map without crawling rendered HTML.
 *
 * Component entries point to /components/{slug}.md (clean Markdown)
 * rather than the HTML page, so agents get structured text directly.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const [components, examples] = await Promise.all([
    getCollection("components"),
    getCollection("examples"),
  ]);

  const visibleComponents = components
    .filter((c) => !c.data.hidden && !c.data.subcomponent)
    .sort((a, b) => a.data.name.localeCompare(b.data.name));

  // Only top-level examples (those in subdirectories have id like "button-with-icon",
  // while nested product pages have ids like "workspace/dashboard").
  const visibleExamples = examples
    .filter((e) => !e.data.hidden && e.data.status === "published" && !e.id.includes("/"))
    .sort((a, b) => a.data.title.localeCompare(b.data.title));

  const lines: string[] = [
    "# Government of Alberta Design System",
    "",
    "> Documentation for the GoA Design System — components, patterns,",
    "> examples, and guidance for building Alberta government digital services.",
    "> Full site: https://design.alberta.ca",
    "",
    "## Components",
    "",
    "> Each /components/{slug}.md page contains the full API for React,",
    "> Angular, and Web Components (props, events, slots), usage guidance,",
    "> accessibility guidance, and links to related examples.",
    "",
  ];

  for (const component of visibleComponents) {
    const slug = component.data.slug || component.id;
    const desc = component.data.description ? `: ${component.data.description}` : "";
    lines.push(`- [${component.data.name}](/components/${slug}.md)${desc}`);
  }

  lines.push("");
  lines.push("## Examples");
  lines.push("");
  lines.push(
    "> Usage patterns and page compositions built with GoA Design System components.",
  );
  lines.push("");

  for (const example of visibleExamples) {
    const slug = example.data.slug || example.id;
    const desc = example.data.description ? `: ${example.data.description}` : "";
    lines.push(`- [${example.data.title}](/examples/${slug})${desc}`);
  }

  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
