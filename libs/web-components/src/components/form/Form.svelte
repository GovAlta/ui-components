<svelte:options
  customElement={{
    tag: "goa-public-form",
    props: {
      backUrl: { attribute: "back-url", type: "String" },
      subForm: { attribute: "sub-form", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, performOnce, receive, relay } from "../../common/utils";
  import {
    ExternalAlterDataMsg,
    ExternalAlterDataRelayDetail,
    ExternalAppendDataMsg,
    ExternalAppendDataRelayDetail,
    ExternalContinueMsg,
    ExternalContinueRelayDetail,
    ExternalInitStateDetail,
    ExternalInitStateMsg,
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetChangeMsg,
    FieldsetChangeRelayDetail,
    FieldsetMountFormItemMsg,
    FieldsetMountFormRelayDetail,
    FieldsetCompleteMsg,
    FormBackUrlDetail,
    FormBackUrlMsg,
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
    SubFormDeleteDataMsg,
    SubFormDeleteDataRelayDetail,
    StateChangeRelayDetail,
    StateChangeEvent,
  } from "../../types/relay-types";

  // ========
  // Required
  // ========

  export let name: string;

  // ========
  // Optional
  // ========

  // Spacing
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Url that will be navigated back to when the back button in the first fieldset is clicked
  export let backUrl: string = "";

  export let subForm: boolean = false;

  // =======
  // Private
  // =======

  let _rootEl: HTMLFormElement;
  let _childReceiverEl: HTMLElement;

  // List of child forms to allow for form data to be passed down to the child form
  let _childForms: Record<string, HTMLElement> = {};

  // Fieldset binding details
  let _fieldsets: Record<string, FieldsetBindRelayDetail> = {};

  // Form field (inputs, selects, etc.) element list
  // let _formFields: Record<string, Record<string, HTMLElement>> = {};

  // Form summary element reference
  let _formSummaryEl: HTMLElement;

  // Timeout id for form item binding
  let _formItemBindingTimeoutId: any;

  // Timeout id for subform binding
  let _childFormStateTimeoutId: any;

  // Last fieldset id in history
  let _lastViewedFieldset: string;

  // Form state
  let _state: FormState = {
    uuid: crypto.randomUUID(),
    form: {},
    history: [],
    editting: "",
    lastModified: undefined,
    status: "not-started",
  };

  onMount(() => {
    // provide html element link to outside world
    dispatch(_rootEl, "_init", { el: _rootEl }, { bubbles: true });

    addWindowPopStateListener();
    addRelayListener();
    addSubformRelayListener();
    setTimeout(setChildrenState, 100);  // FIXME: not liking this within a setTimeout
  });

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
      dispatch<StateChangeRelayDetail>(_rootEl, StateChangeEvent, {
        type: "details",
        data: _state,
      }, { bubbles: true });

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
        case FieldsetChangeMsg:
          onFieldsetChange(data as FieldsetChangeRelayDetail);
          break;
        case FieldsetMountFormItemMsg:
          // onFieldsetMountFormItem(data as FieldsetMountFormRelayDetail);
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
        case ExternalAppendDataMsg:
          onAppendData(data as ExternalAppendDataRelayDetail);
          break;
        case ExternalInitStateMsg:
          initState(data as ExternalInitStateDetail);
          break;
        case FormResetFormMsg:
          resetState();
          break;
        case SubFormDeleteDataMsg:
          // deleteSubFormData(data as SubFormDeleteDataRelayDetail);
          break;
      }
    });
  }

  // ***************
  // Relay listeners
  // ***************


  function onReceiveState(data: FormDispatchStateRelayDetail) {
    _state = { ..._state, ...data };
    setChildrenState();
  }

  function onFormBind(detail: FormBindRelayDetail) {
    _childForms[detail.id] = detail.el;

    // bind all the child forms
    performOnce(_childFormStateTimeoutId, dispatchChildFormState, 100)
  }

  /**
   * Handles appending new data to array-type form data
   * @param detail Contains the id of the array and the new data to append
   */
  function onAppendData(detail: ExternalAppendDataRelayDetail) {
    // const { id, data } = detail;
    // // @ts-expect-error ignore
    // const temp = [...(_state.form[id] || [])];
    // temp.push(data);
    // _state.form[id].data = [...temp];

    // dispatchStateChange("continue", id);
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

  /**
   * Handles mounting of form items within fieldsets
   * @param detail Contains the name, element, and id of the form item
   */
  // function onFieldsetMountFormItem(detail: FieldsetMountFormRelayDetail) {
  //   const { name, el, id } = detail;
  //   const old = _formFields[id] || {};
  //   _formFields[id] = { ...old, [name]: el };
  //
  //   // TODO: store the element's form-item index here as well
  // }

  /**
   * Create collection of fieldsets and relay messages to them to make the current item visible
   * @param detail Contains the child fieldset to bind
   */
  function onFieldsetBind(detail: FieldsetBindRelayDetail) {
    // save the fieldsets to allow for later sending of messages
    _fieldsets = { ..._fieldsets, [detail.id]: detail };

    // save the initial state of the fieldset (data prop not set)
    _state.form[detail.id] = { ..._state.form[detail.id], skipSummary: detail.skipSummary,  heading: detail.heading };

    // send the back url to child fieldsets, however only the first will need it
    if (backUrl) {
      relay<FormBackUrlDetail>(detail.el, FormBackUrlMsg, { url: backUrl });
    }

    // run on the last fieldset
    _formItemBindingTimeoutId = performOnce(_formItemBindingTimeoutId, () => {
      if (_lastViewedFieldset) {
        // last page has priority
        const item = _fieldsets[_lastViewedFieldset];
        sendToggleActiveStateMsg(item.id);
      } else {
        // mark the first fieldset as active
        const [id] = Object.entries(_fieldsets)[0];
        _state.history.push(id);
        sendToggleActiveStateMsg(id);
      }
    });
  }

  /**
   * Listens to `_change` events by input elements nested within fieldsets and update the state
   * @param detail Contains the id, state, and dispatch type of the changed fieldset
   */
  function onFieldsetChange(detail: FieldsetChangeRelayDetail) {
    const { id, state, dispatchOn } = detail;

    // clean empty values from the data
    // TODO: add comment about why this is needed
    for (const [name, fieldsetState] of Object.entries(state.data)) {
      if (fieldsetState.value === "") {
        delete state.data[name];
      }
    }

    // TODO: subform needs to dispatch this event...
    _state.form[id] = { heading: state.heading, data: { type: "details", fieldsets: state.data } };
    _state.lastModified = new Date();

    // if (true || dispatchOn === "change") {
    dispatchStateChange(dispatchOn, id);
    // }
  }

  /**
   * Handles continue events from fieldsets to navigate between pages
   * @param detail Contains the next page to navigate to
   */
  function onContinue(detail: ExternalContinueRelayDetail) {
    const { next } = detail;
    const lastPage = _state.history[_state.history.length - 1];
    if (!lastPage) {
      console.error("Form:onContinue", name, "no last page");
      return;
    }

    console.debug("2. Form:onContinue", name, { _state });
    // dispatch state to app to allow dynamic binding, along with the page where a state change occurred
    dispatchStateChange("continue", lastPage);

    // if no page is currently being edited just go to the next page
    if (_state.editting) {
      // clear the errors of the current page being edited
      resetFieldsetErrors(_state.editting);

      // when editting a previous value, we need to determine if the `next` page is in the same
      // "direction" as was previously followed, and if so send them back to the last page in their
      // history (summary). If the `next` is different then the previous history must be cleared
      // from that point on.
      const oldNextIndex = _state.history.indexOf(_state.editting) + 1;

      // user input did not affect their path, so forward them back to the end, otherwise the user
      // has altered their path and the history must be clear from this point forward
      const jumpToSummary = _state.history[oldNextIndex] === next;
      if (jumpToSummary) {
        sendToggleActiveStateMsg(lastPage);
      } else {
        _state.history = [..._state.history.slice(0, oldNextIndex), next];
        sendToggleActiveStateMsg(next);
        sendEdittingStateMsg();

        _state.editting = "";
      }
    } else {
      // clear most recent fieldset's errors, to prevent previously fixed errors from still being seen
      resetFieldsetErrors(lastPage);

      // prevent duplicates in history
      if (lastPage !== next) {
        _state.history.push(next);
      }

      // show the next page and hide the others
      sendToggleActiveStateMsg(next);
    }

    // sync the new state
    syncFormSummaryState();
  }

  /**
   * Dispatches state change events to the app to trigger any dynamic binding
   * @param dispatchType Indicates the type of state change (change | continue)
   * @param fieldSetId The id of the fieldset where the state change occurred
   */
  function dispatchStateChange(
    dispatchType: "change" | "continue",
    fieldSetId: string,
  ) {
    dispatch<StateChangeRelayDetail>(
      _rootEl,
      StateChangeEvent, { type: "details", data: _state },
      { bubbles: true, timeout: 100 },
    );
  }

  /**
   * Synchronizes the form summary state with the app to ensure consistent display of form data
   */
  function syncFormSummaryState() {
    relay<FormDispatchStateRelayDetail>(
      _formSummaryEl,
      FormDispatchStateMsg,
      _state,
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
    sendEdittingStateMsg();
  }

  /**
   * Notifies fieldsets of editting state to allow them to not show the `back` link
   */
  function sendEdittingStateMsg() {
    for (const fieldset of Object.values(_fieldsets)) {
      relay<FormDispatchEditRelayDetail>(
        fieldset.el,
        FormDispatchEditMsg,
        { id: _state.editting }
      );
    }
  }

  /**
   * Handles marking the form as complete and dispatching the final state to the app
   */
  function onFormComplete() {
    _state.status = "complete";

    // NOTE: don't do this now -- Initially it was thought that at this point we would submit the
    // cleaned data and the backend would move this data into it's own table structure, but since
    // the data may to have notes added by an admin on the backend, the data does not need to be
    // cleaned until a later time.
    // removes any data collected that doesn't correspond with the final history path
    // const cleanedState = _state.history.reduce<Record<string, FieldsetData>>((acc, fieldsetId) => {
    //   acc[fieldsetId] = _state.form[fieldsetId]
    //   return acc;
    // }, {})

    dispatch<FormState>(_rootEl, "_complete", _state, { bubbles: true });
  }

  function resetState() {
    const [id] = Object.entries(_fieldsets)[0];

    _state = {
      uuid: crypto.randomUUID(),
      form: {},
      history: [id],
      editting: "",
      lastModified: undefined,
      status: "not-started",
    };

    // resetting html inputs within form components
    for (const { el } of Object.values(_fieldsets)) {
      relay(el, FormResetFormMsg);
    }
    // reset form summary
    syncFormSummaryState();

    // reset the active fieldset
    sendToggleActiveStateMsg(id);
  }

  // *********
  // Functions
  // *********

  /**
   * Resets the errors for a specific fieldset
   * @param fieldsetName The id of the fieldset to reset errors for
   */
  function resetFieldsetErrors(fieldsetName: string) {
    relay(_fieldsets[fieldsetName].el, FormResetErrorsMsg, null);
  }

  /**
   * Sends a toggle active state message to fieldsets to highlight the current active page
   * @param page The id of the page to set as active
   */
  function sendToggleActiveStateMsg(page: string) {
    const keys = Object.keys(_fieldsets);
    keys.forEach((key) => {
      relay<FormToggleActiveRelayDetail>(
        _fieldsets[key].el,
        FormToggleActiveMsg,
        {
          first: false, //key === _firstElement,
          active: key === page,
        },
      );
    });
  }

  /**
   * Listens to url changes or location back events to update the form state and active page
   */
  function addWindowPopStateListener() {
    // event should only be created on top level form, not subforms
    if (subForm) {
      return;
    }

    // TODO: ensure this listener is removed when another form becomes active
    window.addEventListener("popstate", (e: PopStateEvent) => {
      const history = [..._state.history];
      history.pop();
      _state.history = history;

      sendToggleActiveStateMsg(history[history.length - 1]);
      e.stopPropagation();
    });
  }

  /**
   * Initializes the form state from the passed in data
   * @param detail The data to initialize the form state with
   */
  function initState(detail: ExternalInitStateDetail) {
    if (!detail) {
      return;
    }

    if (typeof detail === "string") {
      _state = JSON.parse(detail);
    } else {
      _state = detail;
    }

    // initialize history with first page if history is empty
    let historyPageCount = _state.history.length;
    if (historyPageCount > 0) {
      _lastViewedFieldset = _state.history[historyPageCount - 1];
    }

    // show the fieldset
    dispatchStateChange("continue", _lastViewedFieldset);
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

<form bind:this={_rootEl} style={calculateMargin(mt, mr, mb, ml)}
      data-id={`form: ${name}`}
>
  <div bind:this={_childReceiverEl}>
    <slot />
  </div>
</form>
