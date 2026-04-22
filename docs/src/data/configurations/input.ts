/**
 * Input Component Configurations
 *
 * Shows various Input use cases wrapped in FormItem.
 * Note: Input must ALWAYS be wrapped in FormItem for proper labeling.
 */

import type { ComponentConfigurations } from "./types";

export const inputConfigurations: ComponentConfigurations = {
  componentSlug: "input",
  componentName: "Input",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic example",
      description: "Text input wrapped in FormItem with label",
      code: {
        react: {
          ts: `const [fullName, setFullName] = useState<string>("");`,
          jsx: `<GoabFormItem label="Full name" mb="l">
  <GoabInput
    name="fullName"
    value={fullName}
    onChange={(detail) => setFullName(detail.value)}
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
      fullName: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Full name" mb="l">
    <goab-input name="fullName" formControlName="fullName"></goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  fullName = "";

  inputOnChange(event: GoabInputOnChangeDetail) {
    this.fullName = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Full name" mb="l">
    <goab-input
      name="fullName"
      [(ngModel)]="fullName"
      (onChange)="inputOnChange($event)"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Full name" mb="l">
  <goa-input version="2" name="fullName"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "with-icons",
      name: "With icons",
      description: "Inputs with leading or trailing icons",
      code: {
        react: {
          ts: `const [search, setSearch] = useState<string>("");
const [website, setWebsite] = useState<string>("");`,
          jsx: `<GoabFormItem label="Search" mb="l">
  <GoabInput
    name="search"
    value={search}
    leadingIcon="search"
    width="30ch"
    onChange={(detail) => setSearch(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Website" mb="l">
  <GoabInput
    name="website"
    value={website}
    trailingIcon="open"
    width="30ch"
    onChange={(detail) => setWebsite(detail.value)}
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
      search: [""],
      website: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Search" mb="l">
    <goab-input
      name="search"
      formControlName="search"
      leadingIcon="search"
      width="30ch"
    >
    </goab-input>
  </goab-form-item>
  <goab-form-item label="Website" mb="l">
    <goab-input
      name="website"
      formControlName="website"
      trailingIcon="open"
      width="30ch"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  search = "";
  website = "";

  searchChange(event: GoabInputOnChangeDetail) {
    this.search = event.value;
  }

  websiteChange(event: GoabInputOnChangeDetail) {
    this.website = event.value;
  }
}`,
            template: `<form>
  <goab-form-item label="Search" mb="l">
    <goab-input
      name="search"
      [(ngModel)]="search"
      leadingIcon="search"
      width="30ch"
      (onChange)="searchChange($event)"
    >
    </goab-input>
  </goab-form-item>
  <goab-form-item label="Website" mb="l">
    <goab-input
      name="website"
      [(ngModel)]="website"
      trailingIcon="open"
      width="30ch"
      (onChange)="websiteChange($event)"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Search" mb="l">
  <goa-input version="2" name="search" leadingicon="search" width="30ch"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Website" mb="l">
  <goa-input version="2" name="website" trailingicon="open" width="30ch"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "clearable",
      name: "Clearable",
      description: "Input with a clickable trailing icon to clear the field",
      code: {
        react: {
          ts: `const [search, setSearch] = useState<string>("");`,
          jsx: `<GoabFormItem label="Search" mb="l">
  <GoabInput
    name="search"
    value={search}
    trailingIcon="close"
    onTrailingIconClick={() => setSearch("")}
    onChange={(detail) => setSearch(detail.value)}
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
      search: [""],
    });
  }

  clearSearch() {
    this.form.patchValue({ search: "" });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Search" mb="l">
    <goab-input
      name="search"
      formControlName="search"
      trailingIcon="close"
      (onTrailingIconClick)="clearSearch()"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  search = "";

  inputOnChange(event: GoabInputOnChangeDetail) {
    this.search = event.value;
  }

  clearSearch() {
    this.search = "";
  }
}`,
            template: `<form>
  <goab-form-item label="Search" mb="l">
    <goab-input
      name="search"
      [(ngModel)]="search"
      trailingIcon="close"
      (onTrailingIconClick)="clearSearch()"
      (onChange)="inputOnChange($event)"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Search" mb="l">
  <goa-input version="2"
    id="clearable-input"
    name="search"
    trailingicon="close"
    handletrailingiconclick="true">
  </goa-input>
</goa-form-item>
<script>
  var input = document.getElementById("clearable-input");
  input.addEventListener("_trailingIconClick", function() {
    input.value = "";
  });
</script>`,
      },
    },
    {
      id: "known-widths",
      name: "Known widths",
      description: "Inputs sized for specific data types",
      code: {
        react: {
          ts: `const [postalCode, setPostalCode] = useState<string>("");
const [year, setYear] = useState<string>("");
const [sin, setSin] = useState<string>("");`,
          jsx: `<GoabFormItem label="Postal code" mb="l">
  <GoabInput
    name="postalCode"
    value={postalCode}
    width="7ch"
    onChange={(detail) => setPostalCode(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Year" mb="l">
  <GoabInput
    name="year"
    value={year}
    width="4ch"
    onChange={(detail) => setYear(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="SIN" mb="l">
  <GoabInput
    name="sin"
    value={sin}
    width="11ch"
    onChange={(detail) => setSin(detail.value)}
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
      postalCode: [""],
      year: [""],
      sin: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Postal code" mb="l">
    <goab-input
      name="postalCode"
      formControlName="postalCode"
      width="7ch"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Year" mb="l">
    <goab-input name="year" formControlName="year" width="4ch"></goab-input>
  </goab-form-item>
  <goab-form-item label="SIN" mb="l">
    <goab-input name="sin" formControlName="sin" width="11ch"></goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  postalCode = "";
  year = "";
  sin = "";
}`,
            template: `<form>
  <goab-form-item label="Postal code" mb="l">
    <goab-input
      name="postalCode"
      [(ngModel)]="postalCode"
      width="7ch"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Year" mb="l">
    <goab-input name="year" [(ngModel)]="year" width="4ch"></goab-input>
  </goab-form-item>
  <goab-form-item label="SIN" mb="l">
    <goab-input name="sin" [(ngModel)]="sin" width="11ch"></goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Postal code" mb="l">
  <goa-input version="2" name="postalCode" width="7ch"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Year" mb="l">
  <goa-input version="2" name="year" width="4ch"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="SIN" mb="l">
  <goa-input version="2" name="sin" width="11ch"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "leading-trailing-content",
      name: "With leading or trailing content",
      description: "Inputs with text content before or after the input field",
      code: {
        react: {
          ts: `const [price, setPrice] = useState<string>("");
const [weight, setWeight] = useState<string>("");`,
          jsx: `<GoabFormItem label="Price" mb="l">
  <GoabInput
    name="price"
    type="number"
    width="10ch"
    leadingContent="$"
    value={price}
    onChange={(detail) => setPrice(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Weight" mb="l">
  <GoabInput
    name="weight"
    type="number"
    width="10ch"
    trailingContent="kg"
    value={weight}
    onChange={(detail) => setWeight(detail.value)}
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
      price: [""],
      weight: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Price" mb="l">
    <goab-input
      name="price"
      type="number"
      width="10ch"
      leadingContent="$"
      formControlName="price"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Weight" mb="l">
    <goab-input
      name="weight"
      type="number"
      width="10ch"
      trailingContent="kg"
      formControlName="weight"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  price = "";
  weight = "";
}`,
            template: `<form>
  <goab-form-item label="Price" mb="l">
    <goab-input
      name="price"
      type="number"
      width="10ch"
      leadingContent="$"
      [(ngModel)]="price"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Weight" mb="l">
    <goab-input
      name="weight"
      type="number"
      width="10ch"
      trailingContent="kg"
      [(ngModel)]="weight"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Price" mb="l">
  <goa-input version="2" name="price" type="number" width="10ch">
    <div slot="leadingContent">$</div>
  </goa-input>
</goa-form-item>
<goa-form-item version="2" label="Weight" mb="l">
  <goa-input version="2" name="weight" type="number" width="10ch">
    <div slot="trailingContent">kg</div>
  </goa-input>
</goa-form-item>`,
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
  <GoabInput
    name="sizeDefault"
    value={sizeDefault}
    onChange={(detail) => setSizeDefault(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Compact size" labelSize="compact" mb="l">
  <GoabInput
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
    <goab-input name="sizeDefault" formControlName="sizeDefault"></goab-input>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-input
      name="sizeCompact"
      size="compact"
      formControlName="sizeCompact"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  sizeDefault = "";
  sizeCompact = "";
}`,
            template: `<form>
  <goab-form-item label="Default size" mb="l">
    <goab-input name="sizeDefault" [(ngModel)]="sizeDefault"></goab-input>
  </goab-form-item>
  <goab-form-item label="Compact size" labelSize="compact" mb="l">
    <goab-input
      name="sizeCompact"
      size="compact"
      [(ngModel)]="sizeCompact"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Default size" mb="l">
  <goa-input version="2" name="sizeDefault"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
  <goa-input version="2" name="sizeCompact" size="compact"></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "right-aligned",
      name: "Right-aligned text",
      description: "Text aligned to the right for numeric values",
      code: {
        react: {
          ts: `const [amount, setAmount] = useState<string>("");`,
          jsx: `<GoabFormItem label="Amount" mb="l">
  <GoabInput
    name="amount"
    type="number"
    textAlign="right"
    width="10ch"
    trailingContent="CAD"
    value={amount}
    onChange={(detail) => setAmount(detail.value)}
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
      amount: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Amount" mb="l">
    <goab-input
      name="amount"
      type="number"
      textAlign="right"
      width="10ch"
      trailingContent="CAD"
      formControlName="amount"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  amount = "";
}`,
            template: `<form>
  <goab-form-item label="Amount" mb="l">
    <goab-input
      name="amount"
      type="number"
      textAlign="right"
      width="10ch"
      trailingContent="CAD"
      [(ngModel)]="amount"
    >
    </goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Amount" mb="l">
  <goa-input version="2" name="amount" type="number" textalign="right" width="10ch">
    <div slot="trailingContent">CAD</div>
  </goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled, readonly, and error states",
      code: {
        react: {
          ts: `const [disabledValue] = useState<string>("Cannot edit");
const [readonlyValue] = useState<string>("View only");
const [errorValue, setErrorValue] = useState<string>("");`,
          jsx: `<GoabFormItem label="Disabled input" mb="l">
  <GoabInput name="disabled" disabled value={disabledValue} />
</GoabFormItem>
<GoabFormItem label="Read-only input" mb="l">
  <GoabInput name="readonly" readonly value={readonlyValue} />
</GoabFormItem>
<GoabFormItem label="Input with error" error="This field is required" mb="l">
  <GoabInput
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
      disabled: [{ value: "Cannot edit", disabled: true }],
      readonly: ["View only"],
      errorValue: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Disabled input" mb="l">
    <goab-input name="disabled" formControlName="disabled"></goab-input>
  </goab-form-item>
  <goab-form-item label="Read-only input" mb="l">
    <goab-input
      name="readonly"
      formControlName="readonly"
      [readonly]="true"
    ></goab-input>
  </goab-form-item>
  <goab-form-item
    label="Input with error"
    error="This field is required"
    mb="l"
  >
    <goab-input
      name="error"
      formControlName="errorValue"
      [error]="true"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  disabledValue = "Cannot edit";
  readonlyValue = "View only";
  errorValue = "";
}`,
            template: `<form>
  <goab-form-item label="Disabled input" mb="l">
    <goab-input
      name="disabled"
      [(ngModel)]="disabledValue"
      [disabled]="true"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Read-only input" mb="l">
    <goab-input
      name="readonly"
      [(ngModel)]="readonlyValue"
      [readonly]="true"
    ></goab-input>
  </goab-form-item>
  <goab-form-item
    label="Input with error"
    error="This field is required"
    mb="l"
  >
    <goab-input
      name="error"
      [(ngModel)]="errorValue"
      [error]="true"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Disabled input" mb="l">
  <goa-input version="2" name="disabled" disabled value="Cannot edit"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Read-only input" mb="l">
  <goa-input version="2" name="readonly" readonly value="View only"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Input with error" error="This field is required" mb="l">
  <goa-input version="2" name="error" error></goa-input>
</goa-form-item>`,
      },
    },
    {
      id: "types",
      name: "Input types",
      description: "Different input types for various data formats",
      code: {
        react: {
          ts: `const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [dob, setDob] = useState<string>("");
const [age, setAge] = useState<string>("");`,
          jsx: `<GoabFormItem label="Email address" mb="l">
  <GoabInput
    name="email"
    type="email"
    value={email}
    onChange={(detail) => setEmail(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Password" mb="l">
  <GoabInput
    name="password"
    type="password"
    value={password}
    onChange={(detail) => setPassword(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Date of birth" mb="l">
  <GoabInput
    name="dob"
    type="date"
    value={dob}
    onChange={(detail) => setDob(detail.value)}
  />
</GoabFormItem>
<GoabFormItem label="Age" mb="l">
  <GoabInput
    name="age"
    type="number"
    width="3ch"
    value={age}
    onChange={(detail) => setAge(detail.value)}
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
      email: [""],
      password: [""],
      dob: [""],
      age: [""],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Email address" mb="l">
    <goab-input name="email" type="email" formControlName="email"></goab-input>
  </goab-form-item>
  <goab-form-item label="Password" mb="l">
    <goab-input
      name="password"
      type="password"
      formControlName="password"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Date of birth" mb="l">
    <goab-input name="dob" type="date" formControlName="dob"></goab-input>
  </goab-form-item>
  <goab-form-item label="Age" mb="l">
    <goab-input
      name="age"
      type="number"
      width="3ch"
      formControlName="age"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  email = "";
  password = "";
  dob = "";
  age = "";
}`,
            template: `<form>
  <goab-form-item label="Email address" mb="l">
    <goab-input name="email" type="email" [(ngModel)]="email"></goab-input>
  </goab-form-item>
  <goab-form-item label="Password" mb="l">
    <goab-input
      name="password"
      type="password"
      [(ngModel)]="password"
    ></goab-input>
  </goab-form-item>
  <goab-form-item label="Date of birth" mb="l">
    <goab-input name="dob" type="date" [(ngModel)]="dob"></goab-input>
  </goab-form-item>
  <goab-form-item label="Age" mb="l">
    <goab-input
      name="age"
      type="number"
      width="3ch"
      [(ngModel)]="age"
    ></goab-input>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Email address" mb="l">
  <goa-input version="2" name="email" type="email"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Password" mb="l">
  <goa-input version="2" name="password" type="password"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Date of birth" mb="l">
  <goa-input version="2" name="dob" type="date"></goa-input>
</goa-form-item>
<goa-form-item version="2" label="Age" mb="l">
  <goa-input version="2" name="age" type="number" width="3ch"></goa-input>
</goa-form-item>`,
      },
    },
  ],
};
