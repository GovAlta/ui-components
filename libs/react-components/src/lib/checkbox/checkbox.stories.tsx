import React from 'react';
import GoACheckbox from './checkbox';

export default {
  component: GoACheckbox,
  title: 'Component Library/Components/Checkbox',
  controls: { expanded: true },
  argTypes: {
    content: { control: 'text' },
    checked: {
      description: 'Boolean indicating whether or not the checkbox is checked/selected.',
      control: {
        type: 'boolean',
      }
    },
    required: {
      description: 'Boolean indicating whether or not the checkbox is required.',
      control: {
        type: 'boolean',
      }
    },
    disabled: {
      description: 'Boolean indicating whether or not the checkbox is disabled.',
      control: {
        type: 'boolean',
      }
    },
    indeterminate: {
      description: 'Boolean indicating whether or not the checkbox should display as indeterminate (i.e. it has associated &#39;child&#39; checkboxes, some of which are selected)',
      control: {
        type: 'boolean',
      }
    },
    labelPosition: {
      description: 'The position to display the label/text for the checbox. Valid values are before and after.',
      control: {
        type: 'select',
        options: ['before', 'after'],
      }
    },
    selectionChange: { 
      description: 'Callback which returns whether button is checked.',
      action: 'selection was changed'},
  },
}

function Template(args) {
  return <GoACheckbox {...args} />;
}

export const Variants = Template.bind({});

Variants.args = {
  checked: false,
  required: false,
  disabled: false,
  labelPosition: 'after',
  content: 'Checkbox 1',
  indeterminate: false,
};