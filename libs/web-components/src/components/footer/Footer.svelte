<svelte:options customElement="goa-app-footer" />

<script lang="ts">
  import { onMount, tick } from "svelte";

  /** The maximum width of the main content area */
  export let maxcontentwidth: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

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
      <goa-divider mt="l" mb="l" />
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
        <span class="goa-copyright">© {year} Government of Alberta</span>
      </div>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .app-footer {
    background-color: var(--goa-footer-color-bg);
    color: var(--goa-footer-color-text, var(--goa-color-text-default));
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
  }

  @container self (--tablet) {
    .content {
      padding: var(--goa-footer-padding-medium-screen);
    }
  }

  @container self (--desktop) {
    .content {
      padding: var(--goa-footer-padding-large-screen);
    }
  }

  .meta-section {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-l);
  }

  .meta-section.with-meta-links {
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
    gap: var(--goa-space-xl);
  }

  .abgov {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    gap: var(--goa-space-m);
  }

  .abgov.with-meta-links {
    flex-direction: column;
    width: unset;
  }

  @container self (--not-mobile) {
    .meta-section {
      flex-direction: row;
      gap: var(--goa-space-xl);
    }

    .nav-links {
      flex-direction: row;
      gap: var(--goa-space-2xl);
    }

    .abgov {
      align-items: center;
      flex-direction: row;
    }

    .abgov.with-meta-links {
      align-items: flex-end;
      flex-direction: row;
    }
  }

  .goa-copyright {
    white-space: nowrap;
  }
</style>
