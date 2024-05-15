<svelte:options customElement={{
  tag: "goa-tab",
  props: {
    open: { reflect: true, type: "String" },
  }
}} />

<script lang="ts" context="module">
  export type GoATabProps = {
    el: HTMLElement;
    headingType: "slot" | "string";
    heading: HTMLSlotElement | string;  
    open: boolean;
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { getSlottedChildren } from "../../common/utils";

  // ======
  // Public
  // ======

  export let heading: string = "";
  export let open: boolean = false;

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;
  let _headingSlotEl: HTMLElement;

  onMount(() => {
    dispatchInit();    
    addSetOpenEventListener();
  })

  function dispatchInit() {
    setTimeout(() => {
      const headingType = $$slots.heading ? "slot" : "string"; 
      _rootEl?.dispatchEvent(new CustomEvent("tab:mounted", {
        composed: true,
        bubbles: true,
        detail: {
          el: _rootEl,
          headingType,
          heading: headingType === "string" ? heading : getHeadingContents(),
          open: open
        }
      }))  
    }, 1);
  }

  function getHeadingContents() {
    return getSlottedChildren(_headingSlotEl, "*")[0]
  }

  // Listen for parent Tab component open event 
  function addSetOpenEventListener() {
    _rootEl.addEventListener("tabs:set-open", (e: Event) => {
      const props = (e as CustomEvent<Partial<GoATabProps>>).detail;
      open = !!props.open;
    })
  }
  
</script>

<section bind:this={_rootEl}>
  <div bind:this={_headingSlotEl}>
    <slot style="display:none" name="heading" />
    {heading}
  </div>
  {#if open}
    <div role="tabpanel">
      <slot />
    </div>
  {/if}
</section>

<style>
  [role="tabpanel"] {
    padding-top: 2rem;
  }
</style>
