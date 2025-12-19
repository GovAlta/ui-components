/**
 * TextArea Component Configurations
 *
 * Note: TextArea should be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from './types';

export const textAreaConfigurations: ComponentConfigurations = {
  componentSlug: 'text-area',
  componentName: 'Text area',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic example',
      description: 'Text area wrapped in FormItem with label',
      code: {
        react: `<GoabFormItem label="Comments" mb="l">
  <GoabTextArea name="comments" />
</GoabFormItem>`,
        angular: `<goab-form-item label="Comments" mb="l">
  <goab-textarea name="comments"></goab-textarea>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Comments" mb="l">
  <goa-textarea name="comments"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: 'with-placeholder',
      name: 'With placeholder',
      description: 'Text area with placeholder text',
      code: {
        react: `<GoabFormItem label="Feedback" mb="l">
  <GoabTextArea name="feedback" placeholder="Enter your feedback here..." />
</GoabFormItem>`,
        angular: `<goab-form-item label="Feedback" mb="l">
  <goab-textarea name="feedback" placeholder="Enter your feedback here..."></goab-textarea>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Feedback" mb="l">
  <goa-textarea name="feedback" placeholder="Enter your feedback here..."></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: 'custom-rows',
      name: 'Custom rows',
      description: 'Text area with custom height',
      code: {
        react: `<GoabFormItem label="Description" mb="l">
  <GoabTextArea name="description" rows={6} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Description" mb="l">
  <goab-textarea name="description" [rows]="6"></goab-textarea>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Description" mb="l">
  <goa-textarea name="description" rows="6"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: 'character-count',
      name: 'Character count',
      description: 'Text area with character limit',
      code: {
        react: `<GoabFormItem label="Bio" helpText="Maximum 200 characters" mb="l">
  <GoabTextArea name="bio" countBy="character" maxCount={200} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Bio" helpText="Maximum 200 characters" mb="l">
  <goab-textarea name="bio" countby="character" [maxCount]="200"></goab-textarea>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Bio" helpText="Maximum 200 characters" mb="l">
  <goa-textarea name="bio" countby="character" maxcount="200"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: 'word-count',
      name: 'Word count',
      description: 'Text area with word limit',
      code: {
        react: `<GoabFormItem label="Essay" helpText="Maximum 500 words" mb="l">
  <GoabTextArea name="essay" countBy="word" maxCount={500} rows={8} />
</GoabFormItem>`,
        angular: `<goab-form-item label="Essay" helpText="Maximum 500 words" mb="l">
  <goab-textarea name="essay" countby="word" [maxCount]="500" [rows]="8"></goab-textarea>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Essay" helpText="Maximum 500 words" mb="l">
  <goa-textarea name="essay" countby="word" maxcount="500" rows="8"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: 'states',
      name: 'States',
      description: 'Disabled, readonly, and error states',
      code: {
        react: `<GoabFormItem label="Disabled" mb="l">
  <GoabTextArea name="disabled" disabled value="Cannot edit this content" />
</GoabFormItem>
<GoabFormItem label="Read-only" mb="l">
  <GoabTextArea name="readonly" readOnly value="View only content" />
</GoabFormItem>
<GoabFormItem label="With error" error="This field is required" mb="l">
  <GoabTextArea name="error" error />
</GoabFormItem>`,
        angular: `<goab-form-item label="Disabled" mb="l">
  <goab-textarea name="disabled" [disabled]="true" value="Cannot edit this content"></goab-textarea>
</goab-form-item>
<goab-form-item label="Read-only" mb="l">
  <goab-textarea name="readonly" [readOnly]="true" value="View only content"></goab-textarea>
</goab-form-item>
<goab-form-item label="With error" error="This field is required" mb="l">
  <goab-textarea name="error" [error]="true"></goab-textarea>
</goab-form-item>`,
        webComponents: `<goa-form-item label="Disabled" mb="l">
  <goa-textarea name="disabled" disabled value="Cannot edit this content"></goa-textarea>
</goa-form-item>
<goa-form-item label="Read-only" mb="l">
  <goa-textarea name="readonly" readonly value="View only content"></goa-textarea>
</goa-form-item>
<goa-form-item label="With error" error="This field is required" mb="l">
  <goa-textarea name="error" error></goa-textarea>
</goa-form-item>`,
      },
    },
  ],
};
