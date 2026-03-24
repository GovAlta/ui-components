/**
 * FileUploadInput Component Configurations
 *
 * File upload input allows users to select files.
 */

import type { ComponentConfigurations } from "./types";

const fileUploadScript = `
const inputs = document.querySelectorAll('goa-file-upload-input');

inputs.forEach(input => {
  const formItem = input.closest('goa-form-item');
  input.addEventListener('_selectFile', (e) => {
    const file = e.detail.file;
    const card = document.createElement('goa-file-upload-card');
    card.setAttribute('version', '2');
    card.setAttribute('filename', file.name);
    card.setAttribute('size', file.size);
    if (file.type) card.setAttribute('type', file.type);
    card.setAttribute('progress', '0');
    card.addEventListener('_delete', () => wrapper.remove());
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '1.5rem';
    wrapper.appendChild(card);
    formItem.after(wrapper);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        card.setAttribute('progress', '-1');
        clearInterval(interval);
      } else {
        card.setAttribute('progress', Math.round(progress).toString());
      }
    }, 300);
  });
});
`;

export const fileUploadInputConfigurations: ComponentConfigurations = {
  componentSlug: "file-upload-input",
  componentName: "File upload input",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic file upload",
      description: "Simple file selection input",
      code: {
        react: `<GoabFormItem label="Upload document" mb="l">
  <GoabFileUploadInput onSelectFile={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Upload document" mb="l">
  <goab-file-upload-input (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Upload document" mb="l">
  <goa-file-upload-input version="2"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "with-accept",
      name: "Accepted file types",
      description: "Restrict to specific file types",
      code: {
        react: `<GoabFormItem label="Upload image" mb="l">
  <GoabFileUploadInput accept="image/*" onSelectFile={handleFileChange} />
</GoabFormItem>
<GoabFormItem label="Upload PDF" mb="l">
  <GoabFileUploadInput accept=".pdf" onSelectFile={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Upload image" mb="l">
  <goab-file-upload-input accept="image/*" (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>
<goab-form-item label="Upload PDF" mb="l">
  <goab-file-upload-input accept=".pdf" (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Upload image" mb="l">
  <goa-file-upload-input version="2" accept="image/*"></goa-file-upload-input>
</goa-form-item>
<goa-form-item version="2" label="Upload PDF" mb="l">
  <goa-file-upload-input version="2" accept=".pdf"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "multiple",
      name: "Multiple files",
      description: "Allow selecting multiple files",
      code: {
        react: `<GoabFormItem label="Upload files" mb="l">
  <GoabFileUploadInput multiple onSelectFile={handleFilesChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Upload files" mb="l">
  <goab-file-upload-input [multiple]="true" (onSelectFile)="handleFilesChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Upload files" mb="l">
  <goa-file-upload-input version="2" multiple></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "max-file-size",
      name: "Max file size",
      description: "Custom file size limits",
      code: {
        react: `<GoabFormItem label="Small file (100KB limit)" mb="l">
  <GoabFileUploadInput maxFileSize="100KB" onSelectFile={handleFileChange} />
</GoabFormItem>
<GoabFormItem label="Large file (50MB limit)" mb="l">
  <GoabFileUploadInput maxFileSize="50MB" onSelectFile={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Small file (100KB limit)" mb="l">
  <goab-file-upload-input maxFileSize="100KB" (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>
<goab-form-item label="Large file (50MB limit)" mb="l">
  <goab-file-upload-input maxFileSize="50MB" (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Small file (100KB limit)" mb="l">
  <goa-file-upload-input version="2" maxfilesize="100KB"></goa-file-upload-input>
</goa-form-item>
<goa-form-item version="2" label="Large file (50MB limit)" mb="l">
  <goa-file-upload-input version="2" maxfilesize="50MB"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
    {
      id: "variants",
      name: "Variants",
      description: "Different visual styles",
      code: {
        react: `<GoabFormItem label="Button variant" mb="l">
  <GoabFileUploadInput variant="button" onSelectFile={handleFileChange} />
</GoabFormItem>
<GoabFormItem label="Dragdrop variant" mb="l">
  <GoabFileUploadInput variant="dragdrop" onSelectFile={handleFileChange} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Button variant" mb="l">
  <goab-file-upload-input variant="button" (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>
<goab-form-item label="Dragdrop variant" mb="l">
  <goab-file-upload-input variant="dragdrop" (onSelectFile)="handleFileChange($event)"></goab-file-upload-input>
</goab-form-item>`,
        webComponents: `<goa-form-item version="2" label="Button variant" mb="l">
  <goa-file-upload-input version="2" variant="button"></goa-file-upload-input>
</goa-form-item>
<goa-form-item version="2" label="Dragdrop variant" mb="l">
  <goa-file-upload-input version="2" variant="dragdrop"></goa-file-upload-input>
</goa-form-item>
<script>${fileUploadScript}</script>`,
      },
    },
  ],
};
