/**
 * TextArea Component Configurations
 *
 * Note: TextArea should be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const textAreaConfigurations: ComponentConfigurations = {
  componentSlug: "text-area",
  componentName: "Text area",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Text area wrapped in FormItem with label",
      code: {
        react: `<GoabxFormItem label="Comments" mb="l">
  <GoabxTextArea name="comments" />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Comments" mb="l">
  <goabx-textarea name="comments"></goabx-textarea>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Comments" mb="l">
  <goa-textarea version="2" name="comments"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: "with-placeholder",
      name: "With placeholder",
      description: "Text area with placeholder text",
      code: {
        react: `<GoabxFormItem label="Feedback" mb="l">
  <GoabxTextArea name="feedback" placeholder="Enter your feedback here..." />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Feedback" mb="l">
  <goabx-textarea name="feedback" placeholder="Enter your feedback here..."></goabx-textarea>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Feedback" mb="l">
  <goa-textarea version="2" name="feedback" placeholder="Enter your feedback here..."></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: "custom-rows",
      name: "Custom rows",
      description: "Text area with custom height",
      code: {
        react: `<GoabxFormItem label="Description" mb="l">
  <GoabxTextArea name="description" rows={6} />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Description" mb="l">
  <goabx-textarea name="description" [rows]="6"></goabx-textarea>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Description" mb="l">
  <goa-textarea version="2" name="description" rows="6"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: "character-count",
      name: "Character count",
      description: "Text area with character limit",
      code: {
        react: `<GoabxFormItem label="Bio" helpText="Maximum 200 characters" mb="l">
  <GoabxTextArea name="bio" countBy="character" maxCount={200} />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Bio" helpText="Maximum 200 characters" mb="l">
  <goabx-textarea name="bio" countby="character" [maxCount]="200"></goabx-textarea>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Bio" helpText="Maximum 200 characters" mb="l">
  <goa-textarea version="2" name="bio" countby="character" maxcount="200"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: "word-count",
      name: "Word count",
      description: "Text area with word limit",
      code: {
        react: `<GoabxFormItem label="Essay" helpText="Maximum 500 words" mb="l">
  <GoabxTextArea name="essay" countBy="word" maxCount={500} rows={8} />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Essay" helpText="Maximum 500 words" mb="l">
  <goabx-textarea name="essay" countby="word" [maxCount]="500" [rows]="8"></goabx-textarea>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Essay" helpText="Maximum 500 words" mb="l">
  <goa-textarea version="2" name="essay" countby="word" maxcount="500" rows="8"></goa-textarea>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled, readonly, and error states",
      code: {
        react: `<GoabxFormItem label="Disabled" mb="l">
  <GoabxTextArea name="disabled" disabled value="Cannot edit this content" />
</GoabxFormItem>
<GoabxFormItem label="Read-only" mb="l">
  <GoabxTextArea name="readonly" readOnly value="View only content" />
</GoabxFormItem>
<GoabxFormItem label="With error" error="This field is required" mb="l">
  <GoabxTextArea name="error" error />
</GoabxFormItem>`,
        angular: `<goabx-form-item label="Disabled" mb="l">
  <goabx-textarea name="disabled" [disabled]="true" value="Cannot edit this content"></goabx-textarea>
</goabx-form-item>
<goabx-form-item label="Read-only" mb="l">
  <goabx-textarea name="readonly" [readOnly]="true" value="View only content"></goabx-textarea>
</goabx-form-item>
<goabx-form-item label="With error" error="This field is required" mb="l">
  <goabx-textarea name="error" [error]="true"></goabx-textarea>
</goabx-form-item>`,
        webComponents: `<goa-form-item version="2" label="Disabled" mb="l">
  <goa-textarea version="2" name="disabled" disabled value="Cannot edit this content"></goa-textarea>
</goa-form-item>
<goa-form-item version="2" label="Read-only" mb="l">
  <goa-textarea version="2" name="readonly" readonly value="View only content"></goa-textarea>
</goa-form-item>
<goa-form-item version="2" label="With error" error="This field is required" mb="l">
  <goa-textarea version="2" name="error" error></goa-textarea>
</goa-form-item>`,
      },
    },
  ],
};
