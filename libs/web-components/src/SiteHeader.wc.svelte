<svelte:options tag="goa-site-header" />

<!-- Script -->
<script lang="ts">
  export let servicelevel: string;

</script>

<!-- HTML -->
<header class="goa-official-site-header">
  <div>
    <span class="service-level service-level--{servicelevel?.toLowerCase()}">
      {servicelevel}
    </span>
  </div>

  {#if servicelevel === 'live'}
    <div class="site-text">
      An official site of the <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a>
    </div>
  {/if}

  {#if servicelevel !== 'live'}
    <div class="site-text">
      This is a new <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a> service
    </div>
  {/if}
</header>

<!-- Style -->
<style>
  .goa-official-site-header {
    display: flex;
    font-size: var(--fs-xs);
    color: var(--color-black);
    align-items: center;
    gap: 0.25rem;
  }

  .service-level {
    font-weight: bold;
    color: #fff;
    background-color: #000;
    padding: 0.25rem 0.5rem;
  }

  .service-level--alpha {
    background-color: var(--color-orange);
    color: var(--color-black);
  }

  .service-level--beta {
    background-color: var(--color-blue-600);
    color: var(--color-white);
  }

  .service-level--live {
    height: 16px;
    width: 16px;
    padding: 0;
    color: transparent;
  }

  .site-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
