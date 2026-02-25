/**
 * ComponentsSubMenu.tsx
 *
 * Sub-menu for Components section showing categories and component links.
 * Uses GoabxWorkSideMenuGroup for expandable category sections.
 */

import type { MouseEvent } from 'react';
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
  GoabxWorkSideMenuGroup,
} from '@abgov/react-components/experimental';
import { GoabSpacer } from '@abgov/react-components';

// Component categories - synced with content collection (visible components only)
const COMPONENT_CATEGORIES = [
  {
    name: 'Content layout',
    slug: 'content-layout',
    icon: 'grid',
    components: [
      { name: 'Accordion', slug: 'accordion' },
      { name: 'Container', slug: 'container' },
      { name: 'Data Grid', slug: 'data-grid' },
      { name: 'Details', slug: 'details' },
      { name: 'Drawer', slug: 'drawer' },
      { name: 'Hero banner', slug: 'hero-banner' },
      { name: 'Page Block', slug: 'page-block' },
      { name: 'Popover', slug: 'popover' },
      { name: 'Table', slug: 'table' },
      { name: 'Text', slug: 'text' },
    ],
  },
  {
    name: 'Feedback and alerts',
    slug: 'feedback-and-alerts',
    icon: 'notifications',
    components: [
      { name: 'Badge', slug: 'badge' },
      { name: 'Callout', slug: 'callout' },
      { name: 'Circular progress indicator', slug: 'circular-progress' },
      { name: 'Filter chip', slug: 'filter-chip' },
      { name: 'Linear progress indicator', slug: 'linear-progress' },
      { name: 'Modal', slug: 'modal' },
      { name: 'Notification banner', slug: 'notification' },
      { name: 'Skeleton loader', slug: 'skeleton' },
      { name: 'Temporary notification', slug: 'temporary-notification' },
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
      { name: 'Checkbox', slug: 'checkbox' },
      { name: 'Checkbox list', slug: 'checkbox-list' },
      { name: 'Date picker', slug: 'date-picker' },
      { name: 'Dropdown', slug: 'dropdown' },
      { name: 'File uploader', slug: 'file-upload-input' },
      { name: 'Form', slug: 'form' },
      { name: 'Icon button', slug: 'icon-button' },
      { name: 'Input', slug: 'input' },
      { name: 'Link Button', slug: 'link-button' },
      { name: 'Menu button', slug: 'menu-button' },
      { name: 'Radio', slug: 'radio-group' },
      { name: 'Text area', slug: 'text-area' },
    ],
  },
  {
    name: 'Structure and navigation',
    slug: 'structure-and-navigation',
    icon: 'browsers',
    components: [
      { name: 'Footer', slug: 'footer' },
      { name: 'Form stepper', slug: 'form-stepper' },
      { name: 'Header', slug: 'app-header' },
      { name: 'Microsite header', slug: 'microsite-header' },
      { name: 'Pagination', slug: 'pagination' },
      { name: 'Side menu', slug: 'side-menu' },
      { name: 'Tabs', slug: 'tabs' },
      { name: 'Work Side Menu', slug: 'work-side-menu' },
    ],
  },
  {
    name: 'Utilities',
    slug: 'utilities',
    icon: 'build',
    components: [
      { name: 'Block', slug: 'block' },
      { name: 'Divider', slug: 'divider' },
      { name: 'Form item', slug: 'form-item' },
      { name: 'Grid', slug: 'grid' },
      { name: 'Icons', slug: 'icon' },
      { name: 'Link', slug: 'link' },
      { name: 'Spacer', slug: 'spacer' },
    ],
  },
];

interface ComponentsSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
  onExpandMenu?: () => void;
  currentSlug?: string;
}

export function ComponentsSubMenu({
  isOpen,
  onToggle,
  onBack,
  onExpandMenu,
  currentSlug,
}: ComponentsSubMenuProps) {
  // We're on the All Components page if there's no currentSlug
  const isAllComponentsPage = !currentSlug;

  // Handle back button click - wrap prevents navigation, triggers state change
  const handleBackClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onBack();
  };

  // Handle All Components click on detail pages - navigate without URL auto-matching
  const handleAllComponentsClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/components';
  };

  // Primary content: Back button + All Components link + component categories
  const primaryContent = (
    <>
      {/* Back to parent menu - wrapped div captures click since component doesn't expose onClick */}
      <div onClick={handleBackClick} style={{ cursor: 'pointer' }}>
        <GoabxWorkSideMenuItem
          label="All"
          icon="arrow-back"
          url="/__back__"
        />
      </div>

      {/* All Components page link
          - On All Components page: use url so auto-matching highlights it
          - On component detail pages: wrap in div to prevent auto-matching */}
      {isAllComponentsPage ? (
        <GoabxWorkSideMenuItem
          label="All Components"
          icon="apps"
          url="/components"
        />
      ) : (
        <div onClick={handleAllComponentsClick} style={{ cursor: 'pointer' }}>
          <GoabxWorkSideMenuItem
            label="All Components"
            icon="apps"
            url="/__all_components__"
          />
        </div>
      )}

      {/* Component categories - using GoabxWorkSideMenuGroup for expandable sections */}
      {COMPONENT_CATEGORIES.map((category) => {
        // Auto-expand category if it contains the current component
        const containsCurrentComponent = category.components.some(
          (c) => c.slug === currentSlug
        );

        // Handler to expand menu when clicking on a collapsed category group
        // Using capture phase to catch event before internal component handles it
        const handleGroupClickCapture = () => {
          if (!isOpen && onExpandMenu) {
            onExpandMenu();
          }
        };

        return (
          <div key={category.slug} onClickCapture={handleGroupClickCapture}>
            <GoabxWorkSideMenuGroup
              heading={category.name}
              icon={category.icon}
              open={containsCurrentComponent}
            >
              {category.components.map((component) => (
                <GoabxWorkSideMenuItem
                  key={component.slug}
                  label={component.name}
                  url={`/components/${component.slug}`}
                  current={component.slug === currentSlug}
                />
              ))}
            </GoabxWorkSideMenuGroup>
          </div>
        );
      })}
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
      <GoabSpacer vSpacing="m" />
    </>
  );

  return (
    <GoabxWorkSideMenu
      heading="Design System | Components"
      url="/"
      open={isOpen}
      onToggle={onToggle}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
    />
  );
}

export default ComponentsSubMenu;
