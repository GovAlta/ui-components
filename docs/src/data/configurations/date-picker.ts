/**
 * DatePicker Component Configurations
 *
 * DatePicker allows users to select dates.
 */

import type { ComponentConfigurations } from "./types";

export const datePickerConfigurations: ComponentConfigurations = {
  componentSlug: "date-picker",
  componentName: "Date picker",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic date picker",
      description: "Simple date selection",
      code: {
        react: `<GoabFormItem label="Date" mb="l">
  <GoabDatePicker name="date" onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Date" mb="l">
  <goab-date-picker name="date" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Date" mb="l">
  <goa-date-picker version="2" name="date"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "with-value",
      name: "With initial value",
      description: "Date picker with preset date",
      code: {
        react: `<GoabFormItem label="Start date" mb="l">
  <GoabDatePicker name="startDate" value="2024-01-15" onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Start date" mb="l">
  <goab-date-picker name="startDate" value="2024-01-15" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Start date" mb="l">
  <goa-date-picker version="2" name="startDate" value="2024-01-15"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "with-min-max",
      name: "With date range",
      description: "Restrict selectable dates",
      code: {
        react: `<GoabFormItem label="Appointment date" helpText="Select a date within the next 7 days" mb="l">
  <GoabDatePicker
    name="appointment"
    min="2024-03-01"
    max="2024-03-07"
    onChange={handleDateChange}
  />
</GoabFormItem>`,
        angular: `<goab-form-item label="Appointment date" helpText="Select a date within the next 7 days" mb="l">
  <goab-date-picker
    name="appointment"
    min="2024-03-01"
    max="2024-03-07"
    (onChange)="handleDateChange($event)">
  </goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Appointment date" helpText="Select a date within the next 7 days" mb="l">
  <goa-date-picker version="2"
    name="appointment"
    min="2024-03-01"
    max="2024-03-07">
  </goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: `<GoabFormItem label="Default size" mb="l">
  <GoabDatePicker name="sizeDefault" onChange={handleDateChange} />
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabDatePicker name="sizeCompact" size="compact" onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Default size" mb="l">
  <goab-date-picker name="sizeDefault" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>
<goab-form-item label="Compact size" labelSize="compact" mb="l">
  <goab-date-picker name="sizeCompact" size="compact" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-date-picker version="2" name="sizeDefault"></goa-date-picker>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-date-picker version="2" name="sizeCompact" size="compact"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "input-type",
      name: "Input type",
      description: "Date picker rendered as a simple date input without calendar popup",
      code: {
        react: `<GoabFormItem label="What day was the incident?" mb="l">
  <GoabDatePicker name="incident" type="calendar" onChange={handleDateChange} />
</GoabFormItem>
<GoabFormItem label="What is your birthday?" mb="l">
  <GoabDatePicker name="birthday" type="input" onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="What day was the incident?" mb="l">
  <goab-date-picker name="incident" type="calendar" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>
<goab-form-item label="What is your birthday?" mb="l">
  <goab-date-picker name="birthday" type="input" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="What day was the incident?" mb="l">
  <goa-date-picker version="2" name="incident" type="calendar"></goa-date-picker>
</goa-form-item>
<goa-form-item version="2" label="What is your birthday?" mb="l">
  <goa-date-picker version="2" name="birthday" type="input"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `<GoabFormItem label="Locked date" mb="l">
  <GoabDatePicker name="locked" value="2024-01-01" disabled />
</GoabFormItem>
<GoabFormItem label="Date with error" error="Please select a valid date" mb="l">
  <GoabDatePicker name="error" error onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Locked date" mb="l">
  <goab-date-picker name="locked" value="2024-01-01" [disabled]="true"></goab-date-picker>
</goab-form-item>
<goab-form-item label="Date with error" error="Please select a valid date" mb="l">
  <goab-date-picker name="error" [error]="true" (onChange)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Locked date" mb="l">
  <goa-date-picker version="2" name="locked" value="2024-01-01" disabled></goa-date-picker>
</goa-form-item>
<goa-form-item version="2" label="Date with error" error="Please select a valid date" mb="l">
  <goa-date-picker version="2" name="error" error></goa-date-picker>
</goa-form-item>`,
      },
    },
  ],
};
