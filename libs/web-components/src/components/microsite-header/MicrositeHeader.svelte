<svelte:options customElement="goa-microsite-header" />

<!-- Script -->
<script lang="ts">
  import { onMount, tick } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { toBoolean } from "../../common/utils";

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
  export let hasfeedbackhandler: string = "false";
  export let testid: string = "";

  // Validator
  const [UrlTarget, validateUrlTargetType] = typeValidator(
    "URL target values",
    ["self", "blank"],
  );

  $: _hasfeedbackhandler = toBoolean(hasfeedbackhandler);

  let _feedbackElement: HTMLElement;

  // Types
  type UrlTargetType = (typeof UrlTarget)[number];

  function capitalize(val: string): string {
    if (!val || (val && val.length === 0)) return "";
    return val[0].toUpperCase() + val.slice(1);
  }

  function handleFeedbackClick(event: MouseEvent) {
    if (_hasfeedbackhandler == true) {
      event.preventDefault();

      _feedbackElement.dispatchEvent(
        new CustomEvent("_feedbackClick", { composed: true, bubbles: true }),
      );
    }
  }

  onMount(async () => {
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
        {#if feedbackurl}
          <span data-testid="feedback">
            — help us improve it by giving
            <span class="feedback-link">
              <a href={feedbackurl} target={`_${feedbackurltarget}`}>feedback</a>
            </span>
          </span>
        {:else if _hasfeedbackhandler}
          <span data-testid="feedback-click" bind:this={_feedbackElement}>
            — help us improve it by giving
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" on:click={handleFeedbackClick}>feedback</a>
          </span>
        {/if}
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
          <span data-testid="feedback">
            — help us improve it by giving
            <span class="feedback-link">
              <a href={feedbackurl} target={`_${feedbackurltarget}`}>feedback</a>
            </span>
          </span>
        {:else if _hasfeedbackhandler}
          <span data-testid="feedback-click" bind:this={_feedbackElement}>
            — help us improve it by giving
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a href="#" on:click={handleFeedbackClick}>feedback</a>
          </span>
        {/if}
      </div>
    {/if}
    <div class="spacer" />
    {#if $$slots.version || version}
      <div data-testid="version" class="version">
        <slot name="version">
          {version}
        </slot>
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

  .feedback-link {
    display: inline-flex; /* Keeps the text and icon together when text wraps */
}

  #container {
    container: self / inline-size;
    background-color: var(--goa-microsite-header-color-bg);
  }

  a {
    color: var(--goa-microsite-header-color-links);
    cursor: pointer;
  }

  a:hover {
    color: var(--goa-microsite-header-color-links-hover);
  }

  a:focus {
    outline: var(--goa-microsite-header-link-focus-border);
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
    font: var(--goa-microsite-header-typography);
    padding: var(--goa-microsite-header-padding-small-screen);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    max-width: min(var(--max-content-width), 100%);
    margin: 0 auto;
  }

  @container self (--not-mobile) {
    .content-container {
      padding: var(--goa-microsite-header-padding-medium-screen);
    }
  }

  @container self (--desktop) {
    .content-container {
      padding: var(--goa-microsite-header-padding-large-screen);
    }
  }

  .spacer {
    flex: 1 1 auto;
  }

  .version {
    color: var(--goa-microsite-header-color-version-number);
    margin-left: var(--goa-microsite-header-gap);
    font-size: var(--goa-microsite-header-typography-version-number);
  }

  :global(::slotted([slot="version"])) {
    display: flex;
    align-items: center;
  }

  .service-type {
    font-weight: bold;
    padding: 0px 3px 3px 3px; /* vertical allignment */
    display: flex;
    line-height: initial;
    margin-right: var(--goa-microsite-header-gap);
  }

  .service-type--alpha {
    background-color: var(--goa-microsite-header-alpha-badge-color);
    color: var(--goa-microsite-header-alpha-badge-color-text);
  }

  .service-type--beta {
    background-color: var(--goa-microsite-header-beta-badge-color);
    color: var(--goa-microsite-header-beta-badge-color-text);
  }

  .site-text {
    font: var(--goa-microsite-header-typography);
    margin-bottom: 4px; /* vertical allignment */
  }
</style>
