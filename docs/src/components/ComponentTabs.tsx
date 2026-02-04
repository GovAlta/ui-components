import { useState, type ReactNode } from "react";
import { GoabxTabs } from "@abgov/react-components/experimental";
import { GoabTab } from "@abgov/react-components";

interface TabConfig {
  id: string;
  label: string;
  count?: number;
}

interface ComponentTabsProps {
  tabs: TabConfig[];
  children: ReactNode;
}

/**
 * ComponentTabs - Wrapper around GoA Tabs for component documentation pages
 *
 * Provides a tabbed interface for Overview, Properties, Usage, Examples, and Accessibility sections.
 * Uses GoA React components for consistent design system styling.
 */
export function ComponentTabs({ tabs, children }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (detail: { tab: number }) => {
    setActiveTab(detail.tab);
  };

  return (
    <div className="component-tabs">
      <GoabxTabs initialTab={0} onChange={handleTabChange}>
        {tabs.map((tab, index) => (
          <GoabTab
            key={tab.id}
            heading={tab.count !== undefined ? `${tab.label} (${tab.count})` : tab.label}
          >
            <div className="tab-content" data-tab-id={tab.id}>
              {/* Content is slotted from Astro */}
            </div>
          </GoabTab>
        ))}
      </GoabxTabs>

      <style>{`
        .component-tabs {
          margin-top: var(--goa-space-l, 1.5rem);
        }

        .tab-content {
          padding: var(--goa-space-l, 1.5rem) 0;
        }
      `}</style>
    </div>
  );
}

export default ComponentTabs;
