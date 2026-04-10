/**
 * Container Component Configurations
 *
 * Containers provide consistent horizontal padding and max-width.
 */

import type { ComponentConfigurations } from "./types";

export const containerConfigurations: ComponentConfigurations = {
  componentSlug: "container",
  componentName: "Container",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic container",
      description: "Standard page container",
      code: {
        react: `<GoabContainer>
  <h3>Page content</h3>
  <p>Content within the container has consistent padding and max-width.</p>
</GoabContainer>`,
        angular: `<goab-container>
  <h3>Page content</h3>
  <p>Content within the container has consistent padding and max-width.</p>
</goab-container>`,
        webComponents: `<goa-container>
  <h3>Page content</h3>
  <p>Content within the container has consistent padding and max-width.</p>
</goa-container>`,
      },
    },
    {
      id: "types",
      name: "Container types",
      description: "All available container types",
      code: {
        react: `<GoabContainer type="non-interactive" mb="m">
  <p>Non-interactive content container</p>
</GoabContainer>
<GoabContainer type="interactive">
  <p>Interactive container</p>
</GoabContainer>`,
        angular: `<goab-container type="non-interactive" mb="m">
  <p>Non-interactive content container</p>
</goab-container>
<goab-container type="interactive">
  <p>Interactive container</p>
</goab-container>`,
        webComponents: `<goa-container type="non-interactive" mb="m">
  <p>Non-interactive content container</p>
</goa-container>
<goa-container type="interactive">
  <p>Interactive container</p>
</goa-container>`,
      },
    },
    {
      id: "accent-styles",
      name: "Accent styles",
      description: "Different accent bar styles",
      code: {
        react: `<GoabContainer accent="filled" mb="m">
  <p>Filled accent (default)</p>
</GoabContainer>
<GoabContainer accent="thick" mb="m">
  <p>Thick accent bar</p>
</GoabContainer>
<GoabContainer accent="thin">
  <p>Thin accent bar</p>
</GoabContainer>`,
        angular: `<goab-container accent="filled" mb="m">
  <p>Filled accent (default)</p>
</goab-container>
<goab-container accent="thick" mb="m">
  <p>Thick accent bar</p>
</goab-container>
<goab-container accent="thin">
  <p>Thin accent bar</p>
</goab-container>`,
        webComponents: `<goa-container accent="filled" mb="m">
  <p>Filled accent (default)</p>
</goa-container>
<goa-container accent="thick" mb="m">
  <p>Thick accent bar</p>
</goa-container>
<goa-container accent="thin">
  <p>Thin accent bar</p>
</goa-container>`,
      },
    },
    {
      id: "with-heading",
      name: "With heading",
      description: "Container with title",
      code: {
        react: `<GoabContainer accent="thick" type="non-interactive" title="Application details">
  <p>Container content with a heading using the title prop.</p>
</GoabContainer>`,
        angular: `<goab-container accent="thick" type="non-interactive" [title]="titleTpl">
  <ng-template #titleTpl>Application details</ng-template>
  <p>Container content with a heading using the title template.</p>
</goab-container>`,
        webComponents: `<goa-container accent="thick" type="non-interactive">
  <div slot="title">Application details</div>
  <p>Container content with a heading using the title slot.</p>
</goa-container>`,
      },
    },
    {
      id: "with-heading-and-status",
      name: "With heading and status",
      description: "Container with title and actions displaying status",
      code: {
        react: `<GoabContainer type="non-interactive" accent="thick" title="Heading" actions={<GoabBadge type="important" content="Priority" />}>
  Content
</GoabContainer>`,
        angular: `<goab-container type="non-interactive" accent="thick" [title]="titleTpl" [actions]="actionsTpl">
  <ng-template #titleTpl>Heading</ng-template>
  <ng-template #actionsTpl>
    <goab-badge type="important" content="Priority"></goab-badge>
  </ng-template>
  Content
</goab-container>`,
        webComponents: `<goa-container type="non-interactive" accent="thick">
  <div slot="title">Heading</div>
  <div slot="actions">
    <goa-badge version="2" type="important" content="Priority"></goa-badge>
  </div>
  Content
</goa-container>`,
      },
    },
    {
      id: "padding",
      name: "Padding",
      description: "Relaxed and compact padding options",
      code: {
        react: `<GoabContainer padding="relaxed" mb="m">
  <p>Relaxed padding (default)</p>
</GoabContainer>
<GoabContainer padding="compact">
  <p>Compact padding for tighter layouts</p>
</GoabContainer>`,
        angular: `<goab-container padding="relaxed" mb="m">
  <p>Relaxed padding (default)</p>
</goab-container>
<goab-container padding="compact">
  <p>Compact padding for tighter layouts</p>
</goab-container>`,
        webComponents: `<goa-container padding="relaxed" mb="m">
  <p>Relaxed padding (default)</p>
</goa-container>
<goa-container padding="compact">
  <p>Compact padding for tighter layouts</p>
</goa-container>`,
      },
    },
    {
      id: "width",
      name: "Width",
      description: "Full width and content width options",
      code: {
        react: `<GoabContainer width="full" mb="m">
  <p>Full width (default) stretches to fill available space</p>
</GoabContainer>
<GoabContainer width="content">
  <p>Content width fits to content</p>
</GoabContainer>`,
        angular: `<goab-container width="full" mb="m">
  <p>Full width (default) stretches to fill available space</p>
</goab-container>
<goab-container width="content">
  <p>Content width fits to content</p>
</goab-container>`,
        webComponents: `<goa-container width="full" mb="m">
  <p>Full width (default) stretches to fill available space</p>
</goa-container>
<goa-container width="content">
  <p>Content width fits to content</p>
</goa-container>`,
      },
    },
    {
      id: "max-height",
      name: "Max height",
      description: "Container with constrained height and scrollable content",
      code: {
        react: `<GoabContainer maxHeight="150px">
  <p>This container has a maximum height of 150px.</p>
  <p>When the content exceeds the max height, the container becomes scrollable.</p>
  <p>This is useful for sections with variable content length.</p>
  <p>Additional content here to demonstrate scrolling behavior.</p>
</GoabContainer>`,
        angular: `<goab-container maxHeight="150px">
  <p>This container has a maximum height of 150px.</p>
  <p>When the content exceeds the max height, the container becomes scrollable.</p>
  <p>This is useful for sections with variable content length.</p>
  <p>Additional content here to demonstrate scrolling behavior.</p>
</goab-container>`,
        webComponents: `<goa-container maxheight="150px">
  <p>This container has a maximum height of 150px.</p>
  <p>When the content exceeds the max height, the container becomes scrollable.</p>
  <p>This is useful for sections with variable content length.</p>
  <p>Additional content here to demonstrate scrolling behavior.</p>
</goa-container>`,
      },
    },
  ],
};
