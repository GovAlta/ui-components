<svelte:options tag="goa-tab"/>

<script lang="ts">

  import {toBoolean} from "../../common/utils";

  // ======
  // Public
  // ======
  export let heading: string = "";
  export let open: string = "false";
  export let childindex: string = "";

  // =======
  // Private
  // =======
  let _isOpen: boolean;
  let _tabButtonEl: HTMLButtonElement;

  // ========
  // Reactive
  // ========
  $: {
    _isOpen = toBoolean(open);
    if (_isOpen) {
      notifyParent();
      if (_tabButtonEl) _tabButtonEl.focus();
    }
  }

  function notifyParent() {
    _tabButtonEl.dispatchEvent(new CustomEvent("open", {
      detail: {
        childIndex: childindex
      },
      composed: true,
      bubbles: true
    }));
  }
</script>

<!--HTML-->
<button
  bind:this={_tabButtonEl}
  id={`tab-${childindex}`}
  type="button"
  role="tab"
  aria-selected="{_isOpen}"
  aria-controls={`tabpanel-${childindex}`}
  on:click={notifyParent}
  tabindex={_isOpen ? "0" : "-1"}
  class:active={_isOpen}
>
  <slot name="heading">{heading}</slot>
</button>

<!--Style-->
<style>
  [role="tab"] {
    display: block;
    position: relative;
    z-index: 2;
    text-align: left;
    margin: 0;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    border: none;
    font: var(--goa-typography-body-m);
    color: var(--goa-color-text-default);
  }

  button[role='tab'] {
    background: none;
  }

  [role="tab"][aria-selected="true"] {
    font: var(--goa-typography-heading-s);
  }

  button[role="tab"]:focus, button[role="tab"]:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  ::slotted([slot="heading"]){
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-space-xs);
  }

  @media(max-width: 639px) {
    [role="tab"] {
      width: 100%;
      padding-top: var(--goa-space-xs);
      padding-left: 15px; /* 16px - 1px border */
      padding-bottom: var(--goa-space-s);
      border-left: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    }
    [role="tab"][aria-selected="true"] {
      border-left: 4px solid var(--goa-color-interactive-default);
      background: var(--goa-color-info-background);
      padding-left: 12px; /* 16px - 4px border */
      margin-top: 0;
    }
    [role="tab"]:hover:not([aria-selected="true"]), button[role="tab"]:focus:not([aria-selected="true"]), button[role="tab"]:focus-visible:not([aria-selected="true"]) {
      border-left: 4px solid var(--goa-color-greyscale-200);
      padding-left: 12px; /* 16px - 4px border */
    }
  }

  @media(min-width: 640px) {
    [role="tab"] {
      display: inline-block;
      width: auto;
      padding: var(--goa-space-xs) var(--goa-space-m) var(--goa-space-s);
      top: 3px; /* 4px border bottom when hover/active - 1px border inactive */
      min-height: 52px; /* heading with badge will be higher than plain text */
    }
    [role="tab"][aria-selected="true"] {
      border-bottom: 4px solid var(--goa-color-interactive-default);
      padding-bottom: var(--goa-space-xs);
      padding-left: var(--goa-space-m);
    }
    [role="tab"]:hover:not([aria-selected="true"]), button[role="tab"]:focus:not([aria-selected="true"]), button[role="tab"]:focus-visible:not([aria-selected="true"]) {
      border-bottom: 4px solid var(--goa-color-greyscale-200);
      padding-bottom: var(--goa-space-xs);
      padding-left: var(--goa-space-m);
    }
  }
</style>
