/**
 * SideNav.tsx
 *
 * Left sidebar navigation using GoA WorkSideMenu (experimental).
 * Includes component categories, utility links, and back navigation.
 */

import { useState, useCallback } from 'react';
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from '@abgov/react-components/experimental';

// Component categories matching the design
const COMPONENT_CATEGORIES = [
  {
    name: 'Content layout',
    slug: 'content-layout',
    icon: 'grid',
    components: [
      { name: 'Block', slug: 'block' },
      { name: 'Columns', slug: 'columns' },
      { name: 'Container', slug: 'container' },
      { name: 'Divider', slug: 'divider' },
      { name: 'Grid', slug: 'grid' },
      { name: 'Spacer', slug: 'spacer' },
    ],
  },
  {
    name: 'Feedback and alerts',
    slug: 'feedback-and-alerts',
    icon: 'notifications',
    components: [
      { name: 'Badge', slug: 'badge' },
      { name: 'Callout', slug: 'callout' },
      { name: 'Notification banner', slug: 'notification-banner' },
      { name: 'Progress indicator', slug: 'progress-indicator' },
      { name: 'Skeleton loader', slug: 'skeleton-loader' },
      { name: 'Tooltip', slug: 'tooltip' },
    ],
  },
  {
    name: 'Inputs and actions',
    slug: 'inputs-and-actions',
    icon: 'create',
    components: [
      { name: 'Button', slug: 'button' },
      { name: 'Button group', slug: 'button-group' },
      { name: 'Icon button', slug: 'icon-button' },
      { name: 'Menu button', slug: 'menu-button' },
      { name: 'Checkbox', slug: 'checkbox' },
      { name: 'Checkbox list', slug: 'checkbox-list' },
      { name: 'Date picker', slug: 'date-picker' },
      { name: 'Dropdown', slug: 'dropdown' },
      { name: 'File uploader', slug: 'file-uploader' },
      { name: 'Input', slug: 'input' },
      { name: 'Radio', slug: 'radio' },
      { name: 'Text area', slug: 'text-area' },
    ],
  },
  {
    name: 'Structure and navigation',
    slug: 'structure-and-navigation',
    icon: 'browsers',
    components: [
      { name: 'Accordion', slug: 'accordion' },
      { name: 'App footer', slug: 'app-footer' },
      { name: 'App header', slug: 'app-header' },
      { name: 'Breadcrumb', slug: 'breadcrumb' },
      { name: 'Card', slug: 'card' },
      { name: 'Details', slug: 'details' },
      { name: 'Hero banner', slug: 'hero-banner' },
      { name: 'Modal', slug: 'modal' },
      { name: 'Pagination', slug: 'pagination' },
      { name: 'Side menu', slug: 'side-menu' },
      { name: 'Tabs', slug: 'tabs' },
    ],
  },
  {
    name: 'Utilities',
    slug: 'utilities',
    icon: 'build',
    components: [
      { name: 'Icon', slug: 'icon' },
      { name: 'Link', slug: 'link' },
      { name: 'Popover', slug: 'popover' },
      { name: 'Table', slug: 'table' },
    ],
  },
];

interface SideNavProps {
  currentSlug?: string;
  currentCategory?: string;
}

export function SideNav({ currentSlug, currentCategory }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    // Auto-expand the category containing the current component
    new Set(currentCategory ? [currentCategory] : [])
  );

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

  // Primary content: Back button + component categories
  const primaryContent = (
    <>
      {/* Back to home */}
      <GoabxWorkSideMenuItem
        label="Back"
        icon="arrow-back"
        onClick={handleBackClick}
      />

      {/* Component categories */}
      {COMPONENT_CATEGORIES.map((category) => {
        const isExpanded = expandedCategories.has(category.slug);
        const hasCurrentComponent = category.components.some(
          (c) => c.slug === currentSlug
        );

        return (
          <GoabxWorkSideMenuItem
            key={category.slug}
            label={category.name}
            icon={category.icon}
            current={hasCurrentComponent}
            onClick={() => toggleCategory(category.slug)}
          >
            {isExpanded &&
              category.components.map((component) => (
                <GoabxWorkSideMenuItem
                  key={component.slug}
                  label={component.name}
                  url={`/components/${component.slug}`}
                  current={component.slug === currentSlug}
                />
              ))}
          </GoabxWorkSideMenuItem>
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
          // Future: Open AI assistant drawer
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

export default SideNav;
