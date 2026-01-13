/**
 * TokensSubMenu.tsx
 *
 * Sub-menu for Tokens section.
 * Shows category filters - the full tokens list is in the data grid.
 */

import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuItem,
} from '@abgov/react-components/experimental';

// Token categories matching the design tokens structure
const TOKEN_CATEGORIES = [
  { name: 'All tokens', slug: '', icon: 'list' },
  { name: 'Color', slug: 'color', icon: 'color-palette' },
  { name: 'Spacing', slug: 'space', icon: 'resize' },
  { name: 'Typography', slug: 'typography', icon: 'text' },
  { name: 'Border', slug: 'border', icon: 'square' },
  { name: 'Shadow', slug: 'shadow', icon: 'layers' },
  { name: 'Icon', slug: 'icon', icon: 'shapes' },
];

interface TokensSubMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
}

export function TokensSubMenu({
  isOpen,
  onToggle,
  onBack,
}: TokensSubMenuProps) {
  // Primary content: Back button + category filters
  const primaryContent = (
    <>
      {/* Back to parent menu */}
      <GoabxWorkSideMenuItem
        label="All"
        icon="arrow-back"
        onClick={onBack}
      />

      {/* Token categories */}
      {TOKEN_CATEGORIES.map((category) => (
        <GoabxWorkSideMenuItem
          key={category.slug || 'all'}
          label={category.name}
          icon={category.icon}
          url={category.slug ? `/tokens?category=${category.slug}` : '/tokens'}
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
      heading="Tokens"
      url="/"
      open={isOpen}
      onToggle={onToggle}
      primaryContent={primaryContent}
      secondaryContent={secondaryContent}
    />
  );
}

export default TokensSubMenu;
