import React from 'react';
import GoAButtonComponent from './button';

export default {
  component: GoAButtonComponent,
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

    content: { control: 'text' } 
  },
}

const Template = (args) => <GoAButtonComponent onClick={()=> alert("You have clicked the button")} {...args} />;

export const Variants = Template.bind({});

Variants.args = {
  buttonType: 'primary',
  buttonSize: 'normal',
  content: "Click Me!",
  tooltip: 'hovering',
};