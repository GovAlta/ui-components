/**
 * LinearProgress Component Configurations
 *
 * Linear progress bars show completion status.
 */

import type { ComponentConfigurations } from './types';

export const linearProgressConfigurations: ComponentConfigurations = {
  componentSlug: 'linear-progress',
  componentName: 'Linear progress',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic progress',
      description: 'Simple linear progress bar',
      code: {
        react: `<GoabLinearProgress progress={50} />`,
        angular: `<goab-linear-progress [progress]="50"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress progress="50"></goa-linear-progress>`,
      },
    },
    {
      id: 'progress-levels',
      name: 'Progress levels',
      description: 'Different completion percentages',
      code: {
        react: `<GoabLinearProgress progress={0} />
<GoabLinearProgress progress={25} />
<GoabLinearProgress progress={50} />
<GoabLinearProgress progress={75} />
<GoabLinearProgress progress={100} />`,
        angular: `<goab-linear-progress [progress]="0"></goab-linear-progress>
<goab-linear-progress [progress]="25"></goab-linear-progress>
<goab-linear-progress [progress]="50"></goab-linear-progress>
<goab-linear-progress [progress]="75"></goab-linear-progress>
<goab-linear-progress [progress]="100"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress progress="0"></goa-linear-progress>
<goa-linear-progress progress="25"></goa-linear-progress>
<goa-linear-progress progress="50"></goa-linear-progress>
<goa-linear-progress progress="75"></goa-linear-progress>
<goa-linear-progress progress="100"></goa-linear-progress>`,
      },
    },
    {
      id: 'with-label',
      name: 'With label',
      description: 'Progress bar showing percentage',
      code: {
        react: `<GoabLinearProgress progress={65} showLabel />`,
        angular: `<goab-linear-progress [progress]="65" [showLabel]="true"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress progress="65" showlabel></goa-linear-progress>`,
      },
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Different visual styles',
      code: {
        react: `<GoabLinearProgress progress={50} variant="fullscreen" />`,
        angular: `<goab-linear-progress [progress]="50" variant="fullscreen"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress progress="50" variant="fullscreen"></goa-linear-progress>`,
      },
    },
  ],
};
