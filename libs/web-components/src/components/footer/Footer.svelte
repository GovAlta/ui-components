<svelte:options customElement="goa-app-footer" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import goalogo from "../../assets/goa-logo.svg";

  export let maxcontentwidth: string = "";
  export let testid: string = "";
  export let url: string = "";

  let rootEl: HTMLElement;
  let navLinks: Element[];
  let metaLinks: Element[];

  const year = new Date().getFullYear();

  onMount(async () => {
    await tick();
    const navSlot = rootEl.querySelector("slot[name=nav]") as HTMLSlotElement;
    const metaSlot = rootEl.querySelector("slot[name=meta]") as HTMLSlotElement;
    metaLinks = metaSlot?.assignedElements();
    navLinks = navSlot?.assignedElements();
  });
</script>

<div
  class="app-footer"
  bind:this={rootEl}
  style={`--max-content-width: ${maxcontentwidth || "100%"}`}
  data-testid={testid}
>
  <div class="content">
    <div class="nav-links">
      <slot name="nav" />
    </div>

    {#if navLinks?.length > 0}
      <goa-divider mt="l" mb="l"/>
    {/if}

    <div
      class="meta-section"
      class:with-meta-links={metaLinks && metaLinks.length > 0}
    >
      <div class="meta-links">
        <slot name="meta" />
      </div>

      <div
        class="abgov"
        class:with-meta-links={metaLinks && metaLinks.length > 0}
      >
      <!-- Logo and optional link -->
      {#if url}
        <a href={url}>
          <img src={goalogo} alt="Government of Alberta Logo" class="logo"/>
        </a>
      {:else}
        <img src={goalogo} alt="Government of Alberta Logo" class="logo"/>
      {/if}

        <a href="https://alberta.ca" class="goa-copyright">
          © {year} Government of Alberta
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  :host {
    /* TODO: Component tokens, to move to design tokens file ------------------------------------------------------- */
    --goa-footer-color-bg: var(--goa-color-greyscale-100);
    --goa-footer-border-top: var(--goa-border-width-m) solid var(--goa-color-greyscale-200);
    --goa-footer-border-bottom: 1rem solid var(--goa-color-brand-default);
    --goa-footer-padding-small-screen: var(--goa-space-xl) var(--goa-space-m);
    --goa-footer-padding-medium-screen: var(--goa-space-2xl) var(--goa-space-xl);
    --goa-footer-padding-large-screen: var(--goa-space-2xl) var(--goa-space-3xl);

    --goa-footer-color-links: var(--goa-color-text-secondary);
    --goa-footer-color-links-hover: var(--goa-color-greyscale-900);
    --goa-footer-link-focus: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);

    --goa-footer-typography-small-screen: var(--goa-font-size-3);
  }

  * {
    box-sizing: border-box;
  }

  .app-footer {
    background-color: var(--goa-footer-color-bg);
    border-top: var(--goa-footer-border-top);
    border-bottom: var(--goa-footer-border-bottom);
    container: self / inline-size;
  }

  .content {
    margin: 0 auto;
    width: min(var(--max-content-width), 100%);
  }

  @container self (--mobile) {
    .content {
      padding: var(--goa-footer-padding-small-screen);
      font-size: var(--goa-footer-typography-small-screen);
    }
    .logo {
    width: 133px;
    }
  }

  @container self (--tablet) {
    .content {
      padding: var(--goa-footer-padding-medium-screen);
    }
    .logo {
    width: 155px;
    }
  }

  @container self (--desktop) {
    .content {
      padding: var(--goa-footer-padding-large-screen);
    }
    .logo {
    width: 155px;
    }
  }

  .meta-section {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-l); /* space above logo and below meta links */
  }

  .meta-section.with-meta-links {
  /* gap between meta links and goa log when stacked vertically on small screen  */

    justify-content: space-between;
  }

  .meta-links {
    display: none;
  }
  .with-meta-links .meta-links {
    display: block;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-xl); /* space between different columns/rows of nav links on mobile */
  }


  .abgov {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    gap: var(--goa-space-m);   /* gap between copyright and goa log when stacked vertically on small screen  */
  }

  @container self (--not-mobile) {
    .meta-section {
      flex-direction: row;
      gap: var(--goa-space-xl);
    }

    .nav-links {
      flex-direction: row;
      gap: var(--goa-space-2xl); /* space between different columns/rows of nav links on desktop */
    }

    .abgov {
      align-items: center;
      flex-direction: row-reverse;
      gap: var(--goa-space-m);
    }
  }

  .abgov.with-meta-links {
    gap: var(--goa-space-m); /* gap between copyright and goa logo when stacked  */
    flex-direction: column;
    width: unset;
  }

  @container self (--not-mobile) {
    .abgov.with-meta-links {
      align-items: flex-end;
    }
  }

  .goa-copyright {
    white-space: nowrap;
  }

  a {
    color: var(--goa-footer-color-links);
    cursor: pointer;
  }

  a:hover {
    color: var(--goa-footer-color-links-hover);
  }

  a:focus-visible {
    outline: var(--goa-footer-link-focus);
    border-radius: 2px;
  }
</style>