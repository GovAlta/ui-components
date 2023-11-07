<svelte:options tag="goa-two-column-layout" />

<script lang="ts">
  export let navcolumnwidth: string = "";  // blank values falls back to the css var
  export let maxcontentwidth: string = ""; 

</script>

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
    /* container-type: inline-size; */
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
      flex: 0 0 var(--nav-column-width);
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

<div
  class="page"
  style={`
    --max-content-width: ${maxcontentwidth || "100%"};
    --nav-column-width: ${navcolumnwidth || "256px"};
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
  </section>

  <footer class="footer">
    <slot name="footer" />
  </footer>
</div>
