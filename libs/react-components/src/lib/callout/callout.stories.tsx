import React from 'react';
import { Callout } from './callout';

export default {
  component: Callout,
  title: 'Component Library/Components/Callout',
  controls: { expanded: true }
};

const Template = (args) => <Callout {...args} />;

export const Variants = Template.bind({});

Variants.args = {
  type: 'information',
  title: 'Callout Title',
  content: 'Information to the user goes in the content. Information can include markup as desired.',
};
