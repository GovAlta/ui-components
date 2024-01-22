<svelte:options customElement="goa-three-column-layout" />

<!-- Script -->
<script lang="ts">
  export let leftcolumnwidth: string;
  export let rightcolumnwidth: string;
  export let maxcontentwidth: string;
</script>

<!-- HTML -->
<div
  class="page"
  style={`
    --max-content-width: ${maxcontentwidth || "100%"};
    --nav-column-width: ${leftcolumnwidth || "256px"};
    --side-menu-column-width: ${rightcolumnwidth || "256px"}
  `}
>
  <header class="header">
    <slot name="header" />
  </header>

  <section class="content">
    <nav class="nav">
      <slot name="nav" />
    </nav>

    <main>
      <slot />
    </main>

    <nav class="nav side-menu">
      <!-- DEPRECATED: sidebar is deprecated  -->
      <slot name="sidebar" />
      <slot name="side-menu" />
    </nav>
  </section>

  <footer class="footer">
    <slot name="footer" />
  </footer>
</div>

<!-- Style -->
<style>
  * {
    box-sizing: border-box;
  }
  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .header,
  .footer {
    flex: 0 0 auto;
  }

  main {
    flex: 1 1 auto;
    padding: 0 1rem;
  }

  .nav {
    padding: 0 1rem;
    transition: transform 200ms ease-in-out;
    background-color: var(--goa-color-greyscale-white);
  }

  .nav > * {
    display: block;
    padding: 0.5rem 0;
  }

  @media not (--mobile) {
    .page {
      gap: 2rem;
    }
    .content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: min(var(--max-content-width), 100vw);
      margin: 0 auto;
    }

    .nav {
      padding: 0 2rem;
      transform: translateX(0);
    }

    .nav:not(.side-menu) {
      flex: 0 0 var(--nav-column-width);
    }
    .nav.side-menu {
      flex: 0 0 var(--side-menu-column-width);
    }
    main {
      padding-right: 2rem;
    }
  }

  @media (--desktop) {
    main {
      padding-right: 4.5rem;
    }
  }
</style>
