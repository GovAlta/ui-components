/**
 * DatePicker Component Configurations
 *
 * DatePicker allows users to select dates.
 */

import type { ComponentConfigurations } from './types';

export const datePickerConfigurations: ComponentConfigurations = {
  componentSlug: 'date-picker',
  componentName: 'Date picker',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic date picker',
      description: 'Simple date selection',
      code: {
        react: `<GoabFormItem label="Date" mb="l">
  <GoabDatePicker name="date" onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Date" mb="l">
  <goab-date-picker name="date" (_change)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Date" mb="l">
  <goa-date-picker name="date"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: 'with-value',
      name: 'With initial value',
      description: 'Date picker with preset date',
      code: {
        react: `<GoabFormItem label="Start date" mb="l">
  <GoabDatePicker name="startDate" value="2024-01-15" onChange={handleDateChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Start date" mb="l">
  <goab-date-picker name="startDate" value="2024-01-15" (_change)="handleDateChange($event)"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Start date" mb="l">
  <goa-date-picker name="startDate" value="2024-01-15"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: 'with-min-max',
      name: 'With date range',
      description: 'Restrict selectable dates',
      code: {
        react: `<GoabFormItem label="Appointment date" helpText="Select a date within the next 30 days" mb="l">
  <GoabDatePicker
    name="appointment"
    min="2024-01-01"
    max="2024-01-31"
    onChange={handleDateChange}
  />
</GoabFormItem>`,
        angular: `<goab-form-item label="Appointment date" helpText="Select a date within the next 30 days" mb="l">
  <goab-date-picker
    name="appointment"
    min="2024-01-01"
    max="2024-01-31"
    (_change)="handleDateChange($event)">
  </goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Appointment date" helpText="Select a date within the next 30 days" mb="l">
  <goa-date-picker
    name="appointment"
    min="2024-01-01"
    max="2024-01-31">
  </goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Date picker in disabled state',
      code: {
        react: `<GoabFormItem label="Locked date" mb="l">
  <GoabDatePicker name="locked" value="2024-01-01" disabled />
</GoabFormItem>`,
        angular: `<goab-form-item label="Locked date" mb="l">
  <goab-date-picker name="locked" value="2024-01-01" [disabled]="true"></goab-date-picker>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Locked date" mb="l">
  <goa-date-picker name="locked" value="2024-01-01" disabled></goa-date-picker>
</goa-form-item>`,
      },
    },
  ],
};
