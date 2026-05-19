import type { ComponentRecord, ExampleRecord } from "../types";

// Manually curated old → new slug renames. Until the docs site catches up,
// the OLD slug is the current id and there's nothing to alias. Once the docs
// rename a record (e.g. PR #3888 batches), the NEW slug becomes the id and
// the OLD slug becomes the alias here. This list is the bridge during the
// transition.
const EXAMPLE_SLUG_ALIASES: Record<string, string[]> = {
  // newSlug: [oldSlug1, oldSlug2, ...]
  "result-page": ["confirm-that-an-application-was-submitted"],
  "question-page": [
    "ask-a-user-one-question-at-a-time",
    "give-more-information-before-asking-a-question-a",
  ],
};

// Legacy or sub-component names that don't show up from code derivation
// (no matching React class, web component tag, or Angular selector). Used
// when a renamed component still appears in older content references, or
// when a sub-component reasonably routes to its parent for navigation.
const COMPONENT_SLUG_ALIASES: Record<string, string[]> = {
  // newSlug: [oldSlug1, oldSlug2, ...]
  "text-area": ["textarea"],
  notification: ["notification-banner"],
  "menu-button": ["multi-action-button"],
  table: ["table-sort-header"],
};

export function addComponentAliases(components: ComponentRecord[]): ComponentRecord[] {
  return components.map((c) => {
    const aliases = new Set<string>(c.aliases);

    if (c.reactClassName && c.reactClassName !== expectedReactName(c.id)) {
      // Stale wrapper name that doesn't match the doc slug.
      // e.g. GoabAppFooter on footer's aliases.
      aliases.add(c.reactClassName);
    }
    if (c.webComponentTag) {
      const tagSlug = c.webComponentTag.replace(/^goa-/, "");
      if (tagSlug !== c.id) aliases.add(tagSlug);
    }
    if (c.angularSelector) {
      const selSlug = c.angularSelector.replace(/^goab-/, "");
      if (selSlug !== c.id) aliases.add(selSlug);
    }
    const manual = COMPONENT_SLUG_ALIASES[c.id];
    if (manual) for (const s of manual) aliases.add(s);

    return { ...c, aliases: [...aliases].sort() };
  });
}

export function addExampleAliases(examples: ExampleRecord[]): ExampleRecord[] {
  return examples.map((ex) => {
    const aliases = new Set<string>(ex.aliases);
    const oldSlugs = EXAMPLE_SLUG_ALIASES[ex.id];
    if (oldSlugs) for (const s of oldSlugs) aliases.add(s);
    return { ...ex, aliases: [...aliases].sort() };
  });
}

function expectedReactName(slug: string): string {
  // Convention: GoabPascalCase(slug). e.g. "form-item" → "GoabFormItem".
  return (
    "Goab" +
    slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
  );
}
