/**
 * TabContent.tsx
 *
 * Wrapper for tab content that includes a TOC sidebar.
 * Each tab gets its own TOC - when the tab is hidden, its TOC is hidden too.
 * This mirrors the ds-evo-website prototype pattern.
 */

import { TableOfContents } from "./TableOfContents";

interface TabContentProps {
  children: React.ReactNode;
  /** CSS selector for headings to include in TOC. Default: h2[id], h3[id] */
  tocCssQuery?: string;
}

export function TabContent({
  children,
  tocCssQuery = "h2[id], h3[id]",
}: TabContentProps) {
  return (
    <div className="tab-content-with-toc">
      <div className="tab-content-main">{children}</div>
      <aside className="tab-content-toc">
        <TableOfContents cssQuery={tocCssQuery} />
      </aside>

      <style>{`
        .tab-content-with-toc {
          display: grid;
          grid-template-columns: 1fr 180px;
          gap: var(--goa-space-xl, 2rem);
        }

        .tab-content-main {
          min-width: 0;
          padding: var(--goa-space-l, 1.5rem) 0;
        }

        .tab-content-toc {
          position: sticky;
          top: var(--goa-space-l, 1.5rem);
          height: fit-content;
          max-height: calc(100vh - var(--goa-space-2xl, 3rem));
          overflow-y: auto;
        }

        /* Hide TOC on smaller screens */
        @media (max-width: 1000px) {
          .tab-content-with-toc {
            grid-template-columns: 1fr;
          }

          .tab-content-toc {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default TabContent;
