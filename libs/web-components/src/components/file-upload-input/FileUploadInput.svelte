<svelte:options tag="goa-file-upload-input" />

<script lang="ts">
  import { onMount } from "svelte";

  type Variant = "dragdrop" | "button";

  // Public

  export let variant: Variant = "dragdrop";
  export let accept: string = "*";
  export let maxfilesize: string = "5MB";

  // Private

  let _el: HTMLElement;
  let _fileInput: HTMLInputElement;
  let _state: "hover" | "dragenter" | "default" = "default";

  let issues = []

  // Hooks

  onMount(() => {
    _fileInput.addEventListener("change", () => {
      issues = []; // reset on every new batch of files

      [..._fileInput.files].forEach(file => {
        const error = validate(file);
        if (error) {
          issues = [{filename: file.name, error}, ...issues]
          return;
        }
        dispatch(file)
      })
      _fileInput.value = null
    }, true)
  })

  // Functions

  function validate(file: File): string {
    if (!isValidFileType(file)) {
      return "Invalid file type";
    }
    if (!isValidFileSize(file)) {
      return `The file must be less than ${maxfilesize}`;
    }
  }

  function isValidFileType(file: File): boolean {
    const typeMatchers = accept.split(",");
    for (const matcher of typeMatchers) {
      const matches =
        file.type.match(matcher.replace("*", ".*").replace("/", "\/"))
        || file.name.endsWith(accept);
      if (matches) {
        return true
      }
    }
    return false;
  }

  function isValidFileSize(file: File): boolean {
    const [_, size, units] = maxfilesize.match(/(\d*)(\w*$)/);
    const factor = { "B": 1, "KB": 1024, "MB": Math.pow(1024, 2), "GB": Math.pow(1024, 3)};
    if (file.size / factor[units] > parseInt(size)) {
      return false;
    }
    return true;
  }

  function dispatch(file: File) {
    _el.dispatchEvent(new CustomEvent("_selectFile", {
      composed: true,
      detail: { file }
    }))
  }

  function openFilePicker() {
    _fileInput.click()
  }

  // Event handlers

  function onDrag(e: DragEvent) {
    e.preventDefault();
    return false;
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();

    issues = []; // reset on every new batch of files

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          const error = validate(file);
          if (error) {
            issues = [{filename: file.name, error}, ...issues]
            return;
          }
          dispatch(item.getAsFile())
        }
      });
    } else {
      [...e.dataTransfer.files].forEach(file => {
        const error = validate(file);
        if (error) {
          issues = [{filename: file.name, error}, ...issues]
          return;
        }
        dispatch(file)
      })
    }
    _fileInput.value = null
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
      e.clientX > rect.x
      && e.clientX <= rect.x + rect.width
      && e.clientY > rect.y
      && e.clientY <= rect.y + rect.height;

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
    data-testid="dragdrop"
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
      <em>or</em>
      <div class="browse-files">Browse files</div>
    </div>

    {#if maxfilesize}
      <em class="max-file-size" data-testid="max-file-size">Maximum file size is {maxfilesize}.</em>
    {/if}

    <input data-testid="input" tabindex="0"  type="file" {accept} bind:this={_fileInput} multiple />
  </div>
{/if}

{#if variant === "button"}
  <div class="button" bind:this={_el}>
    <goa-button on:click={openFilePicker} type="secondary">Choose file</goa-button>

    {#if maxfilesize}
      <em class="max-file-size" data-testid="max-file-size">Maximum file size is {maxfilesize}.</em>
    {/if}
  </div>

  <input bind:this={_fileInput} data-testid="input" tabindex="-1" type="file" {accept} multiple />
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
    border-radius: var(--goa-border-radius-m);
    border: var(--goa-border-width-m) dashed var(--goa-color-interactive-default);
    display: flex;
    font: var(--goa-typography-body-m);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: var(--goa-space-xl) 0;
    color: var(--goa-color-interactive-default);
    text-align: center;
    cursor: pointer;

    container: self / inline-size;
  }

  .dragdrop:active,
  .dragdrop:focus-within {
    border-style: solid;
    outline: none;
  }
  .dragdrop:hover div {
    color: var(--goa-color-interactive-hover);
  }

  /** States **/

  .state-default {
    background: var(--goa-color-info-background);
  }
  .state-hover {
    background: var(--goa-color-greyscale-100);
    border-style: dashed;
  }
  .state-dragenter {
    background: var(--goa-color-info-background);
    border-style: solid;
  }

  .instructions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  goa-icon {
    margin-top: 4px;
    margin-right: 4px;
  }

  .browse-files {
    text-decoration: underline;
  }

  em {
    font-style: normal;
    font: var(--goa-typography-body-s);
    color: var(--goa-color-greyscale-700);
  }

  .max-file-size {
    display: block;
    margin-top: 0.5rem;
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

  @container self (--container-mobile) {
    .dragdrop {
      padding-top: 1.75rem;
    }
    .instructions {
      flex-direction: column;
    }
  }
</style>
