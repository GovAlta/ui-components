/**
 * Link Component Configurations
 *
 * Links navigate users to other pages or resources.
 */

import type { ComponentConfigurations } from "./types";

export const linkConfigurations: ComponentConfigurations = {
  componentSlug: "link",
  componentName: "Link",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic link",
      description: "Simple text link",
      code: {
        react: `<GoabLink><a href="/about">Learn more about our services</a></GoabLink>`,
        angular: `<goab-link><a href="/about">Learn more about our services</a></goab-link>`,
        webComponents: `<goa-link><a href="/about">Learn more about our services</a></goa-link>`,
      },
    },
    {
      id: "external",
      name: "External link",
      description: "Link with trailing icon for external destination",
      code: {
        react: `<GoabLink trailingIcon="open">
  <a href="https://www.alberta.ca">Visit Alberta.ca</a>
</GoabLink>`,
        angular: `<goab-link trailingIcon="open">
  <a href="https://www.alberta.ca">Visit Alberta.ca</a>
</goab-link>`,
        webComponents: `<goa-link trailingicon="open">
  <a href="https://www.alberta.ca">Visit Alberta.ca</a>
</goa-link>`,
      },
    },
    {
      id: "colors",
      name: "Colors",
      description: "Interactive, dark, and light color variants",
      code: {
        react: `<div style={{ marginBottom: "var(--goa-space-m)" }}>
  <GoabLink color="interactive"><a href="#">Interactive (default)</a></GoabLink>
</div>
<div style={{ marginBottom: "var(--goa-space-m)" }}>
  <GoabLink color="dark"><a href="#">Dark</a></GoabLink>
</div>
<div style={{ backgroundColor: "var(--goa-color-greyscale-700)", padding: "var(--goa-space-m)" }}>
  <GoabLink color="light"><a href="#">Light</a></GoabLink>
</div>`,
        angular: `<div style="margin-bottom: var(--goa-space-m);">
  <goab-link color="interactive"><a href="#">Interactive (default)</a></goab-link>
</div>
<div style="margin-bottom: var(--goa-space-m);">
  <goab-link color="dark"><a href="#">Dark</a></goab-link>
</div>
<div style="background-color: var(--goa-color-greyscale-700); padding: var(--goa-space-m);">
  <goab-link color="light"><a href="#">Light</a></goab-link>
</div>`,
        webComponents: `<div style="margin-bottom: var(--goa-space-m);">
  <goa-link color="interactive"><a href="#">Interactive (default)</a></goa-link>
</div>
<div style="margin-bottom: var(--goa-space-m);">
  <goa-link color="dark"><a href="#">Dark</a></goa-link>
</div>
<div style="background-color: var(--goa-color-greyscale-700); padding: var(--goa-space-m);">
  <goa-link color="light"><a href="#">Light</a></goa-link>
</div>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "All available link sizes",
      code: {
        react: `<div><GoabLink size="xsmall" mb="xs"><a href="#">Extra small link</a></GoabLink></div>
<div><GoabLink size="small" mb="xs"><a href="#">Small link</a></GoabLink></div>
<div><GoabLink size="medium" mb="xs"><a href="#">Medium link (default)</a></GoabLink></div>
<div><GoabLink size="large"><a href="#">Large link</a></GoabLink></div>`,
        angular: `<div><goab-link size="xsmall" mb="xs"><a href="#">Extra small link</a></goab-link></div>
<div><goab-link size="small" mb="xs"><a href="#">Small link</a></goab-link></div>
<div><goab-link size="medium" mb="xs"><a href="#">Medium link (default)</a></goab-link></div>
<div><goab-link size="large"><a href="#">Large link</a></goab-link></div>`,
        webComponents: `<div><goa-link size="xsmall" mb="xs"><a href="#">Extra small link</a></goa-link></div>
<div><goa-link size="small" mb="xs"><a href="#">Small link</a></goa-link></div>
<div><goa-link size="medium" mb="xs"><a href="#">Medium link (default)</a></goa-link></div>
<div><goa-link size="large"><a href="#">Large link</a></goa-link></div>`,
      },
    },
    {
      id: "with-icons",
      name: "With icons",
      description: "Links with leading or trailing icons",
      code: {
        react: `<div><GoabLink leadingIcon="download" mb="xs"><a href="#">Download form</a></GoabLink></div>
<div><GoabLink trailingIcon="arrow-forward"><a href="#">Continue to next step</a></GoabLink></div>`,
        angular: `<div><goab-link leadingIcon="download" mb="xs"><a href="#">Download form</a></goab-link></div>
<div><goab-link trailingIcon="arrow-forward"><a href="#">Continue to next step</a></goab-link></div>`,
        webComponents: `<div><goa-link leadingicon="download" mb="xs"><a href="#">Download form</a></goa-link></div>
<div><goa-link trailingicon="arrow-forward"><a href="#">Continue to next step</a></goa-link></div>`,
      },
    },
  ],
};
