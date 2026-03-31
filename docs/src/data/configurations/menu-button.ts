/**
 * MenuButton Component Configurations
 *
 * Menu buttons show dropdown menus on click.
 */

import type { ComponentConfigurations } from './types';

export const menuButtonConfigurations: ComponentConfigurations = {
  componentSlug: 'menu-button',
  componentName: 'Menu button',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic menu button',
      description: 'Button with dropdown menu',
      code: {
        react: `<GoabMenuButton text="Actions" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Edit" action="edit" />
  <GoabMenuAction text="Copy" action="copy" />
  <GoabMenuAction text="Delete" action="delete" />
</GoabMenuButton>`,
        angular: `<goab-menu-button text="Actions" (onAction)="handleAction($event)">
  <goab-menu-action text="Edit" action="edit"></goab-menu-action>
  <goab-menu-action text="Copy" action="copy"></goab-menu-action>
  <goab-menu-action text="Delete" action="delete"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button text="Actions">
  <goa-menu-action text="Edit" action="edit"></goa-menu-action>
  <goa-menu-action text="Copy" action="copy"></goa-menu-action>
  <goa-menu-action text="Delete" action="delete"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: 'icon-only',
      name: 'Icon-only menu button',
      description: 'Menu with icon button (no text)',
      code: {
        react: `<GoabMenuButton
  leadingIcon="ellipsis-horizontal"
  ariaLabel="More options"
  onAction={(detail) => console.log(detail.action)}
>
  <GoabMenuAction text="View details" action="view" />
  <GoabMenuAction text="Edit" action="edit" icon="pencil" />
  <GoabMenuAction text="Delete" action="delete" icon="trash" />
</GoabMenuButton>`,
        angular: `<goab-menu-button
  leadingIcon="ellipsis-horizontal"
  ariaLabel="More options"
  (onAction)="handleAction($event)"
>
  <goab-menu-action text="View details" action="view"></goab-menu-action>
  <goab-menu-action text="Edit" action="edit" icon="pencil"></goab-menu-action>
  <goab-menu-action text="Delete" action="delete" icon="trash"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button
  leading-icon="ellipsis-horizontal"
  aria-label="More options"
>
  <goa-menu-action text="View details" action="view"></goa-menu-action>
  <goa-menu-action text="Edit" action="edit" icon="pencil"></goa-menu-action>
  <goa-menu-action text="Delete" action="delete" icon="trash"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: 'with-icons',
      name: 'Items with icons',
      description: 'Menu items with leading icons',
      code: {
        react: `<GoabMenuButton text="Options" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Download" action="download" icon="download" />
  <GoabMenuAction text="Share" action="share" icon="share" />
  <GoabMenuAction text="Print" action="print" icon="print" />
</GoabMenuButton>`,
        angular: `<goab-menu-button text="Options" (onAction)="handleAction($event)">
  <goab-menu-action text="Download" action="download" icon="download"></goab-menu-action>
  <goab-menu-action text="Share" action="share" icon="share"></goab-menu-action>
  <goab-menu-action text="Print" action="print" icon="print"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button text="Options">
  <goa-menu-action text="Download" action="download" icon="download"></goa-menu-action>
  <goa-menu-action text="Share" action="share" icon="share"></goa-menu-action>
  <goa-menu-action text="Print" action="print" icon="print"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: 'destructive',
      name: 'Destructive variant',
      description: 'Menu button with destructive styling for dangerous actions',
      code: {
        react: `<GoabMenuButton text="Delete" variant="destructive" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Delete item" action="delete" icon="trash" />
  <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
</GoabMenuButton>`,
        angular: `<goab-menu-button text="Delete" variant="destructive" (onAction)="handleAction($event)">
  <goab-menu-action text="Delete item" action="delete" icon="trash"></goab-menu-action>
  <goab-menu-action text="Delete all" action="delete-all" icon="trash"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button text="Delete" variant="destructive">
  <goa-menu-action text="Delete item" action="delete" icon="trash"></goa-menu-action>
  <goa-menu-action text="Delete all" action="delete-all" icon="trash"></goa-menu-action>
</goa-menu-button>`,
      },
    },
  ],
};
