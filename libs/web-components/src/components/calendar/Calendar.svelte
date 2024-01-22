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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let _years: string[] = [];
  let _calendarEl: HTMLElement;

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
>
  <goa-block mb="m">
    <goa-form-item label="Month" mt="0">
      <goa-dropdown
        name="month"
        arialabel={`${name} month`}
        data-testid="months"
        width="calc(314px / 2 - 1.5rem)"
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
        width="calc(314px / 2 - 1.5rem)"
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
        class:selected={value && isSameDay(d, _selectedDate)}
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
  :host {
    font: var(--goa-typography-body-s);
  }

  .bordered {
    display: inline-block;
    border: 1px solid var(--goa-color-greyscale-700);
    border-radius: var(--goa-border-radius-m);
    padding: 1rem;
  }

  .calendar {
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px 0;
    width: 280px;
    font: var(--goa-typography-body-s);
  }

  h5 {
    margin: 0;
    font: var(--goa-typography-heading-xs);
  }

  .day {
    align-items: center;
    background: var(--goa-color-white);
    border: none;
    border-radius: var(--goa-border-radius-m);
    color: var(--goa-color-greyscale-black);
    display: inline-flex;
    font: var(--goa-typography-body-s);
    height: 2.5rem;
    justify-content: center;
    margin: 0;
    width: 2.5rem;
  }

  .day.other-month {
    color: var(--goa-color-greyscale-400);
  }

  .day.today {
    font-weight: var(--goa-font-weight-bold);
  }

  .day:focus-within {
    outline: var(--goa-border-width-l) solid var(--goa-color-interactive-focus);
  }

  .day.selected {
    background: var(--goa-color-interactive-default);
    color: var(--goa-color-greyscale-white);
  }

  .day:hover {
    background: var(--goa-color-greyscale-200);
    color: var(--goa-color-greyscale-black);
    cursor: pointer;
  }

  .day.selected:hover {
    background: var(--goa-color-interactive-hover);
    text-decoration-color: var(--goa-color-white);
    color: var(--goa-color-greyscale-white);
  }

  .day.today.selected:hover {
    background: var(--goa-color-interactive-hover);
    text-decoration-color: var(--goa-color-white);
    color: var(--goa-color-greyscale-white);
  }

  .day.disabled {
    color: var(--goa-color-greyscale-400);
    cursor: default;
  }

  .day.disabled:hover {
    background: var(--goa-color-white);
  }

  .day-num {
    width: 100%;
    margin: 0 6px;
    pointer-events: none;
    padding-bottom: 2px;
  }

  .selected .day-num {
    border-bottom: none;
    padding-bottom: 0;
    width: 1.5rem;
  }

  .today .day-num {
    border-bottom: 3px solid var(--goa-color-interactive-default);
  }

  .today.selected .day-num {
    border-bottom: 3px solid var(--goa-color-greyscale-white);
  }
</style>
