<svelte:options tag="goa-page" />

<script lang="ts">
</script>

<style>
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header, .footer {
    flex: 0 0 auto;
  }
  main {
    flex: 1 1 auto;
  }
</style>

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
