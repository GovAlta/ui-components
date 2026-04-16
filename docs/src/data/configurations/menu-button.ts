/**
 * MenuButton Component Configurations
 *
 * Menu buttons show dropdown menus on click.
 */

import type { ComponentConfigurations } from "./types";

export const menuButtonConfigurations: ComponentConfigurations = {
  componentSlug: "menu-button",
  componentName: "Menu button",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic menu button",
      description: "Button with dropdown menu",
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
        webComponents: `<goa-menu-button version="2" text="Actions">
  <goa-menu-action text="Edit" action="edit"></goa-menu-action>
  <goa-menu-action text="Copy" action="copy"></goa-menu-action>
  <goa-menu-action text="Delete" action="delete"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "types",
      name: "Types",
      description: "Primary, secondary, and tertiary menu button styles",
      code: {
        react: `<GoabMenuButton text="Primary" type="primary" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Action 1" action="a1" />
  <GoabMenuAction text="Action 2" action="a2" />
</GoabMenuButton>
<GoabMenuButton text="Secondary" type="secondary" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Action 1" action="a1" />
  <GoabMenuAction text="Action 2" action="a2" />
</GoabMenuButton>
<GoabMenuButton text="Tertiary" type="tertiary" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Action 1" action="a1" />
  <GoabMenuAction text="Action 2" action="a2" />
</GoabMenuButton>`,
        angular: `<goab-menu-button text="Primary" type="primary" (onAction)="handleAction($event)">
  <goab-menu-action text="Action 1" action="a1"></goab-menu-action>
  <goab-menu-action text="Action 2" action="a2"></goab-menu-action>
</goab-menu-button>
<goab-menu-button text="Secondary" type="secondary" (onAction)="handleAction($event)">
  <goab-menu-action text="Action 1" action="a1"></goab-menu-action>
  <goab-menu-action text="Action 2" action="a2"></goab-menu-action>
</goab-menu-button>
<goab-menu-button text="Tertiary" type="tertiary" (onAction)="handleAction($event)">
  <goab-menu-action text="Action 1" action="a1"></goab-menu-action>
  <goab-menu-action text="Action 2" action="a2"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button version="2" text="Primary" type="primary">
  <goa-menu-action text="Action 1" action="a1"></goa-menu-action>
  <goa-menu-action text="Action 2" action="a2"></goa-menu-action>
</goa-menu-button>
<goa-menu-button version="2" text="Secondary" type="secondary">
  <goa-menu-action text="Action 1" action="a1"></goa-menu-action>
  <goa-menu-action text="Action 2" action="a2"></goa-menu-action>
</goa-menu-button>
<goa-menu-button version="2" text="Tertiary" type="tertiary">
  <goa-menu-action text="Action 1" action="a1"></goa-menu-action>
  <goa-menu-action text="Action 2" action="a2"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "icon-only",
      name: "Icon-only menu button",
      description: "Menu with icon button (no text)",
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
        webComponents: `<goa-menu-button version="2"
  leadingicon="ellipsis-horizontal"
  arialabel="More options"
>
  <goa-menu-action text="View details" action="view"></goa-menu-action>
  <goa-menu-action text="Edit" action="edit" icon="pencil"></goa-menu-action>
  <goa-menu-action text="Delete" action="delete" icon="trash"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "with-icons",
      name: "Items with icons",
      description: "Menu items with leading icons",
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
        webComponents: `<goa-menu-button version="2" text="Options">
  <goa-menu-action text="Download" action="download" icon="download"></goa-menu-action>
  <goa-menu-action text="Share" action="share" icon="share"></goa-menu-action>
  <goa-menu-action text="Print" action="print" icon="print"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Normal and compact menu button sizes",
      code: {
        react: `<GoabMenuButton text="Normal" size="normal" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Action 1" action="a1" />
  <GoabMenuAction text="Action 2" action="a2" />
</GoabMenuButton>
<GoabMenuButton text="Compact" size="compact" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Action 1" action="a1" />
  <GoabMenuAction text="Action 2" action="a2" />
</GoabMenuButton>`,
        angular: `<goab-menu-button text="Normal" size="normal" (onAction)="handleAction($event)">
  <goab-menu-action text="Action 1" action="a1"></goab-menu-action>
  <goab-menu-action text="Action 2" action="a2"></goab-menu-action>
</goab-menu-button>
<goab-menu-button text="Compact" size="compact" (onAction)="handleAction($event)">
  <goab-menu-action text="Action 1" action="a1"></goab-menu-action>
  <goab-menu-action text="Action 2" action="a2"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button version="2" text="Normal" size="normal">
  <goa-menu-action text="Action 1" action="a1"></goa-menu-action>
  <goa-menu-action text="Action 2" action="a2"></goa-menu-action>
</goa-menu-button>
<goa-menu-button version="2" text="Compact" size="compact">
  <goa-menu-action text="Action 1" action="a1"></goa-menu-action>
  <goa-menu-action text="Action 2" action="a2"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "destructive",
      name: "Destructive variant",
      description: "Destructive menu buttons across all button types",
      code: {
        react: `<GoabMenuButton text="Primary" variant="destructive" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Delete item" action="delete" icon="trash" />
  <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
</GoabMenuButton>
<GoabMenuButton text="Secondary" variant="destructive" type="secondary" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Delete item" action="delete" icon="trash" />
  <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
</GoabMenuButton>
<GoabMenuButton text="Tertiary" variant="destructive" type="tertiary" onAction={(detail) => console.log(detail.action)}>
  <GoabMenuAction text="Delete item" action="delete" icon="trash" />
  <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
</GoabMenuButton>`,
        angular: `<goab-menu-button text="Primary" variant="destructive" (onAction)="handleAction($event)">
  <goab-menu-action text="Delete item" action="delete" icon="trash"></goab-menu-action>
  <goab-menu-action text="Delete all" action="delete-all" icon="trash"></goab-menu-action>
</goab-menu-button>
<goab-menu-button text="Secondary" variant="destructive" type="secondary" (onAction)="handleAction($event)">
  <goab-menu-action text="Delete item" action="delete" icon="trash"></goab-menu-action>
  <goab-menu-action text="Delete all" action="delete-all" icon="trash"></goab-menu-action>
</goab-menu-button>
<goab-menu-button text="Tertiary" variant="destructive" type="tertiary" (onAction)="handleAction($event)">
  <goab-menu-action text="Delete item" action="delete" icon="trash"></goab-menu-action>
  <goab-menu-action text="Delete all" action="delete-all" icon="trash"></goab-menu-action>
</goab-menu-button>`,
        webComponents: `<goa-menu-button version="2" text="Primary" variant="destructive">
  <goa-menu-action text="Delete item" action="delete" icon="trash"></goa-menu-action>
  <goa-menu-action text="Delete all" action="delete-all" icon="trash"></goa-menu-action>
</goa-menu-button>
<goa-menu-button version="2" text="Secondary" variant="destructive" type="secondary">
  <goa-menu-action text="Delete item" action="delete" icon="trash"></goa-menu-action>
  <goa-menu-action text="Delete all" action="delete-all" icon="trash"></goa-menu-action>
</goa-menu-button>
<goa-menu-button version="2" text="Tertiary" variant="destructive" type="tertiary">
  <goa-menu-action text="Delete item" action="delete" icon="trash"></goa-menu-action>
  <goa-menu-action text="Delete all" action="delete-all" icon="trash"></goa-menu-action>
</goa-menu-button>`,
      },
    },
  ],
};
