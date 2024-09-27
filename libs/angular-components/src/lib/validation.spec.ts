import { describe, it, expect } from "vitest";

import { SINValidator } from "./validation";
import { emailValidator, postalCodeValidator } from "./validation.ts";

describe("Validation", () => {
  describe("Email", () => {
    const validEmails = [
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
    const validSINs = ["130692544", "130 692 544", "130-692-544", "1 3 0 6 9 2 5 4 4"];
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
    const validPostalCodes = ["M4B2J8", "M4B 2J8", "M4B-2J8"];
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
});
