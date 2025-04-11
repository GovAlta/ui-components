<svelte:options customElement="goa-text" />

<script lang="ts" context="module">
  export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5";
  export type TextElement = "span" | "div" | "p";

  type HeadingSize =
    | "heading-xl"
    | "heading-l"
    | "heading-m"
    | "heading-s"
    | "heading-xs";

  type BodySize = "body-l" | "body-m" | "body-s" | "body-xs";

  export type Size = HeadingSize | BodySize;
</script>

<script lang="ts">
  import { onMount } from "svelte";

  import { calculateMargin, Spacing } from "../../common/styling";
  import { style, styles } from "../../common/utils";

  export let as: TextElement | HeadingElement = "div";
  export let maxWidth: string | "none" = "65ch";
  export let size: Size | undefined = undefined;
  export let color: "primary" | "secondary" = "primary";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  const sizeMap: Record<HeadingElement | TextElement, HeadingSize | BodySize> =
    {
      h1: "heading-xl",
      h2: "heading-l",
      h3: "heading-m",
      h4: "heading-s",
      h5: "heading-xs",
      div: "body-m",
      p: "body-m",
      span: "body-m",
    };

  /**
   * Returns a bottom margin value based on the `as` prop
   */
  function getBottomMargin(): Spacing {
    // override takes precedence
    if (mb) {
      return mb;
    }

    // div and spans should not have any bottom margin
    switch (as) {
      case "h1":
        return "3xl";
      case "h2":
        return "2xl";
      case "h3":
        return "xl";
      case "h4":
        return "l";
      case "h5":
      case "h6":
      case "p":
        return "m";
    }

    // fix for the GoA font's unwanted top padding
    return "3xs";
  }

  onMount(() => {
    size ||= sizeMap[as];
  });
</script>

<svelte:element
  this={as}
  class={size}
  style={styles(
    style(
      "color",
      color === "primary"
        ? "var(--goa-color-text-default)"
        : "var(--goa-color-text-secondary)",
    ),
    maxWidth === "none" ? "" : `max-width: ${maxWidth}`,
    calculateMargin(mt, mr, getBottomMargin(), ml),
  )}
>
  <slot />
</svelte:element>

<style>
  :global(h1, h2, h3, h4, h5) {
    margin: 0;
  }

  .heading-xl {
    font: var(--goa-typography-heading-xl);
  }
  .heading-l {
    font: var(--goa-typography-heading-l);
  }
  .heading-m {
    font: var(--goa-typography-heading-m);
  }
  .heading-s {
    font: var(--goa-typography-heading-s);
  }
  .heading-xs {
    font: var(--goa-typography-heading-xs);
  }
  .body-l {
    font: var(--goa-typography-body-l);
  }
  .body-m {
    font: var(--goa-typography-body-m);
  }
  .body-s {
    font: var(--goa-typography-body-s);
  }
  .body-xs {
    font: var(--goa-typography-body-xs);
  }

  @media (--mobile) {
    .heading-xl {
      font: var(--goa-typography-s-heading-xl);
    }
    .heading-l {
      font: var(--goa-typography-s-heading-l);
    }
    .heading-m {
      font: var(--goa-typography-s-heading-m);
    }
    .heading-s {
      font: var(--goa-typography-s-heading-s);
    }
    .heading-xs {
      font: var(--goa-typography-s-heading-xs);
    }
    .body-l {
      font: var(--goa-typography-s-body-l);
    }
    .body-m {
      font: var(--goa-typography-s-body-m);
    }
    .body-s {
      font: var(--goa-typography-s-body-s);
    }
    .body-xs {
      font: var(--goa-typography-s-body-xs);
    }
  }
</style>
