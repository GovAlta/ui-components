<svelte:options customElement={{
  tag: "goa-menu-button",
}} />

<script lang="ts">
  import { GoAIconType } from "../icon/Icon.svelte";
  import { onMount } from "svelte";
  import { dispatch, receive, relay } from "../../common/utils";
  import { MenuAction } from "./MenuAction.svelte";

  export let text: string;
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  export let testid: string;

  let _rootEl: HTMLElement;
  let _menuItems: MenuAction[] = [];
  let _icon: GoAIconType = "chevron-down";

  let _blockEl: HTMLElement;
  let _buttonsEl: HTMLElement;
  let _buttons: HTMLElement[] = [];
  let _buttonIndex = 0;

  function open() {
    _icon = "chevron-up";

    // get list of buttons to allow for arrow keys to be used to move between them
    _buttonsEl.querySelectorAll("button").forEach((button, index) => {
      if (index === 0) {
        button.focus();
      }
      _buttons = [..._buttons, button as HTMLElement];
    });
  }

  function close() {
    _icon = "chevron-down";
    dispatch(document.body, "goa:closePopover", { target: _rootEl });
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
    });

    _blockEl.addEventListener("keydown", (e) => {
      let handled = false;
      switch (e.key) {
        case "Tab":
          close();
          e.preventDefault();
          break;
        case "ArrowUp":
          handled = true;
          _buttonIndex = _buttonIndex - 1 < 0 ? _buttons.length - 1 : _buttonIndex - 1;
          break;
        case "ArrowDown":
          handled = true;
          _buttonIndex = (_buttonIndex + 1) % _buttons.length;
          break;
        case "Home":
        case "PageUp":
          handled = true;
          _buttonIndex = 0;
          break;
        case "End":
        case "PageDown":
          handled = true;
          _buttonIndex = _buttons.length - 1;
          break;
      }

      if (handled) {
        _buttons[_buttonIndex].focus();
        e.stopPropagation();
        e.preventDefault();
      }
    });
  });

  function bindAction(action: MenuAction) {
    _menuItems = [..._menuItems, action];
  }

  function onAction(action: string) {
    dispatch(_rootEl, "_action", { action }, { bubbles: true });
    close();
    _buttonIndex = 0;
  }
</script>

<goa-popover bind:this={_rootEl} on:_close={close} on:_open={open} padded="false" tabindex="-1">
  <goa-button data-testid={testid} slot="target" no-feedback {type} trailingicon={_icon}>{text}</goa-button>
  <goa-block bind:this={_blockEl} direction="column" gap="none" min-width="8rem">
    <slot />
    <div bind:this={_buttonsEl}>
      {#each _menuItems as item}
        <button
          data-testid={item.testid}
          on:click={() => onAction(item.action)}
        >
          {#if item.icon}
            <goa-icon data-testid={`icon-${item.icon}`} size="3" type={item.icon} />
          {/if}
          <span style="padding-bottom: var(--font-valign-fix)">
            {item.text}
          </span>
        </button>
      {/each}
    </div>
  </goa-block>
</goa-popover>

<style>
  button {
    display: inline-flex;
    box-sizing: border-box;
    cursor: pointer;
    font: var(--goa-button-text);
    height: var(--goa-button-height);
    letter-spacing: var(--goa-button-letter-spacing);
    padding: 0 var(--goa-button-padding-lr);
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
</style>
