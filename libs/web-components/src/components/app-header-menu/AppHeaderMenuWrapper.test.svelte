<svelte:options customElement="test-app-header-menu-wrapper" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";
  import GoAAppHeaderMenu from "./AppHeaderMenu.svelte";

  export let heading: string = "some label";
  export let leadingicon: GoAIconType;

  function selectWithoutLoading() {
    const target = document.querySelector("span[data-testid='test-without-loading']");
    if (target) {
      target.innerHTML = "Test without loading";
    }
  }
</script>

<GoAAppHeaderMenu {heading} {leadingicon}>
  <a href="#seniors">Seniors</a>
  <a href="#family">Family</a>
  <a href="#children">Children</a>
  <a href="#special" on:click={selectWithoutLoading}>Test</a>
</GoAAppHeaderMenu>
<span data-testid="test-without-loading"></span>
