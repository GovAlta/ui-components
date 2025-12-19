/**
 * Icon Component Configurations
 *
 * Icons provide visual cues and enhance comprehension.
 */

import type { ComponentConfigurations } from './types';

export const iconConfigurations: ComponentConfigurations = {
  componentSlug: 'icon',
  componentName: 'Icon',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic icon',
      description: 'Simple icon display',
      code: {
        react: `<GoabIcon type="information" />`,
        angular: `<goab-icon type="information"></goab-icon>`,
        webComponents: `<goa-icon type="information"></goa-icon>`,
      },
    },
    {
      id: 'common-icons',
      name: 'Common icons',
      description: 'Frequently used icons',
      code: {
        react: `<GoabIcon type="checkmark" />
<GoabIcon type="close" />
<GoabIcon type="add" />
<GoabIcon type="remove" />
<GoabIcon type="search" />
<GoabIcon type="settings" />
<GoabIcon type="person" />
<GoabIcon type="calendar" />`,
        angular: `<goab-icon type="checkmark"></goab-icon>
<goab-icon type="close"></goab-icon>
<goab-icon type="add"></goab-icon>
<goab-icon type="remove"></goab-icon>
<goab-icon type="search"></goab-icon>
<goab-icon type="settings"></goab-icon>
<goab-icon type="person"></goab-icon>
<goab-icon type="calendar"></goab-icon>`,
        webComponents: `<goa-icon type="checkmark"></goa-icon>
<goa-icon type="close"></goa-icon>
<goa-icon type="add"></goa-icon>
<goa-icon type="remove"></goa-icon>
<goa-icon type="search"></goa-icon>
<goa-icon type="settings"></goa-icon>
<goa-icon type="person"></goa-icon>
<goa-icon type="calendar"></goa-icon>`,
      },
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Different icon sizes (1-6)',
      code: {
        react: `<GoabIcon type="information" size="1" />
<GoabIcon type="information" size="2" />
<GoabIcon type="information" size="3" />
<GoabIcon type="information" size="4" />
<GoabIcon type="information" size="5" />
<GoabIcon type="information" size="6" />`,
        angular: `<goab-icon type="information" size="1"></goab-icon>
<goab-icon type="information" size="2"></goab-icon>
<goab-icon type="information" size="3"></goab-icon>
<goab-icon type="information" size="4"></goab-icon>
<goab-icon type="information" size="5"></goab-icon>
<goab-icon type="information" size="6"></goab-icon>`,
        webComponents: `<goa-icon type="information" size="1"></goa-icon>
<goa-icon type="information" size="2"></goa-icon>
<goa-icon type="information" size="3"></goa-icon>
<goa-icon type="information" size="4"></goa-icon>
<goa-icon type="information" size="5"></goa-icon>
<goa-icon type="information" size="6"></goa-icon>`,
      },
    },
    {
      id: 'themes',
      name: 'Themes',
      description: 'Outline and filled icon styles',
      code: {
        react: `<GoabIcon type="checkmark-circle" theme="outline" />
<GoabIcon type="checkmark-circle" theme="filled" />`,
        angular: `<goab-icon type="checkmark-circle" theme="outline"></goab-icon>
<goab-icon type="checkmark-circle" theme="filled"></goab-icon>`,
        webComponents: `<goa-icon type="checkmark-circle" theme="outline"></goa-icon>
<goa-icon type="checkmark-circle" theme="filled"></goa-icon>`,
      },
    },
    {
      id: 'with-color',
      name: 'With color',
      description: 'Icons with custom colors',
      code: {
        react: `<GoabIcon type="checkmark-circle" fillColor="#00853F" />
<GoabIcon type="warning" fillColor="#FCBA19" />
<GoabIcon type="close-circle" fillColor="#D8292F" />`,
        angular: `<goab-icon type="checkmark-circle" fillColor="#00853F"></goab-icon>
<goab-icon type="warning" fillColor="#FCBA19"></goab-icon>
<goab-icon type="close-circle" fillColor="#D8292F"></goab-icon>`,
        webComponents: `<goa-icon type="checkmark-circle" fillcolor="#00853F"></goa-icon>
<goa-icon type="warning" fillcolor="#FCBA19"></goa-icon>
<goa-icon type="close-circle" fillcolor="#D8292F"></goa-icon>`,
      },
    },
  ],
};
