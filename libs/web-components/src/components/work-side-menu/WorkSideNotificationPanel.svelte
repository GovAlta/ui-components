<svelte:options
  customElement={{
    tag: "goa-work-side-notification-panel",
    props: {
      activeTab: { type: "String", attribute: "active-tab" },
    },
  }}
/>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import {
    typeValidator,
    dispatch,
    performOnce,
    formatDateGroup as formatDateGroupUtil,
  } from "../../common/utils";

  // Validators

  const [Tabs, validateTab] = typeValidator(
    "WorkSideNotificationPanel activeTab",
    ["unread", "urgent", "all"] as const,
    true,
  );

  // Types

  type TabType = (typeof Tabs)[number];
  type NotificationItem = {
    el: HTMLElement;
    readStatus: string;
    priority: string;
    timestamp: string;
  };

  // Public

  export let heading: string = "Notifications";
  export let activeTab: TabType = "unread";
  export let testid: string = "";

  // *******
  // Private
  // *******

  let _rootEl: HTMLElement;
  let _items: NotificationItem[] = [];
  let _dateGroupedItems = new Map<string, NotificationItem>();
  let _updateDateHeadersTimeout: ReturnType<typeof setTimeout> | null = null;

  const _emptyImage =
    "data:image/svg+xml,%3csvg%20width='100'%20height='78'%20viewBox='0%200%20100%2078'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M35.3916%2010.3377L89.7579%2019.1046C95.0394%2019.9563%2098.2025%2025.4482%2096.2887%2030.4439L78.9942%2075.591C78.846%2075.978%2078.5679%2076.2827%2078.2253%2076.469C77.9557%2076.7837%2077.6176%2076.7584%2077.1425%2076.651C77.1243%2076.648%2077.1061%2076.6447%2077.0879%2076.641L75.7496%2076.3725C76.3188%2076.4338%2076.7722%2076.5674%2077.1425%2076.651C77.5243%2076.7148%2077.9033%2076.6442%2078.2253%2076.469C78.2465%2076.4443%2078.2673%2076.4175%2078.2876%2076.3884C78.4498%2076.1572%2078.4664%2075.8597%2078.4317%2075.5794L73.4827%2035.6546C72.5591%2028.2041%2066.8211%2022.2617%2059.4075%2021.078L26.1553%2015.7688C27.5305%2011.9754%2031.4081%209.69529%2035.3916%2010.3377Z'%20fill='white'%20stroke='black'%20stroke-width='0.843087'%20stroke-linecap='round'/%3e%3cpath%20d='M95.5272%2022.3047C97.5167%2024.4198%2098.3017%2027.5943%2097.1683%2030.5801L80.0464%2075.6832C79.8681%2076.1528%2079.5193%2076.5121%2079.0948%2076.7125C78.7271%2076.9892%2078.301%2076.9332%2077.9393%2076.8551L77.9145%2076.8499C75.9533%2076.452%2077.424%2076.9001%2077.8885%2075.2938L78.5706%2073.3849L95.6772%2028.323C96.4561%2026.271%2096.3286%2024.1299%2095.5272%2022.3047Z'%20fill='black'%20stroke='black'%20stroke-width='0.843087'%20stroke-linecap='round'/%3e%3cpath%20d='M19.7062%2014.8763L19.5582%2013.3068C18.999%207.37653%2014.5443%202.55192%208.67735%201.52252C4.33738%200.761031%200.48074%204.37732%200.961767%208.75726L6.59424%2060.0431C6.79604%2061.8806%208.17145%2063.3722%209.98658%2063.7221L76.1867%2076.4832C77.3099%2076.6997%2078.3181%2075.7589%2078.1797%2074.6235L73.4332%2035.6892C72.5207%2028.2049%2066.7506%2022.236%2059.3015%2021.0706L19.7062%2014.8763Z'%20fill='white'%20stroke='black'%20stroke-width='0.843087'%20stroke-linecap='round'/%3e%3c/svg%3e";

  // ========
  // Reactive
  // ========

  $: _unreadCount = _items.filter(
    (item) => item.readStatus === "unread",
  ).length;
  $: _urgentCount = _items.filter((item) => item.priority === "urgent").length;
  $: _isEmptyState =
    _items.length === 0 ||
    (activeTab === "unread" && _unreadCount === 0) ||
    (activeTab === "urgent" && _urgentCount === 0) ||
    (activeTab === "all" && _items.length === 0);
  $: notifyActiveTabChange(activeTab);

  // *****
  // Hooks
  // *****

  onMount(() => {
    validateTab(activeTab);

    _rootEl.addEventListener(
      "notification-item:mounted",
      handleNotificationItemMount,
    );
    _rootEl.addEventListener(
      "notification-item:unmount",
      handleNotificationItemUnmount,
    );
    _rootEl.addEventListener(
      "_notificationItemRead",
      handleNotificationItemRead,
    );
  });

  onDestroy(() => {
    if (_updateDateHeadersTimeout) {
      clearTimeout(_updateDateHeadersTimeout);
    }
  });

  // *********
  // Functions
  // *********

  function handleNotificationItemMount(e: Event) {
    const detail = (e as CustomEvent).detail;

    if (_items.find((item) => item.el === detail.el)) return;

    const timestamp = detail.timestamp || "";
    const newItem: NotificationItem = { ...detail, timestamp };
    _items = [..._items, newItem];

    dispatchTabChange(detail.el);

    // Debounce to wait for all notification items mounted before updating date headers
    _updateDateHeadersTimeout = performOnce(
      _updateDateHeadersTimeout,
      updateDateHeaders,
    );
  }

  function handleNotificationItemUnmount(e: Event) {
    const detail = (e as CustomEvent).detail;
    _items = _items.filter((item) => item.el !== detail.el);
  }

  function handleNotificationItemRead(e: Event) {
    const detail = (e as CustomEvent).detail;
    // Update the item's readStatus
    _items = _items.map((item) =>
      item.el === detail.el ? { ...item, readStatus: detail.readStatus } : item,
    );
    updateDateHeaders();
  }

  function handleTabChange(e: CustomEvent) {
    const tabIndex = e.detail.tab;
    const tabs: TabType[] = ["unread", "urgent", "all"];
    if (tabIndex >= 1 && tabIndex <= 3) {
      activeTab = tabs[tabIndex - 1];
    }
  }

  function dispatchTabChange(el: HTMLElement) {
    el.dispatchEvent(
      new CustomEvent("notification-panel:tabchange", {
        detail: { activeTab },
      }),
    );
  }

  function notifyActiveTabChange(_activeTab: TabType) {
    _items.forEach((item) => {
      dispatchTabChange(item.el);
    });
    updateDateHeaders();
  }

  function formatDateGroup(timestamp: string): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";

    return formatDateGroupUtil(date);
  }

  function getDateKey(timestamp: string): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return "";
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  function isItemVisible(item: NotificationItem, tab: TabType): boolean {
    if (tab === "all") return true;
    if (tab === "unread") return item.readStatus === "unread";
    if (tab === "urgent") return item.priority === "urgent";
    return true;
  }

  function dispatchDateGroup(el: HTMLElement, dateGroup: string) {
    el.dispatchEvent(
      new CustomEvent("notification-panel:dategroup", {
        detail: { dateGroup },
      }),
    );
  }

  function updateDateHeaders() {
    if (_items.length === 0) return;

    _dateGroupedItems.forEach((item) => {
      dispatchDateGroup(item.el, "");
    });
    _dateGroupedItems.clear();

    const itemsInOrder = [..._items].sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeB - timeA; // Newest first
    });

    const visibleItems = itemsInOrder.filter((item) =>
      isItemVisible(item, activeTab),
    );

    visibleItems.forEach((item) => {
      const dateKey = getDateKey(item.timestamp);
      if (dateKey && !_dateGroupedItems.has(dateKey)) {
        _dateGroupedItems.set(dateKey, item);
        dispatchDateGroup(item.el, formatDateGroup(item.timestamp));
      }
    });
  }

  function handleViewAll(e: Event) {
    e.preventDefault();
    dispatch(_rootEl, "_viewAll", {}, { bubbles: true });
    handleClose();
  }

  function handleMarkAllRead(e: Event) {
    e.preventDefault();
    if (_unreadCount === 0) return;
    dispatch(_rootEl, "_markAllRead", {}, { bubbles: true });
  }

  function handleClose() {
    // to close any opening popover (for other side menu item that also has popover)
    dispatch(
      _rootEl,
      "goa:work-side-notification-panel:closePopover",
      {},
      { bubbles: true },
    );
  }
</script>

<div class="notification-panel" data-testid={testid} bind:this={_rootEl}>
  <!-- Header -->
  <div class="header">
    <goa-text as="h2" size="heading-s" mt="l" mb="s" ml="m">{heading}</goa-text>
    <goa-icon-button
      icon="close"
      size="medium"
      variant="dark"
      mr="s"
      version="2"
      testid={`close-${testid}`}
      on:_click={handleClose}
    />
  </div>

  <!-- Tabs -->
  <goa-tabs
    initialtab="1"
    navigation="none"
    version="2"
    variant="segmented"
    on:_change={handleTabChange}
  >
    <goa-tab>
      <span slot="heading">
        Unread
        {#if _unreadCount > 0}
          <goa-badge
            testid="unreadCount"
            type="default"
            icon="false"
            version="2"
            content={`${_unreadCount}`}
            emphasis="subtle"
          />
        {/if}
      </span>
    </goa-tab>
    <goa-tab>
      <span slot="heading">
        Urgent
        {#if _urgentCount > 0}
          <goa-badge
            icon="false"
            type="important"
            version="2"
            content={`${_urgentCount}`}
            emphasis="subtle"
          />
        {/if}
      </span>
    </goa-tab>
    <goa-tab>
      <span slot="heading">All</span>
    </goa-tab>
  </goa-tabs>

  <div class="content">
    {#if _isEmptyState}
      <div class="empty">
        <img alt="" src={_emptyImage} />
        <span class="heading">You're all caught up</span>
        <span class="subline" data-testid={`empty-notifications-${testid}`}>
          {activeTab === "unread"
            ? "No unread notifications"
            : activeTab === "urgent"
              ? "No urgent notifications"
              : "No notifications"}
        </span>
      </div>
    {/if}
    <slot />
  </div>

  <!-- Footer -->
  <div class="footer">
    <goa-link-button on:_click={handleViewAll} testid={`view-all-${testid}`}
      >View all</goa-link-button
    >
    <goa-link-button
      disabled={_unreadCount === 0}
      testid={`mark-all-as-read-${testid}`}
      on:_click={handleMarkAllRead}>Mark all as read</goa-link-button
    >
  </div>
</div>

<style>
  :host {
    display: block;
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  :host * {
    box-sizing: border-box;
  }

  .notification-panel {
    display: flex;
    flex-direction: column;
    background: var(--goa-color-greyscale-white);
    height: 710px;
  }

  .header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  goa-tabs {
    --goa-tabs-margin-bottom: 0;
    padding-left: var(--goa-space-m);
    padding-right: var(--goa-space-m);
  }

  .content {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .footer {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--goa-space-m);
    border-top: 1px solid var(--goa-color-greyscale-100);
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--goa-space-2xl) var(--goa-space-m);
    text-align: center;
  }

  .empty img {
    width: 100px;
    height: 78px;
    margin-bottom: var(--goa-space-l);
  }

  .empty .heading {
    font: var(--goa-typography-heading-xs);
    color: var(--goa-color-text-default);
    margin-bottom: var(--goa-space-xs);
  }

  .empty .subline {
    font: var(--goa-typography-body-s);
    color: var(--goa-color-text-secondary);
  }
</style>
