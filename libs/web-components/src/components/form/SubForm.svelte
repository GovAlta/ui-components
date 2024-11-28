<svelte:options tag="goa-subform" />

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive, relay, styles } from "../../common/utils";
  import {
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetValidationRelayDetail,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormState,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
  } from "../../types/relay-types";
  import { calculateMargin, Spacing } from "../../common/styling";

  /**
    TODO
    - handle the complete event from within the subform
      - need to bind a handler on the goa-form's _complete

  **/

  // Subform props
  export let id: string = "";
  export let heading: string = "";

  // Form props
  export let name: string;
  export let backUrl: string = "";
  export let dispatchOn: "continue" | "complete" = "continue";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Receives the events from the goa-public-form element
  let _formEl: HTMLElement;

  // TODO: Allows the subform to dispatch off messages to parent form without intercepting it's own messages
  let _rootEl: HTMLElement;

  // Allows the subform to be hidden/shown, much like a fieldset
  let _active: boolean = false;

  // Index of the current item being editted. This will be set via an event
  let _current: number = -1;

  // List of all the looped items
  let _state: FormState[] = [];

  // reference to child fieldsets to allow data to be relayed to them when the subform item index is changed
  let _fieldsets: Record<string, HTMLElement> = {};

  onMount(() => {
    dispatchBindMsg();
    bindReceiver();
    bindChangeHandler();
  });

  let _innerFormEl: HTMLElement;
  function onInit(e: Event) {
    _innerFormEl = (e as CustomEvent).detail.el as HTMLElement;
  }

  function bindReceiver() {
    receive(_formEl, (action, data, e) => {
      console.debug(`  RECEIVE(SubForm => ${action}):`, data);
      e.stopPropagation();
      switch (action) {
        // sets the fieldset/subform data
        case FormSetFieldsetMsg:
          onSetFieldset(data as FormState[]);
          break;
        case FormToggleActiveMsg:
          onToggleActiveState(data as FormToggleActiveRelayDetail);
          break;
        case FieldsetBindMsg:
          onFieldsetMount(data as FieldsetBindRelayDetail);
          break;
      }
    });
  }
  // Collect list of child form item (input, dropdown, etc) elements
  function onFieldsetMount(detail: FieldsetBindRelayDetail) {
    console.debug("SubForm:onFieldsetMount", { detail });
    const { id, el } = detail;
    if (!id) return;

    _fieldsets[id] = el;
  }

  // Parent form sends data to the child fieldsets/subforms
  function onSetFieldset(detail: FormState[]) {
    console.debug("Subform:onSetFieldset", { detail });
    for (const [id, item] of Object.entries(detail)) {
      _state[id] = { ...item };
    }
  }

  // TODO: use this function when the user clicks an edit/delete link
  // there would be a helper method to properly dispatch the message
  // function setValues(index: number) {
  //   // restore state in form items
  //   for (const [name, data] of Object.entries(_state)) {
  //     if (data.value) {
  //       relay<FieldsetSetValueRelayDetail>(_fieldsets[name], FieldsetSetValueMsg, {
  //         name,
  //         value: data.value,
  //       });
  //     }
  //   }
  // }

  function bindChangeHandler() {
    _formEl.addEventListener("_change", (e) => {
      console.debug(`  SUBFORM CHANGE:`, e);
    });
  }

  function dispatchBindMsg() {
    // relay reference to the goa-public-form element as if it were a fieldset to allow it's visibility to be controlled
    // TODO: maybe rename this event/type so it's not specific to fieldsets
    relay<FieldsetBindRelayDetail>(
      _rootEl,
      FieldsetBindMsg,
      {
        id,
        heading,
        el: _formEl,
      },
      {
        bubbles: true,
        timeout: 10,
      },
    );
  }

  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    console.debug("SubForm:onToggleActiveState", { detail });
    _active = detail.active;
  }

  function onStateChange(e: Event) {
    console.debug("Subform:onStateChange", { e });

    // initial event will be overridden with a custom _stateChange event containing a state array
    e.stopPropagation();

    const detail = (e as CustomEvent).detail as FormState;

    // no existing item is in "edit" mode
    const editStateIndex = _state.findIndex((s) => s.id === detail.id);
    console.debug("SubForm:onStateChange", "findIndex", editStateIndex);
    if (editStateIndex >= 0) {
      _state[editStateIndex] = detail;
    } else {
      _state.push(detail);
    }

    // _state = [
    //   ..._state.slice(0, editStateIndex),
    //   detail,
    //   ..._state.slice(editStateIndex + 1),
    // ];

    // stop original event to prevent just the single subform data from being sent
    // send the array of data instead
    dispatch(_rootEl, "_stateChange", _state, { bubbles: true });
  }

  // Listen to the fieldset `_continue` message to allow for the subform to be reset
  // after the last fieldset was shown to the user
  function onContinue(e: Event) {
    const detail = (e as CustomEvent<FieldsetValidationRelayDetail>).detail;
    console.debug("SubForm:onContinue", { detail});
    if (detail.last) {
      relay(_innerFormEl, FormResetFormMsg);
    }
    e.stopPropagation();
  }
</script>

<div bind:this={_rootEl}>
  <goa-public-form
    bind:this={_formEl}
    on:_stateChange={onStateChange}
    on:_continue={onContinue}
    on:_init={onInit}
    style={styles(
      calculateMargin(mt, mr, mb, ml),
      `display: ${_active ? "block" : "none"}`,
    )}
    sub-form
    {name}
    {dispatchOn}
    {backUrl}
    {mt}
    {mr}
    {mb}
    {ml}
  >
    <slot />
  </goa-public-form>
</div>
