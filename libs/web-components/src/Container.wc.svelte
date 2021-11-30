<svelte:options tag="goa-container" />

<!-- Script -->
<script lang="ts">
  export let variant: string = 'default'; // 'primary' | 'info' | 'error' | 'success' | 'warning' | ''
  export let headingsize: string = 'large';  //  'large' | 'small' | 'none'
</script>

<!-- HTML -->
<div class="goa-container goa-container--{variant}">
  <header class="heading--{headingsize}">
    <div class="title">
      <slot name="title" />
    </div>

    <div class="actions">
      <slot name="actions" />
    </div>
  </header>
  <div class="content">
    <slot />
  </div>
</div>

<!-- Style -->
<style>
  .goa-container {
    margin-bottom: 1rem;
    box-sizing: border-box;
  }

  .goa-container * {
    box-sizing: border-box;
  }

  header {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;

    font-size: var(--fs-base);
    border-width: 1px;
    border-style: solid;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .content {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-gray-200);
    border-left: 1px solid var(--color-gray-200);
    border-right: 1px solid var(--color-gray-200);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  /* colors */

  .goa-container--default header {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-200);
    color: var(--color-black);
  }

  .goa-container--primary header {
    background-color: var(--color-tealblue);
    border-color: var(--color-tealblue);
    color: var(--color-white);
  }

  .goa-container--info header {
    background-color: var(--color-blue);
    border-color: var(--color-blue);
    color: var(--color-white);
  }

  .goa-container--error header {
    background-color: var(--color-red);
    border-color: var(--color-red);
    color: var(--color-white);
  }

  .goa-container--success header {
    background-color: var(--color-green);
    border-color: var(--color-green);
    color: var(--color-white);
  }

  .goa-container--warning header {
    background-color: var(--color-orange);
    border-color: var(--color-orange);
    color: var(--color-white);
  }

  /* Sizes */
  .heading--large {
    padding: 0.5rem 1.5rem;
    max-height: 4rem;
  }

  .heading--large .title {
    line-height: 2rem;
  }

  .heading--small {
    height: 0.5rem;
  }

  .heading--none {
    display: none;
  }
  .heading--none ~ .content {
    border-top: 1px solid var(--color-gray-200);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .heading--small .title,
  .heading--small .actions {
    display: none;
  }

</style>
