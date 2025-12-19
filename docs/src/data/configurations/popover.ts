/**
 * Popover Component Configurations
 *
 * Popovers display content in a floating panel.
 */

import type { ComponentConfigurations } from './types';

export const popoverConfigurations: ComponentConfigurations = {
  componentSlug: 'popover',
  componentName: 'Popover',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic popover',
      description: 'Simple popover with content',
      code: {
        react: `<GoabPopover>
  <GoabButton slot="target">Open popover</GoabButton>
  <p>Popover content goes here. It can contain any content.</p>
</GoabPopover>`,
        angular: `<goab-popover>
  <goab-button slot="target">Open popover</goab-button>
  <p>Popover content goes here. It can contain any content.</p>
</goab-popover>`,
        webComponents: `<goa-popover>
  <goa-button slot="target">Open popover</goa-button>
  <p>Popover content goes here. It can contain any content.</p>
</goa-popover>`,
      },
    },
    {
      id: 'positions',
      name: 'Positions',
      description: 'Popover placement options',
      code: {
        react: `<GoabPopover position="top">
  <GoabButton slot="target">Top</GoabButton>
  <p>Content above the trigger.</p>
</GoabPopover>
<GoabPopover position="bottom">
  <GoabButton slot="target">Bottom</GoabButton>
  <p>Content below the trigger.</p>
</GoabPopover>
<GoabPopover position="left">
  <GoabButton slot="target">Left</GoabButton>
  <p>Content to the left.</p>
</GoabPopover>
<GoabPopover position="right">
  <GoabButton slot="target">Right</GoabButton>
  <p>Content to the right.</p>
</GoabPopover>`,
        angular: `<goab-popover position="top">
  <goab-button slot="target">Top</goab-button>
  <p>Content above the trigger.</p>
</goab-popover>
<goab-popover position="bottom">
  <goab-button slot="target">Bottom</goab-button>
  <p>Content below the trigger.</p>
</goab-popover>
<goab-popover position="left">
  <goab-button slot="target">Left</goab-button>
  <p>Content to the left.</p>
</goab-popover>
<goab-popover position="right">
  <goab-button slot="target">Right</goab-button>
  <p>Content to the right.</p>
</goab-popover>`,
        webComponents: `<goa-popover position="top">
  <goa-button slot="target">Top</goa-button>
  <p>Content above the trigger.</p>
</goa-popover>
<goa-popover position="bottom">
  <goa-button slot="target">Bottom</goa-button>
  <p>Content below the trigger.</p>
</goa-popover>
<goa-popover position="left">
  <goa-button slot="target">Left</goa-button>
  <p>Content to the left.</p>
</goa-popover>
<goa-popover position="right">
  <goa-button slot="target">Right</goa-button>
  <p>Content to the right.</p>
</goa-popover>`,
      },
    },
    {
      id: 'with-padding',
      name: 'With padding',
      description: 'Popover with custom padding',
      code: {
        react: `<GoabPopover padded>
  <GoabButton slot="target">Show details</GoabButton>
  <p>Content with default padding applied.</p>
</GoabPopover>`,
        angular: `<goab-popover [padded]="true">
  <goab-button slot="target">Show details</goab-button>
  <p>Content with default padding applied.</p>
</goab-popover>`,
        webComponents: `<goa-popover padded>
  <goa-button slot="target">Show details</goa-button>
  <p>Content with default padding applied.</p>
</goa-popover>`,
      },
    },
    {
      id: 'with-max-width',
      name: 'With max width',
      description: 'Popover with constrained width',
      code: {
        react: `<GoabPopover maxWidth="300px">
  <GoabButton slot="target">More info</GoabButton>
  <p>This popover has a maximum width of 300 pixels to control content width.</p>
</GoabPopover>`,
        angular: `<goab-popover maxWidth="300px">
  <goab-button slot="target">More info</goab-button>
  <p>This popover has a maximum width of 300 pixels to control content width.</p>
</goab-popover>`,
        webComponents: `<goa-popover maxwidth="300px">
  <goa-button slot="target">More info</goa-button>
  <p>This popover has a maximum width of 300 pixels to control content width.</p>
</goa-popover>`,
      },
    },
  ],
};
