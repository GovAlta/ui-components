/**
 * CircularProgress Component Configurations
 *
 * Circular progress indicators show completion status.
 */

import type { ComponentConfigurations } from './types';

export const circularProgressConfigurations: ComponentConfigurations = {
  componentSlug: 'circular-progress',
  componentName: 'Circular progress',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic progress',
      description: 'Simple circular progress indicator',
      code: {
        react: `<GoabCircularProgress variant="inline" size="large" message="Loading message..." visible={true} />`,
        angular: `<goab-circular-progress variant="inline" size="large" message="Loading message..." [visible]="true"></goab-circular-progress>`,
        webComponents: `<goa-circular-progress variant="inline" size="large" message="Loading message..." visible="true"></goa-circular-progress>`,
      },
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Different sizes',
      code: {
        react: `<GoabCircularProgress variant="inline" size="small" message="Loading message..." visible={true} />
<GoabCircularProgress variant="inline" size="large" message="Loading message..." visible={true} />`,
        angular: `<goab-circular-progress variant="inline" size="small" message="Loading message..." [visible]="true"></goab-circular-progress>
<goab-circular-progress variant="inline" size="large" message="Loading message..." [visible]="true"></goab-circular-progress>`,
        webComponents: `<goa-circular-progress variant="inline" size="small" message="Loading message..." visible="true"></goa-circular-progress>
<goa-circular-progress variant="inline" size="large" message="Loading message..." visible="true"></goa-circular-progress>`,
      },
    },
    {
      id: 'with-progress',
      name: 'With progress value',
      description: 'Shows completion percentage',
      code: {
        react: `<GoabCircularProgress variant="inline" size="large" progress={75} message="75% complete" visible={true} />`,
        angular: `<goab-circular-progress variant="inline" size="large" [progress]="75" message="75% complete" [visible]="true"></goab-circular-progress>`,
        webComponents: `<goa-circular-progress variant="inline" size="large" progress="75" message="75% complete" visible="true"></goa-circular-progress>`,
      },
    },
  ],
};
