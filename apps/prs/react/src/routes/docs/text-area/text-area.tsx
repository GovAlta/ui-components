import { useState } from "react";
import { GoabFormItem, GoabTextArea } from "@abgov/react-components";
import type { GoabTextAreaOnChangeDetail } from "@abgov/ui-components-common";

export function DocsTextAreaRoute() {
  const [comments, setComments] = useState<string>("");

  return (
    <div>
      <h2>Text area</h2>

      <h3>Basic example</h3>
      <GoabFormItem label="Comments" mb="l">
        <GoabTextArea
          name="comments"
          value={comments}
          onChange={(detail: GoabTextAreaOnChangeDetail) => setComments(detail.value)}
        />
      </GoabFormItem>
      <p>Value: {comments}</p>

      <h3>With placeholder</h3>
      <GoabFormItem label="Feedback" mb="l">
        <GoabTextArea name="feedback" placeholder="Enter your feedback here..." />
      </GoabFormItem>

      <h3>Custom height</h3>
      <GoabFormItem label="Description" mb="l">
        <GoabTextArea name="description" rows={6} />
      </GoabFormItem>

      <h3>Character count</h3>
      <GoabFormItem
        label="Tell us about your experience with the service"
        mb="l"
      >
        <GoabTextArea name="experience" countBy="character" maxCount={200} />
      </GoabFormItem>

      <h3>Word count</h3>
      <GoabFormItem
        label="Describe the circumstances that led to this request"
        mb="l"
      >
        <GoabTextArea
          name="circumstances"
          countBy="word"
          maxCount={500}
          rows={8}
        />
      </GoabFormItem>

      <h3>Sizes</h3>
      <GoabFormItem label="Default size" mb="l">
        <GoabTextArea name="sizeDefault" />
      </GoabFormItem>
      <GoabFormItem label="Compact size" labelSize="compact" mb="l">
        <GoabTextArea name="sizeCompact" size="compact" />
      </GoabFormItem>

      <h3>States</h3>
      <GoabFormItem label="Disabled" mb="l">
        <GoabTextArea name="disabled" disabled value="Cannot edit this content" />
      </GoabFormItem>
      <GoabFormItem label="Read-only" mb="l">
        <GoabTextArea name="readonly" readOnly value="View only content" />
      </GoabFormItem>
      <GoabFormItem label="With error" error="This field is required" mb="l">
        <GoabTextArea name="error" error />
      </GoabFormItem>
    </div>
  );
}
