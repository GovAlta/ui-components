<svelte:options tag="goa-file-upload-card" />

<script lang="ts">
  import { getTimestamp } from "../../common/utils";

  // Public

  export let filename: string;
  export let size: number;
  export let type: string = "";
  export let progress: number = -1;
  export let error: string = "";

  // Private

  let _status: "uploading" | "uploaded" | "error" = "uploading"
  let _rootEl: HTMLElement;
  let _fileIcon: string = "goa-file";

  // Reactive

  $: _status =
      error && "error"
      || (progress >= 0 && progress < 100) && "uploading"
      || "uploaded"

  $: _fileIcon = filename && type && getFiletypeIcon(filename, type)

  // Functions

  function getFiletypeIcon(filename: string, type: string): string {
    // file extensions
    const parts = filename.split(".");
    const ext = parts[parts.length - 1]
    const extTypeIcon =
      ext === "xlxs"     && "goa-xls"
      || ext === "xls"   && "goa-xls"
      || ext === "zip"   && "goa-zip"
      || ext === "docx"  && "goa-doc"
      || ext === "doc"   && "goa-doc"
      || ext === "pptx"  && "goa-ppt"
      || ext === "ppt"   && "goa-ppt"
      || ext === "pdf"   && "goa-pdf"
      || ext === "html"  && "goa-html"


    if (extTypeIcon) return extTypeIcon;

    // mimetype
    const mimeTypeIcon =
      type === "application/vnd.ms-powerpoint"  && "goa-ppt"
      || type.includes("presentationml")        && "goa-ppt"
      || type.includes("wordprocessingml")      && "goa-doc"
      || type.includes("spreadsheet")           && "goa-xls"
      || type.startsWith("video")               && "goa-video"
      || type.startsWith("audio")               && "goa-audio"
      || type.startsWith("image")               && "goa-image"
      || type === "application/msword"          && "goa-doc"
      || "goa-file"

    return mimeTypeIcon;
  }

  function dispatch(action: "_delete" | "_cancel") {
    _rootEl.dispatchEvent(new CustomEvent(action, {
      composed: true,
    }))
  }

  function formatFileSize(bytes: number) {
    switch(true) {
      case bytes < 1024:
        return bytes + "B";
      case bytes < 1024 * 1024:
        return Math.round(bytes/1024) + "KB";
      case bytes < Math.pow(1024, 3):
        return Math.round(bytes/Math.pow(1024, 2)) + "MB";
    }
  }
</script>

<div class="file-upload-card">
  <div
    data-testid="root"
    bind:this={_rootEl}
    class={`root ${_status}`}
    class:error={error}
  >
      {#if _status === "uploaded"}
        <goa-icon class="fileicon" data-testid="icon" type={_fileIcon} fillcolor="#0070c4" size="xlarge" />
      {:else}
        <goa-icon class="fileicon" data-testid="icon" type="goa-file" fillcolor="#dcdcdc" size="xlarge" />
      {/if}
      <div class="details">
        <div class="filename" data-testid="filename">{filename}</div>
        {#if _status !== "error"}
          <div class="filesize" data-testid="filesize">{formatFileSize(size)}</div>
        {/if}
        {#if _status === "uploading"}
          <div class="progress" data-testid="progress">
            <progress value={progress} max="100" /> {Math.ceil(progress)}%
          </div>
        {:else if _status === "uploaded"}
          <div class="timestamp" data-testid="timestamp">
            Uploaded on {getTimestamp()}
          </div>
        {:else if _status === "error"}
          <div class="error-msg" data-testid="error">
            <goa-icon type="warning" size="small" theme="filled" />
            {error}
          </div>
        {/if}
      </div>

      <div class="actions" data-testid="actions">
        {#if _status === "uploading"}
          <goa-button type="tertiary" size="compact" on:click={() => dispatch("_cancel")}>Cancel</goa-button>
        {:else if _status === "uploaded"}
          <goa-button type="tertiary" size="compact" on:click={() => dispatch("_delete")} leadingicon="trash">Remove</goa-button>
        {:else if _status === "error"}
          <goa-button type="tertiary" size="compact" on:click={() => dispatch("_delete")} variant="destructive">Cancel</goa-button>
        {/if}
      </div>
  </div>
</div>

<style>
  .file-upload-card {
    container: self / inline-size;
  }

  .root {
    padding: var(--goa-space-l);
    border: var(--goa-border-width-s) solid var(--goa-color-greyscale-200);
    border-radius: var(--goa-border-radius-m);
    margin: 0.5rem 0;

    display: grid;
    grid-template-columns: 38px auto;
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      "icon details"
      "action action";
    gap: 1rem;
    align-items: center;
  }

  .root.error {
    border: var(--goa-border-width-m) solid var(--goa-color-interactive-error);
  }

  @container self (--container-not-mobile) {
    .root {
      grid-template-columns: 38px 1fr auto;
      grid-template-rows: auto;
      grid-template-areas: "icon details action";
    }

    .details {
      /* To match the design specs of 1.5rem "gap" on left side => 1rem gap + 0.5rem margin */
      margin-left: 0.5rem;
    }
  }

  .fileicon {
    grid-area: icon;
    align-self: center;
  }

  .actions {
    grid-area: action;
  }

  .details {
    grid-area: details;

    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .filename {
    grid-area: filename;
    font-size: var(--goa-font-size-4);
    overflow-wrap: anywhere;
  }

  .error-msg {
    display: flex;
    align-items: flex-start;
    margin-top: 0.5rem;
    gap: var(--goa-space-2xs);
    color: var(--goa-color-interactive-error);
    font: var(--goa-typography-body-xs);
  }

  .timestamp,
  .filesize {
    color: var(--goa-color-greyscale-700);
    font: var(--goa-typography-body-s);
  }

  .progress {
    display: flex;
    align-items: center;
    font: var(--goa-typography-body-xs);
    gap: 0.5rem;
  }

  progress {
    flex: 1 1 auto;

    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border: none;
    border-radius: var(--goa-border-radius-m);
    background: var(--goa-color-greyscale-200);
    color: var(--goa-color-greyscale-700);
  }

  /* iOS tweaks */
  progress::-webkit-progress-value {
    background: var(--goa-color-interactive-default);
  }
  progress::-webkit-progress-bar {
    background: var(--goa-color-greyscale-200);
  }
  progress::-moz-progress-bar {
    background: var(--goa-color-interactive-default);
  }
</style>
