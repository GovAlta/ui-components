<svelte:options
  customElement={{
    tag: "goa-public-form",
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, performOnce, receive, relay, style } from "../../common/utils";
  import {
    ExternalContinueMsg,
    ExternalContinueRelayDetail,
    ExternalInitStateDetail,
    ExternalInitStateMsg,
    FieldsetChangeMsg,
    FieldsetChangeRelayDetail,
    FieldsetCompleteMsg,
    FormBindMsg,
    FormBindRelayDetail,
    FormDispatchEditMsg,
    FormDispatchEditRelayDetail,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormDispatchStateRelayDetailList,
    FormResetErrorsMsg,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormSetFieldsetRelayDetail,
    FormState,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
    StateChangeRelayDetail,
    StateChangeEvent,
    FormPageBindMsg,
    FormPageBindRelayDetail,
    FieldsetBindRelayDetail,
    FieldsetBindMsg,
    FormPageBackMsg, FormStatus,
  } from "../../types/relay-types";

  // ========
  // Required
  // ========

  export let status: "initializing" | "complete" = "complete";

  // ========
  // Optional
  // ========

  // Helps when debugging complex forms
  export let name: string = "[name] not set";

  // =======
  // Private
  // =======

  let _rootEl: HTMLFormElement;
  let _senderEl: HTMLFormElement;
  let _childReceiverEl: HTMLElement;

  // List of child forms to allow for form data to be passed down to the child form
  let _childForms: Record<string, HTMLElement> = {};

  // Fieldset binding details
  let _fieldsets: Record<string, FieldsetBindRelayDetail> = {};
  let _formPages: Record<string, FormPageBindRelayDetail> = {};

  // Form summary element reference
  let _formSummaryEl: HTMLElement;

  // Timeout id for subform binding
  let _childFormStateTimeoutId: any;

  // Timeout for performOnce op
  let _formItemBindingTimeoutId;

  // Timeout to prevent more than one stateChange event from being emitted
  let _stateChangeTimeoutId: any;

  // Form state
  let _state: FormState;

  function getDefaultState(): FormState {
    return {
      uuid: crypto.randomUUID(),
      form: {},
      history: [],
      editting: "",
      lastModified: undefined,
      status: "not-started",
    } as FormState;
  }

  onMount(() => {
    // provide html element link to outside world
    dispatch(_rootEl, "_init", { el: _rootEl }, { bubbles: true });
    addRelayListener();
    addSubformRelayListener();

    _state = getDefaultState();
  });

  $: if (status === "complete") {
    setChildrenState();
  }

  /**
   * Adds a listener to the form element to listen for _stateChange event from subforms,
   * so data received will always be an array.
   */
  function addSubformRelayListener() {
    _childReceiverEl.addEventListener(StateChangeEvent, (e) => {
      const detail = (e as CustomEvent).detail as StateChangeRelayDetail;
      if (detail.type === "details") {
        console.warn("Form:addSubformRelayListener", name, "received details type, ignoring");
        return;
      }

      // subform state is always a list
      _state.form[detail.id] = { data: { type: "list", items: detail.data } };

      // redispatch this form's data
      dispatchStateChange();

      syncFormSummaryState();
    });
  }

  /**
   * Adds a listener to the form element to handle relay messages
   */
  function addRelayListener() {
    receive(_rootEl, (type, data, e) => {
      e.stopPropagation();
      switch (type) {
        case FormDispatchStateMsg:
          onReceiveState(data as FormDispatchStateRelayDetail);
          break;
        case FormBindMsg:
          onFormBind(data as FormBindRelayDetail);
          break;
        case FieldsetBindMsg:
          onFieldsetBind(data as FieldsetBindRelayDetail);
          break;
        case FormPageBindMsg:
          onFormPageBind(data as FormPageBindRelayDetail);
          break;
        case FormPageBackMsg:
          onFormPageBack(e);
          break;
        case FieldsetChangeMsg:
          onFieldsetChange(data as FieldsetChangeRelayDetail);
          break;
        case FormSummaryBindMsg:
          onFormSummaryBind(data as FormSummaryBindRelayDetail);
          break;
        case ExternalContinueMsg:
          onContinue(data as ExternalContinueRelayDetail);
          break;
        case FormSummaryEditPageMsg:
          onSetPage(data as FormSummaryEditPageRelayDetail);
          break;
        case FieldsetCompleteMsg:
          onFormComplete();
          break;
        case ExternalInitStateMsg:
          setState(data as ExternalInitStateDetail);
          break;
        case FormResetFormMsg:
          resetState();
          break;
      }
    });
  }

  // ***************
  // Relay listeners
  // ***************

  function onReceiveState(data?: FormDispatchStateRelayDetail) {
    _state = { ..._state, ...(data || {}) };
    setChildrenState();

    sendToggleActiveStateMsg(_state.history[_state.history.length - 1]);
    syncFormSummaryState();
  }

  function onFormBind(detail: FormBindRelayDetail) {
    _childForms[detail.id] = detail.el;

    // bind all the child forms
    _childFormStateTimeoutId = performOnce(_childFormStateTimeoutId, dispatchChildFormState, 100);
  }

  /**
   * Handles binding of the form-summary component to enable state synchronization
   * @param detail Contains the form summary element to bind
   */
  function onFormSummaryBind(detail: FormSummaryBindRelayDetail) {
    // save the form-summary element reference for relaying messages
    _formSummaryEl = detail.el;

    // sync any initial state
    syncFormSummaryState();
  }

  function onFieldsetBind(detail: FieldsetBindRelayDetail) {
    const { id } = detail;
    _fieldsets[id] = detail;
  }

  /**
   * Create collection of fieldsets and relay messages to them to make the current item visible
   * @param detail Contains the child fieldset to bind
   */
  function onFormPageBind(detail: FormPageBindRelayDetail) {
    // save the fieldsets to allow for later sending of messages
    _formPages[detail.id] = detail;

    // save the initial state of the fieldset (data prop not set)
    _state.form[detail.id] = { ..._state.form[detail.id], heading: detail.heading };

    // Once all FormPages are obtained, set the visibility of the first item in the list
    // as visible for the default state; this may be overridden if the state is initialized
    // after being fetched.
    _formItemBindingTimeoutId = performOnce(_formItemBindingTimeoutId, () => {
      // mark the first fieldset as active
      const [id] = Object.entries(_formPages)[0];
      addToHistory(id);
      sendToggleActiveStateMsg(id);
    });
  }

  /**
   * Adds a given identifier to the history if it is not already present.
   *
   * @param {string} id - The unique identifier to be added to the history.
   * @return {void} This method does not return a value.
   */
  function addToHistory(id: string) {
    if (_state.history.includes(id)) {
      console.warn("Form:addToHistory", name, "history already contains id", id);
      return;
    }

    _state.history.push(id);
  }

  /**
   * Listens to `_change` events by input elements nested within fieldsets and update the state
   * @param detail Contains the id, state, and dispatch type of the changed fieldset
   */
  function onFieldsetChange(detail: FieldsetChangeRelayDetail) {
    const { id, state } = detail;

    // updating form state with the fieldset specific data
    _state.form[id] = { heading: state.heading, data: { type: "details", fieldsets: state.data } };

    dispatchStateChange();
  }

  /**
   * Handles continue events from fieldsets to navigate between pages
   * @param detail Contains the next page to navigate to
   */
  function onContinue(detail: ExternalContinueRelayDetail) {
    const { next } = detail;
    const lastPage = _state.history[_state.history.length - 1];
    if (!lastPage) {
      console.warn("Form:onContinue", name, "no last page");
      return;
    }

    // dispatch state to app to allow dynamic binding
    dispatchStateChange();

    // if no page is currently being edited just go to the next page
    if (_state.editting) {
      // clear the errors of the current page being edited
      resetFieldsetErrors(_state.editting);

      // when editting a previous value, we need to determine if the `next` page is in the same
      // "direction" as was previously followed, and if so send them back to the last page in their
      // history (summary). If the `next` is different then the previous history must be cleared
      // from that point on.
      const oldNextIndex = _state.history.indexOf(_state.editting) + 1;

      // reset page being editted
      _state.editting = "";

      // user input did not affect their path, so forward them back to the end, otherwise the user
      // has altered their path and the history must be clear from this point forward
      const jumpToSummary = _state.history[oldNextIndex] === next;
      if (jumpToSummary) {
        sendToggleActiveStateMsg(lastPage);
      } else {
        _state.history = [..._state.history.slice(0, oldNextIndex), next];
        sendToggleActiveStateMsg(next);
        sendEdittingStateMsg("");
      }
    } else {
      // clear most recent fieldset's errors, to prevent previously fixed errors from still being seen
      resetFieldsetErrors(lastPage);

      // prevent duplicates in history
      if (lastPage !== next) {
        addToHistory(next);
      }

      // show the next page and hide the others
      sendToggleActiveStateMsg(next);
    }

    // sync the new state
    syncFormSummaryState();
  }

  /**
   * Synchronizes the form summary state with the app to ensure consistent display of form data
   */
  function syncFormSummaryState() {
    // filter out any form items that don't contain fieldsets
    const filteredState = { ..._state };
    const fieldsetKeys = Object.keys(_fieldsets);

    filteredState.form = Object.entries(filteredState.form)
      .filter(([id, _]) => {
        return fieldsetKeys.includes(id);
      })
      .reduce((acc, [id, item]) => {
        acc[id] = item;
        return acc;
      }, {});

    relay<FormDispatchStateRelayDetail>(
      _formSummaryEl,
      FormDispatchStateMsg,
      filteredState,
    );
  }

  /**
   * Handles setting the page to edit mode and updating the state accordingly
   * @param detail Contains the id of the page to set as the current editing page
   */
  function onSetPage(detail: FormSummaryEditPageRelayDetail) {
    // editting mode is an ephemeral value and is *not* saved to local storage
    _state.editting = detail.id;

    sendToggleActiveStateMsg(detail.id);
    sendEdittingStateMsg(detail.id);
  }

  /**
   * Notifies fieldsets of editting state to allow them to not show the `back` link
   */
  function sendEdittingStateMsg(id: string) {
    for (const formPage of Object.values(_formPages)) {
      relay<FormDispatchEditRelayDetail>(
        formPage.el,
        FormDispatchEditMsg,
        { id }
      );
    }
  }

  /**
   * Handles marking the form as complete and dispatching the final state to the app
   */
  function onFormComplete() {
    dispatchStateChange("complete", 0);
    dispatch<FormState>(_rootEl, "_complete",
      {..._state, status: "complete"},
      { bubbles: true }
    );
  }

  function resetState() {
    // After the first time _state is initialized the history is initialized with the
    // first FormPage id after handling the FormPage binding, so this first page needs
    // to be retained after reset
    const firstPage = _state.history[0];
    _state = getDefaultState();
    addToHistory(firstPage);

    // resetting html inputs within form components
    for (const { el } of Object.values(_fieldsets)) {
      relay(el, FormResetFormMsg);
    }

    // reset form summary
    syncFormSummaryState();

    // reset the active fieldset
    const [id] = Object.entries(_formPages)[0];
    sendToggleActiveStateMsg(id);
  }

  // *********
  // Functions
  // *********

  /**
   * Dispatches state change events to the app to trigger any dynamic binding
   */
  function dispatchStateChange(status: FormStatus = "in-progress", debounce = 500) {
    _stateChangeTimeoutId = performOnce(_stateChangeTimeoutId, () => {
      dispatch<StateChangeRelayDetail>(
        _rootEl,
          StateChangeEvent,
          { type: "details", data: { ..._state, lastModified: new Date(), status }},
          { bubbles: true },
      );
    }, debounce);
  }

  /**
   * Resets the errors for a specific fieldset
   * @param fieldsetName The id of the fieldset to reset errors for
   */
  function resetFieldsetErrors(fieldsetName: string) {
    // fieldsets don't exist in all FormPages
    if (!_fieldsets[fieldsetName]) {
      console.warn("Form:resetFieldsetErrors", name, "fieldset does not exist", fieldsetName);
      return;
    }
    relay(_fieldsets[fieldsetName].el, FormResetErrorsMsg, null);
  }

  /**
   * Sends a toggle active state message to fieldsets to highlight the current active page
   * @param page The id of the page to set as active
   */
  function sendToggleActiveStateMsg(page: string) {
    const keys = Object.keys(_formPages);
    keys.forEach((key) => {
      relay<FormToggleActiveRelayDetail>(
        _formPages[key].el,
        FormToggleActiveMsg,
        { active: key === page },
      );
    });
  }

  function onFormPageBack(_e: Event) {
    // update history state of the current item
    const formHistory = _state.history;

    // first page of a subform, redispatch event to allow the parent form to handle it
    if (formHistory.length === 1) {
      relay(_senderEl, FormPageBackMsg, null, { bubbles: true });
      return;
    }

    formHistory.pop();
    _state.history = formHistory;

    sendToggleActiveStateMsg(_state.history[_state.history.length - 1]);

    // browser back
    history.back();
  }

  /**
   * Sets the form state from the passed in data
   * @param detail The data to initialize the form state with
   */
  function setState(detail?: ExternalInitStateDetail) {
    if (typeof detail === "string") {
      _state = { ..._state, ...JSON.parse(detail) };
    } else {
      _state = { ..._state, ...(detail || {}) };
    }

    let lastViewedFieldset;
    // initialize history with first page if history is empty
    let historyPageCount = _state.history?.length ?? 0;
    if (historyPageCount > 0) {
      lastViewedFieldset = _state.history[historyPageCount - 1];
    }

    setTimeout(() => {
      // Show the last viewed page or show the first page
      if (lastViewedFieldset) {
        // last page has priority
        const item = _formPages[lastViewedFieldset];
        sendToggleActiveStateMsg(item.id);
      } else {
        // mark the first fieldset as active
        const [id] = Object.entries(_formPages)[0];
        addToHistory(id);
        sendToggleActiveStateMsg(id);
      }

      syncFormSummaryState();
      dispatchStateChange(_state.history.length > 1 ? "in-progress" : "not-started");
      dispatchChildFormState();
    }, 200);
  }

  /**
   * Dispatches the state to the child forms
   */
  function dispatchChildFormState() {
    for (const [id, el] of Object.entries(_childForms)) {
     const data = _state.form[id]?.data;
      // data is only sent to child forms and all child forms are lists
      if (data?.type === "list") {
        relay<FormDispatchStateRelayDetailList>(el, FormDispatchStateMsg, data.items);
      }
    }
  }

  /**
   * Restores the fieldset and subform states
   */
  function setChildrenState() {
    for (const [name, detail] of Object.entries(_fieldsets)) {
      const value = _state.form[name]?.data;
      if (value) {
        relay<FormSetFieldsetRelayDetail>(detail.el, FormSetFieldsetMsg, {
          name,
          value,
        });
      }
    }
  }
</script>

<div bind:this={_senderEl} />
<form
  bind:this={_rootEl}
  data-id={`form: ${name}`}
  style={style("visibility", status === "complete" ? "visible" : "hidden")}
>
  <div bind:this={_childReceiverEl}>
    <slot />
  </div>
</form>
