<svelte:options customElement={{
  tag: "goa-menu-button",
}}/>

<script lang="ts">
  import { GoAIconType } from "../icon/Icon.svelte"
  import { onMount } from "svelte";
  import { dispatch, receive, relay } from "../../common/utils";
  import { MenuAction } from "./MenuAction.svelte";

  export let text: string;
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  export let testid: string;

  let _rootEl: HTMLElement;
  let _menuItems: MenuAction[] = [];

  let _icon: GoAIconType = "chevron-down";

  function open() {
    _icon = "chevron-up";
  }

  function close() {
    _icon = "chevron-down"
  }

  onMount(() => {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case "bind":
          bindAction(data as MenuAction);
          event.stopPropagation();
          break;
        default:
          console.warn(`Unknown action "${action}" received in MenuButton`);
          break;
      }
    })
  })

  function bindAction(action: MenuAction) {
    _menuItems = [..._menuItems, action];
  }

  function onAction(action: string) {
    dispatch(_rootEl, "_action", { action }, { bubbles: true });
    close();
  }
</script>

<goa-popover bind:this={_rootEl} on:_close={close} on:_open={open} padded="false" tabindex="-1">
  <goa-button data-testid={testid} slot="target" no-feedback {type} trailingicon={_icon}>{text}</goa-button>
  <goa-block direction="column" gap="none" min-width="8rem">
    <slot />
    {#each _menuItems as item}
      <goa-button
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        type="menu"
        action="close"
        leadingicon={item.icon}
        testid={item.testid}
        on:_click={() => onAction(item.action)}
      >
        {item.text}
      </goa-button>
    {/each}
  </goa-block>
</goa-popover>
