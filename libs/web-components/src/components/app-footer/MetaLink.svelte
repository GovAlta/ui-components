<svelte:options tag="goa-meta-link" />

<!-- Script -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { getContext, ContextStore } from '../../common/context-store';
  import { META_LINK } from "./types";

  export let footerid: string = "goa-app-footer-id";
  export let title: string = "";
  export let url: string = "";

  let ctx: ContextStore;

  onMount(async () => {
    ctx = await getContext(footerid);
    ctx.notify({
      type: META_LINK,
      url: url,
      title: title
    });
  });

</script>

