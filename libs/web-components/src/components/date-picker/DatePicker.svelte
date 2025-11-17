<svelte:options
  customElement={{
    tag: "goa-date-picker",
    props: {
      error: { attribute: "error", type: "String", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onMount, tick } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { toBoolean } from "../../common/utils";
  import { receive, dispatch, relay } from "../../common/utils";
  import {
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetSetErrorMsg,
    FieldsetResetErrorsMsg,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FieldsetErrorRelayDetail,
    FieldsetResetFieldsMsg,
    FormItemMountMsg,
  } from "../../types/relay-types";
  import { CalendarDate } from "../../common/calendar-date";

  type OnChangeDetail = {
    name: string;
    value: Date | string | null;
    valueStr: string;
  };

  export let type: "calendar" | "input" = "calendar";
  export let name: string = "";
  export let value: string = "";
  export let error: string = "false";
  export let min: string = "";
  export let max: string = "";
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  export let relative: string = "";
  export let disabled: string = "false";
  export let testid: string = "";
  export let width: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  let _error: boolean = toBoolean(error);
  let _senderEl: HTMLElement;
  let _rootEl: HTMLElement;

  let _date: CalendarDate = CalendarDate.init();

  $: isDisabled = toBoolean(disabled);

  // re-init the data when the value changes
  $: setDate(value);

  onMount(async () => {
    await tick(); // for Angular's delay
    setDate(value);
    addRelayListener();
    sendMountedMessage();
    showDeprecationWarnings();
  });

  function showDeprecationWarnings() {
    if (relative != "") {
      console.warn(
        "Date Picker `relative` property is deprecated. It should be removed from your code because it is no longer needed to help with positioning.",
      );
    }
  }

  // Listen for relayed messages
  function addRelayListener() {
    receive(_rootEl, (action, data, event) => {
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
        case FieldsetResetFieldsMsg:
          onSetValue({ name, value: "" });
          break;

        // prevent child fields from mounting/registering themselves with parent components
        case FormItemMountMsg:
        case FormFieldMountMsg:
          event.stopPropagation();
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
      { name, value: detail.value, event: undefined },
      { bubbles: true },
    );
  }

  // Notify the Form that this component has been mounted
  function sendMountedMessage() {
    relay<FormFieldMountRelayDetail>(
      _senderEl,
      FormFieldMountMsg,
      { name, el: _rootEl },
      { bubbles: true, timeout: 5 },
    );
  }

  function setDate(value: string) {
    if (type === "calendar") {
      if (value) {
        _date = new CalendarDate(value);
        if (!_date.isValid) {
          _date = new CalendarDate(0);
        }
      } else {
        _date = new CalendarDate(0);
      }
    }
  }

  function onCalendarChange(e: CustomEvent) {
    _date = new CalendarDate(e.detail.value); // yyyy-MM-dd

    hideCalendar();
    dispatchValue(e);

    e.stopPropagation();
    e.preventDefault();
  }

  function dispatchValue(event?: Event) {
    value = _date.toString();

    dispatch<OnChangeDetail>(_rootEl, "_change", {
      name,
      value: _date.date,
      valueStr: value,
      event
    });
  }

  function hideCalendar() {
    dispatch(document.body, "goa:closePopover", { target: _rootEl });
  }

  function handleKeyDown(e: KeyboardEvent) {
    // in the key event handling below the first line `_date ||= ...` is to initialize the date, if
    // it hasn't yet been set to 1 unit opposite of what the keybinding does ex. if ArrowDown is
    // clicked, which moves the datepicker one week ahead, the date is initialize one week before.
    // This is to allow the starting date displayed to be that of today no matter what key is
    // pressed.

    switch (e.key) {
      case "ArrowLeft":
        _date ||= new CalendarDate().nextDay;
        _date.addDays(-1);
        break;
      case "ArrowRight":
        _date ||= new CalendarDate().previousDay;
        _date.addDays(1);
        break;
      case "ArrowDown":
        _date ||= new CalendarDate().previousWeek;
        _date.addDays(7);
        break;
      case "ArrowUp":
        _date ||= new CalendarDate().nextWeek;
        _date.addDays(-7);
        break;
      case "PageUp":
        _date ||= e.shiftKey
          ? new CalendarDate(_date).addYears(1)
          : new CalendarDate(_date).addMonths(1);
        _date = e.shiftKey
          ? new CalendarDate(_date).addYears(-1)
          : new CalendarDate(_date).addMonths(-1);
        break;
      case "PageDown":
        _date ||= e.shiftKey
          ? new CalendarDate(_date).addYears(-1)
          : new CalendarDate(_date).addMonths(-1);
        _date = e.shiftKey
          ? new CalendarDate(_date).addYears(1)
          : new CalendarDate(_date).addMonths(1);
        break;
      default:
        return;
    }

    //dispatchValue(_date, e);
    dispatchValue(e);

    e.preventDefault();
    e.stopPropagation();
  }

  // _change event handler for the text/dropdown inputs for the `input` date format
  function onInputChange(e: Event) {
    e.stopPropagation();

    const { name: elName, value } = (
      e as CustomEvent<{ name: string; value: string }>
    ).detail;

    if (elName === "day") {
      _date.setDay(+value);
    } else if (elName === "month") {
      _date.setMonth(+value);
    } else if (elName === "year") {
      _date.setYear(+value);
    }

    // invalid dates need to emitted too
    const output = _date.isValid() ? _date.toString() : "";

    dispatch<OnChangeDetail>(
      _rootEl,
      "_change",
      { name, value: output, valueStr: output, event: e },
      { bubbles: true },
    );
  }
</script>

<div bind:this={_senderEl}></div>
{#if type === "calendar"}
  {#if width && width.includes("%")}
    <div style="display: block; width: {width};">
      <goa-popover
        bind:this={_rootEl}
        tabindex="-1"
        data-testid="calendar-popover"
        data-content-fits-width="true"
        {testid}
        {mt}
        {mb}
        {ml}
        {mr}
        width="100%"
        disabled={isDisabled}
      >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <goa-input
          slot="target"
          testid="calendar-input"
          width="100%"
          readonly="true"
          trailingicon="calendar"
          value={_date.format("MMMM d, yyyy")}
          {error}
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
    </div>
  {:else}
    <goa-popover
      bind:this={_rootEl}
      tabindex="-1"
      data-testid="calendar-popover"
      {testid}
      {mt}
      {mb}
      {ml}
      {mr}
      disabled={isDisabled}
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <goa-input
        slot="target"
        testid="calendar-input"
        width={width || "16ch"}
        readonly="true"
        trailingicon="calendar"
        value={_date.format("MMMM d, yyyy")}
        {error}
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
  {/if}
{:else if type === "input"}
  <goa-form-item
    error={_error && error}
    bind:this={_rootEl}
  >
    <goa-block direction="row">
      <goa-form-item helptext="Month">
        <goa-dropdown
          name="month"
          testid="input-month"
          on:_change={onInputChange}
          {error}
          value={_date.month + ""}
          disabled={isDisabled}
        >
          <goa-dropdown-item value="1" label="January" />
          <goa-dropdown-item value="2" label="February" />
          <goa-dropdown-item value="3" label="March" />
          <goa-dropdown-item value="4" label="April" />
          <goa-dropdown-item value="5" label="May" />
          <goa-dropdown-item value="6" label="June" />
          <goa-dropdown-item value="7" label="July" />
          <goa-dropdown-item value="8" label="August" />
          <goa-dropdown-item value="9" label="September" />
          <goa-dropdown-item value="10" label="October" />
          <goa-dropdown-item value="11" label="November" />
          <goa-dropdown-item value="12" label="December" />
        </goa-dropdown>
      </goa-form-item>
      <goa-form-item helptext="Day (DD)">
        <goa-input
          name="day"
          type="number"
          testid="input-day"
          on:_change={onInputChange}
          width="4ch"
          value={_date.day || ""}
          min="1"
          max="31"
          {error}
          disabled={isDisabled}
        />
      </goa-form-item>
      <goa-form-item helptext="Year (YYYY)">
        <goa-input
          name="year"
          type="number"
          testid="input-year"
          on:_change={onInputChange}
          width="6ch"
          value={_date.year || ""}
          min="1800"
          max="2200"
          {error}
          disabled={isDisabled}
        />
      </goa-form-item>
    </goa-block>
  </goa-form-item>
{/if}
