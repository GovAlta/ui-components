<svelte:options customElement="goa-one-column-layout" />

<script lang="ts">
</script>

<div class="page">
  <section class="header">
    <slot name="header" />
  </section>

  <main>
    <slot />
  </main>

  <section class="footer">
    <slot name="footer" />
  </section>
</div>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header,
  .footer {
    flex: 0 0 auto;
  }
  main {
    flex: 1 1 auto;
  }
</style>
