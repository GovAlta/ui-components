<svelte:options customElement="goa-work-side-notification-card" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import { typeValidator } from "../../common/utils";
  import { dispatch, toBoolean } from "../../common/utils";

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
  export let unread: string = "true";
  export let urgent: string = "false";

  let _rootEl: HTMLElement;
  let _transformTime: string = "";
  let _fullDate: string = "";

  $: _transformTime = formatTimestamp(timestamp ? new Date(timestamp) : null);
  $: _unread = toBoolean(unread);
  $: _urgent = toBoolean(urgent);
  $: _fullDate = formatFullDate(timestamp ? new Date(timestamp) : null);

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

  function formatFullDate(date: Date | null): string {
    if (!date || !date.getTime()) return "";

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const fullDateString = date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })
    if (dateOnly.getTime() === today.getTime()) {
      return `Today, ${fullDateString.split(", ").slice(1).join(", ")}`;
    }
    if (dateOnly.getTime() === yesterday.getTime()) {
      return `Yesterday, ${fullDateString.split(", ").slice(1).join(", ")}`;
    }
    return fullDateString;
  }
</script>

<!-- HTML -->
<div class="card"
     class:read={!_unread}
     class:urgent={_urgent}
     role="button"
     tabindex="0"
     style={maxwidth ? `max-width: ${maxwidth}` : ''}
     on:click={handleClick}
     on:keydown={handleKeyDown}
    bind:this={_rootEl}>
<div class="top-row">
  <div class="header-row">
    <h4 class="notification-title">
      {title}
    </h4>

    {#if $$slots.badge}
      <span class="badge-container">
        <slot name="badge" />
      </span>
    {:else if type === "info"}
      <span class="badge-container">
        <goa-badge type="information" content="Info" emphasis="subtle" version="2" />
      </span>
    {:else if type === "warning"}
      <span class="badge-container">
        <goa-badge type="important" content="Important" emphasis="subtle" version="2" />
      </span>
    {:else if type === "success"}
      <span class="badge-container">
        <goa-badge type="success" content="Success" emphasis="subtle" version="2" />
      </span>
    {:else if type === "critical"}
      <span class="badge-container">
        <goa-badge type="emergency" content="Critical" emphasis="subtle" version="2" />
      </span>
    {/if}
  </div>
  <goa-tooltip content={_fullDate} position="left">
    <div class="timestamp-container" aria-label={_fullDate}>
      <span class="unread-dot" class:hidden={!_unread}></span>
      <p class="timestamp">{_transformTime}</p>
    </div>
  </goa-tooltip>
</div>
<div class="description">
  <goa-text as="span" size="body-s" color={_unread ? "primary" : "secondary"}>
    {description}
  </goa-text>
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
    flex-direction: column;
    gap: var(--goa-space-xs);
    padding: var(--goa-space-m) var(--goa-space-l);
    cursor: pointer;
    border: none;
    border-bottom: 1px solid var(--goa-color-greyscale-100);
    background: white;
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    transition: background-color 0.2s ease;
  }
  .card:focus-visible {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
    outline-offset: -2px;
  }
  .card.read {
    background: var(--goa-color-greyscale-50);
  }
  .card.read .notification-title {
    color: var(--goa-color-greyscale-700);
  }
  .card.urgent {
    background: var(--goa-color-warning-background);
  }
  .card.urgent.read {
    background: var(--goa-color-greyscale-50);
  }
  .card:hover {
    background: var(--goa-color-greyscale-100);
  }
  .card.urgent:hover {
    background: #F5ECDB;
  }
  .card.urgent.read:hover {
    background: var(--goa-color-greyscale-100);
  }
  /* Top row (header + timestamp) */
  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--goa-space-s);
    width: 100%;
  }

  /* Header row (title + badge) */
  .header-row {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    flex-wrap: wrap;
    flex: 1;
    min-width: 0;
  }

  /* Title (notification heading) */
  .notification-title {
    font: var(--goa-typography-heading-2xs);
    color: var(--goa-color-text-default);
    margin: 0;
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

  /* Green dot for unread notifications */
  .unread-dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--goa-color-success-default);
    flex-shrink: 0;
    position: relative;
    top: -1px;
  }
  .unread-dot.hidden {
    visibility: hidden;
  }

  /* Timestamp tooltip */
  goa-tooltip {
    --goa-tooltip-gap: 0;
  }

  /* Timestamp text */
  .timestamp {
    font: var(--goa-typography-body-xs);
    color: var(--goa-color-greyscale-600);
    white-space: nowrap;
    margin: 0;
  }

  /* Mobile responsive */
  @media (max-width: 624px) {
    .card {
      padding: var(--goa-space-s) var(--goa-space-l);
    }

    .timestamp-container {
      flex-direction: column;
      align-items: flex-end;
      gap: var(--goa-space-3xs);
    }
  }
</style>
