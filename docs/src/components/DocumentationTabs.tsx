/**
 * DocumentationTabs - Wrapper for GoabTabs to use in component documentation pages
 *
 * This component tests and implements GoA tabs for the docs site dogfooding effort.
 * Uses actual GoA React components instead of custom CSS tabs.
 */
import { GoabTabs, GoabTab } from '@abgov/react-components';
import type { ReactNode } from 'react';

interface TabConfig {
  heading: string;
  count?: number;
  content: ReactNode;
}

interface DocumentationTabsProps {
  tabs: TabConfig[];
  initialTab?: number;
}

export function DocumentationTabs({ tabs, initialTab = 0 }: DocumentationTabsProps) {
  return (
    <GoabTabs initialTab={initialTab}>
      {tabs.map((tab, index) => (
        <GoabTab
          key={index}
          heading={tab.count !== undefined ? `${tab.heading} (${tab.count})` : tab.heading}
        >
          {tab.content}
        </GoabTab>
      ))}
    </GoabTabs>
  );
}

export default DocumentationTabs;
