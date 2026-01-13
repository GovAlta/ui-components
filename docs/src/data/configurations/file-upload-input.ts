/**
 * FileUploadInput Component Configurations
 *
 * File upload input allows users to select files.
 */

import type { ComponentConfigurations } from './types';

export const fileUploadInputConfigurations: ComponentConfigurations = {
  componentSlug: 'file-upload-input',
  componentName: 'File upload input',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic file upload',
      description: 'Simple file selection input',
      code: {
        react: `<GoabFormItem label="Upload document" mb="l">
  <GoabFileUploadInput onChange={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Upload document" mb="l">
  <goab-file-upload-input (_change)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Upload document" mb="l">
  <goa-file-upload-input></goa-file-upload-input>
</goa-form-item>`,
      },
    },
    {
      id: 'with-accept',
      name: 'Accepted file types',
      description: 'Restrict to specific file types',
      code: {
        react: `<GoabFormItem label="Upload image" mb="l">
  <GoabFileUploadInput accept="image/*" onChange={handleFileChange} />
</GoabFormItem>
<GoabFormItem label="Upload PDF" mb="l">
  <GoabFileUploadInput accept=".pdf" onChange={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Upload image" mb="l">
  <goab-file-upload-input accept="image/*" (_change)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>
<goab-form-item label="Upload PDF" mb="l">
  <goab-file-upload-input accept=".pdf" (_change)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Upload image" mb="l">
  <goa-file-upload-input accept="image/*"></goa-file-upload-input>
</goa-form-item>
<goa-form-item label="Upload PDF" mb="l">
  <goa-file-upload-input accept=".pdf"></goa-file-upload-input>
</goa-form-item>`,
      },
    },
    {
      id: 'multiple',
      name: 'Multiple files',
      description: 'Allow selecting multiple files',
      code: {
        react: `<GoabFormItem label="Upload files" mb="l">
  <GoabFileUploadInput multiple onChange={handleFilesChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Upload files" mb="l">
  <goab-file-upload-input [multiple]="true" (_change)="handleFilesChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Upload files" mb="l">
  <goa-file-upload-input multiple></goa-file-upload-input>
</goa-form-item>`,
      },
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Different visual styles',
      code: {
        react: `<GoabFormItem label="Button variant" mb="l">
  <GoabFileUploadInput variant="button" onChange={handleFileChange} />
</GoabFormItem>
<GoabFormItem label="Dragdrop variant" mb="l">
  <GoabFileUploadInput variant="dragdrop" onChange={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Button variant" mb="l">
  <goab-file-upload-input variant="button" (_change)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>
<goab-form-item label="Dragdrop variant" mb="l">
  <goab-file-upload-input variant="dragdrop" (_change)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Button variant" mb="l">
  <goa-file-upload-input variant="button"></goa-file-upload-input>
</goa-form-item>
<goa-form-item label="Dragdrop variant" mb="l">
  <goa-file-upload-input variant="dragdrop"></goa-file-upload-input>
</goa-form-item>`,
      },
    },
  ],
};
