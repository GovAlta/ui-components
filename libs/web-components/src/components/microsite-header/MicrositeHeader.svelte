<svelte:options customElement="goa-microsite-header" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "Microsite header type",
    ["live", "alpha", "beta"],
    true,
  );
  // Type
  type Type = (typeof Types)[number];

  export let type: Type;
  export let version: string = "";
  export let feedbackurl: string = "";
  export let maxcontentwidth = "100%";
  export let headerurltarget: UrlTargetType = "blank";
  export let feedbackurltarget: UrlTargetType = "blank";
  export let testid: string = "";

  // Validator
  const [UrlTarget, validateUrlTargetType] = typeValidator(
    "URL target values",
    ["self", "blank"],
  );

  // Types
  type UrlTargetType = (typeof UrlTarget)[number];

  function capitalize(val: string): string {
    if (!val || (val && val.length === 0)) return "";
    return val[0].toUpperCase() + val.slice(1);
  }

  onMount(() => {
    setTimeout(() => validateType(type), 1);
    validateUrlTargetType(headerurltarget);
    validateUrlTargetType(feedbackurltarget);
  });
</script>

<!-- HTML -->
<div id="container" data-testid={testid}>
  <div
    class="content-container"
    style={`--max-content-width: ${maxcontentwidth}`}
  >
    {#if type === "live"}
      <div data-testid="type" class="site-text">
        An official site of the <a
          href="https://www.alberta.ca/index.aspx"
          target={`_${headerurltarget}`}>Alberta Government</a
        >
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
        This is a new <a
          href="https://www.alberta.ca/index.aspx"
          target={`_${headerurltarget}`}>Alberta Government</a
        >
        service
        {#if feedbackurl}
          <span data-testid="feedback"
            >— help us improve it by giving <a
              href={feedbackurl}
              target={`_${feedbackurltarget}`}>feedback</a
            ></span
          >
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
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  #container {
    container: self / inline-size;
    background-color: var(--goa-color-greyscale-100);
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

  a[target="_blank"]::after {
    content: "";
    width: var(--goa-icon-size-s);
    height: var(--goa-icon-size-s);
    background-color: var(--goa-color-interactive-default);
    display: inline-block;
    margin-left: var(--goa-space-2xs);
    vertical-align: sub;
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ionicon%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M384%20224v184a40%2040%200%200%201-40%2040H104a40%2040%200%200%201-40-40V168a40%2040%200%200%201%2040-40h167.48M336%2064h112v112M224%20288%20440%2072%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2232%22%2F%3E%3C%2Fsvg%3E")
      center bottom no-repeat;
    -webkit-mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22ionicon%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20d%3D%22M384%20224v184a40%2040%200%200%201-40%2040H104a40%2040%200%200%201-40-40V168a40%2040%200%200%201%2040-40h167.48M336%2064h112v112M224%20288%20440%2072%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%2232%22%2F%3E%3C%2Fsvg%3E")
      center bottom no-repeat;
  }
  a[target="_blank"]:hover:after {
    background-color: var(--goa-color-interactive-hover);
  }

  .content-container {

    font-size: var(--goa-font-size-2);
    padding: var(--goa-space-xs) var(--goa-space-m);

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: min(var(--max-content-width), 100%);
    margin: 0 auto;
  }

  @container self (--not-mobile) {
    .content-container {
      align-items: center;
      padding: var(--goa-space-2xs) var(--goa-space-xl);
    }
  }

  @container self (--desktop) {
    .content-container {
      padding: var(--goa-space-2xs) var(--goa-space-3xl);
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
