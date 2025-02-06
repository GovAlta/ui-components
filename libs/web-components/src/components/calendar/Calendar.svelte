<svelte:options customElement="goa-calendar" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import {
    addMonths,
    addDays,
    format,
    getDaysInMonth,
    isSameDay,
    lastDayOfMonth,
    setDate,
    isSameMonth,
    startOfDay,
    addYears,
    isBefore,
    isAfter,
  } from "date-fns";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { isValidDate } from "../../common/utils";

  // ******
  // Public
  // ******

  export let name: string = "";
  export let value: string = "";
  export let min: string = "";
  export let max: string = "";
  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // ****************
  // Exposed Privates
  // ****************

  export let bordered: string = "true";

  // ********
  // Privates
  // ********

  let _selectedDate: Date | null; // date set by the user
  let _calendarDate: Date; // date that the calendar is synced to (days of month, month/year dropdowns)
  let _min: Date;
  let _max: Date;
  let _monthDays: Date[] = [];
  let _previousMonthDays: Date[] = [];
  let _nextMonthDays: Date[] = [];
  let _nextMonthDayCount: number;
  let _months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let _years: string[] = [];
  let _calendarEl: HTMLElement;

  $: {
    if (value) {
      const newDate = startOfDay(new Date(value));

      if (isValidDate(newDate)) {
        renderCalendar({ type: "date", value: _selectedDate || newDate });
        _selectedDate = newDate;
        _calendarDate = newDate;
      }
    }
  }

  // *****
  // Hooks
  // *****

  onMount(async () => {
    _calendarDate = _selectedDate = value
      ? startOfDay(new Date(value))
      : startOfDay(new Date());
    _min = (min && new Date(min)) || addYears(_selectedDate, -5);
    _max = (max && new Date(max)) || addYears(_selectedDate, 5);

    // define year range to show in dropdown
    const yearCount = _max.getFullYear() - _min.getFullYear() + 1;
    let yearStart = _min.getFullYear();
    _years = new Array(yearCount)
      .fill(undefined)
      .map((_, i) => `${yearStart + i}`)
      .sort();

    initKeybindings();

    await tick();
    renderCalendar({ type: "date", value: _selectedDate });
  });

  // *********
  // Functions
  // *********

  type DateChange = { type: "date"; value: Date };
  type MonthChange = { type: "month"; value: number };
  type YearChange = { type: "year"; value: number };

  function renderCalendar(change: DateChange | MonthChange | YearChange) {
    switch (change.type) {
      case "date":
        _calendarDate = change.value;
        break;
      case "month":
        _calendarDate.setMonth(change.value);
        break;
      case "year":
        _calendarDate.setFullYear(change.value);
        break;
    }

    if (!isValidDate(_calendarDate)) {
      return;
    }

    // day count
    const dayCount = getDaysInMonth(_calendarDate);
    _monthDays = new Array(dayCount)
      .fill(undefined)
      .map(
        (_, i) =>
          new Date(
            _calendarDate.getFullYear(),
            _calendarDate.getMonth(),
            i + 1,
          ),
      );

    // previous month days to fill the start of the calendar
    const prevMonthEnd = lastDayOfMonth(addMonths(_calendarDate, -1));
    const selectedMonthStart = setDate(_calendarDate, 1);
    _previousMonthDays = [];
    for (let i = 0; i < selectedMonthStart.getDay(); i++) {
      _previousMonthDays = [..._previousMonthDays, addDays(prevMonthEnd, -i)];
    }
    _previousMonthDays.reverse();

    // next month days to fill the end of the calendar
    _nextMonthDays = [];
    _nextMonthDayCount =
      7 - ((_previousMonthDays.length + _monthDays.length) % 7);
    // ensure a full week is not appended to the end
    if (_nextMonthDayCount < 7) {
      const nextMonthStart = setDate(addMonths(_calendarDate, 1), 1);
      for (let i = 0; i < _nextMonthDayCount; i++) {
        _nextMonthDays = [..._nextMonthDays, addDays(nextMonthStart, i)];
      }
    }
  }

  function initKeybindings() {
    const handleKeyClick = async (e: KeyboardEvent, newDate: Date) => {
      e.stopPropagation();
      e.preventDefault();

      // prevent selection outsite min/max boundies
      if (newDate < _min || newDate > _max) {
        return;
      }

      // re-initialize calendar days if arrow keys move to a different month
      if (!isSameMonth(newDate, _calendarDate)) {
        renderCalendar({ type: "date", value: newDate });
      }
      _calendarDate = newDate;

      await tick();
      const focusedDateEl = _calendarEl.querySelector(
        `[data-date="${newDate.getTime()}"]`,
      ) as HTMLButtonElement;
      focusedDateEl?.focus();
    };

    _calendarEl.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleKeyClick(e, addDays(_calendarDate, -7));
          break;
        case "ArrowDown":
          handleKeyClick(e, addDays(_calendarDate, 7));
          break;
        case "ArrowLeft":
          handleKeyClick(e, addDays(_calendarDate, -1));
          break;
        case "ArrowRight":
          handleKeyClick(e, addDays(_calendarDate, 1));
          break;
        case "Delete":
        case "Backspace":
          _selectedDate = null;
          break;
        case "Home": {
          let homeDate = new Date(_calendarDate);
          homeDate.setDate(1);
          handleKeyClick(e, homeDate);
          break;
        }
        case "End":
          handleKeyClick(e, lastDayOfMonth(_calendarDate));
          break;
        case "PageUp":
          if (e.shiftKey) {
            handleKeyClick(e, addYears(_calendarDate, -1));
          } else {
            handleKeyClick(e, addMonths(_calendarDate, -1));
          }
          break;
        case "PageDown":
          if (e.shiftKey) {
            handleKeyClick(e, addYears(_calendarDate, 1));
          } else {
            handleKeyClick(e, addMonths(_calendarDate, 1));
          }
          break;
        case "Enter":
          _selectedDate = _calendarDate;
          dispatchValue();
          e.stopPropagation();
          e.preventDefault();
          break;
        case "Escape":
          e.stopPropagation();
          e.preventDefault();
          break;
      }
    });
  }

  function dispatchValue() {
    if (!_selectedDate) return;
    if (!isValidDate(_selectedDate)) return;

    value = _selectedDate.toISOString();
    _calendarEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: {
          type: "date",
          name: name,
          value: _selectedDate,
        },
      }),
    );
  }

  // **************
  // Event Handlers
  // **************

  function setMonth(e: CustomEvent) {
    renderCalendar({ type: "month", value: +e.detail.value });
    e.preventDefault();
    e.stopPropagation();
  }

  function setYear(e: CustomEvent) {
    renderCalendar({ type: "year", value: +e.detail.value });
    e.preventDefault();
    e.stopPropagation();
  }

  function onDateClick(e: Event) {
    const el = e.target as HTMLElement;
    const raw = parseInt(el.dataset["date"] || "0");
    if (!raw) return;

    const newDate = new Date(raw);

    if (newDate < _min || newDate > _max) {
      return;
    }

    // re-initialize calendar days if user clicked on day outside current month
    if (!isSameMonth(newDate, _calendarDate)) {
      renderCalendar({ type: "date", value: newDate });
    }

    _selectedDate = _calendarDate = newDate;
    dispatchValue();
  }
</script>

<div
  style={calculateMargin(mt, mr, mb, ml)}
  class:bordered={bordered === "true"}
  data-testid={testid}
>
  <goa-block mb="m">
    <goa-form-item label="Month" mt="0">
      <goa-dropdown
        name="month"
        arialabel={`${name} month`}
        data-testid="months"
        width="160px"
        maxheight="240px"
        relative="true"
        value={_calendarDate?.getMonth()}
        on:_change={setMonth}
      >
        {#each _months as month, i}
          <goa-dropdown-item value={i} label={month} />
        {/each}
      </goa-dropdown>
    </goa-form-item>

    <goa-form-item label="Year" mt="0">
      <goa-dropdown
        name="year"
        arialabel={`${name} year`}
        data-testid="years"
        width="104px"
        maxheight="240px"
        relative="true"
        value={_calendarDate?.getFullYear()}
        on:_change={setYear}
      >
        {#each _years as year}
          <goa-dropdown-item value={year} />
        {/each}
      </goa-dropdown>
    </goa-form-item>
  </goa-block>

  <div data-testid="calendar" class="calendar" bind:this={_calendarEl}>
    <h5>Sun</h5>
    <h5>Mon</h5>
    <h5>Tue</h5>
    <h5>Wed</h5>
    <h5>Thu</h5>
    <h5>Fri</h5>
    <h5>Sat</h5>
    {#each _previousMonthDays as d}
      <button
        on:click={onDateClick}
        aria-label={format(d, "PPPP")}
        data-date={format(d, "T")}
        data-day={format(d, "eee")}
        class="day other-month"
        class:disabled={isBefore(d, _min) || isAfter(d, _max)}
        tabindex={isSameDay(d, _calendarDate) ? 0 : -1}
      >
        <div class="day-num" data-testid="date">{d.getDate()}</div>
      </button>
    {/each}
    {#each _monthDays as d}
      <button
        on:click={onDateClick}
        aria-label={format(d, "PPPP")}
        data-date={format(d, "T")}
        data-day={format(d, "eee")}
        class="day"
        class:today={isSameDay(d, new Date())}
        class:selected={value && _selectedDate && isSameDay(d, _selectedDate)}
        class:disabled={isBefore(d, _min) || isAfter(d, _max)}
        tabindex={isSameDay(d, _calendarDate) ? 0 : -1}
      >
        <div class="day-num" data-testid="date">{d.getDate()}</div>
      </button>
    {/each}
    {#each _nextMonthDays as d}
      <button
        on:click={onDateClick}
        aria-label={format(d, "PPPP")}
        data-date={format(d, "T")}
        data-day={format(d, "eee")}
        class="day other-month"
        class:disabled={isBefore(d, _min) || isAfter(d, _max)}
        tabindex={isSameDay(d, _calendarDate) ? 0 : -1}
      >
        <div class="day-num" data-testid="date">{d.getDate()}</div>
      </button>
    {/each}
  </div>
</div>

<style>

  .bordered {
    display: inline-block;
    border: 1px solid var(--goa-color-greyscale-700);
    border-radius: var(--goa-date-input-calendar-border-radius);
    padding: 1rem;
  }

  .calendar {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(7, 1fr);
    gap: 0px;
    width: var(--goa-date-input-calendar-width);
    font: var(--goa-date-input-day-font);
  }

  /* Days of Week */
  h5 {
    margin: var(--goa-date-input-day-of-week-margin);
    font: var(--goa-date-input-day-of-week-font);
  }

  /* Days in Calendar */
  .day {
    align-items: center;
    background-color: var(--goa-date-input-day-color-bg);
    border: none;
    border-radius: var(--goa-date-input-day-border-radius);
    color: var(--goa-date-input-day-color-text);
    display: inline-flex;
    font: var(--goa-date-input-day-font);
    justify-content: center;
    margin: 0;
    width: var(--goa-date-input-day-size);
    height: var(--goa-date-input-day-size);
  }
  .day.other-month {
    color: var(--goa-date-input-day-color-text-other-month);
  }
  .day.today {
    font: var(--goa-date-input-day-font-today);
  }
  .day:focus-within {
    outline: var(--goa-date-input-day-border-focus);
    z-index: 1000;
    background-color: none;
  }
  .day:hover {
    background-color: var(--goa-date-input-day-color-bg-hover);
    color: var(--goa-date-input-day-color-text-hover);
    cursor: pointer;
  }
  .day:focus-within:hover {
    background-color: transparent;
  }
  .day.selected {
    background-color: var(--goa-date-input-day-color-bg-selected);
    color: var(--goa-date-input-day-color-text-selected);
  }
  .day.selected:hover {
    background-color: var(--goa-date-input-day-color-bg-selected-hover);
    color: var(--goa-date-input-day-color-text-selected-hover);
  }
  .day.selected:focus-within:hover {
    background-color: var(--goa-date-input-day-color-bg-selected);
  }
  .day.today.selected:hover {
    background-color: var(--goa-date-input-day-color-bg-selected-hover);
    color: var(--goa-date-input-day-color-text-selected-hover);
  }
  .day.today.selected:focus-within:hover {
    background-color: var(--goa-date-input-day-color-bg-selected);
  }
  .day.disabled {
    color: var(--goa-date-input-day-color-text-disabled);
    cursor: default;
  }
  .day.disabled:hover {
    background-color: transparent;
  }

  .day-num {
    width: var(--goa-date-input-day-underline-today-width);
    pointer-events: none;
    margin-bottom: 1px; /* vertically centers the day numbers */
  }
  .selected .day-num {
    width: var(--goa-date-input-day-underline-today-width);
    border-bottom: none;
  }

  /* Today */
  .today .day-num {
    padding-top: 2px; /* vertically centers the day number when it has selected underline */
    border-bottom: var(--goa-date-input-day-underline-today);
  }
  .today.selected .day-num {
    border-bottom: var(--goa-date-input-day-underline-today-selected);
  }
</style>
