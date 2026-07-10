/**
 * Reads the URL hash of the active tab in the nearest ancestor goa-tabs.
 * Scoped to `fromElement` because a page can nest multiple goa-tabs
 * (e.g. framework code tabs inside each example within the documentation tabs).
 */
export function getActiveTabHash(fromElement: Element | null): string | null {
  const tabsEl = fromElement?.closest('goa-tabs');
  const activeTab = tabsEl?.shadowRoot?.querySelector<HTMLAnchorElement>(
    '[role="tab"][aria-selected="true"]',
  );
  const href = activeTab?.getAttribute('href') || '';
  return href.split('#')[1] || null;
}
