<svelte:options customElement="goa-date-picker" />

<script lang="ts">
  import { afterUpdate, onMount, tick } from "svelte";
  import {
    addDays,
    addMonths,
    addYears,
    format,
    startOfDay,
  } from "date-fns";
  import type { Spacing } from "../../common/styling";
  import { padLeft, toBoolean } from "../../common/utils";
  import { receive, dispatch, relay } from "../../common/utils";
  import {
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FieldsetErrorRelayDetail,
  } from "../../types/relay-types";

  type DateValue = {
    type: "date";
    name: string;
    value: Date | null;
  };

  type InputDate = {
    day: string;
    month: string;
    year: string;
  };

  export let type: "calendar" | "input" = "calendar";
  export let name: string = "";
  export let value: string = "";
  export let error: string = "false";
  export let min: string = "";
  export let max: string = "";
  export let relative: string = "false";
  export let disabled: string = "false";
  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // re-initializes the date if the value is changed externally
  // $: formatDate(value);

  let _error: boolean = toBoolean(error);
  let _oldValue: Date | null;
  let _rootEl: HTMLElement;
  let _date: Date | null;
  let _showPopover: boolean = false;

  // used only for the `type=input`
  let _inputDate: InputDate = { day: "", month: "", year: "" };

  $: isDisabled = toBoolean(disabled);

  $: if (value === "") {
    _date = null;
  }

  onMount(async () => {
    await tick(); // needed to ensure Angular's delay, when rendering within a route, doesn't break things
    await initDate();
    addRelayListener();
    sendMountedMessage();
  });

  afterUpdate(() => {
    // @ts-expect-error: string / int comparison is performed here
    if (_oldValue != value) {
      initDate();
    }
  });

  // Listen for relayed messages
  function addRelayListener() {
    receive(_rootEl, (action, data) => {
      switch (action) {
        case FieldsetSetValueMsg:
          onSetValue(data as FieldsetSetValueRelayDetail);
          break;
        case FieldsetSetErrorMsg:
          setError(data as FieldsetErrorRelayDetail);
          break;
        case FieldsetResetErrorsMsg:
          error = "false";
          break;
      }
    });
  }

  function setError(detail: FieldsetErrorRelayDetail) {
    error = detail.error ? "true" : "false";
  }

  function onSetValue(detail: FieldsetSetValueRelayDetail) {
    // @ts-expect-error
    value = detail.value;
    dispatch(
      _rootEl,
      "_change",
      { name, value: detail.value },
      { bubbles: true },
    );
  }

  // Notify the Form that this component has been mounted
  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _rootEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 5 },
    );
  }

  async function initDate() {
    // invalid date
    if (!value || !(new Date(value).getDate())) {
      console.warn(`${value || "an empty string"} is not a valid date`);
      return;
    }

    // exit if already assigned
    if (_date || _inputDate.day !== "") {
      return;
    };

    if (type === "input") {
      const [year, month, day] = value.split("-");
      _inputDate = { year: year, month: `${+month-1}`, day: day };
    } else if (type === "calendar") {
      _date = startOfDay(new Date(value));
    }
  }

  function onCalendarChange(e: CustomEvent) {
    _date = e.detail.value;
    if (_date) {
      value = _date.toISOString();
    } else {
      value = "";
    }

    hideCalendar();
    dispatchValue(_date);

    e.stopPropagation();
    e.preventDefault();
  }

  function dispatchValue(date: Date | null) {
    if (!date) {
      _oldValue = null;
      value = "";
    } else {
      _oldValue = date;
      value = date.toISOString();
    }

    _rootEl.dispatchEvent(
      new CustomEvent<DateValue>("_change", {
        composed: true,
        bubbles: true,
        detail: {
          name,
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
    _showPopover = !isDisabled;
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

  // _change event handler for the text/dropdown inputs for the `input` date format
  function onInputChange(e: Event) {
    e.stopPropagation();

    const { name: elName, value } = (
      e as CustomEvent<{ name: string; value: string }>
    ).detail;

    _inputDate = {..._inputDate, [elName]: +value};

    if (!new Date(+_inputDate.year, +_inputDate.month, +_inputDate.day)) {
      return;
    }

    const date = `${padLeft(_inputDate.year, 4, 0)}-${padLeft(_inputDate.month + 1, 2, 0)}-${padLeft(_inputDate.day, 2, 0)}`;

    dispatch(
      _rootEl,
      "_change",
      { name, type: "string", value: date },
      { bubbles: true },
    );
  }
</script>

{#if type === "calendar"}
  <goa-popover
    bind:this={_rootEl}
    tabindex="-1"
    {testid}
    {relative}
    {mt}
    {mb}
    {ml}
    {mr}
    disabled={isDisabled}
    open={_showPopover}
    on:_close={() => dispatchValue(_date)}
  >
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <goa-input
      slot="target"
      width="160px"
      readonly="true"
      trailingicon="calendar"
      value={formatDate(_date)}
      {error}
      on:click={showCalendar}
      on:keydown={handleKeyDown}
      disabled={isDisabled}
    />
    <goa-calendar
      {name}
      {value}
      {min}
      {max}
      bordered="false"
      on:_change={onCalendarChange}
    />
  </goa-popover>
{:else if type === "input"}
  <goa-form-item error={_error && error} bind:this={_rootEl}>
    <goa-block direction="row">
      <goa-form-item label="Day" helptext="Day (DD)">
        <goa-input
          name="day"
          type="number"
          on:_change={onInputChange}
          width="7ch"
          value={_inputDate.day}
          min="1"
          max="31"
          {_error}
        />
      </goa-form-item>
      <goa-form-item label="Month" helptext="Month">
        <goa-dropdown name="month" on:_change={onInputChange} {error} value={_inputDate.month+""}>
          <goa-dropdown-item value="0" label="January" />
          <goa-dropdown-item value="1" label="February" />
          <goa-dropdown-item value="2" label="March" />
          <goa-dropdown-item value="3" label="April" />
          <goa-dropdown-item value="4" label="May" />
          <goa-dropdown-item value="5" label="June" />
          <goa-dropdown-item value="6" label="July" />
          <goa-dropdown-item value="7" label="August" />
          <goa-dropdown-item value="8" label="September" />
          <goa-dropdown-item value="9" label="October" />
          <goa-dropdown-item value="10" label="November" />
          <goa-dropdown-item value="11" label="December" />
        </goa-dropdown>
      </goa-form-item>
      <goa-form-item label="Year" helptext="Year (YYYY)">
        <goa-input
          name="year"
          type="number"
          on:_change={onInputChange}
          width="10ch"
          value={_inputDate.year}
          min="1800"
          max="2200"
          {error}
        />
      </goa-form-item>
    </goa-block>
  </goa-form-item>
{/if}

<style>

</style>
