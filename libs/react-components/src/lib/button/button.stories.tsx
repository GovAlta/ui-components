import React from 'react';
import GoAButton from './button';
import { action } from '@storybook/addon-actions';

export default {
  component: GoAButton,
  title: 'Component Library/Components/Button',
  controls: { expanded: true },
  argTypes: {
    buttonType: { 
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'tertiary'],
      },
    },
    buttonSize: {
      control: {
        type: 'select', 
        options: ['small', 'normal'],
      }
    },
    tooltip: {
      description: 'mouseover popup description',
      control: 'text',
    },
    content: { control: 'text' },
    onClick: { action: 'You have clicked the button' },
    onMouseDown: { action: 'mouseDown' },
  },
}

function Template(args) {
  return <GoAButton {...args} />;
}

export const Variants = Template.bind({});

Variants.args = {
  buttonType: 'primary',
  buttonSize: 'normal',
  content: "Click Me!",
  tooltip: 'hovering',
};