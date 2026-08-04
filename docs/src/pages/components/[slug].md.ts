/**
 * /components/[slug].md — AI-friendly Markdown for a single component
 *
 * Parallel to /components/[slug] (the HTML page). Returns clean Markdown
 * that aggregates everything an AI agent needs: the full API for React,
 * Angular, and Web Components, usage guidance, accessibility guidance,
 * and related examples — without any custom elements or JavaScript.
 *
 * Linked from /llms.txt so agents can discover it without crawling HTML.
 */
import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import {
  getComponentApi,
  getGuidanceForComponent,
  getExamplesForComponent,
  getRelatedComponents,
  categorizeGuidance,
} from "@/lib/content-queries";
import { buildComponentMarkdown } from "@/lib/component-markdown";

type Props = {
  component: CollectionEntry<"components">;
};

type Params = {
  slug: string;
};

export async function getStaticPaths() {
  const components = await getCollection("components");
  return components
    .filter((c) => !c.data.hidden && !c.data.subcomponent)
    .map((component) => ({
      params: { slug: component.data.slug || component.id },
      props: { component },
    }));
}

export const GET: APIRoute<Props, Params> = async ({ params, props }) => {
  const { slug } = params;
  const { component } = props;

  const [api, allGuidance, componentExamples, relatedComponents] = await Promise.all([
    getComponentApi(slug),
    getGuidanceForComponent(slug),
    getExamplesForComponent(slug),
    getRelatedComponents(component.data.relatedComponents ?? []),
  ]);

  const { usage: usageGuidance, accessibility: accessibilityGuidance } =
    categorizeGuidance(allGuidance);

  const markdown = buildComponentMarkdown({
    slug,
    component,
    api,
    usageGuidance,
    accessibilityGuidance,
    componentExamples,
    relatedComponents,
  });

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
