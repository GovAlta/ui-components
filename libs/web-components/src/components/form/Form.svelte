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
  import { dispatch, performOnce, performUntil, receive, relay } from "../../common/utils";
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
    FieldsetSubmitMsg,
    FormBackUrlDetail,
    FormBackUrlMsg,
    SubformBindMsg,
    FormBindRelayDetail,
    FormDispatchEditMsg,
    FormDispatchEditRelayDetail,
    FormDispatchStateToSubformMsg,
    FormDispatchStateToSubformRelayDetail,
    FormResetErrorsMsg,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormSetFieldsetRelayDetail,
    FormState,
    FormStateChangeMsg,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
    SubFormDeleteDataMsg,
    SubFormDeleteDataRelayDetail,
    FormDispatchStateMsg,
    FormDispatchStateToFormMsg,
    FormDispatchStateToSummaryMsg, FormDispatchStateToSummaryRelayDetail, Fieldset, FormStatus,
  } from "../../types/relay-types";
  import { id } from "date-fns/locale";

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
  let _formFields: Record<string, Record<string, HTMLElement>> = {};

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
    id: crypto.randomUUID(),
    form: {},
    history: [],
    editting: "",
    lastModified: undefined,
    status: "not-started",
  };

  /**
   * TODO:
   * - dispatch a message up to the next parent public-form with a reference this this form to allow for the parent
   *   form to pass down the state of this form
   *   - the message must contain the id of this form as well as a reference to this form's element
   * - create a listener within the form element to listen for events of child form elements
   *
  **/

  onMount(() => {
    // send ref of this Form element to the top-level app which then passes the ref
    // to the utils class, then allowing the utils class to send/receive messages
    // with the Form
    dispatch(_rootEl, "_bind", { el: _rootEl });

    addWindowPopStateListener();
    startMessageReceiver();
    addSubformStateChangeListener();

    // TODO: can this be removed?
    setTimeout(dispatchChildFormState, 100);
  });

  /**
   * Listen for _stateChange messages from child subform elements
   */
  function addSubformStateChangeListener() {
    performUntil(() => {
      _childReceiverEl?.addEventListener("_stateChange", (e) => {
        const detail = (e as CustomEvent).detail as {
          data: FormState[];
          id: string;
          index: number;
        };
        // subform state is always a list
        _state.form[detail.id] = { data: { type: "list", items: detail.data } };
        console.debug("Form:addSubformRelayListener", name, _state);
      });

    }, () => !!_childReceiverEl)
  }

  /**
   * Adds a listener to the form element to handle relay messages
   */
  function startMessageReceiver() {
    console.debug("Form:startMessageReceiver", name);
    receive(_rootEl, (type, data, e) => {
      e.stopPropagation();
      console.debug(`  RECEIVE(Form => ${type}):`, name, type, data);
      switch (type) {
        case FormDispatchStateToFormMsg:
          onReceiveState(data as FormState);
          break;

        // Check
        case SubformBindMsg:
          onSubformBind(data as FormBindRelayDetail);
          break;

        // Check
        case FieldsetBindMsg:
          onFieldsetBind(data as FieldsetBindRelayDetail);
          break;

        // Check
        case FieldsetChangeMsg:
          onFieldsetChange(data as FieldsetChangeRelayDetail);
          break;

        // ???
        case FieldsetMountFormItemMsg:
          onFieldsetMountFormItem(data as FieldsetMountFormRelayDetail);
          break;

        // Check
        case FormSummaryBindMsg:
          onFormSummaryBind(data as FormSummaryBindRelayDetail);
          break;

        // Check
        case ExternalContinueMsg:
          onContinue(data as ExternalContinueRelayDetail);
          break;

        // Check
        case FormSummaryEditPageMsg:
          setEditPage(data as FormSummaryEditPageRelayDetail);
          break;

        // Check
        case FieldsetSubmitMsg:
          onFormComplete();
          break;

        case ExternalInitStateMsg:
          initState(data as ExternalInitStateDetail);
          break;

        // TODO: probably uncomment these later on
        // case ExternalAppendDataMsg:
        //   onAppendData(data as ExternalAppendDataRelayDetail);
        //   break;
        // case FormResetFormMsg:
        //   resetState();
        //   break;
        // case SubFormDeleteDataMsg:
        //   deleteSubFormData(data as SubFormDeleteDataRelayDetail);
        //   break;

        default:
          console.warn("Form: Unhandled action", type);
      }
    });
  }

  // ***************
  // Relay listeners
  // ***************

  function onReceiveState(data: FormState) {
    console.debug("Form:onReceiveState", name, { data });
    _state = { ..._state, ...data };
  }

  /**
   * Handles modifications to array-type form data, supporting edit and remove operations
   * @param detail Contains updated dataset and key (id) of the subform
   */
  function deleteSubFormData(detail: SubFormDeleteDataRelayDetail) {
    console.debug("Form:updateSubformData", name, { detail, _state });

    if (_state.form[detail.id].data.type === "list") {
      //
      _state.form[detail.id].data.items = detail.data;
      console.log("Form:updateSubformData", _state.form[detail.id].data);

      // send message to the external utils to adjust it's state
      dispatch(
        _rootEl,
        "_stateChange",
        { ..._state, currentFieldset: { id: detail.id } },
        { bubbles: true, timeout: 100 },
      );
    }

  }

  function onSubformBind(detail: FormBindRelayDetail) {
    console.debug("Form:onFormBind", name, { detail });
    _childForms[detail.id] = detail.el;

    // bind all the child forms
    performOnce(_childFormStateTimeoutId, dispatchChildFormState, 100)
  }

  /**
   * Handles appending new data to array-type form data
   * @param detail Contains the id of the array and the new data to append
   */
  function onAppendData(detail: ExternalAppendDataRelayDetail) {
    console.debug("Form:onAppendData", name, { detail });
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
    console.log("Form:onFormSummaryBind", name, { detail });
    // save the form-summary element reference for relaying messages
    _formSummaryEl = detail.el;

    // sync any initial state
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
   * Called when child fieldsets bind with parent. The fieldset references and saved to
   * allow for later messages to be sent to them to control visibility
   * @param detail Contains the child fieldset to bind
   */
  function onFieldsetBind(detail: FieldsetBindRelayDetail) {
    // save the fieldsets to allow for later sending of messages
    _fieldsets = { ..._fieldsets, [detail.id]: detail };
    console.debug("Form:onFieldsetBind", name, "---", { id: detail.id, _fieldsets, subForm });

    // init the state of the fieldset (data prop not set), this allows for the items to
    // be inserted into the `form` list in the order they exist within the DOM. If this is
    // not done they will be created in the order to which the data was entered, which can
    // result in the form-summary then showing things out of order
    _state.form[detail.id] = { ..._state.form[detail.id], skipSummary: detail.skipSummary,  heading: detail.heading };

    // send the back url to child fieldsets, however only the first will need it
    if (backUrl) {
      relay<FormBackUrlDetail>(detail.el, FormBackUrlMsg, { url: backUrl });
    }

    // run once all fieldsets are obtained
    _formItemBindingTimeoutId = performOnce(_formItemBindingTimeoutId, () => {
      bindRootFormData();
    });
  }

  function bindRootFormData() {
    // send specific form state to children
    dispatchFieldsetStates(_state);

    // if the form was previously viewed the last fieldset viewed will have been saved
    // which is the fieldset that will be made visible
    if (_lastViewedFieldset) {
      const item = _fieldsets[_lastViewedFieldset];
      sendToggleActiveStateMsg(item.id);
    } else {
      // no previous fieldset was viewed, so mark the first fieldset as active
      const [id] = Object.entries(_fieldsets)[0];
      _state.history.push(id);
      sendToggleActiveStateMsg(id);
    }
  }

  /**
   * Listens to `_change` events by input elements nested within fieldsets and update the state
   * @param detail Contains the id, state, and dispatch type of the changed fieldset
   */
  function onFieldsetChange(detail: FieldsetChangeRelayDetail) {
    console.debug("Form:onFieldsetChange", name, detail);

    const { id, state, dispatchOn } = detail;

    // clean empty values from the data, this will prevent blank data
    // from showing up in the summary
    for (const [name, fieldsetState] of Object.entries(state.data)) {
      if (fieldsetState.value === "") {
        delete state.data[name];
      }
    }

    // TODO: subform needs to dispatch this event...
    _state.form[id] = { heading: state.heading, data: { type: "details", fieldsets: state.data } };
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
    console.debug("Form:onContinue", name, { detail, _state });

    const { next } = detail;
    const lastPage = _state.history[_state.history.length - 1];
    if (!lastPage) {
      console.error("Form:onContinue", name, "no last page");
      return;
    }

    // dispatch state to app to allow dynamic binding, along with the page where a state change occurred
    // syncWithFormStateStore();
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
    dispatch(
      _rootEl,
      "_stateChange",
      { ..._state, currentFieldset: { id: fieldSetId, dispatchType } },
      { bubbles: true, timeout: 100 },
    );
  }

  /**
   * Synchronizes the form summary state with the app to ensure consistent display of form data
   */
  function syncFormSummaryState() {
    console.debug("Form:syncFormSummaryState", _state);

    relay<FormDispatchStateToSummaryRelayDetail>(
      _formSummaryEl,
      FormDispatchStateToSummaryMsg,
      { data: _state, formEl: _rootEl },
    );
  }

  /**
   * Handles setting the page to edit mode and updating the state accordingly
   * @param detail Contains the id of the page to set as the current editing page
   */
  function setEditPage(detail: FormSummaryEditPageRelayDetail) {
    // editting mode is an ephemeral value and is *not* saved to local storage
    _state.editting = detail.id;

    sendToggleActiveStateMsg(detail.id);
    sendEdittingStateMsg();
  }

  /**
   * Notifies fieldsets of editting state to allow them to not show the `back` link
   */
  function sendEdittingStateMsg() {
    console.debug("Form:sendEdittingState", _fieldsets);
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
    // cleaned data and the backend would move this data into its own table structure, but since
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
    console.debug("Form:resetState", name, _state.id, { old: _state });
    const [id] = Object.entries(_fieldsets)[0];

    _state = {
      id: crypto.randomUUID(),
      form: {},
      history: [id],
      editting: "",
      lastModified: undefined,
      status: "not-started",
    };
    console.debug("Form:resetState", name, _state.id, { new: _state });

    for (const { el } of Object.values(_fieldsets)) {
      relay(el, FormResetFormMsg);
    }
  }

  // *********
  // Functions
  // *********

  /**
   * Resets the errors for a specific fieldset
   * @param fieldsetName The id of the fieldset to reset errors for
   */
  function resetFieldsetErrors(fieldsetName: string) {
    console.debug("Form:resetFieldsetErrors", name, { fieldsetName });
    relay(_fieldsets[fieldsetName].el, FormResetErrorsMsg, null);
  }

  /**
   * Sends a message to show/hide fieldsets and subforms
   * @param page The id of the page to set as active
   */
  function sendToggleActiveStateMsg(page: string) {
    console.debug("Form:sendToggleActiveStateMsg", name, { page });
    const fieldsetIds = Object.keys(_fieldsets);
    fieldsetIds.forEach((key) => {
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
   * Handle browser back events and update the `history` array
   */
  function addWindowPopStateListener() {
    console.debug("Form:addWindowPopStateListener", name);
    // event should only be created on top level form, not subforms

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
    console.debug("Form:initState", name, { detail });
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
    console.debug("Form:dispatchChildFormState", name, { _childForms });
    for (const [id, el] of Object.entries(_childForms)) {
     const data = _state.form[id]?.data;
      // data is only sent to child forms and all child forms are lists
      if (data?.type === "list") {
        // the scoped state is set to the child form
        console.debug("Form:dispatchChildFormState", "child", name, { id, data });
        relay<FormDispatchStateToSubformRelayDetail>(el, FormDispatchStateToSubformMsg, data.items);
      }
    }
  }

  /**
   * Sets the fieldset and subform states
   */
  function dispatchFieldsetStates(state: FormState) {
    console.debug("Form:dispatchFieldsetStates", name, { state, _fieldsets });
    for (const [name, detail] of Object.entries(_fieldsets)) {
      const value = state.form[name]?.data;
      if (value) {
        relay<FormSetFieldsetRelayDetail>(detail.el, FormSetFieldsetMsg, {
          name,
          value,
        });
      }
    }
  }
</script>

<form bind:this={_rootEl} style={calculateMargin(mt, mr, mb, ml)}>
  <div bind:this={_childReceiverEl}>
    <slot />
  </div>
</form>
