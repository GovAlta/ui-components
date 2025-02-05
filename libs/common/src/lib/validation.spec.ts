import { describe, it, expect } from "vitest";

import {
  lengthValidator,
  SINValidator,
  emailValidator,
  postalCodeValidator,
  dateValidator,
  requiredValidator,
  numericValidator,
  phoneNumberValidator,
} from "./validators";

describe("Validation", () => {
  describe("Required", () => {
    const validator = requiredValidator();
    it("should pass", () => {
      const err = validator("some value");
      expect(err).toBeFalsy();
    });

    it("should fail", () => {
      const err = validator("");
      expect(err).toBeTruthy();
    });
  });

  describe("Numeric", () => {
    describe("Default props", () => {
      const validator = numericValidator();

      [1, 4, 10, "1", "4", "10"].forEach((val) => {
        it(`${val} is a valid numeric value`, () => {
          const err = validator(val);
          expect(err).toBeFalsy();
        });
      });
    });

    describe("Min / Max", () => {
      const validator = numericValidator({ min: 1, max: 10 });

      [1, 4, 10, "1", "4", "10"].forEach((val) => {
        it(`${val} is in the range of 1-10`, () => {
          const err = validator(val);
          expect(err).toBeFalsy();
        });
      });

      [0, 11, "0", "11"].forEach((val) => {
        it(`${val} is out of the range of 1-10`, () => {
          const err = validator(val);
          expect(err).toBeTruthy();
        });
      });
    });
  });

  describe("Date", () => {
    describe("Default props", () => {
      const validator = dateValidator();

      describe("valid dates", () => {
        ["", null, 42, new Date(2025, 3, 2)].forEach((val) => {
          it(`${val} is a valid date`, () => {
            const err = validator(val);
            expect(err).toBeFalsy();
          });
        });
      });
    });

    describe("Min / Max", () => {
      const validator = dateValidator({
        min: new Date(2025, 0, 1),
        max: new Date(2025, 2, 1),
      });

      [null, new Date(2025, 0, 1), new Date(2025, 2, 1), new Date(2025, 1, 1)].forEach(
        (val) => {
          it(`${val} is a valid date`, () => {
            const err = validator(val);
            expect(err).toBeFalsy();
          });
        },
      );

      [new Date(2024, 11, 31), new Date(2025, 3, 1)].forEach((val) => {
        it(`${val} is an invalid date`, () => {
          const err = validator(val);
          expect(err).toBeTruthy();
        });
      });
    });
  });

  describe("Phone", () => {
    const validator = phoneNumberValidator();
    const valid = [
      "5551234567",
      "(555) 1234567",
      "555-1234567",
      "555 123 4567",
      "555-123-4567",
      "(555)-123-4567",
      "(555) 123-4567",
      "(5) 123 4567",
      "1-555-123-4567",
      "(1) 555-123-4567",
      "+1 555-123-4567",
      "+1 555 123-4567",
      "+1 (555) 123-4567",
    ];

    valid.forEach((val) => {
      it(`${val} is valid`, () => {
        const err = validator(val);
        expect(err).toBeFalsy();
      });
    });

    it("should fail", () => {
      const err = validator("123");
      expect(err).toBeTruthy();
    });
  });

  describe("Email", () => {
    const validEmails = [
      "",
      "email@example.com",
      "email#foo@example.com",
      "firstname.lastname@example.com",
      "email@subdomain.example.com",
      "firstname+lastname@example.com",
      "email@[123.123.123.123]",
      "email@example.com",
      "1234567890@example.com",
      "email@example-one.com",
      "_______@example.com",
      "email@example.name",
      "email@example.museum",
      "email@example.co.jp",
      "firstname-lastname@example.com",
    ];
    const invalidEmails = [
      "plainaddress",
      '"#@%^%#$@#$@#.com',
      "@example.com",
      "Joe Smith <email@example.com>",
      "email.example.com",
      "email@example@example.com",
      ".email@example.com",
      "email.@example.com",
      "email..email@example.com",
      "email@example.com (Joe Smith)",
      "email@example",
      "email@111.222.333.44444",
      "email@example..com",
      "Abc..123@example.com",
    ];

    const validate = emailValidator();

    for (const email of validEmails) {
      it(`${email} should be valid`, () => {
        const msg = validate(email);
        expect(msg).toBe("");
      });
    }

    for (const email of invalidEmails) {
      it(`${email} should be invalid`, () => {
        const msg = validate(email);
        expect(msg).not.toBe("");
      });
    }
  });

  describe("SIN", () => {
    const validSINs = [
      "",
      "130692544",
      "130 692 544",
      "130-692-544",
      "1 3 0 6 9 2 5 4 4",
    ];
    const invalidSINs = ["130692543", "130 692 543", "130-692-543", "1 3 0 6 9 2 5 4 3"];

    const validate = SINValidator();

    for (const sin of validSINs) {
      it(`${sin} should be valid`, () => {
        const msg = validate(sin);
        expect(msg).toBe("");
      });
    }

    for (const sin of invalidSINs) {
      it(`${sin} should be invalid`, () => {
        const msg = validate(sin);
        expect(msg).not.toBe("");
      });
    }
  });

  describe("Postal code", () => {
    const validPostalCodes = ["", "M4B2J8", "M4B 2J8", "M4B-2J8"];
    const invalidPostalCodes = ["T7D2HG", "T7D299", "T7D2H"];

    const validate = postalCodeValidator();

    for (const postalCode of validPostalCodes) {
      it(`${postalCode} should be valid`, () => {
        const msg = validate(postalCode);
        expect(msg).toBe("");
      });
    }

    for (const postalCode of invalidPostalCodes) {
      it(`${postalCode} should be invalid`, () => {
        const msg = validate(postalCode);
        expect(msg).not.toBe("");
      });
    }
  });

  describe("Length", () => {
    describe("Optional", () => {
      const validValues = ["", "123456"];
      const invalidValues = ["12345"];

      const validate = lengthValidator({ min: 6 });

      for (const val of validValues) {
        it(`${val} should be valid`, () => {
          const msg = validate(val);
          expect(msg).toBe("");
        });
      }

      for (const val of invalidValues) {
        it(`${val} should be invalid`, () => {
          const msg = validate(val);
          expect(msg).not.toBe("");
        });
      }
    });

    describe("Length", () => {
      const validValues = ["", "123456"];
      const invalidValues = ["12345"];
      const validate = lengthValidator({ min: 6 });

      for (const val of validValues) {
        it(`${val} should be valid`, () => {
          const msg = validate(val);
          expect(msg).toBe("");
        });
      }

      for (const val of invalidValues) {
        it(`${val} should be invalid`, () => {
          const msg = validate(val);
          expect(msg).not.toBe("");
        });
      }
    });
  });

  describe("Date", () => {
    it("needs a test");
    // const validValues = ["", "123456"];
    // const invalidValues = ["12345"];
    //
    // const validate = lengthValidator({ min: 6, optional: true });
    //
    // for (const val of validValues) {
    //   it(`${val} should be valid`, () => {
    //     const msg = validate(val);
    //     expect(msg).toBe("");
    //   });
    // }
    //
    // for (const val of invalidValues) {
    //   it(`${val} should be invalid`, () => {
    //     const msg = validate(val);
    //     expect(msg).not.toBe("");
    //   });
    // }

    describe("Start date", () => {
      // const start = new Date(2025, 0, 1);
      // const validator = dateValidator({ min: start });
      // const validDate = new Date(2025, 2, 1);
      it("needs a test");
    });

    // describe("End date", () => {
    //
    // })
  });
});
