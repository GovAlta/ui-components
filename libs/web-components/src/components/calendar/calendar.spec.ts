import Calendar from "./Calendar.svelte";
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/svelte";
import { addDays, lastDayOfMonth, startOfDay, format } from "date-fns";
import { tick } from "svelte";
import { it, expect, vi } from "vitest";

function toDayStart(d: Date): Date {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

it("it renders", async () => {
  const { container, queryByTestId } = render(Calendar);
  await tick()

  const monthsEl = queryByTestId("months");
  const yearsEl = queryByTestId("years");

  expect(monthsEl).toBeTruthy();
  expect(yearsEl).toBeTruthy();

  const lastDate = toDayStart(lastDayOfMonth(new Date()));

  // date buttons
  for (let i = 1; i <= lastDate.getDate(); i++) {
    const d = new Date(lastDate);
    d.setDate(i);
    const dayEl = container
      ?.querySelector(`[data-date="${d.getTime()}"]`)
      ?.querySelector("[data-testid=date]");
    expect(dayEl).toBeTruthy();
  }

  // today's date
  const today = toDayStart(new Date());
  const todayEl = container
    ?.querySelector(`.today[data-date="${today.getTime()}"]`)
    ?.querySelector("[data-testid=date]");
  expect(todayEl).toBeTruthy();

  // months
  const monthEls = queryByTestId("months")?.querySelectorAll("goa-dropdown-item");

  expect(monthEls?.length).toBe(12);
  for (let i = 0; i < 12; i++) {
    const month = queryByTestId("months")?.querySelector(
      `goa-dropdown-item[value="${i}"]`,
    );
    expect(month).toBeTruthy();
  }
});

it("should have no date selected if one not provided", async () => {
  const { container } = render(Calendar);
  await tick()

  const selectedDate = container.querySelector(".selected");
  expect(selectedDate).toBeFalsy();
});

it("sets the preset date value", async () => {
  const date = new Date().toISOString();
  const { container } = render(Calendar, { value: date });
  await tick()

  const timestamp = toDayStart(new Date(date));
  const dayEl = container
    .querySelector(`.selected[data-date="${timestamp.getTime()}"]`)
    .querySelector("[data-testid=date]");
  expect(dayEl).toBeTruthy();
});

it("provides the defined year range", async () => {
  const diff = 5;
  const now = new Date();
  const min = new Date(now.getFullYear() - diff, now.getMonth(), now.getDate());
  const max = new Date(now.getFullYear() + diff, now.getMonth(), now.getDate());
  const { queryByTestId } = render(Calendar, { min, max });
  await tick()

  const years = queryByTestId("years").querySelectorAll("goa-dropdown-item");

  expect(years.length).toBe(11); // has to be one more than the count to include the first and last
  for (let i = 0; i < diff * 2 + 1; i++) {
    const year = queryByTestId("years").querySelector(
      `goa-dropdown-item[value="${min.getFullYear() + i}"]`,
    );
    expect(year).toBeTruthy();
  }
});

it("show the default year range", async () => {
  const defaultDiff = 10;
  const now = new Date();
  const min = new Date(
    now.getFullYear() - defaultDiff,
    now.getMonth(),
    now.getDate(),
  );
  const max = new Date(
    now.getFullYear() + defaultDiff,
    now.getMonth(),
    now.getDate(),
  );
  const { queryByTestId } = render(Calendar, { min, max });
  await tick()

  const years = queryByTestId("years").querySelectorAll("goa-dropdown-item");

  expect(years.length).toBe(21); // has to be one more than the count to include the first and last
  for (let i = 0; i < defaultDiff * 2 + 1; i++) {
    const year = queryByTestId("years").querySelector(
      `goa-dropdown-item[value="${min.getFullYear() + i}"]`,
    );
    expect(year).toBeTruthy();
  }
});

it("emits an event when a date is selected", async () => {
  const name = "birthdate";
  const { container, queryByTestId } = render(Calendar, { name });
  await tick()

  const today = toDayStart(new Date());
  const todayStr = format(today, "yyyy-MM-dd");
  const todayEl = container.querySelector(
    `button.today[data-date="${today.getTime()}"]`,
  );
  expect(todayEl).toBeTruthy();

  const onChange = vi.fn();
  const calendarEl = queryByTestId("calendar");
  calendarEl.addEventListener("_change", (e) => {
    onChange((e as CustomEvent).detail);
  });


  await fireEvent.click(todayEl);
  await waitFor(() => {
    expect(onChange).toBeCalled();
    expect(onChange).toBeCalledWith({ type: "date", value: today, valueStr: todayStr, name });
  });
});

it("updates the calendar when a new month is selected", async () => {
  const { container, queryByTestId } = render(Calendar);
  await tick()

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsEl = queryByTestId("months");

  // validate the day of the first day for the current month
  {
    const date = toDayStart(new Date());
    date.setDate(1);
    const dayOfWeek = date.getDay();
    const buttonEl = container.querySelector(`[data-date="${date.getTime()}"]`);
    const dayEl = buttonEl.querySelector("[data-testid=date]");
    expect(dayEl.innerHTML).toBe("1");
    expect((buttonEl as HTMLElement).dataset.day).toBe(dayNames[dayOfWeek]);
  }

  // change month
  const otherMonthZeroIndex = (new Date().getMonth() + 1) % 11;
  monthsEl.dispatchEvent(
    new CustomEvent("_change", {
      detail: { value: otherMonthZeroIndex },
    }),
  );

  await waitFor(() => {
    const date = toDayStart(new Date());
    date.setMonth(otherMonthZeroIndex);
    date.setDate(1);
    const dayOfWeek = date.getDay();
    const buttonEl = container.querySelector(`[data-date="${date.getTime()}"]`);
    const dayEl = buttonEl.querySelector("[data-testid=date]");
    expect(dayEl.innerHTML).toBe("1");
    expect((buttonEl as HTMLElement).dataset.day).toBe(dayNames[dayOfWeek]);
  });
});

it("updates the calendar when a new year is selected", async () => {
  const { container, queryByTestId } = render(Calendar);
  await tick()

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const yearsEl = queryByTestId("years");

  // validate the day of the first day for the current month
  {
    const date = toDayStart(new Date());
    date.setDate(1);
    const dayOfWeek = date.getDay();
    const buttonEl = container.querySelector(`[data-date="${date.getTime()}"]`);
    const dayEl = buttonEl.querySelector("[data-testid=date]");
    expect(dayEl.innerHTML).toBe("1");
    expect((buttonEl as HTMLElement).dataset.day).toBe(dayNames[dayOfWeek]);
  }

  // change year
  const otherYearZeroIndex = new Date().getFullYear() + 1;
  yearsEl.dispatchEvent(
    new CustomEvent("_change", {
      detail: { value: otherYearZeroIndex },
    }),
  );

  await waitFor(() => {
    const date = toDayStart(new Date());
    date.setFullYear(otherYearZeroIndex);
    date.setDate(1);
    const dayOfWeek = date.getDay();
    const buttonEl = container.querySelector(`[data-date="${date.getTime()}"]`);
    const dayEl = buttonEl.querySelector("[data-testid=date]");
    expect(dayEl).toBeTruthy();
    expect(dayEl.innerHTML).toBe("1");
    expect((buttonEl as HTMLElement).dataset.day).toBe(dayNames[dayOfWeek]);
  });
});

it("handle the arrow key presses", async () => {
  const { container, queryByTestId } = render(Calendar, { value: new Date() });
  await tick()

  let timestamp = toDayStart(new Date());
  const calendarEl = queryByTestId("calendar");

  const arrowLeftEvent = createEvent.keyDown(calendarEl, { key: "ArrowLeft" });
  const arrowRightEvent = createEvent.keyDown(calendarEl, {
    key: "ArrowRight",
  });
  const arrowDownEvent = createEvent.keyDown(calendarEl, { key: "ArrowDown" });
  const arrowUpEvent = createEvent.keyDown(calendarEl, { key: "ArrowUp" });

  // Left arrow
  timestamp = addDays(timestamp, -1);
  await fireEvent(calendarEl, arrowLeftEvent);
  await waitFor(() => {
    const current = container
      .querySelector(`[tabindex="0"]`)
      .querySelector("[data-testid=date]");
    expect(current.innerHTML).toBe(`${timestamp.getDate()}`);
  });

  // Right arrow
  timestamp = addDays(timestamp, 1);
  await fireEvent(calendarEl, arrowRightEvent);
  await waitFor(() => {
    const current = container
      .querySelector(`[tabindex="0"]`)
      .querySelector("[data-testid=date]");
    expect(current.innerHTML).toBe(`${timestamp.getDate()}`);
  });

  // Up arrow
  timestamp = addDays(timestamp, -7);
  await fireEvent(calendarEl, arrowUpEvent);
  await waitFor(() => {
    const current = container
      .querySelector(`[tabindex="0"]`)
      .querySelector("[data-testid=date]");
    expect(current.innerHTML).toBe(`${timestamp.getDate()}`);
  });

  // // Down arrow
  timestamp = addDays(timestamp, 7);
  await fireEvent(calendarEl, arrowDownEvent);
  await waitFor(() => {
    const current = container
      .querySelector(`[tabindex="0"]`)
      .querySelector("[data-testid=date]");
    expect(current.innerHTML).toBe(`${timestamp.getDate()}`);
  });
});

it("prevents date click selection outside of allowed range", async () => {
  const min = new Date(); // today is the only date selectable
  const max = new Date();
  const today = startOfDay(new Date());
  const { container, queryByTestId } = render(Calendar, { min, max });
  await tick()

  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, +1);

  const onChange = vi.fn();
  const calendarEl = queryByTestId("calendar");
  calendarEl.addEventListener("_change", (e) => {
    onChange((e as CustomEvent).detail);
  });

  const yesterdayEl = container.querySelector(
    `[data-date="${yesterday.getTime()}"]`,
  );
  if (yesterdayEl) {
    await fireEvent.click(yesterdayEl);
  }
  const tomorrowEl = container.querySelector(
    `[data-date="${tomorrow.getTime()}"]`,
  );
  if (tomorrowEl) {
    await fireEvent.click(tomorrowEl);
  }

  expect(onChange).not.toBeCalled();
});

it("prevents date keyboard selection outside of allowed range", async () => {
  const min = new Date(); // today is the only date selectable
  const max = new Date();
  const { queryByTestId } = render(Calendar, { min, max });
  await tick()

  const onChange = vi.fn();
  const calendarEl = queryByTestId("calendar");
  calendarEl.addEventListener("_change", (e) => {
    onChange((e as CustomEvent).detail);
  });

  const arrowLeftEvent = createEvent.keyDown(calendarEl, { key: "ArrowLeft" });
  const arrowRightEvent = createEvent.keyDown(calendarEl, {
    key: "ArrowRight",
  });
  const arrowDownEvent = createEvent.keyDown(calendarEl, { key: "ArrowDown" });
  const arrowUpEvent = createEvent.keyDown(calendarEl, { key: "ArrowUp" });

  await fireEvent(calendarEl, arrowLeftEvent);
  await fireEvent(calendarEl, arrowRightEvent);
  await fireEvent(calendarEl, arrowDownEvent);
  await fireEvent(calendarEl, arrowUpEvent);

  await waitFor(() => {
    expect(onChange).not.toBeCalled();
  });
});

it("reacts to dynamic min date changes", async () => {
  // Create a min date that's definitely before today
  // Use the day before yesterday to ensure today is enabled
  const initialMin = addDays(new Date(), -2);
  initialMin.setHours(0, 0, 0, 0); // Set to start of day

  const { component, container } = render(Calendar, {
    min: initialMin.toISOString(),
  });
  await tick();

  // Verify today is initially enabled
  const today = startOfDay(new Date());
  let todayEl = container.querySelector(`[data-date="${today.getTime()}"]`);
  expect(todayEl).not.toHaveClass("disabled");

  // Update min to tomorrow
  const newMin = addDays(today, 1);
  newMin.setHours(0, 0, 0, 0); // Set to start of day
  await component.$set({ min: newMin.toISOString() });
  await tick();

  // Today should now be disabled
  todayEl = container.querySelector(`[data-date="${today.getTime()}"]`);
  expect(todayEl).toHaveClass("disabled");

  // Tomorrow should be enabled
  const tomorrow = addDays(today, 1);
  const tomorrowEl = container.querySelector(
    `[data-date="${tomorrow.getTime()}"]`,
  );
  expect(tomorrowEl).not.toHaveClass("disabled");
});

it("reacts to dynamic max date changes", async () => {
  // Create a max date that's definitely after today
  // Use the day after tomorrow to ensure today is enabled
  const initialMax = addDays(new Date(), 2);
  initialMax.setHours(0, 0, 0, 0); // Set to start of day

  const { component, container } = render(Calendar, {
    max: initialMax.toISOString(),
  });
  await tick();

  // Verify today is initially enabled
  const today = startOfDay(new Date());
  let todayEl = container.querySelector(`[data-date="${today.getTime()}"]`);
  expect(todayEl).not.toHaveClass("disabled");

  // Verify tomorrow is initially enabled
  const tomorrow = addDays(today, 1);
  let tomorrowEl = container.querySelector(
    `[data-date="${tomorrow.getTime()}"]`,
  );
  expect(tomorrowEl).not.toHaveClass("disabled");

  // Update max to yesterday
  const newMax = addDays(today, -1);
  newMax.setHours(0, 0, 0, 0); // Set to start of day
  await component.$set({ max: newMax.toISOString() });
  await tick();

  // Today should now be disabled
  todayEl = container.querySelector(`[data-date="${today.getTime()}"]`);
  if(todayEl) {
    expect(todayEl).toHaveClass("disabled");
  }

  // Tomorrow should be disabled
  tomorrowEl = container.querySelector(`[data-date="${tomorrow.getTime()}"]`);
  if(tomorrowEl) {
    expect(tomorrowEl).toHaveClass("disabled");
  }

  // Yesterday should be enabled
  const yesterday = addDays(today, -1);
  const yesterdayEl = container.querySelector(
    `[data-date="${yesterday.getTime()}"]`,
  );
  expect(yesterdayEl).not.toHaveClass("disabled");
});

it("updates year dropdown when min date changes", async () => {
  // Set initial min/max to create a specific range of years
  const initialMin = new Date(2020, 0, 1);
  const initialMax = new Date(2025, 0, 1);

  const { component, queryByTestId } = render(Calendar, {
    min: initialMin.toISOString(),
    max: initialMax.toISOString()
  });
  await tick();

  // Check initial years in dropdown
  let yearDropdown = queryByTestId("years");
  let yearOptions = yearDropdown.querySelectorAll("goa-dropdown-item");

  // Should be 6 years: 2020, 2021, 2022, 2023, 2024, 2025
  expect(yearOptions.length).toBe(6);

  // Verify first and last year options
  expect(yearOptions[0].getAttribute("value")).toBe("2020");
  expect(yearOptions[yearOptions.length - 1].getAttribute("value")).toBe("2025");

  // Update min to 2022, reducing the range
  const newMin = new Date(2022, 0, 1);
  await component.$set({ min: newMin.toISOString() });
  await tick();

  // Check updated years in dropdown
  yearDropdown = queryByTestId("years");
  yearOptions = yearDropdown.querySelectorAll("goa-dropdown-item");

  // Should now be 4 years: 2022, 2023, 2024, 2025
  expect(yearOptions.length).toBe(4);

  // Verify updated first year and unchanged last year
  expect(yearOptions[0].getAttribute("value")).toBe("2022");
  expect(yearOptions[yearOptions.length - 1].getAttribute("value")).toBe("2025");

  // Verify that 2020 and 2021 are no longer available
  const year2020 = yearDropdown.querySelector("goa-dropdown-item[value='2020']");
  const year2021 = yearDropdown.querySelector("goa-dropdown-item[value='2021']");
  expect(year2020).toBeFalsy();
  expect(year2021).toBeFalsy();
});

it("updates year dropdown when max date changes", async () => {
  // Set initial min/max to create a specific range of years
  const initialMin = new Date(2020, 0, 1);
  const initialMax = new Date(2025, 0, 1);

  const { component, queryByTestId } = render(Calendar, {
    min: initialMin.toISOString(),
    max: initialMax.toISOString()
  });
  await tick();

  // Check initial years in dropdown
  let yearDropdown = queryByTestId("years");
  let yearOptions = yearDropdown.querySelectorAll("goa-dropdown-item");

  // Should be 6 years: 2020, 2021, 2022, 2023, 2024, 2025
  expect(yearOptions.length).toBe(6);

  // Verify first and last year options
  expect(yearOptions[0].getAttribute("value")).toBe("2020");
  expect(yearOptions[yearOptions.length - 1].getAttribute("value")).toBe("2025");

  // Update max to 2023, reducing the range
  const newMax = new Date(2023, 0, 1);
  await component.$set({ max: newMax.toISOString() });
  await tick();

  // Check updated years in dropdown
  yearDropdown = queryByTestId("years");
  yearOptions = yearDropdown.querySelectorAll("goa-dropdown-item");

  // Should now be 4 years: 2020, 2021, 2022, 2023
  expect(yearOptions.length).toBe(4);

  // Verify unchanged first year and updated last year
  expect(yearOptions[0].getAttribute("value")).toBe("2020");
  expect(yearOptions[yearOptions.length - 1].getAttribute("value")).toBe("2023");

  // Verify that 2024 and 2025 are no longer available
  const year2024 = yearDropdown.querySelector("goa-dropdown-item[value='2024']");
  const year2025 = yearDropdown.querySelector("goa-dropdown-item[value='2025']");
  expect(year2024).toBeFalsy();
  expect(year2025).toBeFalsy();
});