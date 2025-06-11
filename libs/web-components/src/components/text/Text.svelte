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
  import { onMount, tick } from "svelte";

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

  let _marginBottom: Spacing = null;

  /**
   * Returns a bottom margin value based on the `size` prop
   */
  function getBottomMargin(): Spacing {
    // override takes precedence
    if (mb) {
      return mb;
    }

    // div and spans should not have any bottom margin
    switch (size) {
      case "heading-xl":
        return "3xl";
      case "heading-l":
        return "2xl";
      case "heading-m":
        return "xl";
      case "heading-s":
        return "l";
      case "heading-xs":
      case "body-l":
      case "body-m":
        return "m";
      case "body-s":
      case "body-xs":
        return "3xs";
      default:
        return "3xs";
    }
  }

  onMount(async() => {
    await tick(); // needed to ensure Angular's delay, when rendering within a route, doesn't break things
    console.log("onMount size ", size);
    console.log("after onMount size ", size);
    _marginBottom = getBottomMargin();
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
    calculateMargin(mt, mr, _marginBottom, ml),
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
      font: var(--goa-typography-mobile-heading-xl);
    }
    .heading-l {
      font: var(--goa-typography-mobile-heading-l);
    }
    .heading-m {
      font: var(--goa-typography-mobile-heading-m);
    }
    .heading-s {
      font: var(--goa-typography-mobile-heading-s);
    }
    .heading-xs {
      font: var(--goa-typography-mobile-heading-xs);
    }
    .body-l {
      font: var(--goa-typography-mobile-body-l);
    }
    .body-m {
      font: var(--goa-typography-mobile-body-m);
    }
    .body-s {
      font: var(--goa-typography-mobile-body-s);
    }
    .body-xs {
      font: var(--goa-typography-mobile-body-xs);
    }
  }
</style>
