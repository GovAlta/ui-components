<svelte:options tag="goa-microsite-header" />

<!-- Script -->
<script lang="ts">
  export let type: "live" | "alpha" | "beta";
  export let version: string = "";
  export let feedbackurl: string = "";

  function capitalize(val: string): string {
    if (!val || (val && val.length === 0)) return "";
    return val[0].toUpperCase() + val.slice(1);
  }
</script>

<!-- HTML -->
<header class="goa-official-site-header">
  {#if type === "live"}
    <div class="service-type service-type--live">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26Z" fill="#00AAD2" />
        <path d="M16.9764 17.7174C15.942 17.3358 14.9325 16.8896 13.9539 16.3817C14.8446 16.0551 15.7131 15.6708 16.5539 15.2312C16.6398 16.0688 16.7831 16.8995 16.9829 17.7174H16.9764ZM22.5339 7.42143C22.1016 7.36618 22.3259 7.56931 22.2089 8.13968C21.863 9.3075 21.2806 10.3917 20.4978 11.3248C19.7151 12.258 18.7487 13.0201 17.6589 13.5639C17.3972 10.9368 17.5336 8.28529 18.0635 5.69893C18.5104 4.07393 19.0385 4.3778 18.3885 4.03818C17.6946 3.68068 16.9471 4.15356 16.3443 5.35931C14.4174 9.81946 11.7695 13.932 8.50689 17.5322C7.96404 18.2422 7.16875 18.7161 6.28592 18.8556C5.40309 18.9951 4.50044 18.7894 3.76514 18.2813C3.43039 17.9986 3.30689 18.4357 3.72289 18.8826C4.47366 19.5882 5.47211 19.9699 6.50216 19.945C7.53222 19.92 8.51102 19.4905 9.22677 18.7493C12.0405 15.3939 14.429 11.7038 16.3378 7.76268C16.1901 9.91268 16.2243 12.0713 16.4401 14.2156C15.4158 14.7181 14.3475 15.1256 13.2486 15.4327C12.6181 15.5952 12.2281 15.8552 12.2168 16.1461C12.2054 16.4711 12.6279 16.7359 13.2405 17.0252C14.3293 17.5419 17.5191 19.0499 18.3056 19.5066C18.9784 19.8966 19.3066 19.5927 19.5065 19.1702C19.7665 18.6209 19.0531 18.3041 18.369 18.0961C18.0632 16.9353 17.8555 15.7508 17.7483 14.5552C19.4404 13.5939 20.8636 12.2226 21.8871 10.5674C22.1817 9.98406 22.4001 9.36529 22.5371 8.7263C22.6338 8.3321 22.6602 7.92393 22.6151 7.52056C22.6151 7.52056 22.6038 7.43281 22.5371 7.42468" fill="white" />
      </svg>
    </div>
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
</header>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  a {
    color: var(--goa-color-interactive);
    cursor: pointer;
  }

  a:hover {
    color: var(--goa-color-interactive--hover);
  }

  a:focus {
    outline-width: thin;
    outline-style: solid;
    outline-color: var(--goa-color-interactive--hover);
    outline-offset: 0px;
  }

  .goa-official-site-header {
    display: flex;
    font-size: var(--fs-sm);
    background-color: var(--color-gray-100);
    align-items: center;
    justify-content: space-between;
    padding: 0.25rem 1.5rem;
  }
    @media (max-width: 640px) {
      .goa-official-site-header {
        padding: 0.5rem 1rem;
        align-items: start;
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
    background-color: var(--goa-color-status-warning);
    color: var(--goa-color-text);
  }

  .service-type--beta {
    background-color: var(--goa-color-brand);
    color: var(--goa-color-text-light);
  }

  .service-type--live {
    padding: 0;
  }

  .site-text {
    color: var(--goa-color-text);
    line-height: 1.25rem;
  }

</style>
