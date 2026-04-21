/**
 * Accordion Component Configurations
 *
 * Accordions show and hide content sections.
 */

import type { ComponentConfigurations } from "./types";

export const accordionConfigurations: ComponentConfigurations = {
  componentSlug: "accordion",
  componentName: "Accordion",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic accordion",
      description: "Single accordion with heading",
      code: {
        react: `<GoabAccordion heading="What documents do I need?">
  You will need to provide proof of identity, proof of address,
  and any relevant supporting documentation.
</GoabAccordion>`,
        angular: `<goab-accordion heading="What documents do I need?">
  You will need to provide proof of identity, proof of address,
  and any relevant supporting documentation.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="What documents do I need?">
  You will need to provide proof of identity, proof of address,
  and any relevant supporting documentation.
</goa-accordion>`,
      },
    },
    {
      id: "open",
      name: "Open by default",
      description: "Accordion that starts expanded",
      code: {
        react: `<GoabAccordion heading="Important information" open>
  This content is visible by default when the page loads.
</GoabAccordion>`,
        angular: `<goab-accordion heading="Important information" [open]="true">
  This content is visible by default when the page loads.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="Important information" open>
  This content is visible by default when the page loads.
</goa-accordion>`,
      },
    },
    {
      id: "with-secondary-text",
      name: "With secondary text",
      description: "Accordion with additional context in header",
      code: {
        react: `<GoabAccordion heading="Application requirements" secondaryText="Updated Jan 2024">
  Review the latest requirements before submitting your application.
</GoabAccordion>`,
        angular: `<goab-accordion heading="Application requirements" secondaryText="Updated Jan 2024">
  Review the latest requirements before submitting your application.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="Application requirements" secondarytext="Updated Jan 2024">
  Review the latest requirements before submitting your application.
</goa-accordion>`,
      },
    },
    {
      id: "heading-sizes",
      name: "Heading sizes",
      description: "Small and medium heading sizes",
      code: {
        react: `<GoabAccordion heading="Small heading" headingSize="small">
  Content with small heading.
</GoabAccordion>
<GoabAccordion heading="Medium heading" headingSize="medium">
  Content with medium heading.
</GoabAccordion>`,
        angular: `<goab-accordion heading="Small heading" headingSize="small">
  Content with small heading.
</goab-accordion>
<goab-accordion heading="Medium heading" headingSize="medium">
  Content with medium heading.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="Small heading" headingsize="small">
  Content with small heading.
</goa-accordion>
<goa-accordion heading="Medium heading" headingsize="medium">
  Content with medium heading.
</goa-accordion>`,
      },
    },
    {
      id: "icon-position",
      name: "Icon position",
      description: "Toggle icon on left or right",
      code: {
        react: `<GoabAccordion heading="Icon on left (default)" iconPosition="left">
  The expand/collapse icon is on the left.
</GoabAccordion>
<GoabAccordion heading="Icon on right" iconPosition="right">
  The expand/collapse icon is on the right.
</GoabAccordion>`,
        angular: `<goab-accordion heading="Icon on left (default)" iconPosition="left">
  The expand/collapse icon is on the left.
</goab-accordion>
<goab-accordion heading="Icon on right" iconPosition="right">
  The expand/collapse icon is on the right.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="Icon on left (default)" iconposition="left">
  The expand/collapse icon is on the left.
</goa-accordion>
<goa-accordion heading="Icon on right" iconposition="right">
  The expand/collapse icon is on the right.
</goa-accordion>`,
      },
    },
    {
      id: "multiple",
      name: "Multiple accordions",
      description: "FAQ-style accordion group",
      code: {
        react: `<GoabAccordion heading="How do I apply?">
  Submit your application online through our portal.
</GoabAccordion>
<GoabAccordion heading="What are the eligibility requirements?">
  You must be an Alberta resident and meet the program criteria.
</GoabAccordion>
<GoabAccordion heading="How long does processing take?">
  Applications are typically processed within 10 business days.
</GoabAccordion>`,
        angular: `<goab-accordion heading="How do I apply?">
  Submit your application online through our portal.
</goab-accordion>
<goab-accordion heading="What are the eligibility requirements?">
  You must be an Alberta resident and meet the program criteria.
</goab-accordion>
<goab-accordion heading="How long does processing take?">
  Applications are typically processed within 10 business days.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="How do I apply?">
  Submit your application online through our portal.
</goa-accordion>
<goa-accordion heading="What are the eligibility requirements?">
  You must be an Alberta resident and meet the program criteria.
</goa-accordion>
<goa-accordion heading="How long does processing take?">
  Applications are typically processed within 10 business days.
</goa-accordion>`,
      },
    },
    {
      id: "filled",
      name: "Filled accordion",
      description: "Single accordion with filled type",
      code: {
        react: `<GoabAccordion heading="What documents do I need?" type="filled">
  You will need to provide proof of identity, proof of address,
  and any relevant supporting documentation.
</GoabAccordion>`,
        angular: `<goab-accordion heading="What documents do I need?" type="filled">
  You will need to provide proof of identity, proof of address,
  and any relevant supporting documentation.
</goab-accordion>`,
        webComponents: `<goa-accordion heading="What documents do I need?" type="filled">
  You will need to provide proof of identity, proof of address,
  and any relevant supporting documentation.
</goa-accordion>`,
      },
    },
    {
      id: "actions",
      name: "Accordion with actions",
      description: "Accordion with actions slot content",
      code: {
        react: `<GoabAccordion
  heading="Actions with button and badge"
  secondaryText="Right icon"
  actions={
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <GoabBadge type="important" content="3" />
      <GoabButton type="primary" size="compact">
        View all
      </GoabButton>
    </div>
  }
>
  <GoabText>
    This example mixes badges and controls inside the actions slot.
  </GoabText>
</GoabAccordion>`,
        angular: `<goab-accordion
  heading="Actions with button and badge"
  secondaryText="Right icon"
  [actions]="actionsViewAll"
>
  <goab-text>
    This example mixes badges and controls inside the actions slot.
  </goab-text>
</goab-accordion>

<ng-template #actionsViewAll>
  <div style="display: flex; align-items: center; gap: 0.5rem">
    <goab-badge type="important" content="3"></goab-badge>
    <goab-button type="primary" size="compact">View all</goab-button>
  </div>
</ng-template>`,
        webComponents: `<goa-accordion
  heading="Actions with button and badge"
  secondaryText="Right icon"
>
  <goa-text>
    This example mixes badges and controls inside the actions slot.
  </goa-text>
  <div slot="actions">
    <div style="display: flex; align-items: center; gap: 0.5rem">
      <goa-badge type="important" content="3"></goa-badge>
      <goa-button type="primary" size="compact">View all</goa-button>
    </div>
  </div>
</goa-accordion>`,
      },
    },
  ],
};
