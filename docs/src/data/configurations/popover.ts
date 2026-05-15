/**
 * Popover Component Configurations
 *
 * Popovers display content in a floating panel.
 */

import type { ComponentConfigurations } from "./types";

export const popoverConfigurations: ComponentConfigurations = {
  componentSlug: "popover",
  componentName: "Popover",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic popover",
      description: "Simple popover with content",
      code: {
        react: `<GoabPopover target={<GoabButton>Open popover</GoabButton>}>
  <GoabText mt="none" mb="none">Popover content goes here. It can contain any content.</GoabText>
</GoabPopover>`,
        angular: `<goab-popover [target]="targetTpl">
  <ng-template #targetTpl>
    <goab-button>Open popover</goab-button>
  </ng-template>
  <goab-text mt="none" mb="none">Popover content goes here. It can contain any content.</goab-text>
</goab-popover>`,
        webComponents: `<goa-popover>
  <goa-button version="2" slot="target">Open popover</goa-button>
  <goa-text mt="none" mb="none">Popover content goes here. It can contain any content.</goa-text>
</goa-popover>`,
      },
    },
    {
      id: "positions",
      name: "Positions",
      description: "Popover placement options",
      code: {
        react: `<GoabPopover position="above" target={<GoabButton>Above</GoabButton>}>
  <GoabText mt="none" mb="none">Content positioned above the trigger.</GoabText>
</GoabPopover>
<GoabPopover position="below" target={<GoabButton>Below</GoabButton>}>
  <GoabText mt="none" mb="none">Content positioned below the trigger.</GoabText>
</GoabPopover>
<GoabPopover position="auto" target={<GoabButton>Auto</GoabButton>}>
  <GoabText mt="none" mb="none">Automatically positions based on available space.</GoabText>
</GoabPopover>`,
        angular: `<goab-popover position="above" [target]="aboveTpl">
  <ng-template #aboveTpl><goab-button>Above</goab-button></ng-template>
  <goab-text mt="none" mb="none">Content positioned above the trigger.</goab-text>
</goab-popover>
<goab-popover position="below" [target]="belowTpl">
  <ng-template #belowTpl><goab-button>Below</goab-button></ng-template>
  <goab-text mt="none" mb="none">Content positioned below the trigger.</goab-text>
</goab-popover>
<goab-popover position="auto" [target]="autoTpl">
  <ng-template #autoTpl><goab-button>Auto</goab-button></ng-template>
  <goab-text mt="none" mb="none">Automatically positions based on available space.</goab-text>
</goab-popover>`,
        webComponents: `<goa-popover position="above">
  <goa-button version="2" slot="target">Above</goa-button>
  <goa-text mt="none" mb="none">Content positioned above the trigger.</goa-text>
</goa-popover>
<goa-popover position="below">
  <goa-button version="2" slot="target">Below</goa-button>
  <goa-text mt="none" mb="none">Content positioned below the trigger.</goa-text>
</goa-popover>
<goa-popover position="auto">
  <goa-button version="2" slot="target">Auto</goa-button>
  <goa-text mt="none" mb="none">Automatically positions based on available space.</goa-text>
</goa-popover>`,
      },
    },
    {
      id: "with-padding",
      name: "With padding",
      description: "Popover with and without padding",
      code: {
        react: `<GoabPopover padded target={<GoabButton>Padded</GoabButton>}>
  <GoabText mt="none" mb="none">Content with padding applied.</GoabText>
</GoabPopover>
<GoabPopover padded={false} target={<GoabButton>No padding</GoabButton>}>
  <GoabText mt="none" mb="none">Content flush with popover boundaries.</GoabText>
</GoabPopover>`,
        angular: `<goab-popover [padded]="true" [target]="paddedTpl">
  <ng-template #paddedTpl><goab-button>Padded</goab-button></ng-template>
  <goab-text mt="none" mb="none">Content with padding applied.</goab-text>
</goab-popover>
<goab-popover [padded]="false" [target]="noPaddingTpl">
  <ng-template #noPaddingTpl><goab-button>No padding</goab-button></ng-template>
  <goab-text mt="none" mb="none">Content flush with popover boundaries.</goab-text>
</goab-popover>`,
        webComponents: `<goa-popover padded>
  <goa-button version="2" slot="target">Padded</goa-button>
  <goa-text mt="none" mb="none">Content with padding applied.</goa-text>
</goa-popover>
<goa-popover padded="false">
  <goa-button version="2" slot="target">No padding</goa-button>
  <goa-text mt="none" mb="none">Content flush with popover boundaries.</goa-text>
</goa-popover>`,
      },
    },
    {
      id: "with-max-width",
      name: "With max width",
      description: "Popover with constrained width",
      code: {
        react: `<GoabPopover maxWidth="300px" target={<GoabButton>More info</GoabButton>}>
  <GoabText mt="none" mb="none">This popover has a maximum width of 300 pixels to control content width.</GoabText>
</GoabPopover>`,
        angular: `<goab-popover maxWidth="300px" [target]="targetTpl">
  <ng-template #targetTpl><goab-button>More info</goab-button></ng-template>
  <goab-text mt="none" mb="none">This popover has a maximum width of 300 pixels to control content width.</goab-text>
</goab-popover>`,
        webComponents: `<goa-popover maxwidth="300px">
  <goa-button version="2" slot="target">More info</goa-button>
  <goa-text mt="none" mb="none">This popover has a maximum width of 300 pixels to control content width.</goa-text>
</goa-popover>`,
      },
    },
  ],
};
