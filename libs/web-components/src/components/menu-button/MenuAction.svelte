<svelte:options
  customElement={{
    tag: "goa-menu-action",
    props: {
      text: { type: "String", attribute: "text" },
      action: { type: "String", attribute: "action" },
      icon: { type: "String", attribute: "icon" },
      testid: { type: "String", attribute: "testid" },
    },
  }}
/>

<script lang="ts" context="module">
  import { GoAIconType } from "../icon/Icon.svelte";
  export type MenuActionProps = {
    action?: string;
    size?: "normal" | "compact";
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { relay, style, styles } from "../../common/utils";

  /** Display text for the menu action. */
  export let text: string = "";
  /** Action identifier included in the click event. */
  export let action: string = "default";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Icon displayed before the text. */
  export let icon: GoAIconType | undefined = undefined;
  // Set internally by MenuButton via menu-button:init event
  let size: "normal" | "compact" = "normal";

  let _el: HTMLElement;

  // Hooks
  onMount(() => {
    _el.addEventListener("menu-button:init", (e: Event) => {
      const data = (e as CustomEvent<MenuActionProps>).detail;
      size = data.size || "normal";
    });

    relay(_el, "bind", _el, { bubbles: true, timeout: 1 });
  });

  function onClick() {
    relay(_el, "click", { action }, { bubbles: true });
  }
</script>

<button
  bind:this={_el}
  data-testid={testid}
  on:click={onClick}
  tabindex="0"
  class:compact={size === "compact"}
  style={styles(style("width", "100%"))}
>
  {#if icon}
    <goa-icon
      data-testid={`icon-${icon}`}
      size={size === "normal" ? "4" : "3"}
      type={icon}
    />
  {/if}
  <div class="text">{text}</div>
</button>

<style>
  button {
    display: inline-flex;
    box-sizing: border-box;
    cursor: pointer;
    font: var(--goa-button-text);
    min-height: var(--goa-button-height);
    letter-spacing: var(--goa-button-letter-spacing);
    padding: 4px var(--goa-button-padding-lr, var(--goa-space-s));
    gap: var(--goa-button-gap);
    align-items: center; /* for leading and trailing icon vertical alignment */

    width: 100%;
    background: none;
    border: none;
    text-align: left;
    outline: none;
  }

  button.compact {
    min-height: var(--goa-button-height-compact);
    font: var(--goa-button-text-compact);
    padding: 4px var(--goa-button-padding-lr-compact, var(--goa-space-xs));
    gap: var(--goa-button-compact-gap);
  }

  button:focus-visible,
  button:hover {
    background-color: var(--goa-button-tertiary-hover-color-bg);
    color: var(--goa-button-tertiary-hover-color-text);
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  .text {
    padding-bottom: var(--font-valign-fix);
    width: 100%;
  }
</style>
