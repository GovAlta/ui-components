<svelte:options customElement="goa-public-form-summary" />

<script lang="ts">
  import { onMount } from "svelte";
  import {
    FieldsetItemState,
    FormDispatchStateToSubformRelayDetail, FormDispatchStateToSummaryMsg, FormDispatchStateToSummaryRelayDetail,
    FormState,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
  } from "../../types/relay-types";

  import { receive, relay } from "../../common/utils";

  export let heading: string = "";

  let _el: HTMLElement;
  let _state: FormState;

  // FIXME: this element ref is not needed
  let _formEl: HTMLElement;

  onMount(() => {
    console.debug("FormSummary:onMount");
    addRelayListener();
    bindWithParentForm();
  });

  function bindWithParentForm() {
    relay<FormSummaryBindRelayDetail>(_el, FormSummaryBindMsg, { el: _el }, { bubbles: true, timeout: 10 });
  }

  function addRelayListener() {
    receive(_el, (action, data) => {
      console.debug("FormSummary:receive", action, data);
      switch (action) {
        case FormDispatchStateToSummaryMsg: {
          onFormDispatch(data as FormDispatchStateToSummaryRelayDetail);
          break;
        }
      }
    });
  }

  /**
   * Receive state updates from the form
   * @param detail
   */
  function onFormDispatch(detail: FormDispatchStateToSummaryRelayDetail) {
    console.debug("FormSummary:onFormDispatch", detail);
    _state = detail.data;
    _formEl = detail.formEl;
  }

  function changePage(e: Event, pageId: string) {
    relay<FormSummaryEditPageRelayDetail>(_el, FormSummaryEditPageMsg, { id: pageId }, { bubbles: true });
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
    console.log("FormSummary:getData", data);
    return data;
  }

  function getDataList(state: FormState, page: string): Record<string, FieldsetItemState>[] {
    console.debug("FormSummary:getDataList", page, state);
    if (state.form[page]?.data?.type !== "list") {
      return;
    }

    const data = state.form[page].data.items.reduce((acc, formState) => {
      const data = formState.history.reduce((acc, fieldsetId) => {
        acc = { ...acc, ...getData(formState, fieldsetId) };
        return acc;
      }, {});
      acc.push(data);
      return acc;
    }, []);

    console.log("FormSummary:getDataList", data);
    return data;
  }

</script>

<div bind:this={_el}>
  {#if heading}
    <goa-text as="h3" size="heading-m" color="secondary" mb="l">{heading}</goa-text>
  {/if}
  {#if _state}
    {#each _state.history as page}
      {#if !_state.form[page]?.skipSummary}
        <goa-container>
          <div class="summary" class:summary-with-header={!!getHeading(page)}>
            {#if getHeading(page)}
              <goa-text class="heading" color="secondary">{getHeading(page)}</goa-text>
            {/if}

            {#if _state.form[page]?.data?.type}
              {#if _state.form[page]?.data?.type === "details"}
                <table class="data">
                  {#each Object.entries(getData(_state, page)) as [_, data]}
                    <tr>
                      <td class="label">{data.label}</td>
                      <td class="value">{data.value}</td>
                    </tr>
                  {/each}
                </table>
              {:else}
                {#each getDataList(_state, page) as item}
                  <table class="data">
                    {#each Object.entries(item) as [_, data]}
                      <tr>
                        <td class="label">{data.label}</td>
                        <td class="value">{data.value}</td>
                      </tr>
                    {/each}
                  </table>
                {/each}
              {/if}
            {/if}
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
      grid-auto-rows: min-content auto;
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
