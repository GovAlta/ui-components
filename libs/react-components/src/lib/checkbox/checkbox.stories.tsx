import React from 'react';
import GoACheckbox from './checkbox';

export default {
  component: GoACheckbox,
  title: 'Component Library/Components/Checkbox',
  controls: { expanded: true },
  argTypes: {
    checked: {
      control: {
        type: 'boolean',
      }
    },
    required: {
      control: {
        type: 'boolean',
      }
    },
    disabled: {
      control: {
        type: 'boolean',
      }
    },
    indeterminate: {
      control: {
        type: 'boolean',
      }
    },
    labelPosition: {
      control: {
        type: 'select',
        options: ['before', 'after'],
      }
    },
    content: { control: 'text' },
    onClick: { action: 'You have checked the box' },
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
  labelPosition: 'before',
  content: 'Checkbox 1',
  indeterminate: false,
};