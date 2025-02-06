<svelte:options customElement="goa-file-upload-input" />

<script lang="ts">
  import { onMount } from "svelte";

  type Variant = "dragdrop" | "button";
  type Issue = {
    filename: string;
    error: string;
  };
  type FileSizeUnit = "B" | "KB" | "MB" | "GB";

  // Public

  export let variant: Variant = "dragdrop";
  export let accept: string = "*";
  export let maxfilesize: string = "5MB";
  export let testid: string = "";

  // Private

  let _el: HTMLElement;
  let _fileInput: HTMLInputElement;
  let _state: "hover" | "dragenter" | "default" = "default";

  let issues: Issue[] = [];

  // Hooks

  onMount(() => {
    _fileInput.addEventListener(
      "change",
      () => {
        issues = []; // reset on every new batch of files
        // @ts-expect-error
        [..._fileInput.files].forEach((file) => {
          const error = validate(file);
          if (error) {
            issues = [{ filename: file.name, error }, ...issues];
            return;
          }
          dispatch(file);
        });
        _fileInput.value = "";
      },
      true,
    );
  });

  // Functions

  function validate(file: File): string | null {
    if (!isValidFileType(file)) {
      return "Invalid file type";
    }
    if (!isValidFileSize(file)) {
      return `The file must be less than ${maxfilesize}`;
    }
    return null;
  }

  function isValidFileType(file: File): boolean {
    const typeMatchers = accept.split(",");
    for (const matcher of typeMatchers) {
      const matches =
        file.type.match(matcher.replace("*", ".*")) ||
        file.name.endsWith(matcher.trim());
      if (matches) {
        return true;
      }
    }
    return false;
  }

  function isValidFileSize(file: File): boolean {
    const matches = maxfilesize.match(/(\d*)(\w*$)/);
    if (!matches) {
      return false;
    }

    const size = matches[1];
    const units = matches[2];
    const factor: Record<FileSizeUnit, number> = {
      B: 1,
      KB: 1024,
      MB: Math.pow(1024, 2),
      GB: Math.pow(1024, 3),
    };

    if (file.size / factor[units as FileSizeUnit] > parseInt(size)) {
      return false;
    }
    return true;
  }

  function dispatch(file: File) {
    _el.dispatchEvent(
      new CustomEvent("_selectFile", {
        composed: true,
        detail: { file },
      }),
    );
  }

  function openFilePicker() {
    _fileInput.click();
  }

  // Event handlers

  function onDrag(e: DragEvent) {
    e.preventDefault();
    return false;
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();

    issues = []; // reset on every new batch of files

    if (e.dataTransfer?.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            const error = validate(file);
            if (error) {
              issues = [{ filename: file.name, error }, ...issues];
              return;
            }
            dispatch(file);
          }
        }
      });
    } else {
      // @ts-expect-error
      [...e.dataTransfer?.files].forEach((file) => {
        const error = validate(file);
        if (error) {
          issues = [{ filename: file.name, error }, ...issues];
          return;
        }
        dispatch(file);
      });
    }
    _fileInput.value = "";
  }

  function onDragEnter() {
    _state = "dragenter";
  }

  function onDragLeave(e: DragEvent) {
    // hovering over child components will result in the dragleave event to be fired,
    // so we must validate to whether the mouse pointer is within the bounds of the
    // dropable area
    const rect = _el.getBoundingClientRect();
    const withinBounds =
      e.clientX > rect.x &&
      e.clientX <= rect.x + rect.width &&
      e.clientY > rect.y &&
      e.clientY <= rect.y + rect.height;

    if (!withinBounds) {
      _state = "default";
    }
  }

  function onMouseOver() {
    _state = "hover";
  }

  function onMouseOut() {
    _state = "default";
  }
</script>

<!-- svelte-ignore
  a11y-click-events-have-key-events
  a11y-mouse-events-have-key-events
-->
{#if variant === "dragdrop"}
  <div
    bind:this={_el}
    data-testid={testid || "dragdrop"}
    class={`dragdrop state-${_state}`}
    on:click={openFilePicker}
    on:drop={onDrop}
    on:mouseover={onMouseOver}
    on:mouseout={onMouseOut}
    on:dragenter={onDragEnter}
    on:dragleave={onDragLeave}
    on:dragover={onDrag}
  >
    <div class="instructions">
      <goa-icon type="cloud-upload" size="large" />
      <div>Drag and drop files here</div>
      <em  class="or-text">or</em>
      <div class="browse-files">Browse files</div>
    </div>

    {#if maxfilesize}
      <em class="max-file-size" data-testid="max-file-size"
        >Maximum file size is {maxfilesize}</em
      >
    {/if}

    <input
      data-testid="input"
      tabindex="0"
      type="file"
      {accept}
      bind:this={_fileInput}
      multiple
    />
  </div>
{/if}

{#if variant === "button"}
  <div class="button" bind:this={_el}>
    <goa-button on:click={openFilePicker} type="secondary">
      Choose file
    </goa-button>

    {#if maxfilesize}
      <em class="max-file-size" data-testid="max-file-size">
        Maximum file size is {maxfilesize}
      </em>
    {/if}
  </div>

  <input
    bind:this={_fileInput}
    data-testid={testid || "input"}
    tabindex="-1"
    type="file"
    {accept}
    multiple
  />
{/if}

{#if issues.length}
  <div class="issues">
    {#each issues as issue}
      <div class="issue">
        {issue.filename}
        <div class="error" data-testid="error">
          <goa-icon type="warning" size="small" theme="filled" />
          {issue.error}
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>

  .dragdrop {
    border-radius: var(--goa-file-upload-border-radius);
    border: var(--goa-file-upload-border);
    display: flex;
    font: var(--goa-file-upload-instruction-text);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--goa-file-upload-text-gap); /* 3rem is the space between the icon and the text */
    padding: var(--goa-file-upload-padding);
    color: var(--goa-file-upload-instruction-color);
    text-align: center;
    cursor: pointer;
    background: var(--goa-file-upload-color-bg);
    container: self / inline-size;
  }

  /** States **/

  .dragdrop:active {
    border: var(--goa-file-upload-border-active);
    outline: none;
  }

  .dragdrop:focus-within {
    border: var(--goa-file-upload-border-hover);
    box-shadow: var(--goa-file-upload-border-focus);
    background-color: var(--goa-file-upload-color-bg-focus);
    color: var(--goa-file-upload-instruction-color-focus);
  }

  .state-hover {
    background: var(--goa-file-upload-color-bg-hover);
    border: var(--goa-file-upload-border-hover);
    color: var(--goa-file-upload-instruction-color-hover);
  }
  .state-dragenter {
    background: var(--goa-file-upload-color-bg-drag);
    border: var(--goa-file-upload-border-drag);
    color: var(--goa-file-upload-instruction-color-drag);
  }

  .instructions {
    display: flex;
    align-items: center;
  }

  goa-icon {
    margin: 0 var(--goa-space-s);
  }

  .browse-files {
    text-decoration: underline;
  }

  em {
    font-style: normal;
    font: var(--goa-file-upload-help-text);
    color: var(--goa-file-upload-help-text-color);
  }

  .or-text {
    margin: var(--goa-space-3xs) var(--goa-space-xs) 0 var(--goa-space-xs);
  }

  .max-file-size {
    display: block;
  }
  .button .max-file-size {
    margin-top: var(--goa-space-xs);
  }

  input[type="file"] {
    position: absolute;
    left: -9999px;
  }

  /* issues */
  .issues {
    border-bottom: 1px solid var(--goa-color-greyscale-200);
    margin: 1rem 0;
  }
  .issue {
    margin-bottom: 1rem;
  }
  .error {
    color: var(--goa-color-interactive-error);
    font-size: 0.9em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @container self (--mobile) {
    .dragdrop {
      padding-top: 1.75rem;
    }
    .instructions {
      flex-direction: column;
    }
  }
</style>
