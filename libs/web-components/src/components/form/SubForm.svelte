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
    FormDispatchStateRelayDetailList, FormPageBackMsg,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormState,
    StateChangeEvent, StateChangeRelayDetail, SubFormBindMsg, SubFormBindRelayDetail,
    SubFormIndexContinueToParentMsg,
    SubFormIndexContinueToSubFormMsg,
    SubFormNewItemMsg,
    SubFormNewItemRelayDetail,
  } from "../../types/relay-types";

  // Subform props
  export let id: string = "";

  // Form props
  export let name: string;
  export let backUrl: string = "";
  export let dispatchOn: "continue" | "complete" = "continue";

  let _formEl: HTMLElement;

  // Receives the events from the goa-public-form element
  let _receiverEl: HTMLElement;

  // Allows the subform to dispatch off messages to parent form without intercepting it's own messages
  let _relayEl: HTMLElement;

  // List of all the looped items
  let _state: FormState[] = [];

  // reference to child fieldsets to allow data to be relayed to them when the subform item index is changed
  let _fieldsets: Record<string, HTMLElement> = {};

  // Whether the SubForm is showing the index list or the child form component
  let _mode: "form" | "index" = "index";

  // Index to the current item being created or editted. This allows access to the current
  // item's history to allow handling of "Back" clicks.
  let _itemIndex: number = 0;

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

        case FormPageBackMsg:
          onFormPageBack();
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

        case ExternalInitStateMsg:
          initState(data as FormState[]);
          break;

        // pass directly down to the form
        case ExternalContinueMsg:
          relay(_formEl, ExternalContinueMsg, data);
          break;

        // bind the list item to the child form
        case ExternalAlterDataMsg:
          alterItem(data as ExternalAlterDataRelayDetail);
          break;
      }
    });
  }

  // Handles the Back event when it's sent from the first page within the subform.
  function onFormPageBack() {
    // the index page is what was seen before the first page of the subform
    _mode = "index";

    // clear out any partially completed form from the top of the _state stack
    _state.pop();
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
    setItemIndex(index);

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
    resetItemIndex();
  }

  function onSubFormIndexContinueToSubForm() {
    _mode = "form";

    // Check if this is a mounted form item but not registered on state (2+ sub-form item)
    const currentItem = _state[_itemIndex];
    const notOnStateItem = !currentItem || !currentItem.form || Object.keys(currentItem.form).length === 0;

    if (notOnStateItem) {
      // Send SubFormNewItemMsg for Form -> Fieldset to re-register
      if (_formEl) {
        relay<SubFormNewItemRelayDetail>(_formEl, SubFormNewItemMsg, {
          itemIndex: _itemIndex
        });
      }
    }
  }

  function onSubFormIndexContinueToParent() {
    _mode = "index";
    resetItemIndex();
    dispatch(_relayEl, "_continue", { el: _receiverEl }, { bubbles: true });
  }

  function resetItemIndex() {
    _itemIndex = _state.length;
  }

  function setItemIndex(index: number) {
    _itemIndex = index;
  }

  // Handled event when data is dispatched down from the parent
  function onDispatchState(data: FormDispatchStateRelayDetailList) {
    if (!Array.isArray(data)) {
      return;
    }

    _state = data;

    // dispatch up to the form-utils to ensure it's state is in sync
    dispatchState();
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
      { id, el: _receiverEl },
      { bubbles: true, timeout: 10 },
    );
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

    // subform item being edited
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
    dispatchState();

    // initial event will be overridden with a custom _stateChange event containing a state array
    e.stopPropagation();
  }

  function dispatchState() {
    dispatch<StateChangeRelayDetail>(_relayEl, StateChangeEvent, {
      type: "list",
      data: _state,
      id
    }, { bubbles: true });
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
    // change back to list mode
    _mode = "index";
    resetItemIndex();

    // send message to form to reset it's state
    relay(_formEl, FormResetFormMsg);

    e.stopPropagation();
  }

  function onFormContinue(e: Event) {
    e.stopPropagation();
  }
</script>

<div bind:this={_relayEl} data-id="subform">
  <section style={style("display", `${_mode === "index" ? "block" : "none"}`)}>
    <slot name="subform-index" />
  </section>

  <goa-public-form
    {name}
    {dispatchOn}
    {backUrl}
    data-id="subform-form"
    bind:this={_receiverEl}
    on:_stateChange={onChildFormStateChange}
    on:_continue={onFormContinue}
    on:_complete={onChildFormComplete}
    on:_init={onInit}
    style={styles(
      `display: ${_mode === "form" ? "block" : "none"}`,
    )}
  >
    <slot />
  </goa-public-form>
</div>
