import { FieldsetItemState } from "./public-form-utils";

export type FieldValidator = (value: unknown) => string;
export type FieldsetState = Record<string, FieldsetItemState>;

// TODO: move this into the form-utils file, since it is specific to the public form component
export function validate(
  field: string,
  fieldsetEl: HTMLElement,
  fieldsetState: FieldsetState,
  validators: FieldValidator[],
): [boolean, string] {
  const value = fieldsetState?.[field]?.value;

  for (const validator of validators) {
    const msg = validator(value);
    if (msg) {
      dispatchError(fieldsetEl, field, msg);
      return [false, ""];
    }
  }
  return [true, value];
}

// TODO: move this into the form-utils file, since it is specific to the public form component
function dispatchError(el: HTMLElement, name: string, msg: string) {
  el.dispatchEvent(
    new CustomEvent("msg", {
      composed: true,
      detail: {
        action: "external::set:error",
        data: {
          name,
          msg,
        },
      },
    }),
  );
}

export class FormValidator {
  private validators: Record<string, FieldValidator[]>;
  constructor(validators?: Record<string, FieldValidator[]>) {
    this.validators = validators || {};
  }

  add(fieldName: string, ...validators: FieldValidator[]) {
    this.validators[fieldName] = validators;
  }

  validate(data: Record<string, string>): Record<string, string> {
    const errors: Record<string, string> = {};

    Object.entries(this.validators).forEach(([name, validators]) => {
      const err = validators
        .map((validatorFn) => {
          const errMsg = validatorFn(data[name]);
          return errMsg;
        })
        .find((msg) => !!msg);
      if (err) {
        errors[name] = err;
      }
    });

    return errors;
  }
}

// **********
// Validators
// **********

export function birthDayValidator(): FieldValidator[] {
  return [
    requiredValidator("Day is required"),
    numericValidator({
      min: 1,
      max: 31,
      minMsg: "Day must be between 1 and 31",
      maxMsg: "Day must be between 1 and 31",
    }),
  ];
}

export function birthMonthValidator(): FieldValidator[] {
  return [
    requiredValidator("Month is required"),
    numericValidator({
      min: 0,
      max: 11,
      minMsg: "Month must be between Jan and Dec",
      maxMsg: "Month must be between Jan and Dec",
    }),
  ];
}

export function birthYearValidator(): FieldValidator[] {
  const maxYear = new Date().getFullYear();
  return [
    requiredValidator("Year is required"),
    numericValidator({
      min: 1900,
      max: maxYear,
      minMsg: "Year must be greater than 1900",
      maxMsg: `Year must be less than ${maxYear}`,
    }),
  ];
}

export function requiredValidator(msg?: string): FieldValidator {
  return (value: unknown) => {
    msg = msg || "Required";

    if (typeof value === "number" && !isNaN(value)) {
      return "";
    }
    if (value) {
      return "";
    }
    return msg;
  };
}

export function phoneNumberValidator(msg?: string): FieldValidator {
  const regex = new RegExp(/^\+?[\d-() ]{10,18}$/);
  return regexValidator(regex, msg || "Invalid phone number");
}

export function emailValidator(msg?: string): FieldValidator {
  const regex = new RegExp(/^[\w+-.]+@([\w-]+.)+[\w-]{2,4}$/);
  return regexValidator(regex, msg || "Invalid email address");
}

export function regexValidator(regex: RegExp, msg: string): FieldValidator {
  return (value: unknown) => {
    if (!value) {
      return "";
    }
    if ((value as string).match(regex)) {
      return "";
    }

    return msg;
  };
}

interface DateValidatorOptions {
  invalidMsg?: string;
  startMsg?: string;
  endMsg?: string;
  start?: Date;
  end?: Date;
}
export function dateValidator({
  invalidMsg,
  startMsg,
  endMsg,
  start,
  end,
}: DateValidatorOptions): FieldValidator {
  return (date: unknown) => {
    let _date: Date = new Date(0);

    if (typeof date === "string") {
      _date = new Date(date);
    }
    if ((date as Date).toDateString) {
      _date = date as Date;
    }

    if (_date.toString() === "Invalid Date" || _date.getTime() === 0) {
      return invalidMsg || "Invalid date";
    }

    if (_date && start && _date < start) {
      return startMsg || `Must be after ${start}`;
    }
    if (_date && end && _date > end) {
      return endMsg || `Must be before ${end}`;
    }

    return "";
  };
}

interface NumericValidatorOptions {
  invalidTypeMsg?: string;
  minMsg?: string;
  maxMsg?: string;
  min?: number;
  max?: number;
}
export function numericValidator({
  invalidTypeMsg,
  minMsg,
  maxMsg,
  min = -Number.MAX_VALUE,
  max = Number.MAX_VALUE,
}: NumericValidatorOptions): FieldValidator {
  return (value: unknown) => {
    let _value: number = Number.MAX_VALUE;

    if (typeof value === "string") {
      _value = parseFloat(value);
    }
    if (typeof value === "number") {
      _value = value;
    }

    if (isNaN(_value)) {
      return invalidTypeMsg || "Must be a numeric value";
    }

    if (_value > max) {
      return maxMsg || `Must be less than or equal to ${max}`;
    }
    if (_value < min) {
      return minMsg || `Must be greater than or equal to ${min}`;
    }

    return "";
  };
}

interface LengthValidatorOptions {
  invalidTypeMsg?: string;
  minMsg?: string;
  maxMsg?: string;
  max?: number;
  min?: number;
}
export function lengthValidator({
  invalidTypeMsg,
  minMsg,
  maxMsg,
  min = -Number.MAX_VALUE,
  max = Number.MAX_VALUE,
}: LengthValidatorOptions): FieldValidator {
  return (value: unknown) => {
    if (typeof value !== "string") {
      return invalidTypeMsg || "Invalid type";
    }

    if (value.length > max) {
      return maxMsg || `Must be less than ${max} characters`;
    }

    if (value.length < min) {
      return minMsg || `Must be greater than ${min} characters`;
    }

    return "";
  };
}
