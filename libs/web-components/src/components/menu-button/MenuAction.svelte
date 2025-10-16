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
  export type MenuAction = {
    action?: string;
  };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { receive, relay, style, styles } from "../../common/utils";

  export let text: string = "";
  export let action: string = "default";
  export let testid: string = "";
  export let icon: GoAIconType | undefined = undefined;

  let _el: HTMLElement;

  onMount(() => {
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
  style={styles(style("width", "100%"))}
>
  {#if icon}
    <goa-icon data-testid={`icon-${icon}`} size="3" type={icon} />
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
    padding: 4px var(--goa-button-padding-lr);
    gap: var(--goa-button-gap);
    align-items: center; /* for leading and trailing icon vertical alignment */

    width: 100%;
    background: none;
    border: none;
    text-align: left;
    outline: none;
  }

  button:focus-visible,
  button:hover {
    background-color: var(--goa-button-tertiary-hover-color-bg);
    color: var(--goa-button-tertiary-hover-color-text);
  }

  button:focus-visible {
    box-shadow: 0 0 0 var(--goa-border-width-l) var(--goa-color-interactive-focus);
  }

  .text {
    padding-bottom: var(--font-valign-fix);
    width: 100%;
  }
</style>
