<svelte:options customElement="goa-public-form-task" />

<script lang="ts">
  export let status: "completed" | "not-started" | "cannot-start" = "cannot-start";

  $: _badgeType =
    status === "completed"
      ? "success"
      : status === "not-started"
        ? "information"
        : "light";

  $: _badgeContent =
    status === "completed"
      ? "Completed"
      : status === "not-started"
        ? "Not started"
        : "Cannot start yet";

</script>

<goa-block>
  <div class="description"><slot /></div>
  <goa-spacer hspacing="fill" type={status} />
  <goa-badge type={_badgeType} content={_badgeContent} />
</goa-block>

<style>
  .description {
    min-width: 40ch;
  }
</style>
