/**
 * ExamplesSideNav.tsx
 *
 * Left sidebar navigation for Examples section using GoA WorkSideMenu (experimental).
 */

import { useState, useCallback } from 'react';
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from '@abgov/react-components/experimental';

// Example categories - these can be expanded to show individual examples
const EXAMPLE_CATEGORIES = [
  {
    name: 'Public form',
    slug: 'public-form',
    expandable: true,
    examples: [
      { name: 'Ask a user for a birthday', slug: 'ask-a-user-for-a-birthday' },
      { name: 'Simple login form', slug: 'simple-login-form' },
    ],
  },
  {
    name: 'Workspace',
    slug: 'workspace',
    expandable: true,
    examples: [
      { name: 'Search input', slug: 'search-input' },
    ],
  },
  {
    name: 'Basic layout',
    slug: 'basic-layout',
    expandable: false,
    examples: [],
  },
];

interface ExamplesSideNavProps {
  currentSlug?: string;
}

export function ExamplesSideNav({ currentSlug }: ExamplesSideNavProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleCategory = useCallback((categorySlug: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categorySlug)) {
        next.delete(categorySlug);
      } else {
        next.add(categorySlug);
      }
      return next;
    });
  }, []);

  const handleBackClick = useCallback(() => {
    window.location.href = '/';
  }, []);

  // Check if we're on the "All" page (no specific example selected, or on /examples)
  const isAllSelected = !currentSlug || currentSlug === '';

  // Primary content: Back button + All + categories
  const primaryContent = (
    <>
      {/* Back to home */}
      <GoabxWorkSideMenuItem
        label="Back"
        icon="arrow-back"
        onClick={handleBackClick}
      />

      {/* All examples */}
      <GoabxWorkSideMenuItem
        label="All"
        url="/examples"
        current={isAllSelected}
      />

      {/* Example categories */}
      {EXAMPLE_CATEGORIES.map((category) => {
        const isExpanded = expandedCategories.has(category.slug);
        const hasCurrentExample = category.examples.some(
          (e) => e.slug === currentSlug
        );

        if (category.expandable && category.examples.length > 0) {
          return (
            <GoabxWorkSideMenuItem
              key={category.slug}
              label={category.name}
              current={hasCurrentExample}
              onClick={() => toggleCategory(category.slug)}
            >
              {isExpanded &&
                category.examples.map((example) => (
                  <GoabxWorkSideMenuItem
                    key={example.slug}
                    label={example.name}
                    url={`/examples/${example.slug}`}
                    current={example.slug === currentSlug}
                  />
                ))}
            </GoabxWorkSideMenuItem>
          );
        }

        // Non-expandable category (flat link)
        return (
          <GoabxWorkSideMenuItem
            key={category.slug}
            label={category.name}
            url={`/examples?category=${category.slug}`}
          />
        );
      })}
    </>
  );

  // Secondary content: Utility links at bottom
  const secondaryContent = (
    <>
      <GoabxWorkSideMenuItem label="Search" icon="search" badge="/" url="/search" />
      <GoabxWorkSideMenuItem
        label="AI Assistant"
        icon="help-circle"
        onClick={() => {
          console.log('AI Assistant clicked');
        }}
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
      heading="Design system"
      url="/"
      open={isOpen}
      onToggle={handleToggle}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
    />
  );
}

export default ExamplesSideNav;
