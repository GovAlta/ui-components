/**
 * IconButton Component Configurations
 *
 * Icon buttons provide actions with icons only.
 */

import type { ComponentConfigurations } from './types';

export const iconButtonConfigurations: ComponentConfigurations = {
  componentSlug: 'icon-button',
  componentName: 'Icon button',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic icon button',
      description: 'Simple icon button',
      code: {
        react: `<GoabIconButton icon="close" ariaLabel="Close" />`,
        angular: `<goab-icon-button icon="close" ariaLabel="Close"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="close" arialabel="Close"></goa-icon-button>`,
      },
    },
    {
      id: 'common-actions',
      name: 'Common actions',
      description: 'Frequently used icon buttons',
      code: {
        react: `<GoabIconButton icon="close" ariaLabel="Close" />
<GoabIconButton icon="add" ariaLabel="Add" />
<GoabIconButton icon="remove" ariaLabel="Remove" />
<GoabIconButton icon="trash" ariaLabel="Delete" />
<GoabIconButton icon="pencil" ariaLabel="Edit" />
<GoabIconButton icon="ellipsis-vertical" ariaLabel="More options" />`,
        angular: `<goab-icon-button icon="close" ariaLabel="Close"></goab-icon-button>
<goab-icon-button icon="add" ariaLabel="Add"></goab-icon-button>
<goab-icon-button icon="remove" ariaLabel="Remove"></goab-icon-button>
<goab-icon-button icon="trash" ariaLabel="Delete"></goab-icon-button>
<goab-icon-button icon="pencil" ariaLabel="Edit"></goab-icon-button>
<goab-icon-button icon="ellipsis-vertical" ariaLabel="More options"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="close" arialabel="Close"></goa-icon-button>
<goa-icon-button icon="add" arialabel="Add"></goa-icon-button>
<goa-icon-button icon="remove" arialabel="Remove"></goa-icon-button>
<goa-icon-button icon="trash" arialabel="Delete"></goa-icon-button>
<goa-icon-button icon="pencil" arialabel="Edit"></goa-icon-button>
<goa-icon-button icon="ellipsis-vertical" arialabel="More options"></goa-icon-button>`,
      },
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Different icon button sizes',
      code: {
        react: `<GoabIconButton icon="settings" size="small" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="medium" ariaLabel="Settings" />
<GoabIconButton icon="settings" size="large" ariaLabel="Settings" />`,
        angular: `<goab-icon-button icon="settings" size="small" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="medium" ariaLabel="Settings"></goab-icon-button>
<goab-icon-button icon="settings" size="large" ariaLabel="Settings"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="settings" size="small" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="medium" arialabel="Settings"></goa-icon-button>
<goa-icon-button icon="settings" size="large" arialabel="Settings"></goa-icon-button>`,
      },
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Different visual styles',
      code: {
        react: `<GoabIconButton icon="close" variant="color" ariaLabel="Close" />
<GoabIconButton icon="close" variant="dark" ariaLabel="Close" />
<GoabIconButton icon="close" variant="destructive" ariaLabel="Close" />`,
        angular: `<goab-icon-button icon="close" variant="color" ariaLabel="Close"></goab-icon-button>
<goab-icon-button icon="close" variant="dark" ariaLabel="Close"></goab-icon-button>
<goab-icon-button icon="close" variant="destructive" ariaLabel="Close"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="close" variant="color" arialabel="Close"></goa-icon-button>
<goa-icon-button icon="close" variant="dark" arialabel="Close"></goa-icon-button>
<goa-icon-button icon="close" variant="destructive" arialabel="Close"></goa-icon-button>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Icon button in disabled state',
      code: {
        react: `<GoabIconButton icon="trash" ariaLabel="Delete" disabled />`,
        angular: `<goab-icon-button icon="trash" ariaLabel="Delete" [disabled]="true"></goab-icon-button>`,
        webComponents: `<goa-icon-button icon="trash" arialabel="Delete" disabled></goa-icon-button>`,
      },
    },
  ],
};
