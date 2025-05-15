<svelte:options
  customElement={{
    tag: "goa-menu-button",
  }}
/>

<script lang="ts">
  import { GoAIconType } from "../icon/Icon.svelte";
  import { onMount } from "svelte";
  import { dispatch, receive } from "../../common/utils";
  import { MenuAction } from "./MenuAction.svelte";

  // Public props

  export let text: string;
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  export let testid: string = "";

  // Private props

  let _rootEl: HTMLElement;
  let _icon: GoAIconType = "chevron-down";

  let _blockEl: HTMLElement;
  let _buttons: HTMLElement[] = [];
  let _buttonIndex = 0;

  let _targetEl: HTMLElement;
  let _menuWidth: number = 0;

  // Reactive

  $: getMenuWidth(_targetEl);

  // Functions

  function open() {
    _icon = "chevron-up";
  }

  function close() {
    _icon = "chevron-down";
    dispatch(document.body, "goa:closePopover", { target: _rootEl });
  }

  function onBind(button: HTMLElement) {
    _buttons = [..._buttons, button];
  }

  // To obtain the menu width a delay is required
  function getMenuWidth(el: HTMLElement) {
    if (!el) return;

    // timeout to ensure the buttons have been added to the DOM
    // to allow a width to be obtained
    setTimeout(() => {
      _menuWidth = el.getBoundingClientRect().width;
    }, 10);
  }

  function onAction(action: MenuAction) {
    dispatch(_rootEl, "_action", action, { bubbles: true });
    close();
    _buttonIndex = 0;
  }

  function onClose() {
    close();
    _buttonIndex = 0;
  }

  // Hooks

  onMount(async () => {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case "click":
          onAction(data as MenuAction);
          event.stopPropagation();
          break;
        case "bind":
          onBind(data as HTMLElement);
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
          _buttonIndex =
            _buttonIndex - 1 < 0 ? _buttons.length - 1 : _buttonIndex - 1;
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
        _buttons[_buttonIndex]?.focus();
        e.stopPropagation();
        e.preventDefault();
      }
    });
  });
</script>

<goa-popover
  bind:this={_rootEl}
  on:_close={onClose}
  on:_open={open}
  padded="false"
  tabindex="-1"
>
  <goa-button
    bind:this={_targetEl}
    data-testid={testid}
    slot="target"
    {type}
    trailingicon={_icon}
  >
    {text}
  </goa-button>
  <goa-block
    bind:this={_blockEl}
    direction="column"
    gap="none"
    min-width={`${_menuWidth}px`}
  >
    <slot />
  </goa-block>
</goa-popover>
