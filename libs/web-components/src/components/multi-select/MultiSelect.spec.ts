import { render, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import MultiSelectWrapper from "./MultiSelectWrapper.test.svelte";

describe("MultiSelect", () => {
  let user: UserEvent;

  const name = "programs";
  const items = [
    { value: "affordable-housing", label: "Affordable housing" },
    { value: "child-care", label: "Child care" },
    { value: "health-benefits", label: "Health benefits" },
  ];

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("should display the selected option label instead of undefined", async () => {
    const result = render(MultiSelectWrapper, {
      name,
      items,
      placeholder: "Select one or more programs",
    });

    const input = result.getByTestId("input") as HTMLInputElement;
    await user.click(input);

    const option = await waitFor(() =>
      result.getByTestId("multi-select-item-affordable-housing"),
    );
    await user.click(option);

    await waitFor(() => {
      expect(input.value).toBe("Affordable housing");
      expect(input.value).not.toBe("undefined");
    });
  });
});
