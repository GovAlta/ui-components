import {
  PFOutline,
  PFState,
  RequiredValidator,
  DateValidator,
} from "@abgov/ui-components-common";

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * Task 2: Verify Your Age
 *
 * Pages:
 * 1. id-info - Info-only page explaining what's needed
 * 2. date-of-birth - Date picker for birthdate (branches based on age)
 * 3. review - Summary page with GoabPublicFormSummary (if 18+)
 * 4. ineligible - Exit page if under 18
 */
export const task2Outline: PFOutline = {
  "id-info": {
    subform: false,
    props: {
      "section-title": "Verify your age",
      heading: "What you'll need to verify your identity",
    },
    fields: {},
    validators: {},
    next: "date-of-birth",
  },

  "date-of-birth": {
    subform: false,
    props: {
      "section-title": "Verify your age",
      heading: "What is your date of birth?",
    },
    fields: {
      dateOfBirth: { label: "Date of birth", hideInSummary: "never" },
    },
    validators: {
      dateOfBirth: [
        RequiredValidator("Enter your date of birth"),
        DateValidator({
          min: new Date(1900, 0, 1),
          max: new Date(),
          minMsg: "Enter a valid date of birth",
          maxMsg: "Date of birth must be in the past",
        }),
      ],
    },
    next: (state: PFState) => {
      const dob = state.dataBuffer?.dateOfBirth as string;
      if (dob && calculateAge(dob) < 18) {
        return ""; // Exit immediately - ineligible
      }
      return "review";
    },
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
