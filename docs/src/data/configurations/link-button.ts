/**
 * LinkButton Component Configurations
 *
 * LinkButton provides button-styled anchor elements.
 */

import type { ComponentConfigurations } from "./types";

export const linkButtonConfigurations: ComponentConfigurations = {
  componentSlug: "link-button",
  componentName: "Link button",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic link button",
      description: "Anchor styled as button",
      code: {
        react: `<GoabLinkButton href="/apply">Apply now</GoabLinkButton>`,
        angular: `<goab-link-button href="/apply">Apply now</goab-link-button>`,
        webComponents: `<goa-link-button href="/apply">Apply now</goa-link-button>`,
      },
    },
    {
      id: "types",
      name: "Button types",
      description: "Different visual styles",
      code: {
        react: `<GoabLinkButton href="/primary" type="primary">Primary</GoabLinkButton>
<GoabLinkButton href="/secondary" type="secondary">Secondary</GoabLinkButton>
<GoabLinkButton href="/tertiary" type="tertiary">Tertiary</GoabLinkButton>`,
        angular: `<goab-link-button href="/primary" type="primary">Primary</goab-link-button>
<goab-link-button href="/secondary" type="secondary">Secondary</goab-link-button>
<goab-link-button href="/tertiary" type="tertiary">Tertiary</goab-link-button>`,
        webComponents: `<goa-link-button href="/primary" type="primary">Primary</goa-link-button>
<goa-link-button href="/secondary" type="secondary">Secondary</goa-link-button>
<goa-link-button href="/tertiary" type="tertiary">Tertiary</goa-link-button>`,
      },
    },
    {
      id: "with-icons",
      name: "With icons",
      description: "Link button with icons",
      code: {
        react: `<GoabLinkButton href="/download" leadingIcon="download">Download</GoabLinkButton>
<GoabLinkButton href="/next" trailingIcon="arrow-forward">Continue</GoabLinkButton>`,
        angular: `<goab-link-button href="/download" leadingIcon="download">Download</goab-link-button>
<goab-link-button href="/next" trailingIcon="arrow-forward">Continue</goab-link-button>`,
        webComponents: `<goa-link-button href="/download" leadingicon="download">Download</goa-link-button>
<goa-link-button href="/next" trailingicon="arrow-forward">Continue</goa-link-button>`,
      },
    },
    {
      id: "external",
      name: "External link",
      description: "Link button opening new tab",
      code: {
        react: `<GoabLinkButton href="https://www.alberta.ca" external>Visit Alberta.ca</GoabLinkButton>`,
        angular: `<goab-link-button href="https://www.alberta.ca" [external]="true">Visit Alberta.ca</goab-link-button>`,
        webComponents: `<goa-link-button href="https://www.alberta.ca" external>Visit Alberta.ca</goa-link-button>`,
      },
    },
  ],
};
