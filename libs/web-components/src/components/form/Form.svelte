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
    FieldsetData,
    FieldsetMountFormItemMsg,
    FieldsetMountFormRelayDetail,
    FieldsetSubmitMsg,
    FormBackUrlDetail,
    FormBackUrlMsg,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormResetErrorsMsg,
    FormSetFieldsetMsg,
    FormSetFieldsetRelayDetail,
    FormState,
    FormStateData,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
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

  let _formEl: HTMLFormElement;

  // Fieldset binding details
  let _fieldsets: Record<string, FieldsetBindRelayDetail> = {};

  // Form field (inputs, selects, etc.) element list
  let _formFields: Record<string, Record<string, HTMLElement>> = {};

  // Form summary element reference
  let _formSummary: HTMLElement;

  // Timeout id for form item binding
  let _formItemBindingTimeoutId: any;

  // Last fieldset id in history
  let _lastFieldset: string;

  // Form state
  let _state: FormState = {
    form: {},
    history: [],
    editting: "",
    lastModified: undefined,
    status: "not-started",
  };

  onMount(() => {
    // Required to get the form summary to render
    import("./FormSummary.svelte");

    // provide html element link to outside world
    dispatch(_formEl, "_init", { el: _formEl });

    addWindowPopStateListener();
    addRelayListener();
    setTimeout(setChildrenState, 100);
  });

  /**
   * Adds a listener to the form element to handle relay messages
   */
  function addRelayListener() {
    receive(_formEl, (type, data, e) => {
      if (!subForm) {
        e.stopPropagation();
      }
      console.debug(`  RECEIVE(Form => ${type}):`, name, type, data);
      switch (type) {
        case FieldsetBindMsg:
          onFieldsetBind(data as FieldsetBindRelayDetail);
          break;
        case FieldsetChangeMsg:
          onFieldsetChange(data as FieldsetChangeRelayDetail);
          break;
        case FieldsetMountFormItemMsg:
          onFieldsetMountFormItem(data as FieldsetMountFormRelayDetail);
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
        case FieldsetSubmitMsg:
          onFormComplete();
          break;
        case ExternalAppendDataMsg:
          onAppendData(data as ExternalAppendDataRelayDetail);
          break;
        case ExternalAlterDataMsg:
          onAlterData(data as ExternalAlterDataRelayDetail);
          break;
        case ExternalInitStateMsg:
          initState(data as ExternalInitStateDetail);
          break;
      }
    });
  }

  // ***************
  // Relay listeners
  // ***************

  /**
   * Handles modifications to array-type form data, supporting edit and remove operations
   * @param detail Contains operation type ('edit'/'remove'), array index, and new data
   */
  function onAlterData(detail: ExternalAlterDataRelayDetail) {
    const state = _state.form[detail.id];
    if (!Array.isArray(state)) {
      return;
    }

    switch (detail.operation) {
      case "edit": {
        _state.form[detail.id][detail.index] = detail.data || {};
        break;
      }
      case "remove": {
        const temp = [...state];
        temp.splice(detail.index, 1);
        _state.form[detail.id].data = [...temp];
        break;
      }
    }

    dispatchStateChange("continue", detail.id);
  }

  /**
   * Handles appending new data to array-type form data
   * @param detail Contains the id of the array and the new data to append
   */
  function onAppendData(detail: ExternalAppendDataRelayDetail) {
    const { id, data } = detail;
    // @ts-expect-error ignore
    const temp = [...(_state.form[id] || [])];
    temp.push(data);
    _state.form[id].data = [...temp];

    dispatchStateChange("continue", id);
  }

  /**
   * Handles binding of form summary elements to enable state synchronization
   * @param detail Contains the form summary element to bind
   */
  function onFormSummaryBind(detail: FormSummaryBindRelayDetail) {
    _formSummary = detail.el;
    syncFormSummaryState();
  }

  /**
   * Handles mounting of form items within fieldsets
   * @param detail Contains the name, element, and id of the form item
   */
  function onFieldsetMountFormItem(detail: FieldsetMountFormRelayDetail) {
    const { name, el, id } = detail;
    const old = _formFields[id] || {};
    _formFields[id] = { ...old, [name]: el };

    // TODO: store the element's form-item index here as well
  }

  /**
   * Create collection of fieldsets and relay messages to them to make the current item visible
   * @param detail Contains the child fieldset to bind
   */
  function onFieldsetBind(detail: FieldsetBindRelayDetail) {
    // _fieldsets[detail.id] = detail;
    _fieldsets = { ..._fieldsets, [detail.id]: detail };
    console.log("---", detail.id);

    // send the back url to child fieldsets, howwever only the first will need it
    if (backUrl) {
      relay<FormBackUrlDetail>(detail.el, FormBackUrlMsg, { url: backUrl });
    }

    // run on the last fieldset
    _formItemBindingTimeoutId = performOnce(_formItemBindingTimeoutId, () => {
      if (_lastFieldset) {
        // last page has priority
        const item = _fieldsets[_lastFieldset];
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
    for (const [name, fieldsetState] of Object.entries(state.data)) {
      if (fieldsetState.value === "") {
        delete state.data[name];
      }
    }

    _state.form[id] = state;
    _state.lastModified = new Date();

    if (dispatchOn === "change") {
      dispatchStateChange("change", id);
    }
  }

  /**
   * Handles continue events from fieldsets to navigate between pages
   * @param detail Contains the next page to navigate to
   */
  function onContinue(detail: ExternalContinueRelayDetail) {
    const { next } = detail;

    // dispatch state to app to allow dynamic binding, along with the page where a state change occured
    dispatchStateChange("continue", _state.history[_state.history.length - 1]);

    // if no page is currently being editted just go to the next page
    if (_state.editting) {
      // clear the errors of the current page being editted
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
        const last = _state.history[_state.history.length - 1];
        sendToggleActiveStateMsg(last);
      } else {
        _state.history = [..._state.history.slice(0, oldNextIndex), next];
        sendToggleActiveStateMsg(next);
        sendEdittingStateMsg();

        _state.editting = "";
      }
    } else {
      // clear most recent fieldset's errors
      const page = _state.history[_state.history.length - 1];
      resetFieldsetErrors(page);

      // prevent duplicates in history
      if (_state.history[_state.history.length - 1] !== next) {
        _state.history.push(next);
      }
      sendToggleActiveStateMsg(next);
    }

    syncFormSummaryState();
  }

  /**
   * Dispatches state change events to the app to trigger dynamic binding and state updates
   * @param dispatchType Indicates the type of state change ('change'/'continue')
   * @param fieldSetId The id of the fieldset where the state change occurred
   */
  function dispatchStateChange(
    dispatchType: "change" | "continue",
    fieldSetId: string,
  ) {
    dispatch(
      _formEl,
      "_stateChange",
      { ..._state, currentFieldset: { id: fieldSetId, dispatchType } },
      { bubbles: true, timeout: 100 },
    );
  }

  /**
   * Synchronizes the form summary state with the app to ensure consistent display of form data
   */
  function syncFormSummaryState() {
    relay<FormDispatchStateRelayDetail>(
      _formSummary,
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
      relay<FormDispatchStateRelayDetail>(
        fieldset.el,
        FormDispatchStateMsg,
        _state,
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

    dispatch<FormState>(_formEl, "_complete", _state, { bubbles: true });
  }

  // *********
  // Functions
  // *********

  /**
   * Resets the errors for a specific fieldset
   * @param name The id of the fieldset to reset errors for
   */
  function resetFieldsetErrors(name: string) {
    relay(_fieldsets[name].el, FormResetErrorsMsg, null);
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
      _state = JSON.parse(detail) as FormState;
    } else {
      _state = detail;
    }

    // initialize history with first page if history is empty
    let historyPageCount = _state.history.length;
    if (historyPageCount > 0) {
      _lastFieldset = _state.history[historyPageCount - 1];
    }

    // show the fieldset
    dispatchStateChange("continue", _lastFieldset);
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

<form bind:this={_formEl} style={calculateMargin(mt, mr, mb, ml)}>
  <slot />
</form>
