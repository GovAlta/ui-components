export type FieldsetItemState = {
  name: string;
  label: string;
  value: string;
};

export type FieldValidator = (value: unknown) => string;
export type FieldsetState = Record<string, FieldsetItemState>;

export class FormValidator {
  private readonly validators: Record<string, FieldValidator[]>;

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
  // emailregex.com
  const regex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  return regexValidator(regex, msg || "Invalid email address");
}

// SIN# Generator: https://singen.ca
export function SINValidator(): FieldValidator {
  return (value: unknown) => {
    if (!value) return "";

    const checkValue = "121212121".split("").map((c) => parseInt(c));
    const valueStr = (value as string).replace(/\D/g, "");

    if (valueStr.length !== 9) return "SIN must contain 9 numbers";

    const checkSum = valueStr
      .split("")
      .map((c) => parseInt(c))
      .map((num, index) => {
        const val = num * checkValue[index];
        if (val < 10) {
          return val;
        }
        return `${val}`
          .split("")
          .map((c) => parseInt(c))
          .reduce((acc, val) => acc + val, 0);
      })
      .reduce((acc, val) => acc + val, 0);

    if (checkSum % 10 === 0) {
      return "";
    }

    return "Invalid SIN";
  };
}

export function postalCodeValidator(): FieldValidator {
  return regexValidator(
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    "Invalid postal code",
  );
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
  minMsg?: string;
  maxMsg?: string;
  min?: Date;
  max?: Date;
}

export function dateValidator({
  invalidMsg,
  minMsg,
  maxMsg,
  min,
  max,
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

    if (_date && min && _date < min) {
      return minMsg || `Must be after ${min}`;
    }
    if (_date && max && _date > max) {
      return maxMsg || `Must be before ${max}`;
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
  optional?: boolean;
}

export function lengthValidator({
  invalidTypeMsg,
  minMsg,
  maxMsg,
  min = -Number.MAX_VALUE,
  max = Number.MAX_VALUE,
  optional,
}: LengthValidatorOptions): FieldValidator {
  return (value: unknown) => {
    // valid if optional and blank
    if (optional && `${value}`.length === 0) {
      return "";
    }

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
