<svelte:options tag="goa-subform" />

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive, relay, styles } from "../../common/utils";
  import {
    ExternalAlterDataMsg,
    ExternalAlterDataRelayDetail,
    ExternalContinueMsg,
    ExternalInitStateMsg,
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetValidationRelayDetail,
    SubformBindMsg,
    FormBindRelayDetail,
    FormDispatchStateToSubformMsg,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormState,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
    SubFormDeleteDataMsg,
    SubFormDeleteDataRelayDetail,
  } from "../../types/relay-types";
  import { calculateMargin, Spacing } from "../../common/styling";

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

  let _formEl: HTMLElement;

  // Receives the events from the goa-public-form element
  let _receiverEl: HTMLElement;

  // Allows the subform to dispatch off messages to parent form without intercepting it's own messages
  let _relayEl: HTMLElement;

  // Allows the subform to be hidden/shown, much like a fieldset
  let _active: boolean = false;

  // List of all the looped items
  let _state: FormState[] = [];

  // reference to child fieldsets to allow data to be relayed to them when the subform item index is changed
  let _fieldsets: Record<string, HTMLElement> = {};

  let _itemIndex: number = -1;

  onMount(() => {
    addRelayListener();
    addBindListener();
    bindChangeHandler();
    dispatchBindMsg();
    bindWithParentForm();
 });

  let _innerFormEl: HTMLElement;
  function onInit(e: Event) {
    _innerFormEl = (e as CustomEvent).detail.el as HTMLElement;
  }

  // Form event interception
  function addBindListener() {
    _receiverEl.addEventListener("_bind", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      interceptFormBind(detail as { el: HTMLElement });
    })
  }

  function addRelayListener() {
    console.debug("SubForm:addRelayListeners", name);

    receive(_receiverEl, (action, data, e) => {
      console.debug(`  RECEIVE(SubForm => ${action}):`, data);
      e.stopPropagation();
      switch (action) {
        case FormDispatchStateToSubformMsg:
          onReceiveState(data as FormState[]);
          break;

        case FormSetFieldsetMsg:
          onSetFieldset(data as FormState[]);
          break;

        case FormToggleActiveMsg:
          onToggleActiveState(data as FormToggleActiveRelayDetail);
          break;

        case FieldsetBindMsg:
          onFieldsetMount(data as FieldsetBindRelayDetail);
          break;

        // pass directly down to the form
        case ExternalContinueMsg:
          dispatch(_formEl, ExternalContinueMsg, data);
          break;

        // bind the list item to the child form
        case ExternalAlterDataMsg:
          alterItem(data as ExternalAlterDataRelayDetail);
          break;

        default:
          console.warn("Subform: Unhandled action", action);
      }
    });
  }

  function alterItem(detail: ExternalAlterDataRelayDetail) {
    console.debug("SubForm:alterItem", detail);
    switch (detail.operation) {
      case "remove":
        _state = [..._state.slice(0, detail.index), ..._state.slice(detail.index + 1)];
        // TODO: dispatch an event with new state to the parent form
        // TODO: handling within the subform is required when there is a subform within a subform
        console.debug("SubForm:alterItem:remove", { data: _state, id });
        relay<SubFormDeleteDataRelayDetail>(_relayEl, SubFormDeleteDataMsg, { data: _state, id }, { bubbles: true });
        break;
      case "edit":
        _itemIndex = detail.index;
        _active = true; // show the form
        // TODO: send continue message to child form
        break;
    }
  }

  /**
   *
   * Intercept the message from the child form component(s) to:
   *  - save a reference of the form element to allow for later dispatching of updated state
   *  - dispatch
   * @param detail
   */
  function interceptFormBind(detail: { el: HTMLElement }) {
    console.debug("SubForm:interceptFormDispatch", { detail });
    // save a reference to the child form
    _formEl = detail.el;

    // redispatch event, but with a subform reference instead, this event will allow the
    // subform util class to have a reference to the subform
    dispatch(_relayEl, "_bind", { el: _receiverEl }, { bubbles: true });
  }

  function onReceiveState(data: FormState[]) {
    console.debug("SubForm:onReceiveState", { data, isArray: Array.isArray(data) });
    if (!Array.isArray(data)) {
      return;
    }

    // store a local reference to the state
    _state = data;

    dispatch(_relayEl, "_stateChange", _state, { bubbles: true });

    // continue to send the data down to any children subforms within the form
    // TODO: This data needs to be send down to the subforms of the child form...
    // - to do this the form needs to dispatch up the list of _subforms it receives
    //   allowing any parent subforms to it to then obtain the required references
    // - With the below function commented out this will limit the number of child subforms
    //   to one level, which is ok for now.
    // relay(_receiverEl, FormDispatchStateMsg, { data: _state, id }, { bubbles: true });
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

  // FIXME: is this required????
  function bindChangeHandler() {
    _receiverEl.addEventListener("_change", (e) => {
      console.debug(`  SUBFORM CHANGE:`, e);
    });
  }

  /**
   * Binds the subform to the parent form to allow state to be relayed back to subforms
   */
  function bindWithParentForm() {
    console.debug("SubForm:bindWithParentForm", name);
    relay<FormBindRelayDetail>(_relayEl, SubformBindMsg, { id, el: _receiverEl}, { bubbles: true, timeout: 1000 });
  }

  /**
   * Relay reference to the goa-public-form element as if it were a fieldset to allow it's visibility to be controlled
   */
  function dispatchBindMsg() {
    // TODO: maybe rename this event/type so it's not specific to fieldsets
    console.log("SubForm:dispatchBindMsg", { id, heading, _receiverEl });
    relay<FieldsetBindRelayDetail>(
      _relayEl,
      FieldsetBindMsg,
      { id, heading, el: _receiverEl },
      { bubbles: true, timeout: 10 }, // FIXME: Getting this to be received is dependant on the timeout value
    );
  }

  /**
   * Toggles the subform's active state
   * @param detail
   */
  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    console.debug("SubForm:onToggleActiveState", { detail });
    _active = detail.active;

    // send active status messages to children
    const firstFieldset = Object.values(_fieldsets)[0];
    console.log("SubForm:onToggleActiveState:firstFieldset", firstFieldset);
    relay(firstFieldset, FormToggleActiveMsg, { active: true });
  }

  /**
   * Deep copies an object to prevent the state from being mutated
   * @param obj
   */
  function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  function onStateChange(e: Event) {
    const detail = (e as CustomEvent).detail as FormState;
    const editStateIndex = _state.findIndex((s) => s.id === detail.id);

    if (editStateIndex >= 0) {
      _state[editStateIndex] = deepCopy(detail);
    } else {
      _state.push(deepCopy(detail));
    }

    // stop original event to prevent just the single subform data from being sent
    // send the array of data instead
    console.debug("Subform:onStateChange", { _state });
    dispatch(_relayEl, "_stateChange", { data: _state, id, index: editStateIndex }, { bubbles: true });

    // initial event will be overridden with a custom _stateChange event containing a state array
    e.stopPropagation();
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

<div
  bind:this={_relayEl}
  style={styles(
    `display: ${_active ? "block" : "none"}`
  )}
>
  <goa-public-form
    sub-form
    bind:this={_receiverEl}
    on:_stateChange={onStateChange}
    on:_continue={onContinue}
    on:_init={onInit}
    style={styles(
      calculateMargin(mt, mr, mb, ml),
    )}
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
