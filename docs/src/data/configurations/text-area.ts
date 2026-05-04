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
        react: {
          ts: `const [comments, setComments] = useState<string>("");`,
          jsx: `<GoabFormItem label="Comments" mb="l">
  <GoabTextArea
    name="comments"
    value={comments}
    onChange={(detail) => setComments(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      comments: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Comments" mb="l">
    <goab-textarea name="comments" formControlName="comments"></goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  comments = "";

  textareaOnChange(event: GoabTextAreaOnChangeDetail) {
    this.comments = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Comments" mb="l">
    <goab-textarea
      name="comments"
      [(ngModel)]="comments"
      (onChange)="textareaOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Comments" mb="l">
  <goa-textarea id="comments-textarea" version="2" name="comments"></goa-textarea>
</goa-form-item>
<script>
  document
    .getElementById("comments-textarea")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "with-placeholder",
      name: "With placeholder",
      description: "Text area with placeholder text",
      code: {
        react: {
          ts: `const [feedback, setFeedback] = useState<string>("");`,
          jsx: `<GoabFormItem label="Feedback" mb="l">
  <GoabTextArea
    name="feedback"
    placeholder="Enter your feedback here..."
    value={feedback}
    onChange={(detail) => setFeedback(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      feedback: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Feedback" mb="l">
    <goab-textarea
      name="feedback"
      placeholder="Enter your feedback here..."
      formControlName="feedback"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  feedback = "";

  textareaOnChange(event: GoabTextAreaOnChangeDetail) {
    this.feedback = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Feedback" mb="l">
    <goab-textarea
      name="feedback"
      placeholder="Enter your feedback here..."
      [(ngModel)]="feedback"
      (onChange)="textareaOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Feedback" mb="l">
  <goa-textarea id="feedback-textarea" version="2" name="feedback" placeholder="Enter your feedback here..."></goa-textarea>
</goa-form-item>
<script>
  document
    .getElementById("feedback-textarea")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "custom-height",
      name: "Custom height",
      description: "Text area with custom row count",
      code: {
        react: {
          ts: `const [description, setDescription] = useState<string>("");`,
          jsx: `<GoabFormItem label="Description" mb="l">
  <GoabTextArea
    name="description"
    rows={6}
    value={description}
    onChange={(detail) => setDescription(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Description" mb="l">
    <goab-textarea
      name="description"
      [rows]="6"
      formControlName="description"
    ></goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  description = "";

  textareaOnChange(event: GoabTextAreaOnChangeDetail) {
    this.description = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Description" mb="l">
    <goab-textarea
      name="description"
      [rows]="6"
      [(ngModel)]="description"
      (onChange)="textareaOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Description" mb="l">
  <goa-textarea id="description-textarea" version="2" name="description" rows="6"></goa-textarea>
</goa-form-item>
<script>
  document
    .getElementById("description-textarea")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "character-count",
      name: "Character count",
      description: "Text area with character limit",
      code: {
        react: {
          ts: `const [experience, setExperience] = useState<string>("");`,
          jsx: `<GoabFormItem label="Tell us about your experience with the service" mb="l">
  <GoabTextArea
    name="experience"
    countBy="character"
    maxCount={200}
    value={experience}
    onChange={(detail) => setExperience(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      experience: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Tell us about your experience with the service" mb="l">
    <goab-textarea
      name="experience"
      countBy="character"
      [maxCount]="200"
      formControlName="experience"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  experience = "";

  textareaOnChange(event: GoabTextAreaOnChangeDetail) {
    this.experience = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Tell us about your experience with the service" mb="l">
    <goab-textarea
      name="experience"
      countBy="character"
      [maxCount]="200"
      [(ngModel)]="experience"
      (onChange)="textareaOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Tell us about your experience with the service" mb="l">
  <goa-textarea id="experience-textarea" version="2" name="experience" countby="character" maxcount="200"></goa-textarea>
</goa-form-item>
<script>
  document
    .getElementById("experience-textarea")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "word-count",
      name: "Word count",
      description: "Text area with word limit",
      code: {
        react: {
          ts: `const [circumstances, setCircumstances] = useState<string>("");`,
          jsx: `<GoabFormItem
  label="Describe the circumstances that led to this request"
  mb="l"
>
  <GoabTextArea
    name="circumstances"
    countBy="word"
    maxCount={500}
    rows={8}
    value={circumstances}
    onChange={(detail) => setCircumstances(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      circumstances: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item
    label="Describe the circumstances that led to this request"
    mb="l"
  >
    <goab-textarea
      name="circumstances"
      countBy="word"
      [maxCount]="500"
      [rows]="8"
      formControlName="circumstances"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  circumstances = "";

  textareaOnChange(event: GoabTextAreaOnChangeDetail) {
    this.circumstances = event.value;
  }
}`,
            template: `<form>
  <goab-form-item
    label="Describe the circumstances that led to this request"
    mb="l"
  >
    <goab-textarea
      name="circumstances"
      countBy="word"
      [maxCount]="500"
      [rows]="8"
      [(ngModel)]="circumstances"
      (onChange)="textareaOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Describe the circumstances that led to this request" mb="l">
  <goa-textarea id="circumstances-textarea" version="2" name="circumstances" countby="word" maxcount="500" rows="8"></goa-textarea>
</goa-form-item>
<script>
  document
    .getElementById("circumstances-textarea")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Default and compact size variants",
      code: {
        react: {
          ts: `const [sizeDefault, setSizeDefault] = useState<string>("");
const [sizeCompact, setSizeCompact] = useState<string>("");`,
          jsx: `<GoabFormItem label="Default size" mb="l">
  <GoabTextArea
    name="sizeDefault"
    value={sizeDefault}
    onChange={(detail) => setSizeDefault(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabTextArea
    name="sizeCompact"
    size="compact"
    value={sizeCompact}
    onChange={(detail) => setSizeCompact(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sizeDefault: [""],
      sizeCompact: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Default size" mb="l">
    <goab-textarea
      name="sizeDefault"
      formControlName="sizeDefault"
    ></goab-textarea>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-textarea
      name="sizeCompact"
      size="compact"
      formControlName="sizeCompact"
    ></goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  sizeDefault = "";
  sizeCompact = "";

  defaultOnChange(event: GoabTextAreaOnChangeDetail) {
    this.sizeDefault = event.value;
  }

  compactOnChange(event: GoabTextAreaOnChangeDetail) {
    this.sizeCompact = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Default size" mb="l">
    <goab-textarea
      name="sizeDefault"
      [(ngModel)]="sizeDefault"
      (onChange)="defaultOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-textarea
      name="sizeCompact"
      size="compact"
      [(ngModel)]="sizeCompact"
      (onChange)="compactOnChange($event)"
    >
    </goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-textarea id="size-default-textarea" version="2" name="sizeDefault"></goa-textarea>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-textarea id="size-compact-textarea" version="2" name="sizeCompact" size="compact"></goa-textarea>
</goa-form-item>
<script>
  function handleTextareaChange(e) {
    console.log(e.detail.name, e.detail.value);
  }
  document.getElementById("size-default-textarea").addEventListener("_change", handleTextareaChange);
  document.getElementById("size-compact-textarea").addEventListener("_change", handleTextareaChange);
</script>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled, readonly, and error states",
      code: {
        react: {
          ts: `const [disabledValue] = useState<string>("Cannot edit this content");
const [readonlyValue] = useState<string>("View only content");
const [errorValue, setErrorValue] = useState<string>("");`,
          jsx: `<GoabFormItem label="Disabled" mb="l">
  <GoabTextArea name="disabled" disabled value={disabledValue} />
</GoabFormItem>
<GoabFormItem label="Read-only" mb="l">
  <GoabTextArea name="readonly" readOnly value={readonlyValue} />
</GoabFormItem>
<GoabFormItem label="With error" error="This field is required" mb="l">
  <GoabTextArea
    name="error"
    error
    value={errorValue}
    onChange={(detail) => setErrorValue(detail.value)}
  />
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      disabled: [{ value: "Cannot edit this content", disabled: true }],
      readonly: ["View only content"],
      errorValue: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Disabled" mb="l">
    <goab-textarea name="disabled" formControlName="disabled"></goab-textarea>
  </goab-form-item>
  <goab-form-item label="Read-only" mb="l">
    <goab-textarea
      name="readonly"
      formControlName="readonly"
      [readOnly]="true"
    ></goab-textarea>
  </goab-form-item>
  <goab-form-item label="With error" error="This field is required" mb="l">
    <goab-textarea
      name="error"
      formControlName="errorValue"
      [error]="true"
    ></goab-textarea>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  disabledValue = "Cannot edit this content";
  readonlyValue = "View only content";
  errorValue = "";
}`,
            template: `<form>
  <goab-form-item label="Disabled" mb="l">
    <goab-textarea
      name="disabled"
      [(ngModel)]="disabledValue"
      [disabled]="true"
    ></goab-textarea>
  </goab-form-item>
  <goab-form-item label="Read-only" mb="l">
    <goab-textarea
      name="readonly"
      [(ngModel)]="readonlyValue"
      [readOnly]="true"
    ></goab-textarea>
  </goab-form-item>
  <goab-form-item label="With error" error="This field is required" mb="l">
    <goab-textarea
      name="error"
      [(ngModel)]="errorValue"
      [error]="true"
    ></goab-textarea>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Disabled" mb="l">
  <goa-textarea id="disabled-textarea" version="2" name="disabled" disabled value="Cannot edit this content"></goa-textarea>
</goa-form-item>
<goa-form-item version="2" label="Read-only" mb="l">
  <goa-textarea id="readonly-textarea" version="2" name="readonly" readonly value="View only content"></goa-textarea>
</goa-form-item>
<goa-form-item version="2" label="With error" error="This field is required" mb="l">
  <goa-textarea id="error-textarea" version="2" name="error" error></goa-textarea>
</goa-form-item>
<script>
  function handleTextareaChange(e) {
    console.log(e.detail.name, e.detail.value);
  }
  document.getElementById("disabled-textarea").addEventListener("_change", handleTextareaChange);
  document.getElementById("readonly-textarea").addEventListener("_change", handleTextareaChange);
  document.getElementById("error-textarea").addEventListener("_change", handleTextareaChange);
</script>`,
      },
    },
  ],
};
