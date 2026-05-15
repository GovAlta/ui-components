<svelte:options customElement="goa-layout-full-nav" />

<div class="page">
  <header class="header">
    <slot name="header" />
  </header>

  <nav class="nav">
    <slot name="nav" />
  </nav>

  <main>
    <slot />
  </main>

  <footer class="footer">
    <slot name="footer" />
  </footer>
</div>

<style>
  .page {
    height: 100vh;
    grid-template-columns: auto;
    grid-template-rows: min-content auto min-content;
    grid-template-areas:
      "header"
      "content"
      "nav"
      "footer";
    display: grid;
    place-content: stretch stretch;
    gap: 0 0;
  }

  @media (--mobile) {
    .page {
      grid-template-columns: 300px auto;
      grid-template-rows: min-content auto min-content;
      grid-template-areas:
        "header header"
        "nav content"
        "footer footer";
    }
  }

  .header {
    grid-area: header;
  }
  .footer {
    grid-area: footer;
  }

  main {
    grid-area: content;
    justify-self: stretch;
    padding: 1rem;
  }

  .nav {
    grid-area: nav;
    padding: 1rem;
    background-color: var(--goa-color-greyscale-100);
  }
</style>
