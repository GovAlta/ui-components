<svelte:options customElement={{
  tag: "goa-menu-action",
  props: {
    text: { type: "String", attribute: "text" },
    action: { type: "String", attribute: "action" },
    icon: { type: "String", attribute: "icon" },
    testid: { type: "String", attribute: "testid" }
  }
}} />

<script lang="ts" context="module">
  import { GoAIconType } from "../icon/Icon.svelte";
  export type MenuAction = {
    text: string;
    action?: string;
    icon?: GoAIconType;
    testid?: string;
  }
</script>

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { relay } from "../../common/utils";

  export let text: string = "";
  export let action: string = "default";
  export let testid: string = "";
  export let icon: GoAIconType | undefined = undefined;

  let _el: HTMLElement;

  onMount(async () => {
    await tick();
    relay<MenuAction>(_el, "bind", {
      text,
      action,
      icon,
      testid
    }, { bubbles: true, timeout: 10 });
  })
</script>

<div style="display: none" bind:this={_el} />
