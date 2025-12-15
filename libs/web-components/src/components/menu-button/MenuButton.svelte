<svelte:options customElement={{
    tag: "goa-menu-button",
    props: {
      leadingIcon: { attribute: "leading-icon", type: "String" },
      leadingIconTheme: { attribute: "leading-icon-theme", type: "String" },
      maxWidth: { type: "String", attribute: "max-width", reflect: true },
      size: { type: "String", attribute: "size" },
    }
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";

  import { GoAIconType, IconTheme } from "../icon/Icon.svelte";
  import { dispatch, receive, relay } from "../../common/utils";
  import { MenuAction, MenuActionSize, MenuActionProps } from "./MenuAction.svelte";

  // Public props

  export let text: string | undefined = undefined;
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  export let testid: string = "";
  export let leadingIcon: GoAIconType | undefined = undefined;
  export let leadingIconTheme: IconTheme = "outline";
  export let maxWidth: string;
  export let size: MenuActionSize = "normal";

  // Private props

  let _rootEl: HTMLElement;
  let _icon: GoAIconType = "chevron-down";

  let _blockEl: HTMLElement;
  let _menuActions: MenuActionProps[] = [];
  let _buttonIndex = 0;
  let _bindTimeoutId: ReturnType<typeof setTimeout>;

  let _targetEl: HTMLElement;

  // width of the menu button which is the min-width of the popover menu
  let _menuWidth: number = 0;

  // Reactive

  $: getMenuWidth(_targetEl);
  $: {
    size;
    bindOptions();
  }

  // Functions

  function open() {
    _icon = "chevron-up";
  }

  function close() {
    _icon = "chevron-down";
    dispatch(document.body, "goa:closePopover", { target: _rootEl });
  }

  function getChildren() {
    _rootEl.addEventListener("menu-action:mounted", (e: Event) => {
      const props = (e as CustomEvent<MenuActionProps>).detail;
      _menuActions = [..._menuActions, props];

      // call bindOptions once all children are attained
      if (_bindTimeoutId) {
        clearTimeout(_bindTimeoutId);
      }
      _bindTimeoutId = setTimeout(() => {
        bindOptions();
      }, 1);
    });
  }

  function bindOptions() {
    _menuActions.forEach((props) => {
      props.el.dispatchEvent(
        new CustomEvent("menu-button:init", {
          composed: true,
          detail: { size },
        })
      );
    });
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
      }
    });

    getChildren();

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
            _buttonIndex - 1 < 0 ? _menuActions.length - 1 : _buttonIndex - 1;
          break;
        case "ArrowDown":
          handled = true;
          _buttonIndex = (_buttonIndex + 1) % _menuActions.length;
          break;
        case "Home":
        case "PageUp":
          handled = true;
          _buttonIndex = 0;
          break;
        case "End":
        case "PageDown":
          handled = true;
          _buttonIndex = _menuActions.length - 1;
          break;
      }

      if (handled) {
        _menuActions[_buttonIndex]?.el?.focus();
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
  tabindex="-1"
  maxwidth={maxWidth || "none"}
  prevent-scroll-into-view={true}
>
  {#if text}
    <goa-button
      bind:this={_targetEl}
      data-testid={testid}
      slot="target"
      leadingicon={leadingIcon}
      {type}
      {size}
      trailingicon={_icon}
    >
      {text}
    </goa-button>
  {:else}
    <goa-icon-button
      bind:this={_targetEl}
      data-testid={testid}
      slot="target"
      icon={leadingIcon || _icon}
      theme={leadingIconTheme}
      variant="dark"
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
