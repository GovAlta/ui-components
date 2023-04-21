<svelte:options tag="goa-three-column-layout" />

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
    --sidebar-column-width: ${rightcolumnwidth || "256px"}
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

    <nav class="nav sidebar">
      <slot name="sidebar"/>
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
    position: relative;
  }

  .content {
    flex: 1 1 auto;
    position: relative;
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

  @media (min-width: 640px) {
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

    .nav:not(.sidebar) {
      flex: 0 0 var(--nav-column-width);
    }
    .nav.sidebar {
      flex: 0 0 var(--sidebar-column-width);
    }
    main {
      padding-right: 2rem;
    }
  }



  @media (min-width: 1300px) {
    .content {
    }

    main {
      padding-right: 4.5rem;
    }
  }

</style>


