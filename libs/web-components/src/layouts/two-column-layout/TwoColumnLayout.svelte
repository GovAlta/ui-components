<svelte:options tag="goa-two-column-layout" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  export let navcolumnwidth: string = "";  // blank value falls back to the css var
  export let maxcontentwidth: string = "";   // "

  // For sliding nav bar
  // let open: boolean = false;
  // function toggleMenu() {
  //   open = !open;
  // }

  // For sliding nav bar
  // let rootEl: HTMLElement;
  // onMount(async () => {
  //   await tick();
  //   const navSlot = rootEl.querySelector("slot[name=nav]") as HTMLSlotElement;
  //   const navLinks = navSlot.assignedElements();
  //   for (const link of navLinks) {
  //     link.addEventListener("click", () => open = false);
  //   }
  // });

</script>

<style>
  * {
    box-sizing: border-box;
  }
  .page {
    height: 100vh;
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
    background-color: var(--color-white);
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

  /** Come back to when hiding sidebar is added
  .toggle-menu-button {
    position: absolute;
    transition: transform 200ms ease-in-out; 
    top: 0;
    padding: 6px;
    z-index: 9999;
  }

  @media (max-width: 639px) {
    .nav {
      position: absolute;
      left: calc(-1 * var(--nav-column-width));
      width: var(--nav-column-width);
      bottom: 0;
      top: 0;
      z-index: 999;
    }

    .open .nav {
      transform: translateX(var(--nav-column-width));
      box-shadow: 3px 0 7px -4px rgba(0,0,0,0.15);
    }

    .open .toggle-menu-button {
      transform: translateX(200px);
    }

    .open main {
      pointer-events: none;
    }
  }
  **/

  @media (min-width: 640px) {
    .nav {
      transform: translateX(0);
      flex: 0 0 var(--nav-column-width);
    }
    /** icons styles
    .open .toggle-menu-button {
      transform: translateX(calc(-1 * var(--nav-column-width)));
      transition: transform 200ms ease-in-out; 
    }
    .toggle-menu-button {
      visibility: hidden;
      pointer-events: none;
    }
    **/
  }

</style>

<div 
  class="page"
  style={`
    --max-content-width: ${maxcontentwidth || "100%"};
    --nav-column-width: ${navcolumnwidth || "var(--layout-nav-column-width)"};
  `}
>
  <header class="header">
    <slot name="header" />
  </header>

  <section class="content">
    <!--<goa-icon-button variant="nocolor" class="toggle-menu-button" type="menu" on:click={toggleMenu} />-->
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
