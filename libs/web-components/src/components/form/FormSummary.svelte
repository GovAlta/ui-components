<svelte:options customElement="goa-public-form-summary" />

<script lang="ts">
  import { onMount } from "svelte";
  import {
  FieldsetData,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormState,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
  } from "../../types/relay-types";

  import { receive, relay } from "../../common/utils";
  import Fieldset from "./Fieldset.svelte";

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

  function onFormDispatch(detail: FormDispatchStateRelayDetail) {
    _state = detail
  }

  function changePage(e: Event, pageId: string) {
    relay<FormSummaryEditPageRelayDetail>(_rootEl, FormSummaryEditPageMsg, { id: pageId }, { bubbles: true })
    e.preventDefault();
  }

  function getHeading(page: string): string {
    try {
      return _state.form[page].heading || "";
    } catch (e) {
      console.log(e);
      return "FAIL"
    }
  }

  function getData(state: FormState, page: string) {
    const fieldset = state.form?.[page];
    const data = 
      Object
        .entries(fieldset.data || {})
        .sort((itemsA, itemsB) => itemsA[1].order > itemsB[1].order ? 1 : -1)
    console.debug("FormSummary:getData", {data})
    return data;
  }

  function getDataList(state: FormState, page: string) {
    const formStates = state.form?.[page] as unknown as FormState[];
    
    return formStates.map(formState => {
      console.debug("FormSummary:getDataList::isArray=true", formState);
      return formState.history.map(fieldsetId => {
        console.debug("FormSummary:getDataList::fieldsetId", fieldsetId);
        return getData(formState, fieldsetId);
      })
    });
  }
  
</script>

<div bind:this={_rootEl}>
  {#if heading}
    <goa-text as="h3" size="heading-m" color="secondary" mb="l">{heading}</goa-text>
  {/if}
  {#if _state}
    {#each _state.history as page}
      <goa-container>
        <div class="summary" class:summary-with-header={!!getHeading(page)}>
          {#if getHeading(page)}
            <goa-text class="heading" color="secondary">{getHeading(page)}</goa-text>
          {/if}

          {#if _state.form[page]}
            <table class="data">
              {#if Array.isArray(_state.form?.page)}
                {#each getDataList(_state, page) as [_key, item]}
                  {#each item as [_key, data]}
                    <tr>
                      <td class="label">{data.label}</td>
                      <td class="value">{data.value}</td>
                    </tr>
                  {/each}
                {/each}
              {:else}
                {#each getData(_state, page) as [_key, data]}
                  <tr>
                    <td class="label">{data.label}</td>
                    <td class="value">{data.value}</td>
                  </tr>
                {/each}
              {/if}
            </table>
          {/if}
          <div class="action">
            <goa-link leadingicon="pencil" on:click={(e) => changePage(e, page)}>Change</goa-link>
          </div>
        </div>
      </goa-container>    
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
