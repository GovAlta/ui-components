<svelte:options
  customElement={{
    tag: "goa-work-side-notification-item",
    props: {
      readStatus: { reflect: true, attribute: "read-status" },
      priority: { reflect: true },
      timestamp: { reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { typeValidator, dispatch, formatRelativeTimestamp, formatFullDate } from "../../common/utils";

  // Validators
  const [Types, validateType] = typeValidator(
    "WorkSideNotificationItem type",
    ["default", "success", "critical", "warning", "info"] as const,
    true,
  );
  const [ReadStatuses, validateReadStatus] = typeValidator(
    "WorkSideNotificationItem readStatus",
    ["read", "unread"] as const,
    true,
  );
  const [Priorities, validatePriority] = typeValidator(
    "WorkSideNotificationItem priority",
    ["normal", "urgent"] as const,
    true,
  );
  // Types
  type WorkSideNotificationItemType = (typeof Types)[number];
  type ReadStatus = (typeof ReadStatuses)[number];
  type Priority = (typeof Priorities)[number];

  // ******
  // Public
  // ******

  export let type: WorkSideNotificationItemType = "default";
  export let timestamp: string = "";
  export let title: string = "";
  export let description: string = "";
  export let readStatus: ReadStatus = "unread";
  export let priority: Priority = "normal";
  export let testid: string = "";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement;
  let _dateGroupHeading: string = "";
  let _transformTime: string = "";
  let _fullDate: string = "";
  let _visible: boolean = true;
  let _currentActiveTab: string = "unread";
  let _isUrgent: boolean = false;
  let _badgeType: string = "";
  let _showBadge: boolean = false;

  // ========
  // Reactive
  // ========
  $: _isUnread = readStatus === "unread";
  $: (readStatus, priority, updateVisibility());
  $: if (_rootEl) {
    readStatus;
    dispatchReadStatusChange();
  }

  // *****
  // Hooks
  // *****

  onMount(() => {
    validateType(type);
    validateReadStatus(readStatus);
    validatePriority(priority);

    _isUrgent = priority === "urgent";
    _badgeType = getBadgeType(type);
    _showBadge = type !== "default";
    _transformTime = formatRelativeTimestamp(timestamp ? new Date(timestamp) : null);
    _fullDate = formatFullDate(timestamp ? new Date(timestamp) : null);

    _rootEl.addEventListener("notification-panel:tabchange", handleTabChange);
    _rootEl.addEventListener(
      "notification-panel:dategroup",
      updateDateGroupHeading,
    );
    dispatch(
      _rootEl,
      "notification-item:mounted",
      { el: _rootEl, readStatus, priority, timestamp },
      { bubbles: true },
    );
  });

  onDestroy(() => {
    dispatch(
      _rootEl,
      "notification-item:unmount",
      { el: _rootEl },
      { bubbles: true },
    );
  });

  // *********
  // Functions
  // *********

  function handleTabChange(e: Event) {
    const { activeTab } = (e as CustomEvent).detail;
    _currentActiveTab = activeTab;
    updateVisibility();
  }

  function updateDateGroupHeading(e: Event) {
    const { dateGroup } = (e as CustomEvent).detail;
    _dateGroupHeading = dateGroup || "";
  }

  function updateVisibility() {
    if (_currentActiveTab === "all") {
      _visible = true;
    } else if (_currentActiveTab === "unread") {
      _visible = readStatus === "unread";
    } else if (_currentActiveTab === "urgent") {
      _visible = priority === "urgent";
    }
  }

  function dispatchReadStatusChange() {
    dispatch(
      _rootEl,
      "_notificationItemRead",
      { el: _rootEl, readStatus },
      { bubbles: true },
    );
  }

  function handleClick() {
    dispatch(_rootEl, "_click", {}, { bubbles: true });
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }

  function getBadgeType(
    notificationType: WorkSideNotificationItemType,
  ): string {
    switch (notificationType) {
      case "info":
        return "information";
      case "warning":
        return "important";
      case "success":
        return "success";
      case "critical":
        return "emergency";
      default:
        return "";
    }
  }
</script>

{#if _dateGroupHeading}
  <h4 class="date-header" class:hidden={!_visible}>{_dateGroupHeading}</h4>
{/if}
<div
  class="card"
  class:read={!_isUnread}
  class:urgent={_isUrgent}
  class:hidden={!_visible}
  role="button"
  tabindex="0"
  data-testid={testid}
  on:click={handleClick}
  on:keydown={handleKeyDown}
  bind:this={_rootEl}
>
  <div class="top-row">
    <div class="header-row">
      {#if title}
        <h4 class="notification-title" data-testid={`title-${testid}`}>{title}</h4>
      {/if}

      {#if _showBadge}
        <span class="badge-container" data-testid={`badge-${testid}`}>
          <goa-badge
            type={_badgeType}
            icon="true"
            arialabel={type}
            emphasis="subtle"
            version="2"
          />
        </span>
      {/if}
    </div>

    {#if timestamp}
      <goa-tooltip content={_fullDate} position="left">
        <div class="timestamp-container" aria-label={_fullDate}>
          <span
            data-testid={`unread-dot-${testid}`}
            class="unread-dot"
            class:hidden={!_isUnread}
          ></span>
          <p class="timestamp" data-testid={`timestamp-${testid}`}>
            {_transformTime}
          </p>
        </div>
      </goa-tooltip>
    {:else}
      <div class="timestamp-container">
        <span class="unread-dot" class:hidden={!_isUnread}></span>
      </div>
    {/if}
  </div>

  {#if description}
    <div class="description" data-testid={`description-${testid}`}>
      <goa-text
        as="span"
        size="body-s"
        color={_isUnread ? "primary" : "secondary"}
      >
        {description}
      </goa-text>
    </div>
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

  .date-header {
    font: var(--goa-typography-heading-2xs);
    color: var(--goa-color-greyscale-600);
    padding-left: var(--goa-space-m);
    margin-top: 0;
    margin-bottom: 0;
    padding-top: var(--goa-space-s);
    padding-bottom: var(--goa-space-s);
    border-bottom: 1px solid var(--goa-color-greyscale-100);
  }

  .date-header.hidden {
    display: none;
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

  .card.hidden {
    display: none;
  }

  .card.urgent:hover {
    background: #f5ecdb;
  }

  .card.urgent.read:hover {
    background: var(--goa-color-greyscale-100);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--goa-space-s);
    width: 100%;
  }

  .header-row {
    display: flex;
    align-items: center;
    gap: var(--goa-space-xs);
    flex-wrap: wrap;
    flex: 1;
    min-width: 0;
  }

  .notification-title {
    font: var(--goa-typography-heading-2xs);
    color: var(--goa-color-text-default);
    margin: 0;
  }

  .badge-container {
    display: inline-flex;
    align-items: center;
    gap: var(--goa-space-3xs);
  }

  .description {
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-greyscale-700);
    line-height: 1.5;
    word-wrap: break-word;
  }

  .timestamp-container {
    display: flex;
    align-items: center;
    gap: var(--goa-space-2xs);
    flex-shrink: 0;
    margin-top: 2px;
  }

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
