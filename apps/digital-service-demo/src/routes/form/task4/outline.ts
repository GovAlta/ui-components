import {
  PFOutline,
  RequiredValidator,
} from "@abgov/ui-components-common";

/**
 * Task 4: Important Documents
 *
 * Pages:
 * 1. upload-id - File upload: Upload your identification
 * 2. review - Summary page
 */
export const task4Outline: PFOutline = {
  "upload-id": {
    subform: false,
    props: {
      "section-title": "Important documents",
      heading: "Upload your identification",
    },
    fields: {
      idDocument: {
        label: "Personal identification",
        hideInSummary: "never",
        type: "file",
      },
    },
    validators: {
      idDocument: [RequiredValidator("Upload your identification")],
    },
    next: "review",
  },

  review: {
    subform: false,
    props: {
      heading: "Review your documents",
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
