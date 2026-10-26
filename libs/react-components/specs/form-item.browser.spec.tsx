import { useState } from "react";
import { render } from "vitest-browser-react";
import { describe, expect, it } from "vitest";
import type { GoabFormItemRequirement } from "@abgov/ui-components-common";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTextArea,
} from "../src";

const controls = [
  {
    name: "Input",
    role: "textbox",
    render: () => <GoabInput name="name" />,
  },
  {
    name: "Text Area",
    role: "textbox",
    render: () => <GoabTextArea name="name" />,
  },
  {
    name: "Dropdown",
    role: "combobox",
    render: () => (
      <GoabDropdown name="name">
        <GoabDropdownItem value="one" label="One" />
        <GoabDropdownItem value="two" label="Two" />
      </GoabDropdown>
    ),
  },
  {
    name: "Native Dropdown",
    role: "combobox",
    render: () => (
      <GoabDropdown name="name" native>
        <GoabDropdownItem value="one" label="One" />
        <GoabDropdownItem value="two" label="Two" />
      </GoabDropdown>
    ),
  },
  {
    name: "Radio Group",
    role: "radiogroup",
    render: () => (
      <GoabRadioGroup name="contact">
        <GoabRadioItem value="email" label="Email" />
        <GoabRadioItem value="phone" label="Phone" />
      </GoabRadioGroup>
    ),
  },
  {
    name: "Checkbox List",
    role: "group",
    render: () => (
      <GoabCheckboxList name="contact">
        <GoabCheckbox name="email" value="email" text="Email" />
        <GoabCheckbox name="phone" value="phone" text="Phone" />
      </GoabCheckboxList>
    ),
  },
] as const;

describe("Form Item field requirements", () => {
  describe.each(controls)("$name", (control) => {
    it.each(["required", "optional", undefined] as const)(
      "exposes the accessible name and required state for requirement '%s'",
      async (requirement) => {
        const result = render(
          <GoabFormItem label="Middle name" requirement={requirement}>
            {control.render()}
          </GoabFormItem>,
        );
        const field = result.getByRole(control.role);
        const hasRequiredState = requirement === "required" && control.role !== "group";
        const hasNamedRequirement =
          requirement === "optional" ||
          (requirement === "required" && control.role === "group");
        const expectedName = hasNamedRequirement
          ? `Middle name (${requirement})`
          : "Middle name";

        await expect.element(field).toHaveAccessibleName(expectedName);
        if (hasRequiredState) {
          await expect.element(field).toHaveAttribute("aria-required", "true");
          await expect.element(field).toBeRequired();
        } else {
          await expect.element(field).not.toHaveAttribute("aria-required");
          await expect.element(field).not.toBeRequired();
        }

        if (control.role === "group" || control.role === "radiogroup") {
          const optionRole = control.role === "group" ? "checkbox" : "radio";
          const email = result.getByRole(optionRole, { name: "Email", exact: true });
          const phone = result.getByRole(optionRole, { name: "Phone", exact: true });
          await expect.element(email).toHaveAccessibleName("Email");
          await expect.element(phone).toHaveAccessibleName("Phone");
          await expect.element(email).not.toBeRequired();
          await expect.element(phone).not.toBeRequired();
        }
      },
    );

    it("uses the text of a slotted label with the visible optional indicator", async () => {
      const result = render(
        <GoabFormItem label={<strong>Middle name</strong>} requirement="optional">
          {control.render()}
        </GoabFormItem>,
      );
      const field = result.getByRole(control.role);

      await expect.element(field).toHaveAccessibleName("Middle name (optional)");
      await expect.element(field).not.toBeRequired();
    });

    it("keeps a nested field's optional requirement separate from its required parent", async () => {
      const result = render(
        <GoabFormItem label="Outer label" requirement="required">
          <GoabFormItem label="Inner label" requirement="optional">
            {control.render()}
          </GoabFormItem>
        </GoabFormItem>,
      );
      const field = result.getByRole(control.role);

      await expect.element(field).toHaveAccessibleName("Inner label (optional)");
      await expect.element(field).not.toHaveAttribute("aria-required");
      await expect.element(field).not.toBeRequired();
    });

    it("updates the accessible name and required state without remounting the field", async () => {
      function Example() {
        const [requirement, setRequirement] = useState<
          GoabFormItemRequirement | undefined
        >("optional");
        return (
          <>
            <button onClick={() => setRequirement("required")}>Mark required</button>
            <button onClick={() => setRequirement(undefined)}>Remove requirement</button>
            <GoabFormItem label="Middle name" requirement={requirement}>
              {control.render()}
            </GoabFormItem>
          </>
        );
      }

      const result = render(<Example />);
      const field = result.getByRole(control.role);
      const markRequired = result.getByRole("button", { name: "Mark required" });
      const removeRequirement = result.getByRole("button", {
        name: "Remove requirement",
      });

      await expect.element(field).toHaveAccessibleName("Middle name (optional)");
      await markRequired.click();
      await expect
        .element(field)
        .toHaveAccessibleName(
          control.role === "group" ? "Middle name (required)" : "Middle name",
        );
      if (control.role === "group") {
        await expect.element(field).not.toBeRequired();
      } else {
        await expect.element(field).toBeRequired();
      }

      await removeRequirement.click();
      await expect.element(field).toHaveAccessibleName("Middle name");
      await expect.element(field).not.toHaveAttribute("aria-required");
      await expect.element(field).not.toBeRequired();
    });
  });

  describe("single Checkbox", () => {
    it.each(["required", "optional", undefined] as const)(
      "keeps its own accessible name and exposes requirement '%s' on its box",
      async (requirement) => {
        const result = render(
          <GoabFormItem label="Consent" requirement={requirement}>
            <GoabCheckbox name="consent" text="I agree" />
          </GoabFormItem>,
        );
        const box = result.getByRole("checkbox");

        await expect
          .element(box)
          .toHaveAccessibleName(
            requirement === "optional" ? "I agree (optional)" : "I agree",
          );
        if (requirement === "required") {
          await expect.element(box).toHaveAttribute("aria-required", "true");
          await expect.element(box).toBeRequired();
        } else {
          await expect.element(box).not.toHaveAttribute("aria-required");
          await expect.element(box).not.toBeRequired();
        }
      },
    );

    it.each(["required", "optional", undefined] as const)(
      "does not inherit requirement '%s' from its Checkbox List",
      async (requirement) => {
        const result = render(
          <GoabFormItem label="Contact channels" requirement={requirement}>
            <GoabCheckboxList name="channels">
              <GoabCheckbox name="email" value="email" text="Email" />
            </GoabCheckboxList>
          </GoabFormItem>,
        );
        const group = result.getByRole("group");
        const box = result.getByRole("checkbox");

        await expect
          .element(group)
          .toHaveAccessibleName(
            requirement ? `Contact channels (${requirement})` : "Contact channels",
          );
        await expect.element(box).toHaveAccessibleName("Email");
        await expect.element(box).not.toHaveAttribute("aria-required");
        await expect.element(box).not.toBeRequired();
      },
    );
  });
});
