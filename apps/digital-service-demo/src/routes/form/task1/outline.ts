import {
  PFOutline,
  PFPage,
  RequiredValidator,
  ConditionalRequiredValidator,
  PostalCodeValidator,
  PhoneNumberValidator,
  EmailValidator,
} from "@abgov/ui-components-common";

/**
 * Task 1: Personal Information
 *
 * Pages:
 * 1. urgent-need - Radio: Do you have an urgent financial need?
 * 2. marital-status - Dropdown: What is your marital status?
 * 3. address - Multi-field: Current address (street, city, province, postal)
 * 4. contact-preference - Checkbox + conditional: How should we contact you?
 * 5. consent - Checkboxes + textarea: Consent and additional info
 * 6. upload-id - File upload: Supporting documents
 * 7. dependants - Repeater/subform: Add dependants
 * 8. review - Summary page with GoabPublicFormSummary
 */
export const task1Outline: PFOutline = {
  "urgent-need": {
    subform: false,
    props: {
      "section-title": "Personal information",
      heading: "Do you have an urgent financial need?",
    },
    fields: {
      urgentNeed: { label: "Urgent financial need", hideInSummary: "never" },
    },
    validators: {
      urgentNeed: [RequiredValidator("Select yes or no")],
    },
    next: "marital-status",
  },

  "marital-status": {
    subform: false,
    props: {
      "section-title": "Personal information",
      heading: "What is your marital status?",
    },
    fields: {
      maritalStatus: { label: "Marital status", hideInSummary: "never" },
    },
    validators: {
      maritalStatus: [RequiredValidator("Select your marital status")],
    },
    next: "address",
  },

  address: {
    subform: false,
    props: {
      "section-title": "Personal information",
      heading: "What is your current address?",
    },
    fields: {
      streetAddress: { label: "Street address", hideInSummary: "never" },
      city: { label: "City or town", hideInSummary: "never" },
      province: { label: "Province or territory", hideInSummary: "never" },
      postalCode: { label: "Postal code", hideInSummary: "never" },
    },
    validators: {
      streetAddress: [RequiredValidator("Enter your street address")],
      city: [RequiredValidator("Enter your city or town")],
      province: [RequiredValidator("Select your province or territory")],
      postalCode: [RequiredValidator("Enter your postal code"), PostalCodeValidator()],
    },
    next: "contact-preference",
  },

  "contact-preference": {
    subform: false,
    props: {
      "section-title": "Personal information",
      heading: "How would you like to be contacted?",
    },
    fields: {
      contactByPhone: { label: "Phone", hideInSummary: "ifBlank" },
      phoneNumber: { label: "Phone number", hideInSummary: "ifBlank" },
      contactByEmail: { label: "Email", hideInSummary: "ifBlank" },
      emailAddress: { label: "Email address", hideInSummary: "ifBlank" },
      contactByMail: { label: "Mail (postal address)", hideInSummary: "ifBlank" },
    },
    validators: {
      // At least one contact method required - validate on first checkbox
      contactByPhone: [
        ConditionalRequiredValidator(
          (pageData) => !pageData?.contactByPhone && !pageData?.contactByEmail && !pageData?.contactByMail,
          "Select at least one contact method"
        ),
      ],
      phoneNumber: [
        ConditionalRequiredValidator(
          (pageData) => !!pageData?.contactByPhone,
          "Enter your phone number"
        ),
        PhoneNumberValidator("Enter a valid phone number"),
      ],
      emailAddress: [
        ConditionalRequiredValidator(
          (pageData) => !!pageData?.contactByEmail,
          "Enter your email address"
        ),
        EmailValidator("Enter a valid email address"),
      ],
    },
    next: "consent",
  },

  consent: {
    subform: false,
    props: {
      "section-title": "Personal information",
      heading: "Consent to use your personal information",
    },
    fields: {
      consentCheck: {
        label: "I consent to having a check completed",
        hideInSummary: "never",
      },
      consentTruth: {
        label: "Information provided is true",
        hideInSummary: "never",
      },
      fullName: { label: "Full name", hideInSummary: "never" },
      signature: { label: "Signature", hideInSummary: "never" },
    },
    validators: {
      consentCheck: [RequiredValidator("You must consent to continue")],
      consentTruth: [RequiredValidator("You must confirm information is true")],
      fullName: [RequiredValidator("Enter your full name")],
      signature: [RequiredValidator("Enter your signature")],
    },
    summarize: (page: PFPage) => ({
      "Full name": (page["fullName"] as string) || "",
      Signature: page["signature"] ? "Complete" : "Incomplete",
    }),
    next: "upload-id",
  },

  "upload-id": {
    subform: false,
    props: {
      "section-title": "Personal information",
      heading: "Upload your personal identification card",
    },
    fields: {
      idDocument: {
        label: "Personal identification card",
        hideInSummary: "never",
        type: "file",
      },
    },
    validators: {
      idDocument: [RequiredValidator("Upload your identification")],
    },
    next: "dependants",
  },

  dependants: {
    subform: true, // Repeater pattern
    props: {
      "section-title": "Personal information",
      heading: "Add dependants under the age of 18",
    },
    fields: {
      dependantName: { label: "Full name", hideInSummary: "never" },
    },
    validators: {
      dependantName: [RequiredValidator("Enter the dependant's full name")],
    },
    next: "review",
  },

  review: {
    subform: false,
    props: {
      heading: "Review your answers",
    },
    fields: {
      confirmCorrect: { label: "Confirmation", hideInSummary: "always" },
    },
    validators: {
      confirmCorrect: [RequiredValidator("You must confirm the information is correct")],
    },
    next: "", // Empty string signals form completion
  },
};
