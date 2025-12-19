/**
 * Spacer Component Configurations
 *
 * Spacer adds consistent vertical or horizontal space.
 */

import type { ComponentConfigurations } from './types';

export const spacerConfigurations: ComponentConfigurations = {
  componentSlug: 'spacer',
  componentName: 'Spacer',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic spacer',
      description: 'Vertical space between elements',
      code: {
        react: `<GoabText mt="none" mb="none">Content above</GoabText>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <GoabIcon type="arrow-down" size="1" />
  <GoabSpacer vSpacing="l" />
  <GoabIcon type="arrow-up" size="1" />
</div>
<GoabText mt="none" mb="none">Content below</GoabText>`,
        angular: `<goab-text mt="none" mb="none">Content above</goab-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goab-icon type="arrow-down" size="1"></goab-icon>
  <goab-spacer vSpacing="l"></goab-spacer>
  <goab-icon type="arrow-up" size="1"></goab-icon>
</div>
<goab-text mt="none" mb="none">Content below</goab-text>`,
        webComponents: `<goa-text mt="none" mb="none">Content above</goa-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goa-icon type="arrow-down" size="1"></goa-icon>
  <goa-spacer vspacing="l"></goa-spacer>
  <goa-icon type="arrow-up" size="1"></goa-icon>
</div>
<goa-text mt="none" mb="none">Content below</goa-text>`,
      },
    },
    {
      id: 'vertical-sizes',
      name: 'Vertical sizes',
      description: 'Different vertical spacing amounts',
      code: {
        react: `<GoabText mt="none" mb="none">S space</GoabText>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <GoabIcon type="arrow-down" size="1" />
  <GoabSpacer vSpacing="s" />
  <GoabIcon type="arrow-up" size="1" />
</div>
<GoabText mt="none" mb="none">L space</GoabText>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <GoabIcon type="arrow-down" size="1" />
  <GoabSpacer vSpacing="l" />
  <GoabIcon type="arrow-up" size="1" />
</div>
<GoabText mt="none" mb="none">2XL space</GoabText>
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <GoabIcon type="arrow-down" size="1" />
  <GoabSpacer vSpacing="2xl" />
  <GoabIcon type="arrow-up" size="1" />
</div>`,
        angular: `<goab-text mt="none" mb="none">S space</goab-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goab-icon type="arrow-down" size="1"></goab-icon>
  <goab-spacer vSpacing="s"></goab-spacer>
  <goab-icon type="arrow-up" size="1"></goab-icon>
</div>
<goab-text mt="none" mb="none">L space</goab-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goab-icon type="arrow-down" size="1"></goab-icon>
  <goab-spacer vSpacing="l"></goab-spacer>
  <goab-icon type="arrow-up" size="1"></goab-icon>
</div>
<goab-text mt="none" mb="none">2XL space</goab-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goab-icon type="arrow-down" size="1"></goab-icon>
  <goab-spacer vSpacing="2xl"></goab-spacer>
  <goab-icon type="arrow-up" size="1"></goab-icon>
</div>`,
        webComponents: `<goa-text mt="none" mb="none">S space</goa-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goa-icon type="arrow-down" size="1"></goa-icon>
  <goa-spacer vspacing="s"></goa-spacer>
  <goa-icon type="arrow-up" size="1"></goa-icon>
</div>
<goa-text mt="none" mb="none">L space</goa-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goa-icon type="arrow-down" size="1"></goa-icon>
  <goa-spacer vspacing="l"></goa-spacer>
  <goa-icon type="arrow-up" size="1"></goa-icon>
</div>
<goa-text mt="none" mb="none">2XL space</goa-text>
<div style="display: flex; flex-direction: column; align-items: flex-start">
  <goa-icon type="arrow-down" size="1"></goa-icon>
  <goa-spacer vspacing="2xl"></goa-spacer>
  <goa-icon type="arrow-up" size="1"></goa-icon>
</div>`,
      },
    },
    {
      id: 'horizontal',
      name: 'Horizontal spacing',
      description: 'Space between inline elements',
      code: {
        react: `<div style={{ display: 'flex', alignItems: 'center' }}>
  <GoabText mt="none" mb="none">Left</GoabText>
  <GoabIcon type="arrow-forward" size="1" />
  <GoabSpacer hSpacing="l" />
  <GoabIcon type="arrow-back" size="1" />
  <GoabText mt="none" mb="none">Right</GoabText>
</div>`,
        angular: `<div style="display: flex; align-items: center">
  <goab-text mt="none" mb="none">Left</goab-text>
  <goab-icon type="arrow-forward" size="1"></goab-icon>
  <goab-spacer hSpacing="l"></goab-spacer>
  <goab-icon type="arrow-back" size="1"></goab-icon>
  <goab-text mt="none" mb="none">Right</goab-text>
</div>`,
        webComponents: `<div style="display: flex; align-items: center">
  <goa-text mt="none" mb="none">Left</goa-text>
  <goa-icon type="arrow-forward" size="1"></goa-icon>
  <goa-spacer hspacing="l"></goa-spacer>
  <goa-icon type="arrow-back" size="1"></goa-icon>
  <goa-text mt="none" mb="none">Right</goa-text>
</div>`,
      },
    },
  ],
};
