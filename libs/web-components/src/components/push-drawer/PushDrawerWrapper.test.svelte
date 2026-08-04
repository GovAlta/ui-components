<script lang="ts">
  import PushDrawer from "./PushDrawer.svelte";

  export let open: boolean = true;
</script>

<PushDrawer {open}>
  <div slot="heading" data-testid="custom-heading">Custom Heading Content</div>
  <p>Body content</p>
</PushDrawer>
