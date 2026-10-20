<svelte:options
  customElement={{
    tag: "goa-date-picker",
    props: {
      error: { attribute: "error", type: "String", reflect: true },
    },
  }}
/>

<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { toBoolean } from "../../common/utils";
  import {
    receive,
    dispatch,
    relay,
    watchFocusWithin,
  } from "../../common/utils";
  import { isValidDimension } from "../../common/validators";
  import { getTranslations } from "../../common/localization";
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
  import { CalendarDate } from "@abgov/ui-components-common";

  type OnChangeDetail = {
    name: string;
    value: Date | string | null;
    valueStr: string;
  };

  /** Sets the date picker type. 'calendar' shows a calendar popup, 'input' shows just a date input. */
  export let type: "calendar" | "input" = "calendar";
  /** Name of the date field. */
  export let name: string = "";
  /** Sets the calendar date as an ISO date string (yyyy-mm-dd). */
  export let value: string = "";
  /** Sets the input to an error state. */
  export let error: string = "false";
  /** Sets the earliest allowed date as an ISO date string (yyyy-mm-dd). */
  export let min: string = "";
  /** Sets the latest allowed date as an ISO date string (yyyy-mm-dd). */
  export let max: string = "";
  /** @deprecated This property has no effect and will be removed in a future version. */
  export let relative: string = "";
  /** Disables the date picker. */
  export let disabled: string = "false";
  /** Sets a data-testid attribute for automated testing. */
  export let testid: string = "";
  /** Sets the width of the date picker input. */
  export let width: string = "";
  /** Sets the size of the date picker. 'compact' reduces height for dense layouts and is suggested for mobile delivery. */
  export let size: "default" | "compact" = "default";

  /** Top margin. */
  export let mt: Spacing = null;
  /** Right margin. */
  export let mr: Spacing = null;
  /** Bottom margin. */
  export let mb: Spacing = null;
  /** Left margin. */
  export let ml: Spacing = null;

  let _error: boolean = toBoolean(error);
  let _senderEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _stopWatchingFocus: (() => void) | undefined;

  let _date: CalendarDate = CalendarDate.init();
  // Initializes the langauge to the html tag lang attribute initially, if given
  let _translations = getTranslations();

  $: isDisabled = toBoolean(disabled);

  // re-init the data when the value changes
  $: setDate(value);

  onMount(async () => {
    await tick(); // for Angular's delay
    _translations = getTranslations(_rootEl);
    setDate(value);
    addRelayListener();
    sendMountedMessage();
    showDeprecationWarnings();

    _stopWatchingFocus = watchFocusWithin(
      _rootEl,
      () => dispatch(_rootEl, "_focus", { name }, { bubbles: true }),
      () => dispatch(_rootEl, "_blur", { name }, { bubbles: true }),
      { settlePointerFocus: true },
    );

    if (width && !isValidDimension(width)) {
      console.error(
        "DatePicker width must be a valid CSS dimension (e.g. 50%, 320px, 16ch)",
      );
    }
  });

  onDestroy(() => _stopWatchingFocus?.());

  function stopInnerFocusEvent(e: Event) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

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
      { name, value: detail.value },
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
    if (value) {
      _date = new CalendarDate(value);
      if (!_date.isValid()) {
        _date = new CalendarDate(0);
      }
    } else {
      _date = new CalendarDate(0);
    }
  }

  function onCalendarChange(e: CustomEvent) {
    _date = new CalendarDate(e.detail.value); // yyyy-MM-dd

    hideCalendar();
    dispatchValue();

    e.stopPropagation();
    e.preventDefault();
  }

  function dispatchValue() {
    value = _date.toString();

    dispatch<OnChangeDetail>(_rootEl, "_change", {
      name,
      value: _date.date,
      valueStr: value,
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

    dispatchValue();

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
      { name, value: output, valueStr: output },
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
        fitcontent="true"
        {testid}
        {mt}
        {mb}
        {ml}
        {mr}
        width="100%"
        disabled={isDisabled}
      >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <goa-input
          slot="target"
          testid="calendar-input"
          class="calendar-input"
          width="100%"
          readonly="true"
          trailingicon="calendar"
          value={_date.format("MMMM d, yyyy")}
          {error}
          on:keydown={handleKeyDown}
          on:_focus={stopInnerFocusEvent}
          on:_blur={stopInnerFocusEvent}
          disabled={isDisabled}
          {size}
        ></goa-input>
        <goa-calendar
          {name}
          {value}
          {min}
          {max}
          bordered="false"
          on:_change={onCalendarChange}
          on:_focus={stopInnerFocusEvent}
          on:_blur={stopInnerFocusEvent}
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
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <goa-input
        slot="target"
        testid="calendar-input"
        class="calendar-input"
        width={width || "16ch"}
        readonly="true"
        trailingicon="calendar"
        value={_date.format("MMMM d, yyyy")}
        {error}
        on:keydown={handleKeyDown}
        on:_focus={stopInnerFocusEvent}
        on:_blur={stopInnerFocusEvent}
        disabled={isDisabled}
        {size}
      ></goa-input>
      <goa-calendar
        {name}
        {value}
        {min}
        {max}
        bordered="false"
        on:_change={onCalendarChange}
        on:_focus={stopInnerFocusEvent}
        on:_blur={stopInnerFocusEvent}
      />
    </goa-popover>
  {/if}
{:else if type === "input"}
  <goa-form-item error={_error && error} bind:this={_rootEl}>
    <goa-block direction="row">
      <goa-form-item helptext={_translations.calendar.month}>
        <goa-dropdown
          name="month"
          testid="input-month"
          on:_change={onInputChange}
          on:_focus={stopInnerFocusEvent}
          on:_blur={stopInnerFocusEvent}
          {error}
          value={_date.month + ""}
          disabled={isDisabled}
          {size}
        >
          <goa-dropdown-item
            value="0"
            label={size === "compact"
              ? _translations.calendar.selectMonthCompact
              : _translations.calendar.selectMonth}
          />
          {#each _translations.calendar.months as month, index}
            <goa-dropdown-item value={`${index + 1}`} label={month}
            ></goa-dropdown-item>
          {/each}
        </goa-dropdown>
      </goa-form-item>
      <goa-form-item helptext={_translations.calendar.dayFormat}>
        <goa-input
          name="day"
          type="number"
          class="no-spinner"
          testid="input-day"
          on:_change={onInputChange}
          on:_focus={stopInnerFocusEvent}
          on:_blur={stopInnerFocusEvent}
          width="2ch"
          value={_date.day || ""}
          min="1"
          max="31"
          {error}
          disabled={isDisabled}
          {size}
        ></goa-input>
      </goa-form-item>
      <goa-form-item helptext={_translations.calendar.yearFormat}>
        <goa-input
          name="year"
          type="number"
          class="no-spinner"
          testid="input-year"
          on:_change={onInputChange}
          on:_focus={stopInnerFocusEvent}
          on:_blur={stopInnerFocusEvent}
          width="4ch"
          value={_date.year || ""}
          min="1800"
          max="2200"
          {error}
          disabled={isDisabled}
          {size}
        ></goa-input>
      </goa-form-item>
    </goa-block>
  </goa-form-item>
{/if}

<style>
  .calendar-input {
    /* Override readonly styles to match regular input appearance */
    --goa-text-input-color-bg-readonly: var(--goa-text-input-color-bg);
    --goa-text-input-border-readonly: var(--goa-text-input-border);
    --goa-text-input-cursor-readonly: var(--goa-date-input-cursor);
  }

  .calendar-input:hover {
    --goa-text-input-border-readonly: var(--goa-text-input-border-hover);
  }

  .calendar-input:focus-within {
    --goa-text-input-border-readonly: var(--goa-text-input-border-focus);
  }
</style>
