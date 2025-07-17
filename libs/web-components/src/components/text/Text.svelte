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
  export let id: string = "";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _marginBottom: Spacing = null;
  let _marginTop: Spacing = null;

  /**
   * Returns a bottom margin value based on the `size` prop
   */
  function getBottomMargin(): Spacing {
    // override takes precedence
    if (mb) {
      return mb;
    }

    switch (size) {
      case "heading-xl":
        return "l";
      case "heading-l":
        return "l";
      case "heading-m":
        return "m";
      case "heading-s":
        return "s";
      case "heading-xs":
        return "xs";
      case "body-l":
      case "body-m":
      case "body-s":
      case "body-xs":
        return "l";
      default:
        return "l";
    }
  }

  function getTopMargin(): Spacing {
    // override takes precedence
    if (mt) {
      return mt;
    }

    switch (size) {
      case "heading-xl":
      case "heading-l":
      case "heading-m":
        return "2xl";
      case "heading-s":
      case "heading-xs":
        return "xl";
      case "body-l":
        return "2xl";
      case "body-m":
      case "body-s":
        return "l";
      case "body-xs":
        return "s";
      default:
        return "s";
    }
  }

  onMount(async () => {
    await tick(); // needed to ensure Angular's delay, when rendering within a route, doesn't break things
    _marginBottom = getBottomMargin();
    _marginTop = getTopMargin();
  });
</script>

<svelte:element
  this={as}
  id={id || undefined}
  class={size}
  style={styles(
    style(
      "color",
      color === "primary"
        ? "var(--goa-color-text-default)"
        : "var(--goa-color-text-secondary)",
    ),
    maxWidth === "none" ? "" : `max-width: ${maxWidth}`,
    calculateMargin(_marginTop, mr, _marginBottom, ml),
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
