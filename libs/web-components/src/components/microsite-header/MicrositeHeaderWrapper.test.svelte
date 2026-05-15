<svelte:options customElement="test-microsite-wrapper" />

<script lang="ts">
  export let type: string = "alpha";
  export let version: string = "";
  export let feedbackurl: string = "";
  export let maxcontentwidth: string = "";
  export let headerurltarget: string = "";
  export let feedbackurltarget: string = "";
  export let hasSlottedVersion: boolean = false;
</script>

<goa-microsite-header
  {type}
  {version}
  {feedbackurl}
  {maxcontentwidth}
  {headerurltarget}
  {feedbackurltarget}
>
  {#if hasSlottedVersion}
    <div slot="version">
      <span>foo</span>
    </div>
  {/if}
</goa-microsite-header>