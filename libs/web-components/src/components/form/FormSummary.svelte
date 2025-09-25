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
    addChangeClickHandler();

    relay<FormSummaryBindRelayDetail>(
      _rootEl,
      FormSummaryBindMsg,
      { el: _rootEl },
      { bubbles: true, timeout: 100 },
    );
  });

  function addChangeClickHandler() {
    _rootEl.addEventListener("change", (e: Event) => {
      const page = (e as CustomEvent).detail;
      changePage(e, page);
    });
  }

  function addRelayListener() {
    receive(_rootEl, (action, data, e) => {
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
    relay<FormSummaryEditPageRelayDetail>(
      _rootEl,
      FormSummaryEditPageMsg,
      { id: pageId },
      { bubbles: true },
    );
    e.preventDefault();
  }

  function getHeading(page: string): string {
    return _state.form?.[page]?.heading || "";
  }

  function getData(
    state: FormState,
    page: string,
  ): Record<string, FieldsetItemState> {
    if (state.form[page]?.data?.type !== "details") {
      return;
    }

    return Object.entries(state.form[page].data.fieldsets || {})
      .sort((itemsA, itemsB) => (itemsA[1].order > itemsB[1].order ? 1 : -1))
      .reduce((acc, [name, fieldsetState]) => {
        acc[name] = fieldsetState;
        return acc;
      }, {});
  }

  function getDataList(
    state: FormState,
    page: string,
  ): Record<string, FieldsetItemState>[] {
    const pageData = state.form[page]?.data;
    if (pageData?.type !== "list") {
      return;
    }

    return pageData.items.reduce((acc, formState) => {
      const data = formState.history.reduce((acc, fieldsetId) => {
        acc = { ...acc, ...getData(formState, fieldsetId) };
        return acc;
      }, {});
      acc.push(data);
      return acc;
    }, []);
  }

  function isBlank(val: string | number | Date | string[]): boolean {
    if (Array.isArray(val)) {
      return val.length === 0;
    }
    const strVal = String(val);
    if (strVal.length === 0) return true;
    if (strVal === "0000-01-00") return true;
    return false;
  }

  const dateMatchRegex = /^\d{4}-\d{2}-\d{2}$/;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function formatValue(
    value: string | number | Date | string[],
    valueLabel?: string,
    labels?: string[],
  ): string | string[] {
    if (isBlank(value)) {
      return "— Not provided —";
    }

    // Check for valueLabels first (array of labels)
    if (labels && labels.length > 0) {
      return labels;
    }

    // Then check for valueLabel (single label)
    if (valueLabel) {
      return valueLabel;
    }

    const strValue = String(value);
    if (strValue.match(dateMatchRegex)) {
      const [year, month, day] = strValue.split("-");
      return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
    }

    return strValue;
  }
</script>

<div bind:this={_rootEl}>
  {#if heading}
    <goa-text as="h3" size="heading-m" color="secondary" mt="none" mb="s"
      >{heading}</goa-text
    >
  {/if}
  {#if _state}
    {#each _state.history as page}
      {#if _state.form[page]}
        <goa-container>
          <div class="summary" class:summary-with-header={!!getHeading(page)}>
            {#if getHeading(page)}
              <goa-text class="heading" color="secondary" mt="none" mb="s"
                >{getHeading(page)}</goa-text
              >
            {/if}

            <div class="data">
              {#if _state.form[page]?.data?.type}
                {#if _state.form[page]?.data?.type === "details"}
                  <table>
                    {#each Object.entries(getData(_state, page)) as [_, data]}
                      <tr>
                        <td class="label">{data.label}</td>
                        <td class="value" class:empty={isBlank(data.value)}>
                          {#if Array.isArray(formatValue(data.value, data.valueLabel, data.labels))}
                            {#each formatValue(data.value, data.valueLabel, data.labels) as label}
                              <div>{label}</div>
                            {/each}
                          {:else}
                            {formatValue(data.value, data.valueLabel, data.labels)}
                          {/if}
                        </td>
                      </tr>
                    {/each}
                  </table>
                {:else}
                  {#each getDataList(_state, page) as item, index}
                    <table>
                      {#each Object.entries(item) as [_, data]}
                        <tr>
                          <td class="label">{data.label}</td>
                          <td class="value" class:empty={isBlank(data.value)}>
                            {#if Array.isArray(formatValue(data.value, data.valueLabel, data.labels))}
                              {#each formatValue(data.value, data.valueLabel, data.labels) as label}
                                <div>{label}</div>
                              {/each}
                            {:else}
                              {formatValue(data.value, data.valueLabel, data.labels)}
                            {/if}
                          </td>
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
              <goa-link leadingicon="pencil" action="change" action-arg={page}>
                <a href="#" tabindex="0">Change</a>
              </goa-link>
            </div>
          </div>
        </goa-container>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .data .empty {
    color: var(--goa-color-greyscale-500);
  }

  .action a:focus-visible {
    outline: none;
    border-radius: var(--goa-button-border-radius);
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  /* TODO: fix the layouts: mobile doesn't meet specs; table makes it difficult */
  @media (--not-desktop) {
    .summary {
      display: block;
      grid-template-rows: min-content auto;
      grid-template-columns: auto;
      grid-template-areas: "top top top";
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
      grid-template-areas: "data action";
    }

    .summary-with-header {
      display: grid;
      /*grid-auto-rows: min-content auto;*/
      grid-auto-rows: auto;
      /*grid-auto-rows: minmax(100px, auto);*/
      grid-template-columns: 1fr min-content;
      grid-template-areas:
        "heading action"
        "data .";
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

    td {
      vertical-align: top;
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
