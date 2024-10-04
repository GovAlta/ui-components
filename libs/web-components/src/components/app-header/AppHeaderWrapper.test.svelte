<svelte:options customElement="test-app-header-wrapper" />

<script lang="ts">
  import GoAAppHeader from "./AppHeader.svelte";
  import { TABLET_BP } from "../../common/breakpoints";

  export let heading: string;
  export let url: string;
  export let haschildren: boolean = false;
  export let fullmenubreakpoint: number = TABLET_BP;
  export let hasmobileclickhandler: string = "false";
</script>

<GoAAppHeader {heading} {url} {fullmenubreakpoint}
              {hasmobileclickhandler}>
  {#if haschildren}
    <a href="#learnmore">Learn more</a>
    <a class="current" href="#aboutus">About Us</a>
    <goa-app-header-menu heading="Apply Now" leadingicon="add">
      <a href="#seniors">Seniors</a>
      <a href="#family">Family</a>
      <a href="#children">Children</a>
    </goa-app-header-menu>
  {/if}
</GoAAppHeader>
