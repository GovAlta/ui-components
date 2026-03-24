/**
 * LinearProgress Component Configurations
 *
 * Linear progress bars show completion status.
 * Note: WC attribute for percentVisibility is "percent-visibility" (explicitly mapped in Svelte options).
 */

import type { ComponentConfigurations } from "./types";

export const linearProgressConfigurations: ComponentConfigurations = {
  componentSlug: "linear-progress",
  componentName: "Linear progress",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic progress",
      description: "Simple linear progress bar",
      code: {
        react: `<GoabLinearProgress progress={50} percentVisibility="hidden" />`,
        angular: `<goab-linear-progress [progress]="50" percentVisibility="hidden"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress progress="50" percent-visibility="hidden"></goa-linear-progress>`,
      },
    },
    {
      id: "progress-levels",
      name: "Progress levels",
      description: "Different completion percentages",
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
      id: "indeterminate",
      name: "Indeterminate",
      description: "Loading animation when progress is unknown",
      code: {
        react: `<GoabLinearProgress percentVisibility="hidden" />`,
        angular: `<goab-linear-progress percentVisibility="hidden"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress percent-visibility="hidden"></goa-linear-progress>`,
      },
    },
    {
      id: "percent-visibility",
      name: "With percentage",
      description: "Progress bar showing the percentage text",
      code: {
        react: `<GoabLinearProgress progress={65} />`,
        angular: `<goab-linear-progress [progress]="65"></goab-linear-progress>`,
        webComponents: `<goa-linear-progress progress="65"></goa-linear-progress>`,
      },
    },
  ],
};
