/**
 * ExamplesSubMenu.tsx
 *
 * Sub-menu for Examples section.
 * Shows category links - the full examples list is in the data grid.
 */

import { useState, useCallback } from 'react';
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from '@abgov/react-components/experimental';

// Example categories for filtering
const EXAMPLE_CATEGORIES = [
  { name: 'All examples', slug: '', icon: 'list' },
  { name: 'Public form', slug: 'public-form', icon: 'document' },
  { name: 'Workspace', slug: 'workspace', icon: 'desktop' },
  { name: 'Basic layout', slug: 'basic-layout', icon: 'browsers' },
];

interface ExamplesSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
  currentSlug?: string;
}

export function ExamplesSubMenu({
  isOpen,
  onToggle,
  onBack,
  currentSlug,
}: ExamplesSubMenuProps) {
  // Primary content: Back button + category links
  const primaryContent = (
    <>
      {/* Back to parent menu */}
      <GoabxWorkSideMenuItem
        label="All"
        icon="arrow-back"
        onClick={onBack}
      />

      {/* Example categories */}
      {EXAMPLE_CATEGORIES.map((category) => (
        <GoabxWorkSideMenuItem
          key={category.slug || 'all'}
          label={category.name}
          icon={category.icon}
          url={category.slug ? `/examples?category=${category.slug}` : '/examples'}
          current={!currentSlug && category.slug === ''}
        />
      ))}
    </>
  );

  // Secondary content: Utility links at bottom
  const secondaryContent = (
    <>
      <GoabxWorkSideMenuItem label="Search" icon="search" badge="/" url="/search" />
      <GoabxWorkSideMenuItem
        label="Get support"
        icon="help-circle"
        url="/support"
      />
      <GoabxWorkSideMenuItem
        label="Release notes"
        icon="open"
        url="https://github.com/GovAlta/ui-components/releases"
      />
    </>
  );

  return (
    <GoabxWorkSideMenu
      heading="Examples"
      url="/"
      open={isOpen}
      onToggle={onToggle}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
    />
  );
}

export default ExamplesSubMenu;
