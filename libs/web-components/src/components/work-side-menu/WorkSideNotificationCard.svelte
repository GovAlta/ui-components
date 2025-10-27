<svelte:options customElement="goa-work-side-notification-card" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { dispatch } from "../../common/utils";

  // Validator
  const [Types, validateType] = typeValidator(
    "WorkSide Notification type",
    ["default", "success", "critical", "warning", "info"] as const,
    true
  );
  // Type
  type WorkSideNotificationType = (typeof Types)[number];

  export let type: WorkSideNotificationType = "default";
  export let timestamp: string = "";
  export let title: string = "";
  export let description: string = "";
  export let id: string = ""; // to identify which notification is clicked
  export let maxwidth: string = "";

  let _rootEl: HTMLElement;
  let _transformTime: string = "";

  $: _transformTime = formatTimestamp(timestamp ? new Date(timestamp) : null);

  onMount(() => {
    validateType(type);
  })
  function handleClick() {
   dispatch(_rootEl, "_click", id, {bubbles: true});
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }
  function formatTimestamp(date: Date | null): string {
    if (!date || !date.getTime()) return "";

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs/1000);
    const diffMins = Math.floor(diffSecs/60);
    const diffHours = Math.floor(diffMins/60);
    const diffDays = Math.floor(diffHours/24);

    if (diffSecs < 60) return "Now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} h ago`;
    if (diffDays < 7) return `${diffDays} d ago`;

    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  }
</script>

<!-- HTML -->
<div class="card type-{type}"
     role="button"
     tabindex="0"
     style={maxwidth ? `max-width: ${maxwidth}` : ''}
     on:click={handleClick}
     on:keydown={handleKeyDown}
    bind:this={_rootEl}>
<div class="content">
  <div class="header-row">
    <goa-text as="h4" size="heading-xs" mt="none">
      {title}
    </goa-text>

    {#if $$slots.badge}
      <span class="badge-container">
        <slot name="badge" />
      </span>
    {/if}
  </div>

  <div class="description">
    <goa-text as="span" size="body-s">
      {description}
    </goa-text>
  </div>
</div>
<div class="timestamp-container">
  {#if _transformTime.includes("Now") || _transformTime.includes("min ago") || _transformTime.includes("h ago")}
    <span class="time-dot"></span>
  {/if}
  <goa-text as="span" size="body-xs">{_transformTime}</goa-text>
</div>

</div>

<!-- Style -->
<style>
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
  }
  .card {
    display: flex;
    gap: var(--goa-space-s);
    align-items: flex-start;
    padding: var(--goa-space-m) var(--goa-space-m);
    cursor: pointer;
    border: none;
    border-bottom: 1px solid var(--goa-color-greyscale-200);
    background: white;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    transition: background-color 0.2s ease;
  }
  .card:hover {
    background: var(--goa-color-greyscale-100);
  }
  .card:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: -2px;
    background: var(--goa-color-greyscale-100);
  }
  .card.type-default {
    background: white;
  }
  .card.type-critical {
    background: var(--goa-color-emergency-background);
  }
  .card.type-warning {
    background: var(--goa-color-warning-background);
  }
  .card.type-success {
    background: var(--goa-color-success-background);
  }
  .card.type-info {
    background: var(--goa-color-info-background);
  }

  /* Hover states for colored backgrounds */
  .card.type-warning:hover,
  .card.type-critical:hover {
    background: #FFF3CC;
  }

  .card.type-success:hover {
    background: #E0FFE8;
  }

  .card.type-info:hover {
    background: #CCE7FF;
  }

  .card.type-event:hover {
    background: #E6CCFF;
  }

  /* Content area (left side) */
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--goa-space-3xs);
    min-width: 0; /* Allow text truncation */
  }

  /* Header row (title + badge) */
  .header-row {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    flex-wrap: wrap;
  }

  /* Title (bold label) */
  .title {
    font-weight: var(--goa-font-weight-bold);
    font-size: var(--goa-font-size-3);
    color: var(--goa-color-text-default);
    line-height: 1.5;
  }

  /* Badge container (slot content) */
  .badge-container {
    display: inline-flex;
    align-items: center;
    gap: var(--goa-space-3xs);
  }

  /* Description */
  .description {
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-greyscale-700);
    line-height: 1.5;
    word-wrap: break-word;
  }

  /* Timestamp container (right side) */
  .timestamp-container {
    display: flex;
    align-items: center;
    gap: var(--goa-space-2xs);
    flex-shrink: 0;
    margin-top: 2px; /* Align with title baseline */
  }

  /* Green dot for recent notifications */
  .time-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--goa-color-success-default);
    flex-shrink: 0;
  }

  /* Timestamp text */
  .timestamp {
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-greyscale-700);
    white-space: nowrap;
    line-height: 1.5;
  }

  /* Mobile responsive */
  @media (max-width: 624px) {
    .card {
      padding: var(--goa-space-s) var(--goa-space-m);
    }

    .timestamp-container {
      flex-direction: column;
      align-items: flex-end;
      gap: var(--goa-space-3xs);
    }
  }
</style>
