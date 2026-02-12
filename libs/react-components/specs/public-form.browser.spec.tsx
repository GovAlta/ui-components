import { render } from "vitest-browser-react";
import {
  GoabPublicForm,
  GoabPublicFormPage,
  GoabPublicFormSummary,
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabInput,
} from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { useState } from "react";
import {
  RequiredValidator,
  LengthValidator,
  SINValidator,
  NumericValidator,
} from "@abgov/ui-components-common";

import type {
  PFState,
  PFOutline,
  PFPage,
} from "@abgov/ui-components-common";

const outline: PFOutline = {
  role: {
    subform: false,
    props: {
      heading: "What is your role in the court order?",
      "section-title": "Support order details",
    },
    fields: {
      role: {
        label: "What is your role?",
        formatter: (val: string) => val.toUpperCase(),
        hideInSummary: "never",
      },
    },
    next: (state: PFState) => {
      const role = state.dataBuffer["role"];
      return role === "Payor" ? "salary" : "children";
    },
    validators: {
      role: [RequiredValidator("Role is required")],
    },
  },

  children: {
    subform: true,
    props: {
      heading: "Do you have children",
    },
    fields: {
      "first-name": {
        label: "First name",
        formatter: (val: string) => val[0]?.toUpperCase() + val.substring(1),
        hideInSummary: "never",
      },
      "last-name": {
        label: "Last name",
        formatter: (val: string) => val[0]?.toUpperCase() + val.substring(1),
        hideInSummary: "never",
      },
      birthdate: { label: "Birthdate", hideInSummary: "never" },
    },
    next: "identification",
    validators: {},
  },

  salary: {
    subform: false,
    props: {
      heading: "Payor salary",
    },
    fields: {
      salary: { label: "Yearly income", hideInSummary: "never" },
    },
    next: "summary",
    validators: {
      salary: [NumericValidator({ min: 0 })],
    },
  },

  identification: {
    subform: false,
    props: {
      "section-title": "Support order details",
      heading: "Do you know any of the identifiers about the other party?",
    },
    fields: {
      sin: {
        label: "Social Insurance #",
        formatter: (val: string) => val.match(/(.{3})/g)?.join(" ") || val,
        hideInSummary: "never",
      },
      ahcn: {
        label: "Alberta Health Care #",
        formatter: (val: string) => val.match(/(.{4})/g)?.join("-") || val,
        hideInSummary: "never",
      },
      info: { label: "Additional information", hideInSummary: "never" },
    },
    next: (state: PFState): string => {
      const sin = state.dataBuffer["sin"];
      const ahcn = state.dataBuffer["ahcn"];

      if (!sin && !ahcn) {
        throw "Either sin or ahcn is required";
      }

      return "address";
    },
    validators: {
      sin: [SINValidator()],
      ahcn: [LengthValidator({ min: 8 })],
    },
  },

  payor: {
    subform: false,
    props: {
      heading: "Payor Name",
    },
    fields: {
      firstName: { label: "First name", hideInSummary: "never" },
      lastName: { label: "Last name", hideInSummary: "never" },
    },
    summarize: (page: PFPage) => ({
      "Full name": `${page["firstName"]} ${page["lastName"]}`.trim(),
    }),
    next: "address",
    validators: {},
  },

  address: {
    subform: false,
    props: {
      "section-title": "Support order details",
      heading: "Your current address",
    },
    fields: {
      city: { label: "City/Town", hideInSummary: "never" },
      street: { label: "Street #", hideInSummary: "never" },
      "postal-code": { label: "Postal code", hideInSummary: "never" },
    },
    next: "summary",
    validators: {},
  },

  summary: {
    subform: false,
    props: {
      "section-title": "Support order details",
      heading: "Summary",
    },
    fields: {},
    next: (state: PFState): string => {
      console.log("submit to backend here", state);
      return "";
    },
    validators: {},
  },
};

function PublicFormTestComponent() {
  const [state, setState] = useState<PFState | undefined>(undefined);

  const handleInit = (initFn: any) => {
    // Initialize with restored state
    const initialState = initFn(null, { outline });
    setState(initialState);
  };

  const handleChange = (detail: any) => {
    console.log("onChange", detail);
  };

  const handleNext = (newState: PFState) => {
    setState(newState);
    console.log("onNext", newState);
  };

  const handleSubformChange = (newState: PFState) => {
    setState({ ...newState });
    console.log("onSubformChange", newState);
  };

  const getPage = (pageId: string, defaultValue: unknown) => {
    return state?.data?.[pageId] || defaultValue;
  };

  return (
    <div style={{ margin: "5rem auto", width: "90ch" }}>
      <GoabPublicForm
        onInit={handleInit}
        onChange={handleChange}
        onSubformChange={handleSubformChange}
        onNext={handleNext}
      >
        <GoabPublicFormPage id="role">
          <GoabFormItem helpText="some help text">
            <GoabRadioGroup name="role" data-pf-item="">
              <GoabRadioItem value="Recipient" label="Recipient" />
              <GoabRadioItem value="Payor" label="Payor" />
            </GoabRadioGroup>
          </GoabFormItem>
        </GoabPublicFormPage>

        <GoabPublicFormPage id="identification">
          <GoabFormItem
            label="What is the Social Insurance Number?"
            requirement="optional"
            helpText="9-digit number, such as 123 456 789."
          >
            <GoabInput data-pf-item="" name="sin" />
          </GoabFormItem>

          <GoabFormItem label="What is the AHCN">
            <GoabInput data-pf-item="" name="ahcn" />
          </GoabFormItem>
        </GoabPublicFormPage>

        <GoabPublicFormPage id="payor">
          <GoabFormItem label="First name">
            <GoabInput data-pf-item="" name="firstName" />
          </GoabFormItem>
          <GoabFormItem label="Last name">
            <GoabInput data-pf-item="" name="lastName" />
          </GoabFormItem>
        </GoabPublicFormPage>

        <GoabPublicFormPage id="salary">
          <GoabFormItem label="Salary">
            <GoabInput data-pf-item="" name="salary" type="number" />
          </GoabFormItem>
        </GoabPublicFormPage>

        <GoabPublicFormPage id="address">
          <GoabFormItem label="City" helpText="Where you live">
            <GoabInput data-pf-item="" name="city" />
          </GoabFormItem>
          <GoabFormItem label="Address">
            <GoabInput data-pf-item="" name="street" />
          </GoabFormItem>
          <GoabFormItem label="Postal Code">
            <GoabInput data-pf-item="" name="postal-code" />
          </GoabFormItem>
        </GoabPublicFormPage>

        <GoabPublicFormPage
          id="summary"
          buttonText="Submit"
          backVisibility="hidden"
        >
          <GoabPublicFormSummary />
        </GoabPublicFormPage>
      </GoabPublicForm>
    </div>
  );
}

describe("PublicForm Browser Tests", () => {

  it.only("should pass", async () => {
    const { getByLabelText } = render(<>
      <goa-input arialabel="Full name" />
    </>);

    const name = getByLabelText("Full name");
    await vi.waitFor(() => {
      expect(name.length).toBe(1);
      // console.log(name.element());
    })
  })

  it.only("initializes the form", async () => {
    const { getByRole, getByLabelText } = render(<PublicFormTestComponent />);

    const roles = getByRole("radiogroup");
    const sin = getByLabelText("sin");

    // Wait for form to initialize
    await vi.waitFor(() => {
      // on first page, so it should be visible
      expect(roles.length).toBe(1);
      // sin should not be visible yet
      expect(sin.length).toBe(0);
    });
  });

  it.only("can select a radio button and continue to next page", async () => {
    const { getByLabelText, getByRole } = render(<PublicFormTestComponent />);

    const radios = getByRole("radio");
    const receiverOption = getByLabelText("Recipient");

    // Wait for radio items to be present
    await vi.waitFor( () => {
      expect(radios.length).toBe(2);
    });


    // Select the Recipient radio button
    // await userEvent.click(radios.elements()[0]);
    await receiverOption.click();

    // Click continue button
    const continueButton = getByRole("button").getByText("Continue");
    await continueButton.click();

    // Should navigate to children page (for Recipient role)
    const nextHeader = getByText("Support order details");
    await vi.waitFor(() => {
      expect(nextHeader).toBeTruthy();
    });
  });

  it("validates required fields and shows errors", async () => {
    const result = render(<PublicFormTestComponent />);

    await vi.waitFor(() => {
      const form = result.container.querySelector("goa-public-form");
      expect(form).toBeTruthy();
    });

    // Wait for form to initialize
    await vi.waitFor(
      () => {
        const continueButton = result.container.querySelector(
          'goa-button[type="primary"]'
        );
        expect(continueButton).toBeTruthy();
      },
      { timeout: 3000 }
    );

    // Try to click continue without selecting a role
    const continueButton = result.container.querySelector(
      'goa-button[type="primary"]'
    ) as HTMLElement;
    await userEvent.click(continueButton);

    // Should show validation error
    await vi.waitFor(
      () => {
        const formItem = result.container.querySelector("goa-form-item[error]");
        expect(formItem).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });

  it("supports conditional navigation based on form data", async () => {
    const result = render(<PublicFormTestComponent />);

    await vi.waitFor(() => {
      const form = result.container.querySelector("goa-public-form");
      expect(form).toBeTruthy();
    });

    // Wait for radio items
    await vi.waitFor(
      () => {
        const payorRadio = result.container.querySelector(
          'goa-radio-item[value="Payor"]'
        );
        expect(payorRadio).toBeTruthy();
      },
      { timeout: 3000 }
    );

    // Select Payor (should go to salary page instead of children)
    const payorRadio = result.container.querySelector(
      'goa-radio-item[value="Payor"]'
    ) as HTMLElement;
    await userEvent.click(payorRadio);

    // Click continue
    const continueButton = result.container.querySelector(
      'goa-button[type="primary"]'
    ) as HTMLElement;
    await userEvent.click(continueButton);

    // Should navigate to salary page (not children)
    await vi.waitFor(
      () => {
        const salaryPage = result.container.querySelector(
          'goa-public-form-page[id="salary"]'
        );
        expect(salaryPage).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });

  it("renders the summary page with form data", async () => {
    const result = render(<PublicFormTestComponent />);

    await vi.waitFor(() => {
      const summary = result.container.querySelector("goa-public-form-summary");
      expect(summary).toBeTruthy();
    });
  });
});
