import {
  PFOutline,
  PFState,
  RequiredValidator,
  DateValidator,
} from "@abgov/ui-components-common";

/**
 * Task 3: Your Situation
 *
 * Pages:
 * 1. applying-for - Radio: "myself" or "someone else" (BRANCHING)
 * 2. relationship - CONDITIONAL: only shows if "someone else" selected
 * 3. employment - Dropdown: employment status
 * 4. when-needed - Date picker: future dates
 * 5. review - Summary page
 */
export const task3Outline: PFOutline = {
  "applying-for": {
    subform: false,
    props: {
      "section-title": "Your situation",
      heading: "Are you applying for yourself or someone else?",
    },
    fields: {
      applyingFor: { label: "Applying for", hideInSummary: "never" },
    },
    validators: {
      applyingFor: [RequiredValidator("Select who you are applying for")],
    },
    // BRANCHING LOGIC: Skip to employment if "myself", show relationship if "someone-else"
    // NOTE: Must read from dataBuffer, not data - the next function runs BEFORE data is saved
    next: (state: PFState) => {
      // dataBuffer contains the current page's form values (before save)
      const currentSelection = state.dataBuffer?.applyingFor;
      if (currentSelection === "someone-else") {
        return "relationship";
      }
      return "employment"; // Skip relationship page
    },
  },

  relationship: {
    subform: false,
    props: {
      "section-title": "Your situation",
      heading: "What is your relationship to the person you are applying for?",
    },
    fields: {
      relationship: { label: "Relationship", hideInSummary: "never" },
    },
    validators: {
      relationship: [RequiredValidator("Select your relationship")],
    },
    next: "employment",
  },

  employment: {
    subform: false,
    props: {
      "section-title": "Your situation",
      heading: "What is the current employment status?",
    },
    fields: {
      employmentStatus: { label: "Employment status", hideInSummary: "never" },
    },
    validators: {
      employmentStatus: [RequiredValidator("Select your employment status")],
    },
    next: "when-needed",
  },

  "when-needed": {
    subform: false,
    props: {
      "section-title": "Your situation",
      heading: "When is assistance needed to begin?",
    },
    fields: {
      assistanceDate: { label: "Assistance start date", hideInSummary: "never" },
    },
    validators: {
      assistanceDate: [
        RequiredValidator("Enter when you need assistance"),
        DateValidator({
          // Tomorrow or later
          min: new Date(new Date().setHours(24, 0, 0, 0)),
          minMsg: "Date must be in the future",
        }),
      ],
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
