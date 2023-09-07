<svelte:options tag="goa-date-picker" />

<script lang="ts">
  import { onMount } from "svelte";
  import { addDays, addMonths, addYears, format, isValid, startOfDay } from "date-fns";
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

  let _rootEl: Element;
  let _date: Date;
  let _showPopover: boolean = false;

  onMount(async () => {
    _date = value && startOfDay(new Date(value));
    if (value && !isValid(_date)) {
      console.error(`${value} is not a valid date`);
    }
  });

  function onCalendarChange(e: CustomEvent) {
    _date = e.detail.value;
    hideCalendar();
    e.stopPropagation();
    e.preventDefault();
  }

  function dispatchValue(date: Date) {
    if (!date) return;
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

  function formatDate(d: Date | string): string {
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
    if (!_date) return;
    
    if (["Space", "Enter"].includes(e.key)) {
      showCalendar();
      return;
    }

    switch (e.key) {
      case "ArrowLeft":
        _date = addDays(_date, -1);
        break;
      case "ArrowRight":
        _date = addDays(_date, 1);
        break;
      case "ArrowDown":
        _date = addDays(_date, 7);
        break;
      case "ArrowUp":
        _date = addDays(_date, -7);
        break;
      case "PageUp":
        _date = e.shiftKey ? addYears(_date, -1) : addMonths(_date, -1);
        break;
      case "PageDown":
        _date = e.shiftKey ? addYears(_date, 1) : addMonths(_date, 1);
        break;
    }
    dispatchValue(_date);
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
  <goa-input
    slot="target"
    readonly="true"
    trailingicon="calendar"
    value={formatDate(_date)}
    on:click={showCalendar}
    on:keydown={handleKeyDown}
  />
  <goa-calendar {value} {min} {max} bordered="false" on:_change={onCalendarChange} />
</goa-popover>
