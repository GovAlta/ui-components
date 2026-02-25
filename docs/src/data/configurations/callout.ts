/**
 * Callout Component Configurations
 *
 * Callouts are used to highlight important information.
 */

import type { ComponentConfigurations } from './types';

export const calloutConfigurations: ComponentConfigurations = {
  componentSlug: 'callout',
  componentName: 'Callout',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Information callout',
      description: 'Default informational callout',
      code: {
        react: `<GoabxCallout type="information" emphasis="low" maxWidth="480px">
  This is important information for the user.
</GoabxCallout>`,
        angular: `<goabx-callout type="information" emphasis="low" maxWidth="480px">
  This is important information for the user.
</goabx-callout>`,
        webComponents: `<goa-callout version="2" type="information" emphasis="low" maxwidth="480px">
  This is important information for the user.
</goa-callout>`,
      },
    },
    {
      id: 'types',
      name: 'Callout types',
      description: 'Different semantic types for various contexts',
      code: {
        react: `<GoabxCallout type="information" heading="Information">
  General information for the user.
</GoabxCallout>
<GoabxCallout type="important" heading="Important">
  Something the user should pay attention to.
</GoabxCallout>
<GoabxCallout type="emergency" heading="Emergency">
  Critical information requiring immediate attention.
</GoabxCallout>
<GoabxCallout type="success" heading="Success">
  Confirmation that an action was successful.
</GoabxCallout>`,
        angular: `<goabx-callout type="information" heading="Information">
  General information for the user.
</goabx-callout>
<goabx-callout type="important" heading="Important">
  Something the user should pay attention to.
</goabx-callout>
<goabx-callout type="emergency" heading="Emergency">
  Critical information requiring immediate attention.
</goabx-callout>
<goabx-callout type="success" heading="Success">
  Confirmation that an action was successful.
</goabx-callout>`,
        webComponents: `<goa-callout version="2" type="information" heading="Information">
  General information for the user.
</goa-callout>
<goa-callout version="2" type="important" heading="Important">
  Something the user should pay attention to.
</goa-callout>
<goa-callout version="2" type="emergency" heading="Emergency">
  Critical information requiring immediate attention.
</goa-callout>
<goa-callout version="2" type="success" heading="Success">
  Confirmation that an action was successful.
</goa-callout>`,
      },
    },
    {
      id: 'with-heading',
      name: 'With heading',
      description: 'Callout with a heading',
      code: {
        react: `<GoabxCallout type="important" heading="Application deadline">
  Your application must be submitted by December 31, 2024.
</GoabxCallout>`,
        angular: `<goabx-callout type="important" heading="Application deadline">
  Your application must be submitted by December 31, 2024.
</goabx-callout>`,
        webComponents: `<goa-callout version="2" type="important" heading="Application deadline">
  Your application must be submitted by December 31, 2024.
</goa-callout>`,
      },
    },
    {
      id: 'emphasis',
      name: 'Emphasis levels',
      description: 'Different visual prominence levels',
      code: {
        react: `<GoabxCallout type="important" emphasis="high" heading="High emphasis">
  Full background color for maximum visibility.
</GoabxCallout>
<GoabxCallout type="important" emphasis="medium" heading="Medium emphasis">
  Subtle background for balanced visibility.
</GoabxCallout>
<GoabxCallout type="important" emphasis="low" heading="Low emphasis">
  Minimal styling for less prominent messaging.
</GoabxCallout>
<GoabxCallout type="important" emphasis="low">
  A callout without a heading for simple inline messages.
</GoabxCallout>`,
        angular: `<goabx-callout type="important" emphasis="high" heading="High emphasis">
  Full background color for maximum visibility.
</goabx-callout>
<goabx-callout type="important" emphasis="medium" heading="Medium emphasis">
  Subtle background for balanced visibility.
</goabx-callout>
<goabx-callout type="important" emphasis="low" heading="Low emphasis">
  Minimal styling for less prominent messaging.
</goabx-callout>
<goabx-callout type="important" emphasis="low">
  A callout without a heading for simple inline messages.
</goabx-callout>`,
        webComponents: `<goa-callout version="2" type="important" emphasis="high" heading="High emphasis">
  Full background color for maximum visibility.
</goa-callout>
<goa-callout version="2" type="important" emphasis="medium" heading="Medium emphasis">
  Subtle background for balanced visibility.
</goa-callout>
<goa-callout version="2" type="important" emphasis="low" heading="Low emphasis">
  Minimal styling for less prominent messaging.
</goa-callout>
<goa-callout version="2" type="important" emphasis="low">
  A callout without a heading for simple inline messages.
</goa-callout>`,
      },
    },
  ],
};
