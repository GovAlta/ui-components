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
  import { PFState } from "@abgov/ui-components-common";

  export let heading: string = "";

  let _rootEl: HTMLElement;
  let _state: PFState;

  onMount(() => {
    bindWithForm();

    _rootEl.addEventListener("change", (e) => {
      const id = (e as CustomEvent).detail
      relay(_rootEl, "form-summary:change", id, { bubbles: true });
    })
  });

  function bindWithForm() {
    // send el to parent form
    relay(_rootEl, "form-summary:bind", _rootEl, { bubbles: true });

    // listen for message from parent
    _rootEl.addEventListener("_sync", (e) => {
      _state = (e as CustomEvent).detail as PFState;
    });
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

  function getHeading(page: string): string {
    return "";
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
      {#if _state.data[page]}
        <goa-container>
          <div class="summary" class:summary-with-header={!!getHeading(page)}>
            {#if getHeading(page)}
              <goa-text class="heading" color="secondary" mt="none" mb="s">
                {getHeading(page)}
              </goa-text>
            {/if}

            <div class="data">
              <table>
                {#each Object.entries(_state.data[page]) as [label, value]}
                  <tr>
                    <td class="label">{label}</td>
                    <td class="value" class:empty={isBlank(value)}>
                      {value}
                    </td>
                  </tr>
                {/each}
              </table>
            </div>
            <div class="action">
              <goa-link leadingicon="pencil" action="change" action-arg={page}>
                Change
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
