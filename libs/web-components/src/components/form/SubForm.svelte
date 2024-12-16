<svelte:options tag="goa-subform" />

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive, relay, styles } from "../../common/utils";
  import {
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetValidationRelayDetail,
    FormBindMsg,
    FormBindRelayDetail,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetailList,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormState,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
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

  onMount(() => {
    addRelayListener();
    bindChangeHandler();
    dispatchBindMsg();
    bindWithParentForm();
 });

  let _innerFormEl: HTMLElement;
  function onInit(e: Event) {
    _innerFormEl = (e as CustomEvent).detail.el as HTMLElement;
  }

  function addRelayListener() {
    console.debug("SubForm:addRelayListeners", name);

    receive(_receiverEl, (action, data, e) => {
      console.debug(`  RECEIVE(SubForm => ${action}):`, data);
      e.stopPropagation();
      switch (action) {
        case FormDispatchStateMsg:
          onReceiveState(data as FormDispatchStateRelayDetailList);
          break;
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

  function onReceiveState(data: FormDispatchStateRelayDetailList) {
    console.debug("SubForm:onReceiveState", { data });
    _state = data;
    dispatch(_relayEl, "_stateChange", { data: _state, id }, { bubbles: true });
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
  // TODO: come up with a better name for this function
  function bindWithParentForm() {
    console.debug("SubForm:bindWithParentForm", name);
    relay<FormBindRelayDetail>(_relayEl, FormBindMsg, { id, el: _receiverEl}, { bubbles: true, timeout: 10 });
  }


  function dispatchBindMsg() {
    // relay reference to the goa-public-form element as if it were a fieldset to allow it's visibility to be controlled
    // TODO: maybe rename this event/type so it's not specific to fieldsets
    relay<FieldsetBindRelayDetail>(
      _relayEl,
      FieldsetBindMsg,
      {
        id,
        heading,
        el: _receiverEl,
      },
      {
        bubbles: true,
        timeout: 10,
      },
    );
  }

  /**
   * Toggles the subform's active state
   * @param detail
   */
  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    console.debug("SubForm:onToggleActiveState", { detail });
    _active = detail.active;
  }

  /**
   * Deep copies an object to prevent the state from being mutated
   * @param obj
   */
  function deepCopy(obj: any) {
    const objCopy = JSON.parse(JSON.stringify(obj));
    return objCopy;
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

<div bind:this={_relayEl}>
  <goa-public-form
    bind:this={_receiverEl}
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
