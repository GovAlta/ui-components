/**
 * FileUploadCard Component Configurations
 *
 * FileUploadCard displays uploaded file information.
 */

import type { ComponentConfigurations } from './types';

export const fileUploadCardConfigurations: ComponentConfigurations = {
  componentSlug: 'file-upload-card',
  componentName: 'File upload card',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic file upload card',
      description: 'Card showing uploaded file',
      code: {
        react: `<GoabFileUploadCard
  filename="document.pdf"
  size={1024000}
  onDelete={handleDelete}
/>`,
        angular: `<goab-file-upload-card
  filename="document.pdf"
  [size]="1024000"
  (_delete)="handleDelete()">
</goab-file-upload-card>`,
        webComponents: `<goa-file-upload-card version="2"
  filename="document.pdf"
  size="1024000">
</goa-file-upload-card>`,
      },
    },
    {
      id: 'with-progress',
      name: 'With upload progress',
      description: 'Card showing upload in progress',
      code: {
        react: `<GoabFileUploadCard
  filename="image.png"
  size={2048000}
  progress={65}
/>`,
        angular: `<goab-file-upload-card
  filename="image.png"
  [size]="2048000"
  [progress]="65">
</goab-file-upload-card>`,
        webComponents: `<goa-file-upload-card version="2"
  filename="image.png"
  size="2048000"
  progress="65">
</goa-file-upload-card>`,
      },
    },
    {
      id: 'with-error',
      name: 'Error state',
      description: 'Card showing upload error',
      code: {
        react: `<GoabFileUploadCard
  filename="large-file.zip"
  size={104857600}
  error="File exceeds maximum size limit"
  onDelete={handleDelete}
/>`,
        angular: `<goab-file-upload-card
  filename="large-file.zip"
  [size]="104857600"
  error="File exceeds maximum size limit"
  (_delete)="handleDelete()">
</goab-file-upload-card>`,
        webComponents: `<goa-file-upload-card version="2"
  filename="large-file.zip"
  size="104857600"
  error="File exceeds maximum size limit">
</goa-file-upload-card>`,
      },
    },
  ],
};
