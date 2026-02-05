<svelte:options customElement="goa-public-form-summary" />

<script lang="ts">
  import { onMount } from "svelte";

  import { relay } from "../../common/utils";
  import {
    PFField,
    PFSummary,
    PFOutlineItem,
    PFPage,
  } from "@abgov/ui-components-common";

  export let heading: string = "";

  let _rootEl: HTMLElement;
  let _state: PFSummary;

  onMount(() => {
    bindWithForm();
    addChangeListener();
  });

  function bindWithForm() {
    // listen for message from parent
    _rootEl.addEventListener("form:summary-sync", (e) => {
      _state = (e as CustomEvent).detail as PFSummary;
    });

    // send el to parent form
    relay(_rootEl, "form-summary:bind", _rootEl, { bubbles: true });
  }

  // Listen for events when clicking the `Change` link
  function addChangeListener() {
    _rootEl.addEventListener("change", (e) => {
      const id = (e as CustomEvent).detail;
      relay(_rootEl, "form-summary:change", id, { bubbles: true });
    });
  }

  // ====
  // Formatting
  // ====

  function isBlank(val?: string | number | Date | string[]): boolean {
    if (Array.isArray(val)) {
      return val.length === 0;
    }

    const strVal = String(val);

    if (strVal.length === 0) return true;
    if (strVal === "0000-01-00") return true;

    return false;
  }

  function format(
    value?: string,
    formatter?: (input: string) => string,
  ): string | string[] {
    if (formatter && value) {
      return formatter(value);
    }

    if (!value) {
      return "— Not provided —";
    }

    return value;
  }

  // show if the page contains data => is either an array or object
  function showInSummary(pageId: string) {
    let page = _state.data[pageId];
    return (page && Array.isArray(page)) || Object.keys(page).length > 0;
  }

  function getOutlineItem(pageId: string): PFOutlineItem {
    return _state.outline[pageId];
  }

  function getDataItem(pageId: string): PFPage {
    return _state.data[pageId] as PFPage;
  }

  function getDataItems(pageId: string): PFPage[] {
    return _state.data[pageId] as PFPage[];
  }

  function getHeading(pageId: string): string {
    return getOutlineItem(pageId).props["heading"] ?? "";
  }

  function getLabel(pageId: string, name: string): string {
    console.log(
      "get label",
      pageId,
      name,
      getOutlineItem(pageId).fields[name]?.label ?? name,
    );
    return getOutlineItem(pageId).fields[name]?.label ?? name;
  }

  function getField(pageId: string, name: string): PFField {
    return getOutlineItem(pageId).fields[name] ?? {};
  }

  function showField(page: string, key: string, value?: string): boolean {
    const notAlways = getField(page, key).hideInSummary !== "always";
    const dontShowAsIsBlank = !(
      getField(page, key).hideInSummary === "ifBlank" && value === ""
    );
    const notAnId = key !== "_id";
    const notAnIndex = isNaN(parseInt(key));

    return notAlways && dontShowAsIsBlank && notAnId && notAnIndex;
  }

  function getSummary(pageId: string): Record<string, string> {
    const data = _state.data[pageId] as PFPage;
    if (!data) {
      throw new Error("getSummary(): no data found");
    }
    return _state.outline[pageId].summarize?.(data) || {};
  }

  function isSubform(pageId: string): boolean {
    return _state.outline[pageId].subform;
  }
</script>

<div bind:this={_rootEl}>
  {#if heading}
    <goa-text as="h3" size="heading-m" color="secondary" mt="none" mb="s"
      >{heading}</goa-text
    >
  {/if}
  {#if Object.keys(_state || {}).length > 0}
    {#each _state?.history as page}
      {#if showInSummary(page)}
        <goa-container>
          <div class="summary" class:summary-with-header={!!getHeading(page)}>
            {#if getHeading(page)}
              <goa-text class="heading" color="secondary" mt="none" mb="s">
                {getHeading(page)}
              </goa-text>
            {/if}
            {#if isSubform(page)}
              <div class="data">
                {#each getDataItems(page) as item, index}
                  <table>
                    <!-- show custom summary if summarize function is defined -->
                    {#if getOutlineItem(page).summarize}
                      {#each Object.entries(getSummary(page)) as [key, value]}
                        <tr>
                          <td class="label">{getLabel(page, key)}</td>
                          <td class="value" class:empty={isBlank(value)}>
                            {format(value)}
                          </td>
                        </tr>
                      {/each}
                      <!-- show each data field -->
                    {:else}
                      {#each Object.entries(item) as [key, value]}
                        {#if showField(page, key, value)}
                          <tr>
                            <td class="label">{getLabel(page, key)}</td>
                            <td class="value" class:empty={isBlank(value)}>
                              {format(value, getField(page, key).formatter)}
                            </td>
                          </tr>
                        {/if}
                      {/each}
                    {/if}
                  </table>
                  {#if getDataItems(page).length - 1 !== index}
                    <goa-divider mt="l" mb="l" />
                  {/if}
                {/each}
              </div>
            {:else}
              <div class="data">
                <table>
                  <!-- show custom summary if summarize function is defined -->
                  {#if getOutlineItem(page).summarize}
                    {#each Object.entries(getSummary(page)) as [key, value]}
                      <tr>
                        <td class="label">{getLabel(page, key)}</td>
                        <td class="value" class:empty={isBlank(value)}>
                          {format(value)}
                        </td>
                      </tr>
                    {/each}
                    <!-- show each data field -->
                  {:else}
                    {#each Object.entries(getDataItem(page)) as [key, value]}
                      {#if getField(page, key).hideInSummary !== "always" && !(getField(page, key).hideInSummary === "ifBlank" && value === "")}
                        <tr>
                          <td class="label">{getLabel(page, key)}</td>
                          <td class="value" class:empty={isBlank(value)}>
                            {format(value, getField(page, key).formatter)}
                          </td>
                        </tr>
                      {/if}
                    {/each}
                  {/if}
                </table>
              </div>
            {/if}
            <div class="action">
              <goa-link leadingicon="pencil" action="change" action-arg={page}>
                <a href="#">Change</a>
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
