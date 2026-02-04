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
        react: `<GoabxFormItem label="Upload document" mb="l">
  <GoabxFileUploadInput onChange={handleFileChange} />
</GoabxFormItem>`,
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
        react: `<GoabxFormItem label="Upload image" mb="l">
  <GoabxFileUploadInput accept="image/*" onChange={handleFileChange} />
</GoabxFormItem>
<GoabxFormItem label="Upload PDF" mb="l">
  <GoabxFileUploadInput accept=".pdf" onChange={handleFileChange} />
</GoabxFormItem>`,
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
        react: `<GoabxFormItem label="Upload files" mb="l">
  <GoabxFileUploadInput multiple onChange={handleFilesChange} />
</GoabxFormItem>`,
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
        react: `<GoabxFormItem label="Button variant" mb="l">
  <GoabxFileUploadInput variant="button" onChange={handleFileChange} />
</GoabxFormItem>
<GoabxFormItem label="Dragdrop variant" mb="l">
  <GoabxFileUploadInput variant="dragdrop" onChange={handleFileChange} />
</GoabxFormItem>`,
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
