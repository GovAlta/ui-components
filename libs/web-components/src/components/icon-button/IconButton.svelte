<svelte:options
  customElement={{
    tag: "goa-icon-button",
    props: {
      actionArg: { type: "String", attribute: "action-arg" },
      actionArgs: { type: "Object", attribute: "action-args" },
    },
  }}
/>

<script lang="ts">
  import { typeValidator, toBoolean, dispatch } from "../../common/utils";

  import type { IconSize, IconTheme, GoAIconType } from "../icon/Icon.svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { onMount } from "svelte";

  // Validator
  const [Variants, validateVariant] = typeValidator(
    "Icon Button Variant",
    ["color", "nocolor", "light", "dark", "destructive"],
    true,
  );

  const [Types, validateType] = typeValidator(
    "Icon Button Type",
    ["default", "tertiary"],
    true,
  );

  type Variant = (typeof Variants)[number];
  type IconButtonType = (typeof Types)[number];

  /** @required Sets the icon. */
  export let icon: GoAIconType;

  // optional
  /** Sets the size of button. */
  export let size: IconSize = "medium";
  /** Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. */
  export let theme: IconTheme = "outline";
  /** Styles the button to show color, light, dark or destructive action. */
  export let variant: Variant = "color";
  /** Sets the visual style of the button. */
  export let type: IconButtonType = "default";
  /** Sets the title of the button. */
  export let title: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Disables the button. */
  export let disabled: string = "false";
  /** When true, inverts the icon colors for use on dark backgrounds. */
  export let inverted: string = "false";
  /** Sets the aria-label of the button. */
  export let arialabel: string = "";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;
  /** Action identifier passed in click events for event delegation patterns. */
  export let action: string = "";
  /** Single argument value passed with the action in click events. */
  export let actionArg: string = "";
  /** Multiple argument values passed with the action in click events. */
  export let actionArgs: Record<string, unknown> = {};

  // private
  $: css = `${type} ${variant} ${isInverted ? "inverted" : ""}`;
  $: isDisabled = toBoolean(disabled);
  $: isInverted = toBoolean(inverted);

  function handleClick(e: Event) {
    e.target?.dispatchEvent(
      new CustomEvent("_click", { composed: true, detail: { event: e } }),
    );

    if (action) {
      dispatch(e.target as Element, action, actionArg || actionArgs, {
        bubbles: true,
      });
    }
  }

  onMount(() => {
    validateVariant(variant);
    validateType(type);

    if (variant == "nocolor") {
      console.warn(
        "goa-icon-button nocolor variant is deprecated. Instead use dark.",
      );
    }

    if (isInverted) {
      console.warn(
        "goa-icon-button inverted is deprecated. Instead use light variant.",
      );
    }
  });

  // To reduce the number of CSS classes, convert the numeric sizes to their corresponding named sizes.
  function normalizeIconSize(size: IconSize): string {
    switch (size) {
      case "1":
        return "2xsmall";
      case "2":
        return "xsmall";
      case "3":
        return "small";
      case "4":
        return "medium";
      case "5":
        return "large";
      case "6":
        return "xlarge";
      default:
        return size;
    }
  }
</script>

<button
  class={`goa-icon-button goa-icon-button--${normalizeIconSize(size)} ${css}`}
  style={calculateMargin(mt, mr, mb, ml)}
  {title}
  disabled={isDisabled}
  data-testid={testid}
  on:click={handleClick}
  aria-label={arialabel}
>
  <goa-icon {title} type={icon} {size} {theme} />
</button>

<style>
  :host {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  :host:focus-within,
  :host:focus-visible {
    outline: none !important;
  }

  .goa-icon-button--2xsmall,
  .goa-icon-button--xsmall,
  .goa-icon-button--small {
    padding: var(
      --goa-icon-button-small-padding,
      var(--goa-icon-button-medium-padding)
    );
  }

  .goa-icon-button--medium {
    padding: var(--goa-icon-button-medium-padding);
  }

  .goa-icon-button--large,
  .goa-icon-button--xlarge {
    padding: var(--goa-icon-button-large-padding);
  }

  button {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    background: transparent;
    cursor: pointer;
    border: none;
    border-radius: var(
      --goa-icon-button-border-radius,
      var(--goa-icon-button-medium-border-radius)
    );
    /* Fallbacks preserve the pre-token values for v1 consumers — the motion
       tokens only exist in the v2 tokens package. */
    transition:
      background-color var(--goa-motion-duration-short-4, 0.2s)
        var(--goa-motion-curve-expressive, ease-in-out),
      color var(--goa-motion-duration-short-4, 0.2s)
        var(--goa-motion-curve-expressive, ease-in-out),
      transform var(--goa-motion-duration-short-3, 0.1s)
        var(--goa-motion-curve-expressive-transform, ease-in-out);
  }

  button:active {
    transform: translateY(2px);
  }

  button:hover {
    outline: none;
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-icon-button-focus-border-width, 3px)
      var(
        --goa-icon-button-focus-border-color,
        var(--goa-color-interactive-focus)
      );
    outline: none;
  }

  /* No pointer-events: none here — the button must stay a pointer target for
     the not-allowed cursor to show. Hover styling is suppressed per variant
     with :not(:disabled); native disabled buttons fire no click events. */
  button:disabled {
    transform: none;
    cursor: not-allowed;
    opacity: 1;
  }

  /*  Type: color */
  .color {
    color: var(--goa-icon-button-default-color);
    fill: var(--goa-icon-button-default-color);
  }

  .color:hover:not(:focus-visible):not(:disabled) {
    color: var(--goa-icon-button-default-hover-color);
    fill: var(--goa-icon-button-default-hover-color);
    background-color: var(--goa-icon-button-default-hover-color-bg);
  }

  .color:disabled {
    color: var(--goa-icon-button-default-disabled-color);
    fill: var(--goa-icon-button-default-disabled-color);
  }

  /*  Type: dark */
  .dark {
    color: var(--goa-icon-button-dark-color);
    fill: var(--goa-icon-button-dark-color);
  }

  .dark:hover:not(:focus-visible):not(:disabled),
  .dark:active {
    background-color: var(--goa-icon-button-dark-hover-color-bg);
  }

  .dark:disabled {
    color: var(
      --goa-icon-button-dark-disabled-color,
      var(--goa-icon-button-dark-disabled-color-bg)
    );
    fill: var(
      --goa-icon-button-dark-disabled-color,
      var(--goa-icon-button-dark-disabled-color-bg)
    );
  }

  /*  Type: nocolor (same as dark, not documented) */
  .nocolor {
    color: var(--goa-icon-button-dark-color);
    fill: var(--goa-icon-button-dark-color);
  }

  .nocolor:hover:not(:focus-visible):not(:disabled),
  .nocolor:active {
    background-color: var(--goa-icon-button-dark-hover-color-bg);
  }

  /*  Type: destructive */
  .destructive {
    color: var(--goa-icon-button-destructive-color);
    fill: var(--goa-icon-button-destructive-color);
  }

  .destructive:hover:not(:focus-visible):not(:disabled),
  .destructive:active {
    color: var(--goa-icon-button-destructive-hover-color);
    fill: var(--goa-icon-button-destructive-hover-color);
    background-color: var(--goa-icon-button-destructive-hover-color-bg);
  }

  .destructive:disabled {
    color: var(--goa-icon-button-destructive-disabled-color);
    fill: var(--goa-icon-button-destructive-disabled-color);
  }

  /*  Type: light */
  .light {
    color: var(--goa-icon-button-light-color);
    fill: var(--goa-icon-button-light-color);
  }

  .light:hover:not(:focus-visible):not(:disabled),
  .light:active {
    background-color: var(--goa-icon-button-light-hover-color-bg);
  }

  .light:disabled {
    color: var(--goa-icon-button-light-disabled-color);
    fill: var(--goa-icon-button-light-disabled-color);
  }

  /*  Type: inverted (same as light, not documented) */
  .inverted {
    color: var(--goa-icon-button-light-color);
    fill: var(--goa-icon-button-light-color);
  }

  .inverted:hover:not(:focus-visible):not(:disabled),
  .inverted:active {
    background-color: var(--goa-icon-button-light-hover-color-bg);
  }

  /*  Button type: tertiary. The border only shows at rest; hover, focus and
      disabled fall back to the variant styling. An inset box-shadow is used
      instead of a border so the button footprint is identical in all states. */
  .tertiary {
    box-shadow: inset 0 0 0
      var(--goa-icon-button-tertiary-border-width, var(--goa-border-width-s))
      var(--goa-icon-button-tertiary-border-color, var(--goa-color-greyscale-200));
  }

  .tertiary.destructive {
    box-shadow: inset 0 0 0
      var(--goa-icon-button-tertiary-border-width, var(--goa-border-width-s))
      var(
        --goa-icon-button-tertiary-destructive-border-color,
        var(--goa-color-emergency-light)
      );
  }

  .tertiary:hover:not(:focus-visible),
  .tertiary:disabled {
    box-shadow: none;
  }

  /* re-assert the focus ring: .tertiary.destructive above would otherwise
     outrank button:focus-visible */
  .tertiary:focus-visible {
    box-shadow: 0 0 0 var(--goa-icon-button-focus-border-width, 3px)
      var(
        --goa-icon-button-focus-border-color,
        var(--goa-color-interactive-focus)
      );
  }
</style>
