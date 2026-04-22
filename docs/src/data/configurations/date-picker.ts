/**
 * DatePicker Component Configurations
 *
 * DatePicker allows users to select dates.
 */

import type { ComponentConfigurations } from "./types";

export const datePickerConfigurations: ComponentConfigurations = {
  componentSlug: "date-picker",
  componentName: "Date picker",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic date picker",
      description: "Simple date selection",
      code: {
        react: `const [date, setDate] = useState<Date | undefined>();

<GoabFormItem label="Date" mb="l">
  <GoabDatePicker
    name="date"
    value={date}
    onChange={(detail) => setDate(detail.valueStr ? new Date(detail.valueStr) : undefined)}
  />
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      date: [null],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Date" mb="l">
    <goab-date-picker name="date" formControlName="date"></goab-date-picker>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  date: Date | undefined;

  onDateChange(event: GoabDatePickerOnChangeDetail) {
    this.date = event.valueStr ? new Date(event.valueStr) : undefined;
  }
}`,
            template: `<form>
  <goab-form-item label="Date" mb="l">
    <goab-date-picker
      name="date"
      [(ngModel)]="date"
      (onChange)="onDateChange($event)"
    >
    </goab-date-picker>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Date" mb="l">
  <goa-date-picker version="2" name="date"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "with-value",
      name: "With initial value",
      description: "Date picker with preset date",
      code: {
        react: `const [startDate, setStartDate] = useState<Date | undefined>(new Date("2024-01-15"));

<GoabFormItem label="Start date" mb="l">
  <GoabDatePicker
    name="startDate"
    value={startDate}
    onChange={(detail) => setStartDate(detail.valueStr ? new Date(detail.valueStr) : undefined)}
  />
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: [new Date("2024-01-15")],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Start date" mb="l">
    <goab-date-picker
      name="startDate"
      formControlName="startDate"
    ></goab-date-picker>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  startDate: Date | undefined = new Date("2024-01-15");

  onDateChange(event: GoabDatePickerOnChangeDetail) {
    this.startDate = event.valueStr ? new Date(event.valueStr) : undefined;
  }
}`,
            template: `<form>
  <goab-form-item label="Start date" mb="l">
    <goab-date-picker
      name="startDate"
      [(ngModel)]="startDate"
      (onChange)="onDateChange($event)"
    >
    </goab-date-picker>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Start date" mb="l">
  <goa-date-picker version="2" name="startDate" value="2024-01-15"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "with-min-max",
      name: "With date range",
      description: "Restrict selectable dates",
      code: {
        react: `const [appointment, setAppointment] = useState<Date | undefined>();

<GoabFormItem label="Appointment date" helpText="Select a date within the next 7 days" mb="l">
  <GoabDatePicker
    name="appointment"
    min="2024-03-01"
    max="2024-03-07"
    value={appointment}
    onChange={(detail) => setAppointment(detail.valueStr ? new Date(detail.valueStr) : undefined)}
  />
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      appointment: [null],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item
    label="Appointment date"
    helpText="Select a date within the next 7 days"
    mb="l"
  >
    <goab-date-picker
      name="appointment"
      min="2024-03-01"
      max="2024-03-07"
      formControlName="appointment"
    >
    </goab-date-picker>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  appointment: Date | undefined;

  onDateChange(event: GoabDatePickerOnChangeDetail) {
    this.appointment = event.valueStr ? new Date(event.valueStr) : undefined;
  }
}`,
            template: `<form>
  <goab-form-item
    label="Appointment date"
    helpText="Select a date within the next 7 days"
    mb="l"
  >
    <goab-date-picker
      name="appointment"
      min="2024-03-01"
      max="2024-03-07"
      [(ngModel)]="appointment"
      (onChange)="onDateChange($event)"
    >
    </goab-date-picker>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Appointment date" helpText="Select a date within the next 7 days" mb="l">
  <goa-date-picker version="2"
    name="appointment"
    min="2024-03-01"
    max="2024-03-07">
  </goa-date-picker>
</goa-form-item>`,
      },
    },
    // TODO: Re-enable when GoabDatePicker exposes a `size` prop. The web
    // component (goa-date-picker) does not currently support sizes; the
    // snippet below is kept for reference only.
    // {
    //   id: "sizes",
    //   name: "Sizes",
    //   description: "Default and compact size variants",
    //   code: {
    //     react: `<GoabFormItem label="Default size" mb="l">
    //   <GoabDatePicker name="sizeDefault" onChange={handleDateChange} />
    // </GoabFormItem>
    // <GoabFormItem label="Compact size" labelSize="compact" mb="l">
    //   <GoabDatePicker name="sizeCompact" size="compact" onChange={handleDateChange} />
    // </GoabFormItem>`,
    //     angular: `<goab-form-item label="Default size" mb="l">
    //   <goab-date-picker name="sizeDefault" (onChange)="handleDateChange($event)"></goab-date-picker>
    // </goab-form-item>
    // <goab-form-item label="Compact size" labelSize="compact" mb="l">
    //   <goab-date-picker name="sizeCompact" size="compact" (onChange)="handleDateChange($event)"></goab-date-picker>
    // </goab-form-item>`,
    //     webComponents: `<goa-form-item version="2" label="Default size" mb="l">
    //   <goa-date-picker version="2" name="sizeDefault"></goa-date-picker>
    // </goa-form-item>
    // <goa-form-item version="2" label="Compact size" labelsize="compact" mb="l">
    //   <goa-date-picker version="2" name="sizeCompact" size="compact"></goa-date-picker>
    // </goa-form-item>`,
    //   },
    // },
    {
      id: "input-type",
      name: "Input type",
      description: "Date picker rendered as a simple date input without calendar popup",
      code: {
        react: `const [incident, setIncident] = useState<Date | undefined>();
const [birthday, setBirthday] = useState<Date | undefined>();

<GoabFormItem label="What day was the incident?" mb="l">
  <GoabDatePicker
    name="incident"
    type="calendar"
    value={incident}
    onChange={(detail) => setIncident(detail.valueStr ? new Date(detail.valueStr) : undefined)}
  />
</GoabFormItem>
<GoabFormItem label="What is your birthday?" mb="l">
  <GoabDatePicker
    name="birthday"
    type="input"
    value={birthday}
    onChange={(detail) => setBirthday(detail.valueStr ? new Date(detail.valueStr) : undefined)}
  />
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      incident: [null],
      birthday: [null],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="What day was the incident?" mb="l">
    <goab-date-picker
      name="incident"
      type="calendar"
      formControlName="incident"
    ></goab-date-picker>
  </goab-form-item>
  <goab-form-item label="What is your birthday?" mb="l">
    <goab-date-picker
      name="birthday"
      type="input"
      formControlName="birthday"
    ></goab-date-picker>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  incident: Date | undefined;
  birthday: Date | undefined;

  onDateChange(event: GoabDatePickerOnChangeDetail) {
    console.log(event);
  }
}`,
            template: `<form>
  <goab-form-item label="What day was the incident?" mb="l">
    <goab-date-picker
      name="incident"
      type="calendar"
      [(ngModel)]="incident"
      (onChange)="onDateChange($event)"
    >
    </goab-date-picker>
  </goab-form-item>
  <goab-form-item label="What is your birthday?" mb="l">
    <goab-date-picker
      name="birthday"
      type="input"
      [(ngModel)]="birthday"
      (onChange)="onDateChange($event)"
    >
    </goab-date-picker>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="What day was the incident?" mb="l">
  <goa-date-picker version="2" name="incident" type="calendar"></goa-date-picker>
</goa-form-item>
<goa-form-item version="2" label="What is your birthday?" mb="l">
  <goa-date-picker version="2" name="birthday" type="input"></goa-date-picker>
</goa-form-item>`,
      },
    },
    {
      id: "states",
      name: "States",
      description: "Disabled and error states",
      code: {
        react: `const [errorDate, setErrorDate] = useState<Date | undefined>();

<GoabFormItem label="Locked date" mb="l">
  <GoabDatePicker name="locked" value={new Date("2024-01-01")} disabled />
</GoabFormItem>
<GoabFormItem label="Date with error" error="Please select a valid date" mb="l">
  <GoabDatePicker
    name="error"
    error
    value={errorDate}
    onChange={(detail) => setErrorDate(detail.valueStr ? new Date(detail.valueStr) : undefined)}
  />
</GoabFormItem>`,
        angular: [
          {
            title: "Reactive forms (FormControl)",
            ts: `export class SomeOtherComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      locked: [{ value: new Date("2024-01-01"), disabled: true }],
      errorDate: [null],
    });
  }
}`,
            template: `<form [formGroup]="form">
  <goab-form-item label="Locked date" mb="l">
    <goab-date-picker name="locked" formControlName="locked"></goab-date-picker>
  </goab-form-item>
  <goab-form-item
    label="Date with error"
    error="Please select a valid date"
    mb="l"
  >
    <goab-date-picker
      name="error"
      [error]="true"
      formControlName="errorDate"
    ></goab-date-picker>
  </goab-form-item>
</form>`,
          },
          {
            title: "Template driven (ngModel)",
            ts: `export class SomeOtherComponent {
  locked: Date = new Date("2024-01-01");
  errorDate: Date | undefined;

  onDateChange(event: GoabDatePickerOnChangeDetail) {
    this.errorDate = event.valueStr ? new Date(event.valueStr) : undefined;
  }
}`,
            template: `<form>
  <goab-form-item label="Locked date" mb="l">
    <goab-date-picker
      name="locked"
      [(ngModel)]="locked"
      [disabled]="true"
    ></goab-date-picker>
  </goab-form-item>
  <goab-form-item
    label="Date with error"
    error="Please select a valid date"
    mb="l"
  >
    <goab-date-picker
      name="error"
      [error]="true"
      [(ngModel)]="errorDate"
      (onChange)="onDateChange($event)"
    >
    </goab-date-picker>
  </goab-form-item>
</form>`,
          },
        ],
        webComponents: `<goa-form-item version="2" label="Locked date" mb="l">
  <goa-date-picker version="2" name="locked" value="2024-01-01" disabled></goa-date-picker>
</goa-form-item>
<goa-form-item version="2" label="Date with error" error="Please select a valid date" mb="l">
  <goa-date-picker version="2" name="error" error></goa-date-picker>
</goa-form-item>`,
      },
    },
  ],
};
