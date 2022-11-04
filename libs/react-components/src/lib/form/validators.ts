const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/i;

export type FormValidatorFn = (val: string) => [boolean, string];

export class FormValidator {
  private items: Record<string, FormValidatorFn[]>;
  constructor() {
    this.items = {};
  }

  add(fieldName: string, validators: FormValidatorFn[]) {
    this.items[fieldName] = validators;
  }

  validate(data: Record<string, string>): Record<string, string> {
    const errors: Record<string, string> = {};

    Object.entries(this.items).forEach(([name, validators]) => {
      const err = validators
        .map((validatorFn) => {
          const [valid, errMsg] = validatorFn(data[name]);
          return !valid && errMsg;
        })
        .find((msg) => !!msg);
      errors[name] = err;
    });

    return errors;
  }
}

export const requiredFieldValidator: FormValidatorFn = (
  value: string | string[]
): [boolean, string] => [!!value?.length ?? false, "Required"];

export const emailFormatValidator: FormValidatorFn = (
  val: string
): [boolean, string] => {
  if (!val?.match(emailRegex)) {
    return [false, "Invalid email address"];
  }
  return [true, ""];
};

export const phoneNumberFormatValidator: FormValidatorFn = (
  val: string
): [boolean, string] => {
  if (!val.match(phoneRegex)) {
    return [false, "Invalid phone number"];
  }
  return [true, ""];
};
