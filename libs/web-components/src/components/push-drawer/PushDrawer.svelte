<svelte:options
  customElement={{
    tag: "goa-push-drawer",
    props: {
      testid: { type: "String", attribute: "testid", reflect: true },
      open: { type: "Boolean", reflect: true },
      heading: { type: "String", reflect: true },
      width: { type: "String", reflect: true },
    },
  }}
/>

<script lang="ts">
  import PushDrawerInternal from "./PushDrawerInternal.svelte";

  /** Sets a data-testid attribute for automated testing. */
  export let testid: string | undefined = undefined;
  /** Sets the open state of the push drawer. */
  export let open: boolean = false;
  /** Sets the heading text of the push drawer. Use the heading slot for custom heading content. */
  export let heading: string = "";
  /** Sets the width of the push drawer panel. */
  export let width: string = "492px";

  // Minimum window width for desktop layout from vite.config.js
  const minimumDesktopWidth = 1023;

  $: windowWidth = window.innerWidth;
  $: windowIsSmallerThanDesktop = windowWidth <= minimumDesktopWidth;

  export const drawerTestId = !!testid ? `drawer-${testid}` : undefined;
  export const pushDrawerTestId = !!testid
    ? `push-drawer-${testid}`
    : undefined;
</script>

<svelte:window bind:innerWidth={windowWidth} />

{#if windowIsSmallerThanDesktop}
  <goa-drawer
    data-testid={testid}
    testid={drawerTestId}
    {open}
    position="right"
    maxsize={width}
    {heading}
  >
    {#if $$slots.heading}
      <span slot="heading">
        <slot name="heading" />
      </span>
    {/if}
    {#if $$slots.actions}
      <span slot="actions">
        <slot name="actions" />
      </span>
    {/if}
    <slot />
  </goa-drawer>
{:else}
  <goa-push-drawer-internal
    data-testid={testid}
    testid={pushDrawerTestId}
    {open}
    {width}
    {heading}
  >
    {#if $$slots.heading}
      <span slot="heading">
        <slot name="heading" />
      </span>
    {/if}
    {#if $$slots.actions}
      <span slot="actions">
        <slot name="actions" />
      </span>
    {/if}
    <slot />
  </goa-push-drawer-internal>
{/if}

<style>
  :host {
    display: contents;
  }
</style>
