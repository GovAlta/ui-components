import { GoabFormItem, GoabInput, GoabPublicForm, GoabPublicFormPage, GoabPublicFormSummary, GoabRadioGroup, GoabRadioItem } from "@abgov/react-components";
import { LengthValidator, NumericValidator, PFState, RequiredValidator, SINValidator } from "@abgov/ui-components-common";
import React, { useState } from "react";

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
      return role === "Payor" ? "salary" : "identification";
    },
    validators: {
      role: [RequiredValidator("Role is required")],
    },
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

export function PublicFormRoute() {
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
  )
}
