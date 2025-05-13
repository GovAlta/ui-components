<svelte:options customElement={{
  tag: "goa-multi-action-button",
}}/>

<script lang="ts">
  import { onMount } from "svelte";
  import { GoAIconType } from "../icon/Icon.svelte"

  export let text: string;
  export let type: "primary" | "secondary" | "tertiary" = "primary";

  let _open: boolean;
  let _popoverEl: HTMLElement;
  let _icon: GoAIconType = "chevron-down";

  onMount(() => {
    _popoverEl.addEventListener("close", close);
  })

  function open() {
    _open = !_open;
    _icon = "chevron-up";
  }

  function close() {
    _open = false;
    _icon = "chevron-down"
  }
</script>

<goa-popover open={_open ? "true" : "false"} bind:this={_popoverEl} on:_close={close} on:_open={open} padded="false">
  <goa-button slot="target" {type} trailingicon={_icon}>{text}</goa-button>
  <goa-block direction="column" gap="none">
    <slot />
  </goa-block>
</goa-popover>
