<svelte:options customElement="test-app-header-menu-wrapper" />

<script lang="ts">
  import type { GoAIconType } from "../icon/Icon.svelte";
  import GoAAppHeaderMenu from "./AppHeaderMenu.svelte";

  export let heading: string = "some label";
  export let leadingicon: GoAIconType;
</script>

<GoAAppHeaderMenu {heading} {leadingicon}>
  <a href="#seniors">Seniors</a>
  <a href="#family">Family</a>
  <a href="#children">Children</a>
</GoAAppHeaderMenu>
