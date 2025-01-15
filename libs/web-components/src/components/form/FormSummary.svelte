<svelte:options customElement="goa-public-form-summary" />

<script lang="ts">
  import { onMount } from "svelte";
  import {
  FieldsetItemState,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormState,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
  } from "../../types/relay-types";

  import { receive, relay } from "../../common/utils";

  export let heading: string = "";

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

  /**
   * Receive state updates from the form
   * @param detail
   */
  function onFormDispatch(detail: FormDispatchStateRelayDetail) {
    _state = detail;
  }

  function changePage(e: Event, pageId: string) {
    relay<FormSummaryEditPageRelayDetail>(_rootEl, FormSummaryEditPageMsg, { id: pageId }, { bubbles: true })
    e.preventDefault();
  }

  function getHeading(page: string): string {
    return _state.form?.[page]?.heading || "";
  }

  function getData(state: FormState, page: string): Record<string, FieldsetItemState> {
    if (state.form[page]?.data?.type !== "details") {
      return;
    }

    const data = Object
        .entries(state.form[page].data.fieldsets || {})
        .sort((itemsA, itemsB) => itemsA[1].order > itemsB[1].order ? 1 : -1)
        .reduce((acc, [name, fieldsetState]) => {
          acc[name] = fieldsetState;
          return acc;
        }, {});
      return data;
  }

  function getDataList(state: FormState, page: string): Record<string, FieldsetItemState>[] {
    const pageData = state.form[page]?.data;
    if (pageData?.type !== "list") {
      return;
    }

    const data = pageData.items.reduce((acc, formState) => {
      const data = formState.history.reduce((acc, fieldsetId) => {
        acc = {...acc, ...getData(formState, fieldsetId)};
        return acc;
      }, {})
      acc.push(data);
      return acc;
    }, []);

    return data;
  }

</script>

<div bind:this={_rootEl}>
  {#if heading}
    <goa-text as="h3" size="heading-m" color="secondary" mb="l">{heading}</goa-text>
  {/if}
  {#if _state}
    {#each _state.history as page}
      {#if _state.form[page] && !_state.form[page]?.skipSummary}
        <goa-container>
          <div class="summary" class:summary-with-header={!!getHeading(page)}>
            {#if getHeading(page)}
              <goa-text class="heading" color="secondary">{getHeading(page)}</goa-text>
            {/if}

            <div class="data">
              {#if _state.form[page]?.data?.type}
                {#if _state.form[page]?.data?.type === "details"}
                  <table>
                    {#each Object.entries(getData(_state, page)) as [_, data]}
                      <tr>
                        <td class="label">{data.label}</td>
                        <td class="value">{data.value}</td>
                      </tr>
                    {/each}
                  </table>
                {:else}
                  {#each getDataList(_state, page) as item, index}
                    <table>
                      {#each Object.entries(item) as [_, data]}
                        <tr>
                          <td class="label">{data.label}</td>
                          <td class="value">{data.value}</td>
                        </tr>
                      {/each}
                    </table>
                    {#if index < getDataList(_state, page).length - 1}
                      <goa-divider mt="m" mb="m" />
                    {/if}
                  {/each}
                {/if}
              {/if}
            </div>
            <div class="action">
              <goa-link leadingicon="pencil" on:click={(e) => changePage(e, page)}>Change</goa-link>
            </div>
          </div>
        </goa-container>
      {/if}
    {/each}
  {/if}
</div>

<style>

  /* TODO: fix the layouts: mobile doesn't meet specs; table makes it difficult */
  @media (--not-desktop) {
    .summary {
      display: block;
      grid-template-rows: min-content auto;
      grid-template-columns: auto;
      grid-template-areas:
        "top top top"
    }

    .data tr:last-of-type {
      padding-bottom: var(--goa-space-m);
    }
    .data td:first-of-type {
      font-weight: bold;
    }
    .data td {
      display: block;
    }

    .action {
      margin-top: var(--goa-space-m);
    }
  }

  @media (--desktop) {
    .summary {
      display: grid;
      grid-auto-rows: 1fr;
      grid-template-columns: 1fr min-content;
      grid-template-areas:
        "data action"
    }

    .summary-with-header {
      display: grid;
      /*grid-auto-rows: min-content auto;*/
      grid-auto-rows: auto;
      /*grid-auto-rows: minmax(100px, auto);*/
      grid-template-columns: 1fr min-content;
      grid-template-areas:
        "heading action"
        "data ."
    }

    .heading {
      grid-area: heading;
      grid-template-columns: 1fr 1fr;
    }

    .action {
      grid-area: action;
      text-align: right;
    }

    .data {
      grid-area: data;
    }

    table {
      width: 100%;
    }

    .label {
      width: 50%;
      font: var(--goa-typography-heading-s);
    }
    .value {
      width: 50%;
      padding-left: 1rem;
    }
  }
</style>
