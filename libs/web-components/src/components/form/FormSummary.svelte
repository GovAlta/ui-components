<svelte:options customElement="goa-public-form-summary" />

<script lang="ts">
  import { onMount } from "svelte";
  import {
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormState,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
  } from "../../types/relay-types";
  import { receive, relay } from "../../common/utils";
  import { format, isDate, parseISO } from "date-fns";

  let _rootEl: HTMLElement;
  let _state: FormState;
  
  onMount(() => {
    addRelayListener();

    relay<FormSummaryBindRelayDetail>(
      _rootEl,
      FormSummaryBindMsg,
      { el: _rootEl },
      { bubbles: true, timeout: 100 },
    );
  });

  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FormDispatchStateMsg:
          onFormDispatch(data as FormDispatchStateRelayDetail);
          break;
      }
    });
  }

  function onFormDispatch(detail: FormDispatchStateRelayDetail) {
    _state = detail
  }

  function changePage(e: Event, pageId: string) {
    relay<FormSummaryEditPageRelayDetail>(_rootEl, FormSummaryEditPageMsg, { id: pageId }, { bubbles: true })
    e.preventDefault();
  }

  // TODO: show the fieldset heading instead of this
  function formatName(value: string): string {
    if (!value) return "";

    const str = value.replace(/-/g, " ");
    return str[0].toUpperCase() + str.slice(1);
  }

  function formatValue(value: unknown): unknown {
    let parsedDate: Date;
    // TODO: need some better logic to determine how things will be handled
    if (typeof value === "string") {
      try {
        parsedDate = parseISO(value);
        return format(parsedDate, "PPP");
      } catch (e) {
        return value;  
      }
    }
    if (isDate(value)) {
      return format(value, "PPP");
    }
    return value;      
  }
  
</script>

<div bind:this={_rootEl}>
  {#if _state}
    {#each _state.history as page}
      {#if _state.form[page]}
        <goa-container>
          <div class="summary">
            <div class="page">{formatName(page)}</div>
            <div class="action">
              <goa-link leadingicon="pencil" on:click={(e) => changePage(e, page)}>Change</goa-link>
            </div>
            <div class="details">
              {#if Array.isArray(_state.form[page])}
                {#each _state.form[page] as item, i}
                  {#if i > 0}
                    <goa-divider />
                  {/if}
                  {#each Object.entries(item) as [_, value] }
                    <dl>
                      <dt>{value.label}</dt>
                      <dd>{formatValue(value.value)}</dd>
                    </dl>
                  {/each}
                {/each}
              {:else}
                {#each Object.entries(_state.form[page]) as [_, value] }
                  <dl>
                    <dt>{value.label}</dt>
                    <dd>{formatValue(value.value)}</dd>
                  </dl>
                {/each}
              {/if}
            </div>
          </div>
        </goa-container>
      {/if}
    {/each}
  {/if}
</div>

<style>

  .page {
    color: var(--goa-color-greyscale-700);
  }

  @media (--not-desktop) {
    .summary {
      display: grid;
      grid-template-rows: min-content 1fr;
      grid-template-columns: auto;
      grid-template-areas: 
        "top top top"
        "main main main"
        "link link link"
    }

    .page {
      grid-area: top;
    }

    .action {
      grid-area: link;
      margin-top: 0.25rem;
    }

    .details {
      grid-area: main;
    }

    dl {
      margin: 0.5rem 0;
    }
    dt {
      font: var(--goa-typography-heading-s);
    }
    dd {
      margin: 0;
    }
  }

  @media (--desktop) {
    .summary {
      display: grid;
      grid-template-rows: min-content 1fr;
      grid-template-columns: auto;
      grid-template-areas: 
        "top . link"
        "main main main"
    }

    .page {
      grid-area: top;
    }

    .action {
      grid-area: link;
      text-align: right;
    }

    .details {
      grid-area: main;
    }
  
    dl {
      margin: 0.5rem 0;
    }
    dt {
      display: inline-block;  
      width: 50%;
      font: var(--goa-typography-heading-s);
    }
    dd {
      display: inline-block;  
    }
  }
</style>
