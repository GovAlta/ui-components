<svelte:options
  customElement={{
    tag: "goa-focus-trap",
    props: {
      preventScrollIntoView: {
        attribute: "prevent-scroll-into-view",
        type: "Boolean",
      },
    },
  }}
/>

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { findFirstFocusableNode, shouldFocus } from "../../common/utils";

  // Public
  // allow for outside control of whether focus trap should re-focus the first element is open/closed (see Drawer)
  export let open: boolean = false;

  export let preventScrollIntoView: boolean = false;

  // Private

  let rootEl: HTMLElement;
  let boundryStartEl: HTMLElement | null;
  let boundryEndEl: HTMLElement | null;
  let isShiftPressed: boolean;
  let isFirstFocus = true;

  // ========
  // Reactive
  // ========
  $: if (open) setTimeout(() => findFirstFocusableEl(), 0); // add a small delay so rootEl is rendered - for modal

  // *****
  // Hooks
  // *****
  onMount(async () => {
    await tick();
    // event is attached to the rootEl, eliminating the need to remove the listener since it
    // will be removed when the associated element is removed.
    rootEl.addEventListener("focus", keepWithinBounds, true);
    rootEl.addEventListener("keydown", activateShiftState, true);
    rootEl.addEventListener("keyup", deactivateShiftState, true);

    boundryStartEl = rootEl.querySelector("[data-tab-boundry=start]");
    boundryEndEl = rootEl.querySelector("[data-tab-boundry=end]");
  });

  function activateShiftState(e: KeyboardEvent) {
    if (e.shiftKey) isShiftPressed = true;
  }

  function deactivateShiftState(e: KeyboardEvent) {
    if (e.shiftKey) isShiftPressed = false;
  }

  // Functions

  function isFocusable(node: Node): Node | null | "ignore-focus" {
    const element = node as HTMLElement;

    if (isFirstFocus && element.getAttribute?.("data-first-focus")) return node;
    if (isFirstFocus && element.getAttribute?.("data-ignore-focus"))
      return "ignore-focus";

    return shouldFocus(node);
  }

  function findFirstFocusableEl() {
    const sibling = rootEl?.querySelector("slot");
    if (!sibling) return;

    const el = findFirstFocusableNode([sibling], false, isFocusable) as HTMLElement;
    if (el) {
      el.focus();
    }
  }

  // Focus event handler
  function keepWithinBounds(e: Event | null): void {
    const el = (e?.target as HTMLElement) ?? rootEl;
    if (isFirstFocus) {
      isFirstFocus = false;
      return; // first renders, we don't want to scrollIntoView
    }

    if (el.dataset["tabBoundry"] === "start") {
      if (isShiftPressed) {
        boundryEndEl?.focus();
        return;
      }

      let sibling = el.nextElementSibling;
      if (sibling?.getAttribute("data-first-focus") === "true") {
        sibling = sibling.nextElementSibling;
      }
      if (!sibling) return;

      const next = findFirstFocusableNode([sibling], false, isFocusable) as HTMLElement;
      next?.focus();
      return;
    }

    if (el.dataset["tabBoundry"] === "end") {
      if (!isShiftPressed) {
        boundryStartEl?.focus();
        return;
      }

      let sibling = el.previousElementSibling;
      if (sibling?.getAttribute("data-first-focus") === "true") {
        sibling = sibling.previousElementSibling;
      }
      if (!sibling) return;

      const next = findFirstFocusableNode([sibling], true, isFocusable) as HTMLElement;
      next?.focus();
      return;
    }

    // If the focus element is at the bottom, we want to automatically scroll down to the focused element (when user uses keyboard)
    const focusedElement = e?.target;

    if (
      !preventScrollIntoView &&
      focusedElement &&
      focusedElement instanceof HTMLElement
    ) {
      focusedElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

</script>

<div bind:this={rootEl}>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <span data-tab-boundry="start" tabindex="0"></span>
  <slot />
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <span data-tab-boundry="end" tabindex="0"></span>
</div>

<style>
  div {
    display: inline;
  }
</style>
