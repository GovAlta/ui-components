/**
 * Page-scale entries (page, task, product) render a PreviewContainer
 * card linking to the entry's docs page rather than an inline sandbox,
 * because their composition usually depends on app shell, mock data, or
 * external sources that don't render usefully inline. Section and
 * interaction snippets render inline with a sandbox plus framework code
 * tabs.
 */
const PAGE_SCALES = ["page", "task", "product"] as const;

export function isPageScale(size: string): boolean {
  return (PAGE_SCALES as readonly string[]).includes(size);
}
