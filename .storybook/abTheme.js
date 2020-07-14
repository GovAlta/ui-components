import { create } from '@storybook/theming/create';
import logo from '../libs/storybook-common/assets/logo-ds.svg';

export default create({
  base: 'dark',
  
  // colorPrimary: '#0081ab',
  // colorSecondary: '#005072',

  // // UI
  // appBg: '#333',
  // appContentBg: '#666',
  // appBorderColor: '#333',
  // appBorderRadius: 0,

  // // Typography
  // fontBase: 'acumin-pro-semi-condensed, sans-serif',
  // fontCode: 'monospace',

  // // Text colors
  // textColor: '#fff',
  // textInverseColor: '#333',

  // // Toolbar default and active colors
  // barTextColor: '#fff',
  // barSelectedColor: '#fff',
  // barBg: '#666',

  // // Form colors
  // inputBg: '#fff',
  // inputBorder: '#666',
  // inputTextColor: '#333',
  // inputBorderRadius: 0,

  brandTitle: 'Alberta Design System',
  brandUrl: 'https://alberta.ca',
  brandImage: logo
});
