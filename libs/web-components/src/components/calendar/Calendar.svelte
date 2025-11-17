<svelte:options customElement="goa-calendar" />

<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { CalendarDate } from "../../common/calendar-date";

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

  let _selectedDate: CalendarDate | undefined; // date set by the user
  let _calendarDate: CalendarDate; // date that the calendar is synced to (days of month, month/year dropdowns)
  let _min: CalendarDate;
  let _max: CalendarDate;
  let _monthDays: CalendarDate[] = [];
  let _previousMonthDays: CalendarDate[] = [];
  let _nextMonthDays: CalendarDate[] = [];
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
      const newDate = new CalendarDate(value);
      if (newDate.isValid()) {
        renderCalendar({ type: "date", value: newDate });
        _selectedDate = newDate;
        _calendarDate = newDate;
      }
    }
  }

  $: {
    _min = min ? new CalendarDate(min) : new CalendarDate().addYears(-5);
    _max = max ? new CalendarDate(max) : new CalendarDate().addYears(+5);

    // Update years list based on new min/max
    const yearStart = _min.year;
    const yearCount = _max.year - yearStart + 1;

    _years = Array.from({ length: yearCount }, (_, i) => `${yearStart + i}`);

    // Adjust calendar if it's outside the new min/max range
    if (_calendarDate) {
      if (_calendarDate.isBefore(_min)) {
        _calendarDate = new CalendarDate(_min);
      } else if (_calendarDate.isAfter(_max)) {
        _calendarDate = new CalendarDate(_max);
      }
    }

    // Re-render with updated values
    renderCalendar({ type: "date", value: _calendarDate || new CalendarDate() });
  }

  // *****
  // Hooks
  // *****

  onMount(() => {
    if (value) {
      _calendarDate = _selectedDate = new CalendarDate(value);
    } else {
      _calendarDate = new CalendarDate();
      _selectedDate = new CalendarDate(0);
    }

    initKeybindings();
    renderCalendar({ type: "date", value: _calendarDate });
  });

  // *********
  // Functions
  // *********

  type DateChange = { type: "date"; value: CalendarDate };
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
        _calendarDate.setYear(change.value);
        break;
    }

    if (!_calendarDate.isValid()) {
      return;
    }

    // day count
    const dayCount = _calendarDate.daysInMonth;
    _monthDays = [];
    for (let i = 0; i < dayCount; i++) {
      _monthDays.push(
          new CalendarDate({year: _calendarDate.year, month: _calendarDate.month, day: i+1})
      )
    }

    // previous month days to fill the start of the calendar
    const prevMonthEnd = _calendarDate.previousMonth.lastDayOfMonth;
    const selectedMonthStart = _calendarDate.firstDayOfMonth;

    _previousMonthDays = [];
    for (let i = 0; i < selectedMonthStart.dayOfWeek; i++) {
      _previousMonthDays.push(prevMonthEnd.clone().addDays(-i));
    }
    _previousMonthDays.reverse();

    // next month days to fill the end of the calendar
    _nextMonthDays = [];
    _nextMonthDayCount = 7 - ((_previousMonthDays.length + _monthDays.length) % 7);

    // ensure a full week is not appended to the end
    if (_nextMonthDayCount < 7) {
      const nextMonthStart = _calendarDate.nextMonth.firstDayOfMonth;
      for (let i = 0; i < _nextMonthDayCount; i++) {
        _nextMonthDays.push(nextMonthStart.clone().addDays(i));
      }
    }
  }

  function initKeybindings() {
    const handleKeyClick = async (e: KeyboardEvent, newDate: CalendarDate) => {
      e.stopPropagation();
      e.preventDefault();

      // prevent selection outsite min/max boundies
      if ( newDate.isBefore(_min) || newDate.isAfter(_max) ) {
        return;
      }

      // re-initialize calendar days if arrow keys move to a different month
      if (!newDate.isSameMonth(_calendarDate)) {
        renderCalendar({ type: "date", value: newDate });
      }
      _calendarDate = newDate;

      await tick();
      const focusedDateEl = _calendarEl.querySelector(
        `[data-date="${newDate.toString()}"]`,
      ) as HTMLButtonElement;

      focusedDateEl?.focus();
    };

    _calendarEl.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          handleKeyClick(e, _calendarDate.clone().addDays(-7));
          break;
        case "ArrowDown":
          handleKeyClick(e, _calendarDate.clone().addDays(7));
          break;
        case "ArrowLeft":
          handleKeyClick(e, _calendarDate.clone().addDays(-1));
          break;
        case "ArrowRight":
          handleKeyClick(e, _calendarDate.clone().addDays(1));
          break;
        case "Delete":
        case "Backspace":
          _selectedDate = undefined;
          break;
        case "Home": {
          let homeDate = new CalendarDate(_calendarDate);
          homeDate.setDay(1);
          handleKeyClick(e, homeDate);
          break;
        }
        case "End":
          handleKeyClick(e, _calendarDate.lastDayOfMonth);
          break;
        case "PageUp":
          if (e.shiftKey) {
            handleKeyClick(e, _calendarDate.clone().addYears(-1));
          } else {
            handleKeyClick(e, _calendarDate.clone().addMonths(-1));
          }
          break;
        case "PageDown":
          if (e.shiftKey) {
            handleKeyClick(e, _calendarDate.clone().addYears(1));
          } else {
            handleKeyClick(e, _calendarDate.clone().addMonths(1));
          }
          break;
        case "Enter":
          _selectedDate = _calendarDate;
          dispatchValue(e);
          e.stopPropagation();
          e.preventDefault();
          break;
      }
    });
  }

  function dispatchValue(event?: Event) {
    if (!_selectedDate) return;
    if (!_selectedDate.isValid()) return;

    value = _selectedDate.toString();
    _calendarEl.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        detail: {
          type: "string",
          name: name,
          value: _selectedDate.toString(),
          event,
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

  function onDateClick(_d: string) {
    const d = new CalendarDate(_d);
    if (!d) return;

    if (d.isBefore(_min) || d.isAfter(_max)) {
      return;
    }

    // re-initialize calendar days if user clicked on day outside current month
    if (!d.isSameMonth(_calendarDate)) {
      renderCalendar({ type: "date", value: d });
    }

    _selectedDate = _calendarDate = d;
    dispatchValue(e);
  }
</script>

<div
  style={calculateMargin(mt, mr, mb, ml)}
  class:bordered={bordered === "true"}
  data-testid={testid}
  tabindex="-1"
>
  <goa-block mb="m">
    <goa-form-item label="Month" mt="0">
      <goa-dropdown
        name="month"
        disable-global-close-popover="yes"
        arialabel={`${name} month`}
        data-testid="months"
        width="160px"
        maxheight="240px"
        value={_calendarDate?.month}
        on:_change={setMonth}
      >
        {#each _months as month, i}
          <goa-dropdown-item value={i+1+""} label={month} />
        {/each}
      </goa-dropdown>
    </goa-form-item>

    <goa-form-item label="Year" mt="0">
      <goa-dropdown
        name="year"
        disable-global-close-popover="yes"
        arialabel={`${name} year`}
        data-testid="years"
        width="104px"
        maxheight="240px"
        value={_calendarDate?.year}
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
        on:click={() => onDateClick(d.toString())}
        data-testid={d.format("yyyy-MM-dd")}
        data-date={d.format("yyyy-MM-dd")}
        aria-label={d.format("PPPP")}
        data-day={d.format("eee")}
        class="day other-month"
        class:disabled={d.isBefore(_min) || d.isAfter(_max)}
        tabindex={d.isSameDay(_calendarDate) ? 0 : -1}
      >
        <div class="day-num" data-testid="date">{d.day}</div>
      </button>
    {/each}
    {#each _monthDays as d}
      <button
        on:click={() => onDateClick(d.toString())}
        data-testid={d.format("yyyy-MM-dd")}
        data-date={d.format("yyyy-MM-dd")}
        aria-label={d.format("PPPP")}
        data-day={d.format("eee")}
        class="day"
        class:today={d.isSameDay(new CalendarDate())}
        class:selected={value && _selectedDate && d.isSameDay(_selectedDate)}
        class:disabled={d.isBefore(_min) || d.isAfter(_max)}
        tabindex={d.isSameDay(_calendarDate) ? 0 : -1}
      >
        <div class="day-num" data-testid="date">{d.day}</div>
      </button>
    {/each}
    {#each _nextMonthDays as d}
      <button
        on:click={() => onDateClick(d.toString())}
        data-testid={d.format("yyyy-MM-dd")}
        data-date={d.format("yyyy-MM-dd")}
        aria-label={d.format("PPPP")}
        data-day={d.format("eee")}
        class="day other-month"
        class:disabled={d.isBefore(_min) || d.isAfter(_max)}
        tabindex={d.isSameDay(_calendarDate) ? 0 : -1}
      >
        <div class="day-num" data-testid="date">{d.day}</div>
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
