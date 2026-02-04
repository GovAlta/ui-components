/**
 * RadioGroup Component Configurations
 *
 * Note: RadioGroup should be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from './types';

export const radioGroupConfigurations: ComponentConfigurations = {
  componentSlug: 'radio-group',
  componentName: 'Radio group',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic example',
      description: 'Radio group with vertical layout',
      code: {
        react: `<GoabxFormItem label="Contact preference" mb="l">
  <GoabxRadioGroup name="contact" value="">
    <GoabxRadioItem value="email" label="Email" />
    <GoabxRadioItem value="phone" label="Phone" />
    <GoabxRadioItem value="mail" label="Mail" />
  </GoabxRadioGroup>
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Contact preference" mb="l">
  <goabx-radio-group name="contact" value="">
    <goabx-radio-item value="email" label="Email"></goabx-radio-item>
    <goabx-radio-item value="phone" label="Phone"></goabx-radio-item>
    <goabx-radio-item value="mail" label="Mail"></goabx-radio-item>
  </goabx-radio-group>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Contact preference" mb="l">
  <goa-radio-group version="2" name="contact" value="">
    <goa-radio-item value="email" label="Email"></goa-radio-item>
    <goa-radio-item value="phone" label="Phone"></goa-radio-item>
    <goa-radio-item value="mail" label="Mail"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: 'horizontal',
      name: 'Horizontal layout',
      description: 'Radio group arranged horizontally',
      code: {
        react: `<GoabxFormItem label="Size" mb="l">
  <GoabxRadioGroup name="size" value="" orientation="horizontal">
    <GoabxRadioItem value="small" label="Small" />
    <GoabxRadioItem value="medium" label="Medium" />
    <GoabxRadioItem value="large" label="Large" />
  </GoabxRadioGroup>
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Size" mb="l">
  <goabx-radio-group name="size" value="" orientation="horizontal">
    <goabx-radio-item value="small" label="Small"></goabx-radio-item>
    <goabx-radio-item value="medium" label="Medium"></goabx-radio-item>
    <goabx-radio-item value="large" label="Large"></goabx-radio-item>
  </goabx-radio-group>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Size" mb="l">
  <goa-radio-group version="2" name="size" value="" orientation="horizontal">
    <goa-radio-item value="small" label="Small"></goa-radio-item>
    <goa-radio-item value="medium" label="Medium"></goa-radio-item>
    <goa-radio-item value="large" label="Large"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: 'with-descriptions',
      name: 'With descriptions',
      description: 'Radio items with additional description text',
      code: {
        react: `<GoabxFormItem label="Shipping method" mb="l">
  <GoabxRadioGroup name="shipping" value="">
    <GoabxRadioItem value="standard" label="Standard" description="5-7 business days" />
    <GoabxRadioItem value="express" label="Express" description="2-3 business days" />
    <GoabxRadioItem value="overnight" label="Overnight" description="Next business day" />
  </GoabxRadioGroup>
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Shipping method" mb="l">
  <goabx-radio-group name="shipping" value="">
    <goabx-radio-item value="standard" label="Standard" description="5-7 business days"></goabx-radio-item>
    <goabx-radio-item value="express" label="Express" description="2-3 business days"></goabx-radio-item>
    <goabx-radio-item value="overnight" label="Overnight" description="Next business day"></goabx-radio-item>
  </goabx-radio-group>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Shipping method" mb="l">
  <goa-radio-group version="2" name="shipping" value="">
    <goa-radio-item value="standard" label="Standard" description="5-7 business days"></goa-radio-item>
    <goa-radio-item value="express" label="Express" description="2-3 business days"></goa-radio-item>
    <goa-radio-item value="overnight" label="Overnight" description="Next business day"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: 'preselected',
      name: 'Preselected',
      description: 'Radio group with default selection',
      code: {
        react: `<GoabxFormItem label="Notification frequency" mb="l">
  <GoabxRadioGroup name="frequency" value="daily">
    <GoabxRadioItem value="realtime" label="Real-time" />
    <GoabxRadioItem value="daily" label="Daily digest" />
    <GoabxRadioItem value="weekly" label="Weekly summary" />
  </GoabxRadioGroup>
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Notification frequency" mb="l">
  <goabx-radio-group name="frequency" value="daily">
    <goabx-radio-item value="realtime" label="Real-time"></goabx-radio-item>
    <goabx-radio-item value="daily" label="Daily digest"></goabx-radio-item>
    <goabx-radio-item value="weekly" label="Weekly summary"></goabx-radio-item>
  </goabx-radio-group>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Notification frequency" mb="l">
  <goa-radio-group version="2" name="frequency" value="daily">
    <goa-radio-item value="realtime" label="Real-time"></goa-radio-item>
    <goa-radio-item value="daily" label="Daily digest"></goa-radio-item>
    <goa-radio-item value="weekly" label="Weekly summary"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Radio group in disabled state',
      code: {
        react: `<GoabxFormItem label="Account type" mb="l">
  <GoabxRadioGroup name="accountType" value="basic" disabled>
    <GoabxRadioItem value="basic" label="Basic" />
    <GoabxRadioItem value="premium" label="Premium" />
  </GoabxRadioGroup>
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Account type" mb="l">
  <goabx-radio-group name="accountType" value="basic" [disabled]="true">
    <goabx-radio-item value="basic" label="Basic"></goabx-radio-item>
    <goabx-radio-item value="premium" label="Premium"></goabx-radio-item>
  </goabx-radio-group>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Account type" mb="l">
  <goa-radio-group version="2" name="accountType" value="basic" disabled>
    <goa-radio-item value="basic" label="Basic"></goa-radio-item>
    <goa-radio-item value="premium" label="Premium"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: 'error',
      name: 'Error state',
      description: 'Radio group showing validation error',
      code: {
        react: `<GoabxFormItem label="Payment method" error="Please select a payment method" mb="l">
  <GoabxRadioGroup name="payment" value="" error>
    <GoabxRadioItem value="credit" label="Credit card" />
    <GoabxRadioItem value="debit" label="Debit card" />
    <GoabxRadioItem value="bank" label="Bank transfer" />
  </GoabxRadioGroup>
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Payment method" error="Please select a payment method" mb="l">
  <goabx-radio-group name="payment" value="" [error]="true">
    <goabx-radio-item value="credit" label="Credit card"></goabx-radio-item>
    <goabx-radio-item value="debit" label="Debit card"></goabx-radio-item>
    <goabx-radio-item value="bank" label="Bank transfer"></goabx-radio-item>
  </goabx-radio-group>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Payment method" error="Please select a payment method" mb="l">
  <goa-radio-group version="2" name="payment" value="" error>
    <goa-radio-item value="credit" label="Credit card"></goa-radio-item>
    <goa-radio-item value="debit" label="Debit card"></goa-radio-item>
    <goa-radio-item value="bank" label="Bank transfer"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
  ],
};
