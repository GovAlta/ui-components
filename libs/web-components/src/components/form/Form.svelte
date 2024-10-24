<svelte:options customElement="goa-public-form" />

<script lang="ts">
  import { onMount } from "svelte";
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, receive, relay } from "../../common/utils";
  import {
    ExternalAlterDataMsg,
    ExternalAlterDataRelayDetail,
    ExternalAppendDataMsg,
    ExternalAppendDataRelayDetail,
    ExternalContinueMsg,
    ExternalContinueRelayDetail,
    ExternalResetStateMsg,
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetChangeMsg,
    FieldsetChangeRelayDetail,
    FieldsetData,
    FieldsetMountFormItemMsg,
    FieldsetMountFormRelayDetail,
    FieldsetSubmitMsg,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormResetErrorsMsg,
    FormSetFieldsetMsg,
    FormSetFieldsetRelayDetail,
    FormSetValueMsg,
    FormSetValueRelayDetail,
    FormState,
    FormSummaryBindMsg,
    FormSummaryBindRelayDetail,
    FormSummaryEditPageMsg,
    FormSummaryEditPageRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
  } from "../../types/relay-types";

  // Don't remove this, otherwise the summary doesn't render
  import FormSummary from "./FormSummary.svelte";

  // Required
  export let name: string;

  // Optional
  export let storage: "none" | "local" | "session" = "none";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Private
  let _formEl: HTMLFormElement;
  let _fieldsets: Record<string, FieldsetBindRelayDetail> = {};
  let _formFields: Record<string, Record<string, HTMLElement>> = {};
  let _formSummary: HTMLElement;
  let _formItemBindingTimeoutId: any;
  let _state: FormState = {
    form: {},
    history: [],
    editting: "",
    lastModified: undefined,
    status: "not-started",
  };

  let lastPage: string;

  onMount(() => {
    restoreState();
    addWindowPopStateListener();
    addRelayListener();
    // notify "app" of current state
    dispatchStateChange();
    // provide html element link to outside world
    dispatch(_formEl, "_bind", { el: _formEl });
    setTimeout(bindChildren, 100);
  });

  function addRelayListener() {
    receive(_formEl, (type, data, e) => {
      // console.log(`  RECEIVE(Form => ${type}):`, type, data);
      switch (type) {
        case FieldsetBindMsg:
          onFieldsetBind(data as FieldsetBindRelayDetail);
          // prevent fieldset bind event from going any higher to allow for subforms
          e.stopPropagation(); 
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
        case ExternalResetStateMsg:
          resetState();
          break;
      }
    });
  }

  // ***************
  // Relay listeners
  // ***************

  function onAlterData(detail: ExternalAlterDataRelayDetail) {
    const state = _state.form[detail.id];
    if (!Array.isArray(state)) {
      return;
    }

    switch (detail.operation) {
      case "edit": {
        // @ts-ignore
        _state.form[detail.id][detail.index] = detail.data || {};
        break;
      }
      case "remove": {
        const temp = [...state];
        temp.splice(detail.index, 1);
        _state.form[detail.id] = [...temp];
        break;
      }
    }

    dispatchStateChange();
    saveState(_state);
  }

  function onAppendData(detail: ExternalAppendDataRelayDetail) {
    const { id, data } = detail;
    // @ts-ignore
    const temp = [...(_state.form[id] || [])];
    temp.push(data)
    _state.form[id] = [...temp];

    dispatchStateChange();
    saveState(_state);
  }

  function onFormSummaryBind(detail: FormSummaryBindRelayDetail) {
    _formSummary = detail.el;
    syncFormSummaryState();
  }

  function onFieldsetMountFormItem(detail: FieldsetMountFormRelayDetail) {
    const { name, el, id } = detail;
    const old = _formFields[id] || {};
    _formFields[id] = { ...old, [name]: el };
  }

  // listen for child fieldsets
  function onFieldsetBind(detail: FieldsetBindRelayDetail) {
    _fieldsets[detail.id] = detail;

    // run the final binding once
    if (_formItemBindingTimeoutId) {
      clearTimeout(_formItemBindingTimeoutId);
    }
    _formItemBindingTimeoutId = setTimeout(() => {
      if (lastPage) {
        // last page has priority
        const item = _fieldsets[lastPage];
        sendToggleActiveStateMsg(item.id);
      } else {
        // mark the first fieldset as active
        const [id] = Object.entries(_fieldsets)[0];
        _state.history.push(id);
        saveState(_state);
        sendToggleActiveStateMsg(id);
      }
    }, 100);
  }

  // listen to `_change` events by input elements nested within fieldsets and update the state
  function onFieldsetChange(detail: FieldsetChangeRelayDetail) {
    const { id, state } = detail;

    _state.form[id] = state;
    _state.lastModified = new Date();

    if (detail.dispatchOn === "change") {
      dispatchStateChange(detail.id);
    }

    saveState(_state);
  }

  // Listening for the event dispatched from the app's form page within the on:continue handler
  function onContinue(detail: ExternalContinueRelayDetail) {
    const { next } = detail;

    // dispatch state to app to allow dynamic binding, along with the page where a state change occured
    dispatchStateChange();

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

    // save history updates
    saveState(_state);
  }

  function dispatchStateChange(fieldSetId?: string) {
    dispatch(_formEl, "_stateChange", {..._state, page: fieldSetId }, { bubbles: true, timeout: 100 });
  }

  function syncFormSummaryState() {
    relay<FormDispatchStateRelayDetail>(_formSummary, FormDispatchStateMsg, _state);
  }

  function onSetPage(detail: FormSummaryEditPageRelayDetail) {
    _state.editting = detail.id; // editting mode is an ephemeral value and is *not* saved to local storage

    sendToggleActiveStateMsg(detail.id);
    sendEdittingStateMsg();
  }

  // notify fieldsets of editting state to allow it to not show the `back` link
  function sendEdittingStateMsg() {
    for (const fieldset of Object.values(_fieldsets)) {
      relay<FormDispatchStateRelayDetail>(fieldset.el, FormDispatchStateMsg, _state);
    }
  }

  function onFormComplete() {
    _state.status = "complete";
    saveState(_state);

    const cleanedState = _state.history.reduce<Record<string, FieldsetData>>((acc, fieldsetId) => {
      acc[fieldsetId] = _state.form[fieldsetId]
      return acc;
    }, {})
    dispatch(_formEl, "_complete", { form: cleanedState }, { bubbles: true });
  }

  // *********
  // Functions
  // *********

  function resetFieldsetErrors(name: string) {
    relay(_fieldsets[name].el, FormResetErrorsMsg, null);
  }

  function sendToggleActiveStateMsg(page: string) {
    const keys = Object.keys(_fieldsets);
    keys.forEach((key) => {
      relay<FormToggleActiveRelayDetail>(_fieldsets[key].el, FormToggleActiveMsg, {
        first: false, //key === _firstElement,
        active: key === page,
      });
    });
  }

  // listen to url changes or location back
  function addWindowPopStateListener() {
    window.addEventListener("popstate", (e: PopStateEvent) => {
      const history = [..._state.history];
      history.pop();
      _state.history = history;
      saveState(_state);
      sendToggleActiveStateMsg(history[history.length - 1]);
      e.stopPropagation();
    });
  }

  function getStorage(): Storage | null {
    if (storage === "none") return null;
    return storage === "local" ? localStorage : sessionStorage;
  }

  function saveState(state: FormState) {
    const storage = getStorage();
    storage?.setItem(name, JSON.stringify(state));
  }

  function restoreState() {
    const storage = getStorage();
    const raw = storage?.getItem(name);

    if (!raw) {
      return;
    }

    _state = JSON.parse(raw);

    // initialize history with first page if history is empty
    let historyPageCount = _state.history.length;
    if (historyPageCount > 0) {
      lastPage = _state.history[historyPageCount - 1];
    }
  }

  function bindChildren() {
    // restore state in fieldsets
    for (const [name, detail] of Object.entries(_fieldsets)) {
      const value = _state.form[name];
      if (value)
        relay<FormSetFieldsetRelayDetail>(detail.el, FormSetFieldsetMsg, {
          name,
          value,
        });
    }

    // restore state in form items
    for (const id of Object.keys(_formFields)) {
      for (const [name, el] of Object.entries(_formFields[id])) {
        const fieldset = _state.form[id];
        if (Array.isArray(fieldset)) {
          // TODO: restore the state when multiple items exist
          console.log("Array is multiple values!!", fieldset);
        } else {
          const value = fieldset?.[name]?.value;
          if (value) {
            relay<FormSetValueRelayDetail>(el, FormSetValueMsg, {
              name,
              value,
            });
          }
        }
      }
    }
  }

  function resetState() {
    const storage = getStorage();
    if (!storage) return;

    storage.removeItem(name);
    _state = {
      form: {},
      history: [_fieldsets[0]?.id],
      editting: "",
      lastModified: undefined,
      status: "not-started",
    };
  }
</script>

<form bind:this={_formEl} style={calculateMargin(mt, mr, mb, ml)}>
  <slot />
</form>
