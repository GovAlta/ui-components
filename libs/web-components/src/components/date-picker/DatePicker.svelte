<svelte:options customElement="goa-date-picker" />

<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import {
    addDays,
    addMonths,
    addYears,
    format,
    isValid,
    startOfDay,
  } from "date-fns";
  import type { Spacing } from "../../common/styling";

  type DateValue = {
    type: "date";
    value: Date;
  };

  export let value: string = "";
  export let min: string = "";
  export let max: string = "";
  export let relative: string = "false";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // re-initializes the date if the value is changed externally
  // $: value && initDate();

  let _oldValue: Date;
  let _rootEl: Element;
  let _date: Date | null;
  let _showPopover: boolean = false;

  onMount(async () => {
    await initDate();
  });

  // FIXME: This breaks keyboard entry
  afterUpdate(() => {
    // @ts-expect-error: string / int comparison is performed here
    if (_oldValue != value) {
      initDate();
    }
  });

  async function initDate() {
    _date = (value && startOfDay(new Date(value))) || null;
    if (value && !isValid(_date)) {
      console.error(`${value} is not a valid date`);
    }
  }

  function onCalendarChange(e: CustomEvent) {
    _date = e.detail.value;
    if (_date) {
      value = _date.toISOString();
      hideCalendar();
      dispatchValue(_date);
      e.stopPropagation();
      e.preventDefault();
    }
  }

  function dispatchValue(date: Date | null) {
    if (!date) return;
    _oldValue = date;
    _rootEl.dispatchEvent(
      new CustomEvent<DateValue>("_change", {
        composed: true,
        bubbles: true,
        detail: {
          type: "date",
          value: date,
        },
      }),
    );
  }

  function formatDate(d: Date | string | null): string {
    if (!d) return "";

    if (typeof d === "string") {
      return format(new Date(d), "PPP");
    }
    return format(d, "PPP");
  }

  function hideCalendar() {
    _showPopover = false;
  }

  function showCalendar() {
    _showPopover = true;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (["Space", "Enter"].includes(e.key)) {
      showCalendar();
      return;
    }

    // in the key event handling below the first line `_date ||= ...` is to initialize the date, if
    // it hasn't yet been set to 1 unit opposite of what the keybinding does ex. if ArrowDown is
    // clicked, which moves the datepicker one week ahead, the date is initialize one week before.
    // This is to allow the starting date displayed to be that of today no matter what key is
    // pressed.

    switch (e.key) {
      case "ArrowLeft":
        _date ||= addDays(new Date(), 1);
        _date = addDays(_date, -1);
        break;
      case "ArrowRight":
        _date ||= addDays(new Date(), -1);
        _date = addDays(_date, 1);
        break;
      case "ArrowDown":
        _date ||= addDays(new Date(), -7);
        _date = addDays(_date, 7);
        break;
      case "ArrowUp":
        _date ||= addDays(new Date(), 7);
        _date = addDays(_date, -7);
        break;
      case "PageUp":
        _date ||= e.shiftKey
          ? addYears(new Date(), 1)
          : addMonths(new Date(), 1);
        _date = e.shiftKey ? addYears(_date, -1) : addMonths(_date, -1);
        break;
      case "PageDown":
        _date ||= e.shiftKey
          ? addYears(new Date(), -1)
          : addMonths(new Date(), -1);
        _date = e.shiftKey ? addYears(_date, 1) : addMonths(_date, 1);
        break;
      default:
        return;
    }

    dispatchValue(_date);

    e.preventDefault();
    e.stopPropagation();
  }
</script>

<goa-popover
  bind:this={_rootEl}
  tabindex="-1"
  {relative}
  {mt}
  {mb}
  {ml}
  {mr}
  open={_showPopover}
  on:_close={() => dispatchValue(_date)}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <goa-input
    slot="target"
    readonly="true"
    trailingicon="calendar"
    value={formatDate(_date)}
    on:click={showCalendar}
    on:keydown={handleKeyDown}
  />
  <goa-calendar
    {value}
    {min}
    {max}
    bordered="false"
    on:_change={onCalendarChange}
  />
</goa-popover>
