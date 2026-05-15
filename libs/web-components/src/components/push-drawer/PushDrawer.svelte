<svelte:options
  customElement={{
    tag: "goa-push-drawer",
    props: {
      testid: { type: "String", attribute: "testid", reflect: true },
      open: { type: "Boolean", reflect: true },
      heading: { type: "String", reflect: true },
      width: { type: "String", reflect: true },
      version: { type: "String", reflect: true },
    },
  }}
/>

<script lang="ts">
  import PushDrawerInternal from "./PushDrawerInternal.svelte";

  export let testid: string | undefined = undefined;
  export let open: boolean = false;
  export let heading: string = "";
  export let width: string = "492px";
  export let version: string | undefined = undefined;

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
    {version}
  >
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
    {version}
  >
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
