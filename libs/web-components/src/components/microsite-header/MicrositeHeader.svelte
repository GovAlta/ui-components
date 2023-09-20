<svelte:options tag="goa-microsite-header" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator("Microsite header type", ["live", "alpha", "beta"], true);
  // Type
  type Type = typeof Types[number];

  export let type: Type;
  export let version: string = "";
  export let feedbackurl: string = "";
  export let maxcontentwidth = "100%";

  function capitalize(val: string): string {
    if (!val || (val && val.length === 0)) return "";
    return val[0].toUpperCase() + val.slice(1);
  }

  onMount(() => {
    setTimeout(() => validateType(type), 1);
  });
</script>

<!-- HTML -->
<header class="goa-official-site-header" style={`--max-content-width: ${maxcontentwidth}`}>
  <div class="content-container">
    {#if type === "live"}
      <div data-testid="type" class="site-text">
        An official site of the <a href="https://www.alberta.ca/index.aspx">Alberta Government</a>
      </div>
    {/if}

    {#if ["alpha", "beta"].includes(type)}
      <div
        data-testid="type"
        class="service-type service-type--{type.toLowerCase()}"
      >
        {capitalize(type)}
      </div>
      <div data-testid="site-text" class="site-text">
        This is a new <a href="https://www.alberta.ca/index.aspx">Alberta Government</a> service
        {#if feedbackurl}
          <span data-testid="feedback">— help us improve it by giving <a href={feedbackurl}>feedback</a></span>
        {/if}
      </div>
    {/if}
    <div class="spacer" />
    {#if version}
      <div data-testid="version" class="version">
        {version}
      </div>
    {/if}
  </div>
</header>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  a {
    color: var(--goa-color-interactive-default);
    cursor: pointer;
  }

  a:hover {
    color: var(--goa-color-interactive-hover);
  }

  a:focus {
    outline-width: thin;
    outline-style: solid;
    outline-color: var(--goa-color-interactive-hover);
    outline-offset: 0px;
  }

  .goa-official-site-header {
    font-size: var(--goa-font-size-2);
    background-color: var(--goa-color-greyscale-100);
    padding: 0.5rem 1rem;
  }

  .content-container {
    display: flex;
    align-items: start;
    justify-content: space-between;
    max-width: min(var(--max-content-width), 100%);
    margin: 0 auto;
  }

  @media not (--mobile) {
    .goa-official-site-header {
      padding: 0.25rem 2rem;
    }
    .content-container {
      align-items: center;
    }
  }

  @media (--desktop) {
    .goa-official-site-header {
      padding: 0.25rem 4.5rem;
    }
  }

  .spacer {
    flex: 1 1 auto;
  }

  .version {
    color: var(--goa-color-text-secondary);
    padding-left: 1rem;
    line-height: 1.25rem;
  }

  .service-type {
    font-weight: bold;
    padding: 0.125rem 0.25rem;
    display: flex;
    margin-right: 1rem;
    line-height: initial;
  }

  .service-type--alpha {
    background-color: var(--goa-color-warning-default);
    color: var(--goa-color-text-default);
  }

  .service-type--beta {
    background-color: var(--goa-color-brand-default);
    color: var(--goa-color-text-light);
  }

  .site-text {
    color: var(--goa-color-text-default);
    line-height: 1.25rem;
  }

</style>
