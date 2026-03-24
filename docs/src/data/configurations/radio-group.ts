/**
 * RadioGroup Component Configurations
 *
 * Note: RadioGroup should be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const radioGroupConfigurations: ComponentConfigurations = {
  componentSlug: "radio-group",
  componentName: "Radio group",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Radio group with vertical layout",
      code: {
        react: `<GoabFormItem label="Contact preference" mb="l">
  <GoabRadioGroup name="contact" value="">
    <GoabRadioItem value="email" label="Email" />
    <GoabRadioItem value="phone" label="Phone" />
    <GoabRadioItem value="mail" label="Mail" />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Contact preference" mb="l">
  <goab-radio-group name="contact" value="">
    <goab-radio-item value="email" label="Email"></goab-radio-item>
    <goab-radio-item value="phone" label="Phone"></goab-radio-item>
    <goab-radio-item value="mail" label="Mail"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
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
      id: "horizontal",
      name: "Horizontal layout",
      description: "Radio group arranged horizontally",
      code: {
        react: `<GoabFormItem label="Size" mb="l">
  <GoabRadioGroup name="size" value="" orientation="horizontal">
    <GoabRadioItem value="small" label="Small" />
    <GoabRadioItem value="medium" label="Medium" />
    <GoabRadioItem value="large" label="Large" />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Size" mb="l">
  <goab-radio-group name="size" value="" orientation="horizontal">
    <goab-radio-item value="small" label="Small"></goab-radio-item>
    <goab-radio-item value="medium" label="Medium"></goab-radio-item>
    <goab-radio-item value="large" label="Large"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
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
      id: "with-descriptions",
      name: "With descriptions",
      description: "Radio items with additional description text",
      code: {
        react: `<GoabFormItem label="Shipping method" mb="l">
  <GoabRadioGroup name="shipping" value="">
    <GoabRadioItem value="standard" label="Standard" description="5-7 business days" />
    <GoabRadioItem value="express" label="Express" description="2-3 business days" />
    <GoabRadioItem value="overnight" label="Overnight" description="Next business day" />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Shipping method" mb="l">
  <goab-radio-group name="shipping" value="">
    <goab-radio-item value="standard" label="Standard" description="5-7 business days"></goab-radio-item>
    <goab-radio-item value="express" label="Express" description="2-3 business days"></goab-radio-item>
    <goab-radio-item value="overnight" label="Overnight" description="Next business day"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
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
      id: "with-reveal",
      name: "With reveal content",
      description: "Radio item that reveals additional content when selected",
      code: {
        react: `<GoabFormItem label="Do you have a preferred date?" mb="l">
  <GoabRadioGroup name="hasDate" value="">
    <GoabRadioItem value="no" label="No" />
    <GoabRadioItem
      value="yes"
      label="Yes"
      reveal={
        <GoabFormItem label="Preferred date" mb="l">
          <GoabDatePicker name="preferredDate" onChange={handleDateChange} />
        </GoabFormItem>
      }
    />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Do you have a preferred date?" mb="l">
  <goab-radio-group name="hasDate" value="">
    <goab-radio-item value="no" label="No"></goab-radio-item>
    <goab-radio-item value="yes" label="Yes" [reveal]="dateReveal">
      <ng-template #dateReveal>
        <goab-form-item label="Preferred date" mb="l">
          <goab-date-picker name="preferredDate" (onChange)="handleDateChange($event)"></goab-date-picker>
        </goab-form-item>
      </ng-template>
    </goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Do you have a preferred date?" mb="l">
  <goa-radio-group version="2" name="hasDate" value="">
    <goa-radio-item value="no" label="No"></goa-radio-item>
    <goa-radio-item value="yes" label="Yes">
      <div slot="reveal">
        <goa-form-item version="2" label="Preferred date" mb="l">
          <goa-date-picker version="2" name="preferredDate"></goa-date-picker>
        </goa-form-item>
      </div>
    </goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: "preselected",
      name: "Preselected",
      description: "Radio group with default selection",
      code: {
        react: `<GoabFormItem label="Notification frequency" mb="l">
  <GoabRadioGroup name="frequency" value="daily">
    <GoabRadioItem value="realtime" label="Real-time" />
    <GoabRadioItem value="daily" label="Daily digest" />
    <GoabRadioItem value="weekly" label="Weekly summary" />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Notification frequency" mb="l">
  <goab-radio-group name="frequency" value="daily">
    <goab-radio-item value="realtime" label="Real-time"></goab-radio-item>
    <goab-radio-item value="daily" label="Daily digest"></goab-radio-item>
    <goab-radio-item value="weekly" label="Weekly summary"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
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
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabRadioGroup name="sizeDefault" value="">
    <GoabRadioItem value="yes" label="Yes" />
    <GoabRadioItem value="no" label="No" />
  </GoabRadioGroup>
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabRadioGroup name="sizeCompact" value="" size="compact">
    <GoabRadioItem value="yes" label="Yes" />
    <GoabRadioItem value="no" label="No" />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Default size" mb="l">
  <goab-radio-group name="sizeDefault" value="">
    <goab-radio-item value="yes" label="Yes"></goab-radio-item>
    <goab-radio-item value="no" label="No"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>
<goab-form-item label="Compact size" labelSize="compact" mb="l">
  <goab-radio-group name="sizeCompact" value="" size="compact">
    <goab-radio-item value="yes" label="Yes"></goab-radio-item>
    <goab-radio-item value="no" label="No"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-radio-group version="2" name="sizeDefault" value="">
    <goa-radio-item value="yes" label="Yes"></goa-radio-item>
    <goa-radio-item value="no" label="No"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-radio-group version="2" name="sizeCompact" value="" size="compact">
    <goa-radio-item value="yes" label="Yes"></goa-radio-item>
    <goa-radio-item value="no" label="No"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `<GoabFormItem label="Account type" mb="l">
  <GoabRadioGroup name="accountType" value="basic" disabled>
    <GoabRadioItem value="basic" label="Basic" />
    <GoabRadioItem value="premium" label="Premium" />
  </GoabRadioGroup>
</GoabFormItem>
<GoabFormItem label="Payment method" error="Please select a payment method" mb="l">
  <GoabRadioGroup name="payment" value="" error>
    <GoabRadioItem value="credit" label="Credit card" />
    <GoabRadioItem value="debit" label="Debit card" />
    <GoabRadioItem value="bank" label="Bank transfer" />
  </GoabRadioGroup>
</GoabFormItem>`,
        angular: `<goab-form-item label="Account type" mb="l">
  <goab-radio-group name="accountType" value="basic" [disabled]="true">
    <goab-radio-item value="basic" label="Basic"></goab-radio-item>
    <goab-radio-item value="premium" label="Premium"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>
<goab-form-item label="Payment method" error="Please select a payment method" mb="l">
  <goab-radio-group name="payment" value="" [error]="true">
    <goab-radio-item value="credit" label="Credit card"></goab-radio-item>
    <goab-radio-item value="debit" label="Debit card"></goab-radio-item>
    <goab-radio-item value="bank" label="Bank transfer"></goab-radio-item>
  </goab-radio-group>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Account type" mb="l">
  <goa-radio-group version="2" name="accountType" value="basic" disabled>
    <goa-radio-item value="basic" label="Basic"></goa-radio-item>
    <goa-radio-item value="premium" label="Premium"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<goa-form-item version="2" label="Payment method" error="Please select a payment method" mb="l">
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
