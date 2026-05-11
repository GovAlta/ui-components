<svelte:options
  customElement={{
    tag: "goa-menu-button",
    props: {
      leadingIcon: { attribute: "leading-icon", type: "String" },
      maxWidth: { type: "String", attribute: "max-width", reflect: true },
      size: { type: "String", attribute: "size" },
      variant: { type: "String", attribute: "variant" },
      version: { type: "String", attribute: "version" },
      ariaLabel: { attribute: "aria-label", type: "String" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  import { GoAIconType } from "../icon/Icon.svelte";
  import { dispatch, receive } from "../../common/utils";
  import { MenuActionProps } from "./MenuAction.svelte";

  // Public props

  /** The button label text. When provided, displays as a text button with a dropdown icon. */
  export let text: string = "";
  /** The button style variant. */
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Icon displayed before the button text. When no text is provided, displays as an icon button. */
  export let leadingIcon: GoAIconType | undefined = undefined;
  /** Maximum width of the dropdown menu. */
  export let maxWidth: string;
  /** Sets the size of the button. */
  export let size: "normal" | "compact" = "normal";
  /** Sets the color variant for semantic meaning. */
  export let variant: "normal" | "destructive" = "normal";
  /** @internal Design system version for styling. */
  export let version: "1" | "2" = "1";
  /** Sets the aria-label for the icon button in icon-only mode. */
  export let ariaLabel: string = "Open menu";

  // Private props

  let _rootEl: HTMLElement;
  let _icon: GoAIconType = "chevron-down";

  let _blockEl: HTMLElement;
  let _buttons: HTMLElement[] = [];
  let _buttonIndex = 0;

  let _targetEl: HTMLElement;

  // width of the menu button which is the min-width of the popover menu
  let _menuWidth: number = 0;

  // Reactive

  $: getMenuWidth(_targetEl);

  // Hooks
  onMount(async () => {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case "click":
          onAction(data as MenuActionProps);
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
    dispatch(button, "menu-button:init", { size });
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

  function onAction(action: MenuActionProps) {
    dispatch(_rootEl, "_action", { action: action.action, size: action.size }, { bubbles: true });
    close();
    _buttonIndex = 0;
  }

  function onClose() {
    close();
    _buttonIndex = 0;
  }
</script>

<goa-popover
  bind:this={_rootEl}
  on:_close={onClose}
  on:_open={open}
  padded="false"
  tabindex="-1"
  maxwidth={maxWidth || "none"}
>
  {#if text}
    <goa-button
      bind:this={_targetEl}
      data-testid={testid}
      slot="target"
      leadingicon={leadingIcon}
      {type}
      {size}
      {variant}
      {version}
      trailingicon={_icon}
    >
      {text}
    </goa-button>
  {:else}
    <goa-icon-button
      bind:this={_targetEl}
      data-testid={testid}
      slot="target"
      icon={leadingIcon || "ellipsis-horizontal"}
      size={size === "normal" ? "4" : "3"}
      variant={variant === "destructive" ? "destructive" : "dark"}
      arialabel={ariaLabel || "Open menu"}
    />
  {/if}
  <goa-block
    bind:this={_blockEl}
    direction="column"
    gap="none"
    min-width={`${_menuWidth}px`}
    max-width={maxWidth}
  >
    <slot />
  </goa-block>
</goa-popover>
