/**
 * Tooltip Component Configurations
 *
 * Tooltips provide additional context on hover or focus.
 */

import type { ComponentConfigurations } from './types';

export const tooltipConfigurations: ComponentConfigurations = {
  componentSlug: 'tooltip',
  componentName: 'Tooltip',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic tooltip',
      description: 'Simple tooltip on hover',
      code: {
        react: `<GoabTooltip content="Additional information about this item">
  <GoabButton>Hover me</GoabButton>
</GoabTooltip>`,
        angular: `<goab-tooltip content="Additional information about this item">
  <goab-button>Hover me</goab-button>
</goab-tooltip>`,
        webComponents: `<goa-tooltip content="Additional information about this item">
  <goa-button>Hover me</goa-button>
</goa-tooltip>`,
      },
    },
    {
      id: 'positions',
      name: 'Positions',
      description: 'Tooltip placement options',
      code: {
        react: `<GoabTooltip content="Top tooltip" position="top">
  <GoabButton>Top</GoabButton>
</GoabTooltip>
<GoabTooltip content="Bottom tooltip" position="bottom">
  <GoabButton>Bottom</GoabButton>
</GoabTooltip>
<GoabTooltip content="Left tooltip" position="left">
  <GoabButton>Left</GoabButton>
</GoabTooltip>
<GoabTooltip content="Right tooltip" position="right">
  <GoabButton>Right</GoabButton>
</GoabTooltip>`,
        angular: `<goab-tooltip content="Top tooltip" position="top">
  <goab-button>Top</goab-button>
</goab-tooltip>
<goab-tooltip content="Bottom tooltip" position="bottom">
  <goab-button>Bottom</goab-button>
</goab-tooltip>
<goab-tooltip content="Left tooltip" position="left">
  <goab-button>Left</goab-button>
</goab-tooltip>
<goab-tooltip content="Right tooltip" position="right">
  <goab-button>Right</goab-button>
</goab-tooltip>`,
        webComponents: `<goa-tooltip content="Top tooltip" position="top">
  <goa-button>Top</goa-button>
</goa-tooltip>
<goa-tooltip content="Bottom tooltip" position="bottom">
  <goa-button>Bottom</goa-button>
</goa-tooltip>
<goa-tooltip content="Left tooltip" position="left">
  <goa-button>Left</goa-button>
</goa-tooltip>
<goa-tooltip content="Right tooltip" position="right">
  <goa-button>Right</goa-button>
</goa-tooltip>`,
      },
    },
    {
      id: 'with-icon-button',
      name: 'With icon button',
      description: 'Tooltip on an icon button',
      code: {
        react: `<GoabTooltip content="More options">
  <GoabIconButton icon="ellipsis-vertical" />
</GoabTooltip>`,
        angular: `<goab-tooltip content="More options">
  <goab-icon-button icon="ellipsis-vertical"></goab-icon-button>
</goab-tooltip>`,
        webComponents: `<goa-tooltip content="More options">
  <goa-icon-button icon="ellipsis-vertical"></goa-icon-button>
</goa-tooltip>`,
      },
    },
    {
      id: 'hover-delay',
      name: 'Hover delay',
      description: 'Tooltip with custom hover delay',
      code: {
        react: `<GoabTooltip content="This appears after 500ms" hoverDelay={500}>
  <GoabButton>Delayed tooltip</GoabButton>
</GoabTooltip>`,
        angular: `<goab-tooltip content="This appears after 500ms" [hoverDelay]="500">
  <goab-button>Delayed tooltip</goab-button>
</goab-tooltip>`,
        webComponents: `<goa-tooltip content="This appears after 500ms" hoverdelay="500">
  <goa-button>Delayed tooltip</goa-button>
</goa-tooltip>`,
      },
    },
  ],
};
