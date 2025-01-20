<svelte:options customElement={{
  tag: "goa-public-subform",
  props: {
    continueMsg: { attribute: "continue-msg", type: "String" }
  }
}}
/>

<script lang="ts">
  import { onMount, tick } from "svelte";
  import { dispatch, receive, relay, style, styles } from "../../common/utils";
  import {
    ExternalAlterDataMsg,
    ExternalAlterDataRelayDetail,
    ExternalContinueMsg,
    ExternalInitStateMsg,
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FormBindMsg,
    FormBindRelayDetail,
    FormDispatchStateMsg, FormDispatchStateRelayDetail,
    FormDispatchStateRelayDetailList,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormState,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail, StateChangeEvent, StateChangeRelayDetail, SubFormBindMsg, SubFormBindRelayDetail,
    SubFormIndexContinueToParentMsg,
    SubFormIndexContinueToSubFormMsg,
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

  // Whether the SubForm is showing the index list or the child form component
  let _mode: "form" | "index" = "index";

  onMount(() => {
    addRelayListener();
    dispatchBindMsg();
    bindWithParentForm();
    bindWithSubformIndex();
  });

  /**
   * Handler internal form component's _init handler
   * @param e
   */
  function onInit(e: Event) {
    e.stopPropagation();

    // reference to child form element to allow for later messages to be sent
    _formEl = (e as CustomEvent).detail.el as HTMLElement;

    // redispatch event, but with a subform reference instead
    dispatch(_relayEl, "_init", { el: _receiverEl }, { bubbles: true });
  }

  // FIXME: why does the subformindex not just send a bind message, then this sends a
  // message back?
  function bindWithSubformIndex() {
    setTimeout(() => {
      const el = document
        .querySelector("goa-public-subform-index")
        .shadowRoot
        .querySelector("[data-bind]") as HTMLElement;
      relay<SubFormBindRelayDetail>(el, SubFormBindMsg, { el: _receiverEl});
    }, 10)
  }

  function addRelayListener() {
    receive(_receiverEl, (action, data, e) => {
      e.stopPropagation();
      switch (action) {
        // handle data being sent to this component
        case FormDispatchStateMsg:
          onDispatchState(data as FormDispatchStateRelayDetailList);
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

        case SubFormIndexContinueToSubFormMsg:
          onSubFormIndexContinueToSubForm();
          break;

        case SubFormIndexContinueToParentMsg:
          onSubFormIndexContinueToParent();
          break;

        // Form event interceptions
        case "_init":
          interceptFormInit(data as { el: HTMLElement });
          break;

        case ExternalInitStateMsg:
          initState(data as FormState[]);
          break;

        // pass directly down to the form
        case ExternalContinueMsg:
          console.log("1. subform passing continue down to form", _formEl);
          relay(_formEl, ExternalContinueMsg, data);
          break;

        // bind the list item to the child form
        case ExternalAlterDataMsg:
          alterItem(data as ExternalAlterDataRelayDetail);
          break;
      }
    });
  }

  function alterItem(detail: ExternalAlterDataRelayDetail) {
    switch (detail.operation) {
      case "remove":
        removeItem(detail.index);
        break;
      case "edit":
        editItem(detail.index);
        break;
    }
  }

  function editItem(index: number) {
    _mode = "form";

    // send selected item to child form
    relay<FormDispatchStateRelayDetail>(_formEl, FormDispatchStateMsg, _state[index]);
  }

  function removeItem(index: number) {
    _state = [..._state.slice(0, index), ..._state.slice(index + 1)];
    dispatch<StateChangeRelayDetail>(_relayEl, StateChangeEvent, {
      type: "list",
      data: _state,
      id
    }, { bubbles: true });
  }

  function initState(data: FormState[]) {
    _state = data;
  }

  //
  function interceptFormInit(detail: { el: HTMLElement }) {
    alert("intercepting init");
    // save a reference to the child form
    _formEl = detail.el;

    // redispatch event, but with a subform reference instead
    dispatch(_relayEl, "_init", { el: _receiverEl }, { bubbles: true });
  }

  function onSubFormIndexContinueToSubForm() {
    _mode = "form";
  }

  function onSubFormIndexContinueToParent() {
    _mode = "index";
    dispatch(_relayEl, "_continue", { el: _receiverEl }, { bubbles: true });
  }

  // Handled event when data is dispatched down from the parent
  function onDispatchState(data: FormDispatchStateRelayDetailList) {
    if (!Array.isArray(data)) {
      return;
    }

    _state = data;

    // dispatch up to the form-utils to ensure it's state is in sync
    dispatch(_relayEl, "_stateChange", { data: _state, id }, { bubbles: true });
  }

  // Collect list of child form item (input, dropdown, etc) elements
  function onFieldsetMount(detail: FieldsetBindRelayDetail) {
    const { id, el } = detail;
    if (!id) return;

    _fieldsets[id] = el;
  }

  // Parent form sends data to the child fieldsets/subforms
  function onSetFieldset(detail: FormState[]) {
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

  /**
   * Binds the subform to the parent form to allow state to be relayed back to subforms
   */
  // TODO: come up with a better name for this function
  function bindWithParentForm() {
    relay<FormBindRelayDetail>(_relayEl, FormBindMsg, { id, el: _receiverEl }, { bubbles: true, timeout: 10 });
  }


  /**
   * Bind as a "fieldset" like component to allow parent to control the visibility of this subform
   */
  function dispatchBindMsg() {
    // relay reference to the goa-public-form element as if it were a fieldset to allow it's visibility to be controlled
    relay<FieldsetBindRelayDetail>(
      _relayEl,
      FieldsetBindMsg,
      { id, heading, el: _receiverEl },
      { bubbles: true, timeout: 10 },
    );
  }

  /**
   * Toggles the subform's active state
   * @param detail
   */
  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    _active = detail.active;
  }


  /**
   * Handles the state change event triggered by a child form and updates the internal state accordingly.
   * This method processes the event, checks if the incoming detail is compatible,
   * updates the internal `_state` array, and dispatches a new event with the updated state array.
   *
   * @param {Event} e - The event object triggered by a child form's state change.
   * @return {void} No value is returned from this function; it handles state updates and event dispatching internally.
   */
  function onChildFormStateChange(e: Event) {
    const detail = (e as CustomEvent).detail as StateChangeRelayDetail;
    if (detail.type === "list") {
      console.warn("SubForm: onChildFormStateChange: list not supported");
      return;
    }

    // FIXME: these ids don't align...
    const editStateIndex = _state.findIndex((s) => s.uuid === detail.data.uuid);

    // Required to prevent the detail from being changed after being added to the array
    const deepCopiedData = JSON.parse(JSON.stringify(detail.data));

    if (editStateIndex >= 0) {
      _state[editStateIndex] = deepCopiedData;
    } else {
      _state.push(deepCopiedData);
    }

    // stop original event to prevent just the single subform data from being sent, and
    // send the array of data instead
    dispatch<StateChangeRelayDetail>(_relayEl, StateChangeEvent, {
      type: "list",
      data: _state,
      id
    }, { bubbles: true });

    // initial event will be overridden with a custom _stateChange event containing a state array
    e.stopPropagation();
  }

  /**
   * Handles the completion of a child form's lifecycle. Updates or adds the child form state
   * into the parent state, changes the mode to "index," and sends a reset message to the form.
   *
   * @param {Event} e - The event object triggered when the child form completes. It must contain a
   *                    `detail` field with the child form state as a `FormState` object.
   *
   * @return {void} - This method does not return a value.
   */
  function onChildFormComplete(e: Event) {
    // const childFormState = (e as CustomEvent).detail as FormState;

    // determine if the child state is being added or replacing existing data
    // const index = _state.findIndex(s => s.uuid === childFormState.uuid);
    // const deepCopiedData = JSON.parse(JSON.stringify(childFormState));
    // if (index >= 0) {
    //   _state[index] = deepCopiedData;
    // } else {
    //   _state.push(deepCopiedData);
    // }

    // change back to list mode
    _mode = "index";

    // send message to form to reset it's state
    relay(_formEl, FormResetFormMsg);

    e.stopPropagation();
  }

  function onFormContinue(e: Event) {
    e.stopPropagation();
  }
</script>

<div
  bind:this={_relayEl}
  data-id="subform"
>
  <section
    style={
      style("display", `${_active && _mode === "index" ? "block" : "none"}`)
    }
  >
    <slot name="subform-index" />
  </section>
  <goa-public-form
    data-id="subform-form"
    sub-form
    bind:this={_receiverEl}
    on:_stateChange={onChildFormStateChange}
    on:_continue={onFormContinue}
    on:_complete={onChildFormComplete}
    on:_init={onInit}
    style={styles(
      calculateMargin(mt, mr, mb, ml),
      `display: ${_active && _mode === "form" ? "block" : "none"}`,
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
