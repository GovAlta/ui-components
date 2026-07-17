<svelte:options
  customElement={{
    tag: "goa-public-form-task-item",
    props: {
      status: { reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator, dispatch } from "../../common/utils";

  // Validators
  const [Statuses, validateStatus] = typeValidator(
    "PublicFormTaskItem status",
    ["not-started", "in-progress", "completed", "cannot-start"] as const,
    true,
  );

  // Types
  type Status = (typeof Statuses)[number];

  // ******
  // Public
  // ******

  /** The task name (left column). */
  export let heading: string = "";
  /** The task's progress. "cannot-start" renders as muted text and is not clickable. */
  export let status: Status = "not-started";
  /** Optional secondary line under the name, e.g. why a locked task can't start. */
  export let hint: string = "";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement;

  // ========
  // Reactive
  // ========

  // A locked task is a state the user has not reached, so it is not actionable.
  $: _interactive = status !== "cannot-start";
  $: _badgeType =
    status === "completed" ? "success" : status === "in-progress" ? "important" : "information";
  $: _badgeContent =
    status === "completed" ? "Completed" : status === "in-progress" ? "In progress" : "Not started";

  // *****
  // Hooks
  // *****

  onMount(() => {
    validateStatus(status);
  });

  // *********
  // Functions
  // *********

  function handleClick() {
    if (!_interactive) return;
    dispatch(_rootEl, "_click", {}, { bubbles: true });
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!_interactive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }
</script>

<div
  class="row"
  class:interactive={_interactive}
  role={_interactive ? "button" : undefined}
  tabindex={_interactive ? 0 : undefined}
  data-testid={testid || undefined}
  on:click={handleClick}
  on:keydown={handleKeyDown}
  bind:this={_rootEl}
>
  <span class="text">
    <span class="name">{heading}</span>
    {#if hint}
      <span class="hint">{hint}</span>
    {/if}
  </span>

  {#if status === "cannot-start"}
    <span class="locked">Cannot start yet</span>
  {:else}
    <goa-badge type={_badgeType} content={_badgeContent} />
  {/if}
</div>

<style>
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }
  :host * {
    box-sizing: border-box;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--goa-space-m);
    padding: var(--goa-space-m) var(--goa-space-xl);
    width: 100%;
    text-align: left;
    transition: background-color 0.12s ease;
  }

  .row.interactive {
    cursor: pointer;
  }
  .row.interactive:hover {
    background-color: var(--goa-color-greyscale-100);
  }
  .row.interactive:hover .name {
    text-decoration: underline;
  }
  .row.interactive:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: -2px;
  }

  .name {
    color: var(--goa-color-text-default);
  }
  .hint {
    display: block;
    margin-top: var(--goa-space-3xs);
    color: var(--goa-color-text-secondary);
  }
  .locked {
    color: var(--goa-color-text-secondary);
    white-space: nowrap;
  }
</style>
