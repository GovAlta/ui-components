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
        react: `<GoabxMenuButton text="Actions" onAction={(detail) => console.log(detail.action)}>
  <GoabxMenuAction text="Edit" action="edit" />
  <GoabxMenuAction text="Copy" action="copy" />
  <GoabxMenuAction text="Delete" action="delete" />
</GoabxMenuButton>`,
        angular: `<goabx-menu-button text="Actions" (onAction)="handleAction($event)">
  <goabx-menu-action text="Edit" action="edit"></goabx-menu-action>
  <goabx-menu-action text="Copy" action="copy"></goabx-menu-action>
  <goabx-menu-action text="Delete" action="delete"></goabx-menu-action>
</goabx-menu-button>`,
        webComponents: `<goa-menu-button text="Actions">
  <goa-menu-action text="Edit" action="edit"></goa-menu-action>
  <goa-menu-action text="Copy" action="copy"></goa-menu-action>
  <goa-menu-action text="Delete" action="delete"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "icon-only",
      name: "Icon-only menu button",
      description: "Menu with icon button (no text)",
      code: {
        react: `<GoabxMenuButton
  leadingIcon="ellipsis-horizontal"
  ariaLabel="More options"
  onAction={(detail) => console.log(detail.action)}
>
  <GoabxMenuAction text="View details" action="view" />
  <GoabxMenuAction text="Edit" action="edit" icon="pencil" />
  <GoabxMenuAction text="Delete" action="delete" icon="trash" />
</GoabxMenuButton>`,
        angular: `<goabx-menu-button
  leadingIcon="ellipsis-horizontal"
  ariaLabel="More options"
  (onAction)="handleAction($event)"
>
  <goabx-menu-action text="View details" action="view"></goabx-menu-action>
  <goabx-menu-action text="Edit" action="edit" icon="pencil"></goabx-menu-action>
  <goabx-menu-action text="Delete" action="delete" icon="trash"></goabx-menu-action>
</goabx-menu-button>`,
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
      id: "with-icons",
      name: "Items with icons",
      description: "Menu items with leading icons",
      code: {
        react: `<GoabxMenuButton text="Options" onAction={(detail) => console.log(detail.action)}>
  <GoabxMenuAction text="Download" action="download" icon="download" />
  <GoabxMenuAction text="Share" action="share" icon="share" />
  <GoabxMenuAction text="Print" action="print" icon="print" />
</GoabxMenuButton>`,
        angular: `<goabx-menu-button text="Options" (onAction)="handleAction($event)">
  <goabx-menu-action text="Download" action="download" icon="download"></goabx-menu-action>
  <goabx-menu-action text="Share" action="share" icon="share"></goabx-menu-action>
  <goabx-menu-action text="Print" action="print" icon="print"></goabx-menu-action>
</goabx-menu-button>`,
        webComponents: `<goa-menu-button text="Options">
  <goa-menu-action text="Download" action="download" icon="download"></goa-menu-action>
  <goa-menu-action text="Share" action="share" icon="share"></goa-menu-action>
  <goa-menu-action text="Print" action="print" icon="print"></goa-menu-action>
</goa-menu-button>`,
      },
    },
    {
      id: "destructive",
      name: "Destructive variant",
      description: "Menu button with destructive styling for dangerous actions",
      code: {
        react: `<GoabxMenuButton text="Delete" variant="destructive" onAction={(detail) => console.log(detail.action)}>
  <GoabxMenuAction text="Delete item" action="delete" icon="trash" />
  <GoabxMenuAction text="Delete all" action="delete-all" icon="trash" />
</GoabxMenuButton>`,
        angular: `<goabx-menu-button text="Delete" variant="destructive" (onAction)="handleAction($event)">
  <goabx-menu-action text="Delete item" action="delete" icon="trash"></goabx-menu-action>
  <goabx-menu-action text="Delete all" action="delete-all" icon="trash"></goabx-menu-action>
</goabx-menu-button>`,
        webComponents: `<goa-menu-button text="Delete" variant="destructive">
  <goa-menu-action text="Delete item" action="delete" icon="trash"></goa-menu-action>
  <goa-menu-action text="Delete all" action="delete-all" icon="trash"></goa-menu-action>
</goa-menu-button>`,
      },
    },
  ],
};
