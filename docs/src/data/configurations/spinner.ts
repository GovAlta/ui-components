/**
 * Spinner Component Configurations
 *
 * Spinners indicate loading or processing states.
 */

import type { ComponentConfigurations } from "./types";

export const spinnerConfigurations: ComponentConfigurations = {
  componentSlug: "spinner",
  componentName: "Spinner",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic spinner",
      description: "Simple loading spinner",
      code: {
        react: `<GoabSpinner size="large" />`,
        angular: `<goab-spinner size="large"></goab-spinner>`,
        webComponents: `<goa-spinner size="large"></goa-spinner>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Different spinner sizes",
      code: {
        react: `<GoabSpinner size="small" />
<GoabSpinner size="medium" />
<GoabSpinner size="large" />
<GoabSpinner size="xlarge" />`,
        angular: `<goab-spinner size="small"></goab-spinner>
<goab-spinner size="medium"></goab-spinner>
<goab-spinner size="large"></goab-spinner>
<goab-spinner size="xlarge"></goab-spinner>`,
        webComponents: `<goa-spinner size="small"></goa-spinner>
<goa-spinner size="medium"></goa-spinner>
<goa-spinner size="large"></goa-spinner>
<goa-spinner size="xlarge"></goa-spinner>`,
      },
    },
    {
      id: "with-progress",
      name: "With progress",
      description: "Spinner showing determinate progress",
      code: {
        react: `<GoabSpinner size="large" progress={45} />`,
        angular: `<goab-spinner size="large" [progress]="45"></goab-spinner>`,
        webComponents: `<goa-spinner size="large" progress="45"></goa-spinner>`,
      },
    },
    {
      id: "inverted",
      name: "Inverted",
      description: "Spinner for dark backgrounds",
      code: {
        react: `<div style={{ backgroundColor: '#333', padding: '1rem' }}>
  <GoabSpinner size="large" invert />
</div>`,
        angular: `<div style="background-color: #333; padding: 1rem">
  <goab-spinner size="large" [invert]="true"></goab-spinner>
</div>`,
        webComponents: `<div style="background-color: #333; padding: 1rem">
  <goa-spinner size="large" invert></goa-spinner>
</div>`,
      },
    },
  ],
};
