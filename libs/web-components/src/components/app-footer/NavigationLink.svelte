<svelte:options tag="goa-navigation-link" />

<!-- Script -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { getContext, ContextStore } from '../../common/context-store';
  import { NAVIGATION_LINK } from "./types";

  export let footerid: string = "goa-app-footer-id";
  export let title: string = "";
  export let url: string = "";
  export let section: string = "";

  let ctx: ContextStore;

  onMount(async () => {
    ctx = await getContext(footerid);

    ctx.notify({
      type: NAVIGATION_LINK,
      url: url,
      title: title,
      section: section,
    });
  });

</script>

