<svelte:options customElement={{
  tag: "goa-multi-action-button",
}}/>

<script lang="ts">
  import { GoAIconType } from "../icon/Icon.svelte"

  export let text: string;
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  export let testid: string;

  let _icon: GoAIconType = "chevron-down";

  function open() {
    _icon = "chevron-up";
  }

  function close() {
    _icon = "chevron-down"
  }
</script>

<goa-popover on:_close={close} on:_open={open} padded="false">
  <goa-button data-testid={testid} slot="target" no-feedback {type} trailingicon={_icon}>{text}</goa-button>
  <goa-block direction="column" gap="none">
    <slot />
  </goa-block>
</goa-popover>
