/**
 * IconButton Component Configurations
 *
 * Icon buttons provide actions with icons only.
 */

import type { ComponentConfigurations } from "./types";

export const iconButtonConfigurations: ComponentConfigurations = {
  componentSlug: "icon-button",
  componentName: "Icon button",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic icon button",
      description: "Simple icon button",
      code: {
        react: `<GoabIconButton icon="close" ariaLabel="Close" />`,
        angular: `<goab-icon-button icon="close" ariaLabel="Close"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="close" arialabel="Close"></goa-icon-button>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "All available icon button sizes",
      code: {
        react: `<GoabIconButton icon="settings" size="2xsmall" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="xsmall" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="small" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="medium" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="large" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="xlarge" ariaLabel="Settings" />`,
        angular: `<goab-icon-button icon="settings" size="2xsmall" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="xsmall" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="small" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="medium" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="large" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="xlarge" ariaLabel="Settings"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="settings" size="2xsmall" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="xsmall" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="small" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="medium" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="large" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="xlarge" arialabel="Settings"></goa-icon-button>`,
      },
    },
    {
      id: "colours",
      name: "Colours",
      description: "All visual styles",
      code: {
        react: `<GoabIconButton icon="close" variant="color" ariaLabel="Close" />
<GoabIconButton icon="close" variant="dark" ariaLabel="Close" />
<GoabIconButton icon="close" variant="destructive" ariaLabel="Close" />
<div style={{ backgroundColor: "var(--goa-color-greyscale-700)", padding: "var(--goa-space-l)", display: "inline-block", marginTop: "var(--goa-space-m)" }}>
  <GoabIconButton icon="close" variant="light" ariaLabel="Close" />
</div>`,
        angular: `<goab-icon-button icon="close" variant="color" ariaLabel="Close"></goab-icon-button>
<goab-icon-button icon="close" variant="dark" ariaLabel="Close"></goab-icon-button>
<goab-icon-button icon="close" variant="destructive" ariaLabel="Close"></goab-icon-button>
<div style="background-color: var(--goa-color-greyscale-700); padding: var(--goa-space-l); display: inline-block; margin-top: var(--goa-space-m);">
  <goab-icon-button icon="close" variant="light" ariaLabel="Close"></goab-icon-button>
</div>`,
        webComponents: `<goa-icon-button icon="close" variant="color" arialabel="Close"></goa-icon-button>
<goa-icon-button icon="close" variant="dark" arialabel="Close"></goa-icon-button>
<goa-icon-button icon="close" variant="destructive" arialabel="Close"></goa-icon-button>
<div style="background-color: var(--goa-color-greyscale-700); padding: var(--goa-space-l); display: inline-block; margin-top: var(--goa-space-m);">
  <goa-icon-button icon="close" variant="light" arialabel="Close"></goa-icon-button>
</div>`,
      },
    },
    {
      id: "icon-theme",
      name: "Icon theme",
      description: "Outline and filled icon styles",
      code: {
        react: `<GoabIconButton icon="bookmark" theme="outline" ariaLabel="Bookmark (outline)" />
<GoabIconButton icon="bookmark" theme="filled" ariaLabel="Bookmark (filled)" />
<GoabIconButton icon="notifications" theme="outline" ariaLabel="Notifications (outline)" />
<GoabIconButton icon="notifications" theme="filled" ariaLabel="Notifications (filled)" />`,
        angular: `<goab-icon-button icon="bookmark" theme="outline" ariaLabel="Bookmark (outline)"></goab-icon-button>
<goab-icon-button icon="bookmark" theme="filled" ariaLabel="Bookmark (filled)"></goab-icon-button>
<goab-icon-button icon="notifications" theme="outline" ariaLabel="Notifications (outline)"></goab-icon-button>
<goab-icon-button icon="notifications" theme="filled" ariaLabel="Notifications (filled)"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="bookmark" theme="outline" arialabel="Bookmark (outline)"></goa-icon-button>
<goa-icon-button icon="bookmark" theme="filled" arialabel="Bookmark (filled)"></goa-icon-button>
<goa-icon-button icon="notifications" theme="outline" arialabel="Notifications (outline)"></goa-icon-button>
<goa-icon-button icon="notifications" theme="filled" arialabel="Notifications (filled)"></goa-icon-button>`,
      },
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Icon button in disabled state",
      code: {
        react: `<GoabIconButton icon="trash" ariaLabel="Delete" disabled />`,
        angular: `<goab-icon-button icon="trash" ariaLabel="Delete" [disabled]="true"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="trash" arialabel="Delete" disabled></goa-icon-button>`,
      },
    },
  ],
};
