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

  // show if the page contains visible data
  function showInSummary(pageId: string) {
    let page = _state.data[pageId];
    if (!page) return false;
    // For subforms, show if there are items
    if (Array.isArray(page)) return page.length > 0;
    // For regular pages, check if there are visible fields (not all hideInSummary: "always")
    if (Object.keys(page).length === 0) return false;
    // Check if any fields are actually visible
    const outline = _state.outline[pageId];
    if (!outline) return false;
    for (const [key, value] of Object.entries(page)) {
      const field = outline.fields[key];
      if (!field) continue;
      if (field.hideInSummary === "always") continue;
      if (field.hideInSummary === "ifBlank" && value === "") continue;
      return true; // At least one visible field
    }
    return false;
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

  // Count visible fields in a page (respects hideInSummary settings)
  function getVisibleFieldCount(pageId: string): number {
    const outline = getOutlineItem(pageId);
    const data = getDataItem(pageId);

    // If using summarize function, count returned keys
    if (outline.summarize && data) {
      return Object.keys(outline.summarize(data)).length;
    }

    // Otherwise count visible fields
    if (!data) return 0;
    let count = 0;
    for (const [key, value] of Object.entries(data)) {
      const field = outline.fields[key];
      if (!field) continue;
      if (field.hideInSummary === "always") continue;
      if (field.hideInSummary === "ifBlank" && value === "") continue;
      count++;
    }
    return count;
  }

  // For single-field pages, hide the heading (field label is sufficient)
  function shouldShowHeading(pageId: string): boolean {
    const heading = getHeading(pageId);
    if (!heading) return false;
    // Hide heading for single-field non-subform pages
    if (!isSubform(pageId) && getVisibleFieldCount(pageId) === 1) {
      return false;
    }
    return true;
  }

  // Format checkbox values - convert "checked" to "Yes"
  function formatValue(value: string | undefined, formatter?: (input: string) => string): string | string[] {
    if (value === "checked") return "Yes";
    return format(value, formatter);
  }

  // Check if a field is a file type
  function isFileField(pageId: string, name: string): boolean {
    return getField(pageId, name).type === "file";
  }

  // Parse file data JSON (contains name and url)
  type FileData = { name: string; url: string; size?: number; type?: string };
  function parseFileData(value: string): FileData | null {
    if (!value) return null;
    try {
      const data = JSON.parse(value);
      if (data.name && data.url) {
        return data as FileData;
      }
      return null;
    } catch {
      // Not JSON, might be just a filename (backward compatibility)
      return null;
    }
  }

  // Get display name for a file field value
  function getFileDisplayName(value: string): string {
    const fileData = parseFileData(value);
    return fileData?.name || value;
  }
</script>

<div bind:this={_rootEl} class="review-list">
  {#if heading}
    <goa-text as="h2" size="body-l" color="secondary" mt="none" mb="none"
      >{heading}</goa-text
    >
  {/if}
  {#if Object.keys(_state || {}).length > 0}
    {#each _state?.history as page}
      {#if showInSummary(page)}
        <div class="review-card">
          <div class="card-content">
            {#if shouldShowHeading(page)}
              <p class="group-heading">{getHeading(page)}</p>
            {/if}
            {#if isSubform(page)}
              <!-- Subform: multiple items -->
              {#each getDataItems(page) as item, index}
                {#if getOutlineItem(page).summarize}
                  {#each Object.entries(getSummary(page)) as [key, value]}
                    <div class="question-row">
                      <p class="question">{getLabel(page, key)}</p>
                      <p class="answer" class:empty={isBlank(value)}>{format(value)}</p>
                    </div>
                  {/each}
                {:else}
                  {#each Object.entries(item) as [key, value]}
                    {#if showField(page, key, value)}
                      <div class="question-row">
                        <p class="question">{getLabel(page, key)}</p>
                        <p class="answer" class:empty={isBlank(value)}>{formatValue(value, getField(page, key).formatter)}</p>
                      </div>
                    {/if}
                  {/each}
                {/if}
                {#if getDataItems(page).length - 1 !== index}
                  <goa-divider mt="l" mb="l" />
                {/if}
              {/each}
            {:else}
              <!-- Single page: one set of fields -->
              {#if getOutlineItem(page).summarize}
                {#each Object.entries(getSummary(page)) as [key, value]}
                  <div class="question-row">
                    <p class="question">{getLabel(page, key)}</p>
                    <p class="answer" class:empty={isBlank(value)}>{format(value)}</p>
                  </div>
                {/each}
              {:else}
                {#each Object.entries(getDataItem(page)) as [key, value]}
                  {#if getField(page, key).hideInSummary !== "always" && !(getField(page, key).hideInSummary === "ifBlank" && value === "")}
                    <div class="question-row">
                      <p class="question">{getLabel(page, key)}</p>
                      {#if isFileField(page, key) && value}
                        {@const fileData = parseFileData(value)}
                        {#if fileData?.url}
                          <p class="answer file-link"><a href={fileData.url} target="_blank" rel="noopener noreferrer">{fileData.name}</a></p>
                        {:else}
                          <p class="answer file-link">{getFileDisplayName(value)}</p>
                        {/if}
                      {:else}
                        <p class="answer" class:empty={isBlank(value)}>{formatValue(value, getField(page, key).formatter)}</p>
                      {/if}
                    </div>
                  {/if}
                {/each}
              {/if}
            {/if}
          </div>
          <div class="action">
            <goa-link leadingicon="pencil" action="change" action-arg={page}>
              <a href="#">Change</a>
            </goa-link>
          </div>
        </div>
      {/if}
    {/each}
  {/if}
</div>

<style>
  /* Review list container - gap between cards */
  .review-list {
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-m);
  }

  /* Review card - matches Figma review-question-page */
  .review-card {
    display: flex;
    gap: var(--goa-space-s);
    align-items: flex-start;
    padding: var(--goa-space-m) var(--goa-space-l);
    background: white;
    border: 1px solid var(--goa-color-greyscale-200);
    border-radius: 12px;
  }

  /* Card content - takes remaining space */
  .card-content {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-s);
  }

  /* Group heading - secondary color, body-m */
  .group-heading {
    font: var(--goa-typography-body-m);
    color: var(--goa-color-text-secondary);
    margin: 0;
  }

  /* Question row - flex-wrap so long answers go below */
  .question-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--goa-space-xs) var(--goa-space-m);
    align-items: flex-start;
  }

  /* Question label - heading-xs */
  .question {
    flex: 1 0 0;
    min-width: 0;
    margin: 0;
    font: var(--goa-typography-heading-xs);
  }

  /* Answer - body-m, wraps when long */
  .answer {
    flex: 1 0 0;
    min-width: 200px;
    max-width: 100%;
    margin: 0;
    font: var(--goa-typography-body-m);
  }

  .answer.empty {
    color: var(--goa-color-greyscale-500);
  }

  /* File link styling */
  .answer.file-link a {
    color: var(--goa-color-interactive-default);
    text-decoration: underline;
  }

  .answer.file-link a:hover {
    color: var(--goa-color-interactive-hover);
  }

  /* Change link - stays at top right */
  .action {
    flex-shrink: 0;
  }

  .action a:focus-visible {
    outline: none;
    border-radius: var(--goa-button-border-radius);
    box-shadow: 0 0 0 var(--goa-border-width-l)
      var(--goa-color-interactive-focus);
  }

  /* Mobile: stack question and answer vertically */
  @media (--not-desktop) {
    .question-row {
      flex-direction: column;
      gap: var(--goa-space-2xs);
    }

    .answer {
      min-width: 0;
    }
  }
</style>
