<svelte:options tag="goa-service-level-header" />

<!-- Script -->
<script lang="ts">
  export let level: "live" | "alpha" | "beta";
  export let version: string;
</script>

<!-- HTML -->
<header class="goa-official-site-header">
  {#if level === "live"}
    <div data-testid="level" class="site-text service-level--live">
      An official site of the <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a>
    </div>
  {/if}

  {#if level !== "live"}
    <div data-testid="level" class="service-level service-level--{level?.toLowerCase()}">
      {level}
    </div>
    <div class="site-text">
      This is a new <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a> service
    </div>
  {/if}
  <div class="spacer" />
  {#if version}
    <div data-testid="version" class="version">
      {version}
    </div>
  {/if}
</header>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }
  .goa-official-site-header {
    display: flex;
    font-size: var(--fs-xs);
    background-color: var(--color-gray-100);
    align-items: center;
    justify-content: space-between;
  }
  .spacer {
    flex: 1 1 auto;
  }

  .version {
    padding-right: 1rem;
    opacity: 0.5;
  }

  .service-level {
    font-weight: bold;
    padding: 0 0.5rem;
  }

  .service-level--alpha {
    /* TODO: this color name needs a new name */
    background-color: var(--color-orange);
    color: var(--color-black);
  }

  .service-level--beta {
    /* TODO: this color name needs a new name */
    background-color: var(--goa-color-primary-dark);
    color: var(--color-white);
  }

  .site-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--color-black);
    padding-left: 0.5rem;
  }
</style>
