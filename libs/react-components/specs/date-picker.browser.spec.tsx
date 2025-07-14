import { render } from "vitest-browser-react";

import { GoabDatePicker } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";

describe("Date Picker input type", () => {
	it("dispatches date or null value when any field in input type date picker changes", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabDatePicker type="input" name="datePickerInputType" testId="datePicker"></GoabDatePicker>
        </div>
      );
    };

    const result = render(<Component />);
		const datePickerMonth = result.getByTestId("month-dropdown");
		const datePickerDay = result.getByTestId("day-input");
		const datePickerYear = result.getByTestId("year-input");

		expect(datePickerMonth).toBeTruthy();
		expect(datePickerDay).toBeTruthy();
		expect(datePickerYear).toBeTruthy();

		const rootElChangeHandler = vi.fn();
		result.container.addEventListener("_change", (e: Event) => {
			const ce = e as CustomEvent;
			rootElChangeHandler(ce.detail.value);
		});

		// Select month
		if (datePickerMonth) {
			await datePickerMonth.click();
			await userEvent.keyboard("{ArrowDown}");
			await userEvent.keyboard("{Enter}");
		}

		// should be null because date is invalid
		await vi.waitFor(() => {
			expect(rootElChangeHandler).toHaveBeenCalledWith(null);
		});
		rootElChangeHandler.mockClear();

		// Input day
		if (datePickerDay) {
			await datePickerDay.click();
			await userEvent.type(datePickerDay, "1");
		}

		// should be null because date is still invalid
		await vi.waitFor(() => {
			expect(rootElChangeHandler).toHaveBeenCalledWith(null);
		});
		rootElChangeHandler.mockClear();

		// Input year
		if (datePickerYear) {
			await datePickerYear.click();
			await userEvent.type(datePickerYear, "1999");
		}

		// should not be null because date became valid
		await vi.waitFor(() => {
			expect(rootElChangeHandler).toHaveBeenCalledWith("1999-01-01");
		});
		rootElChangeHandler.mockClear();

		// Clear day input
		if (datePickerDay) {
			await datePickerDay.click();
			await userEvent.keyboard("{ArrowRight}");
			await userEvent.keyboard("{Backspace}");
		}

		// should be null because date became invalid
		await vi.waitFor(() => {
			expect(rootElChangeHandler).toHaveBeenCalledWith(null);
		});
		rootElChangeHandler.mockClear();
	});
});
