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
        react: `<GoabxFormItem label="Date" mb="l">
  <GoabxDatePicker name="date" onChange={handleDateChange} />
</GoabxFormItem>`,
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
        react: `<GoabxFormItem label="Start date" mb="l">
  <GoabxDatePicker name="startDate" value="2024-01-15" onChange={handleDateChange} />
</GoabxFormItem>`,
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
        react: `<GoabxFormItem label="Appointment date" helpText="Select a date within the next 30 days" mb="l">
  <GoabxDatePicker
    name="appointment"
    min="2024-01-01"
    max="2024-01-31"
    onChange={handleDateChange}
  />
</GoabxFormItem>`,
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
        react: `<GoabxFormItem label="Locked date" mb="l">
  <GoabxDatePicker name="locked" value="2024-01-01" disabled />
</GoabxFormItem>`,
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
