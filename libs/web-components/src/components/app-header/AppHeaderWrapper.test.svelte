<svelte:options customElement="test-app-header-wrapper" />

<script lang="ts">
  import GoAAppHeader from "./AppHeader.svelte";

  export let heading: string;
  export let url: string;
  export let haschildren: boolean = false;
</script>

<GoAAppHeader {heading} {url}>
  {#if haschildren}
    <a href="#learnmore">Learn more</a>
    <a class="current" href="#aboutus">About Us</a>
    <goa-app-header-menu heading="Apply Now">
      <a href="#seniors">Seniors</a>
      <a href="#family">Family</a>
      <a href="#children">Children</a>
    </goa-app-header-menu>
  {/if}
</GoAAppHeader>
