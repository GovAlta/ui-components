/**
 * RadioGroup Component Configurations
 *
 * Note: RadioGroup should be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const radioGroupConfigurations: ComponentConfigurations = {
  componentSlug: "radio-group",
  componentName: "Radio group",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Radio group with vertical layout",
      code: {
        react: {
          ts: `const [contact, setContact] = useState<string>("");`,
          jsx: `<GoabFormItem label="Contact preference" mb="l">
  <GoabRadioGroup
    name="contact"
    value={contact}
    onChange={(detail) => setContact(detail.value as string)}
  >
    <GoabRadioItem value="email" label="Email" />
    <GoabRadioItem value="phone" label="Phone" />
    <GoabRadioItem value="mail" label="Mail" />
  </GoabRadioGroup>
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      contact: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Contact preference" mb="l">
    <goab-radio-group name="contact" formControlName="contact">
      <goab-radio-item value="email" label="Email"></goab-radio-item>
      <goab-radio-item value="phone" label="Phone"></goab-radio-item>
      <goab-radio-item value="mail" label="Mail"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  contact = "";

  radioOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.contact = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Contact preference" mb="l">
    <goab-radio-group
      name="contact"
      [(ngModel)]="contact"
      (onChange)="radioOnChange($event)"
    >
      <goab-radio-item value="email" label="Email"></goab-radio-item>
      <goab-radio-item value="phone" label="Phone"></goab-radio-item>
      <goab-radio-item value="mail" label="Mail"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Contact preference" mb="l">
  <goa-radio-group id="contact-radio" version="2" name="contact" value="">
    <goa-radio-item value="email" label="Email"></goa-radio-item>
    <goa-radio-item value="phone" label="Phone"></goa-radio-item>
    <goa-radio-item value="mail" label="Mail"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  document
    .getElementById("contact-radio")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "horizontal",
      name: "Horizontal layout",
      description: "Radio group arranged horizontally",
      code: {
        react: {
          ts: `const [size, setSize] = useState<string>("");`,
          jsx: `<GoabFormItem label="Size" mb="l">
  <GoabRadioGroup
    name="size"
    orientation="horizontal"
    value={size}
    onChange={(detail) => setSize(detail.value as string)}
  >
    <GoabRadioItem value="small" label="Small" />
    <GoabRadioItem value="medium" label="Medium" />
    <GoabRadioItem value="large" label="Large" />
  </GoabRadioGroup>
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      size: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Size" mb="l">
    <goab-radio-group
      name="size"
      orientation="horizontal"
      formControlName="size"
    >
      <goab-radio-item value="small" label="Small"></goab-radio-item>
      <goab-radio-item value="medium" label="Medium"></goab-radio-item>
      <goab-radio-item value="large" label="Large"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  size = "";

  radioOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.size = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Size" mb="l">
    <goab-radio-group
      name="size"
      orientation="horizontal"
      [(ngModel)]="size"
      (onChange)="radioOnChange($event)"
    >
      <goab-radio-item value="small" label="Small"></goab-radio-item>
      <goab-radio-item value="medium" label="Medium"></goab-radio-item>
      <goab-radio-item value="large" label="Large"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Size" mb="l">
  <goa-radio-group id="size-radio" version="2" name="size" value="" orientation="horizontal">
    <goa-radio-item value="small" label="Small"></goa-radio-item>
    <goa-radio-item value="medium" label="Medium"></goa-radio-item>
    <goa-radio-item value="large" label="Large"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  document
    .getElementById("size-radio")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "with-descriptions",
      name: "With descriptions",
      description: "Radio items with additional description text",
      code: {
        react: {
          ts: `const [shipping, setShipping] = useState<string>("");`,
          jsx: `<GoabFormItem label="Shipping method" mb="l">
  <GoabRadioGroup
    name="shipping"
    value={shipping}
    onChange={(detail) => setShipping(detail.value as string)}
  >
    <GoabRadioItem
      value="standard"
      label="Standard"
      description="5-7 business days"
    />
    <GoabRadioItem
      value="express"
      label="Express"
      description="2-3 business days"
    />
    <GoabRadioItem
      value="overnight"
      label="Overnight"
      description="Next business day"
    />
  </GoabRadioGroup>
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      shipping: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Shipping method" mb="l">
    <goab-radio-group name="shipping" formControlName="shipping">
      <goab-radio-item
        value="standard"
        label="Standard"
        description="5-7 business days"
      ></goab-radio-item>
      <goab-radio-item
        value="express"
        label="Express"
        description="2-3 business days"
      ></goab-radio-item>
      <goab-radio-item
        value="overnight"
        label="Overnight"
        description="Next business day"
      ></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  shipping = "";

  radioOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.shipping = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Shipping method" mb="l">
    <goab-radio-group
      name="shipping"
      [(ngModel)]="shipping"
      (onChange)="radioOnChange($event)"
    >
      <goab-radio-item
        value="standard"
        label="Standard"
        description="5-7 business days"
      ></goab-radio-item>
      <goab-radio-item
        value="express"
        label="Express"
        description="2-3 business days"
      ></goab-radio-item>
      <goab-radio-item
        value="overnight"
        label="Overnight"
        description="Next business day"
      ></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Shipping method" mb="l">
  <goa-radio-group id="shipping-radio" version="2" name="shipping" value="">
    <goa-radio-item value="standard" label="Standard" description="5-7 business days"></goa-radio-item>
    <goa-radio-item value="express" label="Express" description="2-3 business days"></goa-radio-item>
    <goa-radio-item value="overnight" label="Overnight" description="Next business day"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  document
    .getElementById("shipping-radio")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "with-reveal",
      name: "With reveal content",
      description: "Radio item that reveals additional content when selected",
      code: {
        react: {
          ts: `const [hasDate, setHasDate] = useState<string>("");
const [preferredDate, setPreferredDate] = useState<Date | undefined>();

function handleDateChange(detail: GoabDatePickerOnChangeDetail) {
  setPreferredDate(detail.value as Date);
}`,
          jsx: `<GoabFormItem label="Do you have a preferred date?" mb="l">
  <GoabRadioGroup
    name="hasDate"
    value={hasDate}
    onChange={(detail) => setHasDate(detail.value as string)}
  >
    <GoabRadioItem value="no" label="No" />
    <GoabRadioItem
      value="yes"
      label="Yes"
      reveal={
        <GoabFormItem label="Preferred date" mb="l">
          <GoabDatePicker
            name="preferredDate"
            value={preferredDate}
            onChange={handleDateChange}
          />
        </GoabFormItem>
      }
    />
  </GoabRadioGroup>
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      hasDate: [""],
      preferredDate: [null],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Do you have a preferred date?" mb="l">
    <goab-radio-group name="hasDate" formControlName="hasDate">
      <goab-radio-item value="no" label="No"></goab-radio-item>
      <goab-radio-item value="yes" label="Yes" [reveal]="dateReveal">
        <ng-template #dateReveal>
          <goab-form-item label="Preferred date" mb="l">
            <goab-date-picker
              name="preferredDate"
              formControlName="preferredDate"
            ></goab-date-picker>
          </goab-form-item>
        </ng-template>
      </goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  hasDate = "";
  preferredDate?: Date;

  radioOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.hasDate = event.value as string;
  }

  dateOnChange(event: GoabDatePickerOnChangeDetail) {
    this.preferredDate = event.value as Date;
  }
}`,
            template: `<form>
  <goab-form-item label="Do you have a preferred date?" mb="l">
    <goab-radio-group
      name="hasDate"
      [(ngModel)]="hasDate"
      (onChange)="radioOnChange($event)"
    >
      <goab-radio-item value="no" label="No"></goab-radio-item>
      <goab-radio-item value="yes" label="Yes" [reveal]="dateReveal">
        <ng-template #dateReveal>
          <goab-form-item label="Preferred date" mb="l">
            <goab-date-picker
              name="preferredDate"
              [(ngModel)]="preferredDate"
              (onChange)="dateOnChange($event)"
            >
            </goab-date-picker>
          </goab-form-item>
        </ng-template>
      </goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Do you have a preferred date?" mb="l">
  <goa-radio-group id="has-date-radio" version="2" name="hasDate" value="">
    <goa-radio-item value="no" label="No"></goa-radio-item>
    <goa-radio-item value="yes" label="Yes">
      <div slot="reveal">
        <goa-form-item version="2" label="Preferred date" mb="l">
          <goa-date-picker id="preferred-date-picker" version="2" name="preferredDate"></goa-date-picker>
        </goa-form-item>
      </div>
    </goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  document
    .getElementById("has-date-radio")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
  document
    .getElementById("preferred-date-picker")
    .addEventListener("_change", function(e) {
      console.log(e.detail.name, e.detail.value);
    });
</script>`,
      },
    },
    {
      id: "preselected",
      name: "Preselected",
      description: "Radio group with default selection",
      code: {
        react: {
          ts: `const [frequency, setFrequency] = useState<string>("daily");`,
          jsx: `<GoabFormItem label="Notification frequency" mb="l">
  <GoabRadioGroup
    name="frequency"
    value={frequency}
    onChange={(detail) => setFrequency(detail.value as string)}
  >
    <GoabRadioItem value="realtime" label="Real-time" />
    <GoabRadioItem value="daily" label="Daily digest" />
    <GoabRadioItem value="weekly" label="Weekly summary" />
  </GoabRadioGroup>
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      frequency: ["daily"],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Notification frequency" mb="l">
    <goab-radio-group name="frequency" formControlName="frequency">
      <goab-radio-item value="realtime" label="Real-time"></goab-radio-item>
      <goab-radio-item value="daily" label="Daily digest"></goab-radio-item>
      <goab-radio-item value="weekly" label="Weekly summary"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  frequency = "daily";

  radioOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.frequency = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Notification frequency" mb="l">
    <goab-radio-group
      name="frequency"
      [(ngModel)]="frequency"
      (onChange)="radioOnChange($event)"
    >
      <goab-radio-item value="realtime" label="Real-time"></goab-radio-item>
      <goab-radio-item value="daily" label="Daily digest"></goab-radio-item>
      <goab-radio-item value="weekly" label="Weekly summary"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Notification frequency" mb="l">
  <goa-radio-group id="frequency-radio" version="2" name="frequency" value="daily">
    <goa-radio-item value="realtime" label="Real-time"></goa-radio-item>
    <goa-radio-item value="daily" label="Daily digest"></goa-radio-item>
    <goa-radio-item value="weekly" label="Weekly summary"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  document
    .getElementById("frequency-radio")
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
  <GoabRadioGroup
    name="sizeDefault"
    value={sizeDefault}
    onChange={(detail) => setSizeDefault(detail.value as string)}
  >
    <GoabRadioItem value="yes" label="Yes" />
    <GoabRadioItem value="no" label="No" />
  </GoabRadioGroup>
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabRadioGroup
    name="sizeCompact"
    size="compact"
    value={sizeCompact}
    onChange={(detail) => setSizeCompact(detail.value as string)}
  >
    <GoabRadioItem value="yes" label="Yes" />
    <GoabRadioItem value="no" label="No" />
  </GoabRadioGroup>
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
    <goab-radio-group name="sizeDefault" formControlName="sizeDefault">
      <goab-radio-item value="yes" label="Yes"></goab-radio-item>
      <goab-radio-item value="no" label="No"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-radio-group
      name="sizeCompact"
      size="compact"
      formControlName="sizeCompact"
    >
      <goab-radio-item value="yes" label="Yes"></goab-radio-item>
      <goab-radio-item value="no" label="No"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  sizeDefault = "";
  sizeCompact = "";

  defaultOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.sizeDefault = event.value as string;
  }

  compactOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.sizeCompact = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Default size" mb="l">
    <goab-radio-group
      name="sizeDefault"
      [(ngModel)]="sizeDefault"
      (onChange)="defaultOnChange($event)"
    >
      <goab-radio-item value="yes" label="Yes"></goab-radio-item>
      <goab-radio-item value="no" label="No"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-radio-group
      name="sizeCompact"
      size="compact"
      [(ngModel)]="sizeCompact"
      (onChange)="compactOnChange($event)"
    >
      <goab-radio-item value="yes" label="Yes"></goab-radio-item>
      <goab-radio-item value="no" label="No"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-radio-group id="size-default-radio" version="2" name="sizeDefault" value="">
    <goa-radio-item value="yes" label="Yes"></goa-radio-item>
    <goa-radio-item value="no" label="No"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-radio-group id="size-compact-radio" version="2" name="sizeCompact" value="" size="compact">
    <goa-radio-item value="yes" label="Yes"></goa-radio-item>
    <goa-radio-item value="no" label="No"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  function handleRadioChange(e) {
    console.log(e.detail.name, e.detail.value);
  }
  document.getElementById("size-default-radio").addEventListener("_change", handleRadioChange);
  document.getElementById("size-compact-radio").addEventListener("_change", handleRadioChange);
</script>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: {
          ts: `const [accountType, setAccountType] = useState<string>("basic");
const [payment, setPayment] = useState<string>("");`,
          jsx: `<GoabFormItem label="Account type" mb="l">
  <GoabRadioGroup
    name="accountType"
    disabled
    value={accountType}
    onChange={(detail) => setAccountType(detail.value as string)}
  >
    <GoabRadioItem value="basic" label="Basic" />
    <GoabRadioItem value="premium" label="Premium" />
  </GoabRadioGroup>
</GoabFormItem>
<GoabFormItem
  label="Payment method"
  error="Please select a payment method"
  mb="l"
>
  <GoabRadioGroup
    name="payment"
    error
    value={payment}
    onChange={(detail) => setPayment(detail.value as string)}
  >
    <GoabRadioItem value="credit" label="Credit card" />
    <GoabRadioItem value="debit" label="Debit card" />
    <GoabRadioItem value="bank" label="Bank transfer" />
  </GoabRadioGroup>
</GoabFormItem>`,
        },
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      accountType: [{ value: "basic", disabled: true }],
      payment: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Account type" mb="l">
    <goab-radio-group name="accountType" formControlName="accountType">
      <goab-radio-item value="basic" label="Basic"></goab-radio-item>
      <goab-radio-item value="premium" label="Premium"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
  <goab-form-item
    label="Payment method"
    error="Please select a payment method"
    mb="l"
  >
    <goab-radio-group name="payment" formControlName="payment" [error]="true">
      <goab-radio-item value="credit" label="Credit card"></goab-radio-item>
      <goab-radio-item value="debit" label="Debit card"></goab-radio-item>
      <goab-radio-item value="bank" label="Bank transfer"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  accountType = "basic";
  payment = "";

  accountTypeOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.accountType = event.value as string;
  }

  paymentOnChange(event: GoabRadioGroupOnChangeDetail) {
    this.payment = event.value as string;
  }
}`,
            template: `<form>
  <goab-form-item label="Account type" mb="l">
    <goab-radio-group
      name="accountType"
      [(ngModel)]="accountType"
      [disabled]="true"
      (onChange)="accountTypeOnChange($event)"
    >
      <goab-radio-item value="basic" label="Basic"></goab-radio-item>
      <goab-radio-item value="premium" label="Premium"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
  <goab-form-item
    label="Payment method"
    error="Please select a payment method"
    mb="l"
  >
    <goab-radio-group
      name="payment"
      [(ngModel)]="payment"
      [error]="true"
      (onChange)="paymentOnChange($event)"
    >
      <goab-radio-item value="credit" label="Credit card"></goab-radio-item>
      <goab-radio-item value="debit" label="Debit card"></goab-radio-item>
      <goab-radio-item value="bank" label="Bank transfer"></goab-radio-item>
    </goab-radio-group>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Account type" mb="l">
  <goa-radio-group id="account-type-radio" version="2" name="accountType" value="basic" disabled>
    <goa-radio-item value="basic" label="Basic"></goa-radio-item>
    <goa-radio-item value="premium" label="Premium"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<goa-form-item version="2" label="Payment method" error="Please select a payment method" mb="l">
  <goa-radio-group id="payment-radio" version="2" name="payment" value="" error>
    <goa-radio-item value="credit" label="Credit card"></goa-radio-item>
    <goa-radio-item value="debit" label="Debit card"></goa-radio-item>
    <goa-radio-item value="bank" label="Bank transfer"></goa-radio-item>
  </goa-radio-group>
</goa-form-item>
<script>
  function handleRadioChange(e) {
    console.log(e.detail.name, e.detail.value);
  }
  document.getElementById("account-type-radio").addEventListener("_change", handleRadioChange);
  document.getElementById("payment-radio").addEventListener("_change", handleRadioChange);
</script>`,
      },
    },
  ],
};
