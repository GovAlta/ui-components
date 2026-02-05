<svelte:options
  customElement={{
    tag: "goa-public-form",
  }}
/>

<script lang="ts" context="module">
  import { PFOutline, PFPage, PFState } from "@abgov/ui-components-common";
  import { Spacing } from "../../common/styling";
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";

  // TODO
  // [ ] a more consistent way of resetting form elements might be needed, instead of setting value/checked
  // [ ] determine if the formatting could be done just before moving to the next page, this would remove the need of the formatting the data within the summary
  // [ ] will the file uploader work?
  // [-] is there a way to introduce a micro-repeater in addition to the existing modal sub-form
  //     - won't do: this can alread easily be done on their side since the history contains a list of the pages that were saved

  type FormProps = {
    outline: PFOutline;
  };

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "3xl";
  export let ml: Spacing = null;

  let _rootEl: HTMLFormElement;
  let _formSummaryEl: HTMLElement;

  // Fieldset binding details
  let _formPages: Record<string, HTMLElement> = {};
  let _formFields: Record<string, HTMLElement> = {}; // key = [formPageId]:[formFieldName]
  let _formOutline: PFOutline;
  let _currentPage: string;

  // Form state
  let _state: PFState;

  onMount(() => {
    addRelayListener();
    addChangeListener();
    addBackListener();
    addSubformListeners();

    dispatch(_rootEl, "_init", init, { bubbles: true });
  });

  function bindSubformFieldValues(id: string) {
    for (const [name, val] of Object.entries(_state.dataBuffer)) {
      const key = `${id}:${name}`;
      const el = _formFields[key];
      if (el) {
        _formFields[key].setAttribute("value", val);
      }
    }
  }

  function addSubformListeners() {
    _rootEl.addEventListener("pf:subform:cancel", (e) => {
      e.stopPropagation();

      const { pageId } = (e as CustomEvent).detail;

      // clear all the subform items
      _state = { ..._state, dataBuffer: {} };
      resetFormFields(pageId);
    });

    _rootEl.addEventListener("pf:subform:edit", (e) => {
      e.stopPropagation();

      const { pageId, _id } = (e as CustomEvent).detail;
      const data = _state.data[pageId] as PFPage[];
      const record = data.find((item) => item._id === _id);

      if (!record) {
        console.error("Subform item not found: _id");
        return;
      }

      // populate the dataBuffer with the item's data to ensure non-updated data is not lost
      // when re-saved
      _state = { ..._state, dataBuffer: record as Record<string, string> };

      bindSubformFieldValues(pageId);
    });

    _rootEl.addEventListener("pf:subform:delete", (e) => {
      e.stopPropagation();

      const { pageId, _id } = (e as CustomEvent).detail;
      const data = _state.data[pageId] as PFPage[];
      if (!data) {
        throw new Error("pf:subform:delete: no data found");
      }

      // remove the subform item from the collection
      const newPage = data.filter((item) => item._id !== _id);
      _state = {
        ..._state,
        dataBuffer: {},
        data: { ..._state.data, [pageId]: newPage },
      };

      // send message up to app level with the changes
      dispatch(_rootEl, "_subformChange", _state);
    });

    _rootEl.addEventListener("pf:subform:save", (e) => {
      const { pageId, _id } = (e as CustomEvent).detail;
      const [errors, errorCount] = validate(pageId);

      e.stopPropagation();

      if (errorCount > 0) {
        renderErrors(pageId, errors);
        return;
      }

      // if editting replace the existing data with the new, if creating then add the new
      // data with a newly generated _id
      if (_id) {
        // find index to preserve the order of the list
        const list = _state.data[pageId] as Array<PFPage>;
        const index = list.findIndex((item) => item._id === _id);

        list[index] = _state.dataBuffer;
        _state = {
          ..._state,
          dataBuffer: {},
          data: { ..._state.data, [pageId]: [...list] },
        };
      } else {
        const page = [
          ...(_state.data[pageId] as []), // add original items in the page
          {
            ..._state.dataBuffer, // add all the data obtained from the form
            _id: crypto.randomUUID(), // add in additonal uuid if not already set
          },
        ];
        _state = {
          ..._state,
          dataBuffer: {},
          data: { ..._state.data, [pageId]: page },
        };
      }

      // clear all the subform items
      resetFormFields(pageId);

      // send message up to app level with the changes
      dispatch(_rootEl, "_subformChange", _state);
    });
  }

  function resetFormFields(pageId: string) {
    for (const [key, el] of Object.entries(_formFields)) {
      if (key.startsWith(`${pageId}:`)) {
        // TODO: would this not also require setting the `checked` attribute for checkboxes and radios?
        // use the goa:reset event instead
        el.setAttribute("value", "");
      }
    }
  }

  function addBackListener() {
    _rootEl.addEventListener("form-page:back", () => {
      _state.history.pop();
      setPageVisibility(_state.history[_state.history.length - 1]);
    });
  }

  function getCurrentPage() {
    const index = _state.history.length - 1;
    return _state.history[index];
  }

  function addChangeListener() {
    const listener = (e: Event) => {
      const target = e.target as HTMLElement;

      // only handle change events from specific elements
      if (target.dataset["pfItem"] === undefined) {
        e.stopPropagation();
        return;
      }

      // `valueStr` is only from the datepicker and is the preferred format
      const { name, value, valueStr } = (e as CustomEvent).detail;

      // ennsure that the element belongs to the current page that is visible
      const fieldKey = `${_currentPage}:${name}`;
      if (!_formFields[fieldKey]) {
        console.error("Invalid formField key: ", fieldKey);
        return;
      }

      // data added to buffer to allow for cancellation
      _state = {
        ..._state,
        dataBuffer: { ..._state.dataBuffer, [name]: valueStr || value },
      };

      // emit the form's change event that may be handled externally
      dispatch(
        _rootEl,
        "_change",
        {
          state: _state,
          name,
          value: valueStr || value, // prefer valueStr over value for the datepicker
        },
        { bubbles: true },
      );

      // for some reason if this is at the top of the function the dispatch above doesn't fire properly
      e.stopPropagation();
    };

    _rootEl.addEventListener("_change", listener);
  }

  function addRelayListener() {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case "form-page:continue":
          onContinue(event, data as string);
          break;
        case "form-page:cancel":
          onCancel(event, data as string);
          break;
        case "form-summary:bind":
          _formSummaryEl = data as HTMLElement;
          break;
        case "form-summary:change":
          const page = data as string;
          _formPages[page].setAttribute("data-pf-editting", "");
          setPageVisibility(page);
          break;
      }
    });
  }

  function init(data: PFState, { outline }: FormProps): PFState {
    console.log("in the init");
    const state = data || {
      data: {},
      dataBuffer: {},
      history: [],
    };
    _formOutline = outline;

    // get all fieldsets
    const pages = document.querySelectorAll("goa-public-form-page");

    _currentPage = state.history[state.history.length - 1] || pages[0].id;

    pages.forEach((page, _index) => {
      // @ts-ignore
      const id = page.getAttribute("id") || page.id;

      if (!id) {
        console.error(
          "Missing the `id` attribute from the goa-public-form-page component",
        );
        return;
      }

      // hide non-current pages and if current it needs to be added to the history stack
      if (id != _currentPage) {
        (page as HTMLElement).style.display = "none";
      } else {
        state.history.push(id);
      }

      _formPages[id] = page as HTMLElement;

      // set the formPage's props (heading, section-title, ...)
      for (let [name, val] of Object.entries(_formOutline[id]?.props || {})) {
        page.setAttribute(name, val);
      }

      // initialze the page data
      // TODO: maybe defining an attribute on the form page component would be better here
      if (page.hasAttribute("data-pf-list")) {
        state.data[id] ||= []; // set to empty array if not already set by restored state
      } else {
        state.data[id] ||= {}; // set to empty dict if not already set by restored state
      }

      // initialize data to ensure the form summary order is consistent with the order of the fields within the form
      const formItems = page.querySelectorAll("[data-pf-item]");
      formItems.forEach((fi) => {
        // @ts-ignore
        const name = fi.getAttribute("name") || fi.name;
        if (name) {
          // set non-list typed values to blank
          if (!(page as HTMLElement).dataset["pfList"]) {
            state.data[id][name] ||= "";
          }
          _formFields[`${id}:${name}`] = fi as HTMLElement;
        }
      });
    });

    _state = state;

    syncFormSummary();
    bindFormFieldValues(state);

    return _state;
  }

  // allows pages to be set/reset on initial form load and when cancelling an edit
  function bindFormFieldValues(state: PFState) {
    for (const [id, page] of Object.entries(state.data)) {
      for (const [name, data] of Object.entries(page)) {
        const key = `${id}:${name}`;
        if (!_formOutline[id].subform) {
          const el = _formFields[key];
          // TODO: don't like that this is being specific
          if (el.tagName === "GOA-CHECKBOX") {
            if (data) {
              el.setAttribute("checked", data);
            }
          } else {
            el.setAttribute("value", data);
          }
        }
      }
    }
  }

  // Event listeners

  function onCancel(e: Event, pageId: string) {
    e.stopPropagation();

    _state.dataBuffer = {};
    _formPages[pageId].removeAttribute("data-pf-editting");

    const lastPage = _state.history[_state.history.length - 1];

    setPageVisibility(lastPage);
    bindFormFieldValues(_state);
  }

  function validate(id: string): [Record<string, string>, number] {
    const section = _formOutline[id];
    const errors: Record<string, string> = {};

    let errorCount = 0;

    // perform error checks for each form item
    for (const [name, validators] of Object.entries(section.validators || {})) {
      const val = _state.dataBuffer[name];

      for (const validator of validators) {
        const err = validator(val);
        if (err) {
          errors[name] = err;
          errorCount++;
          break; // only show one error per field
        }
      }
    }

    return [errors, errorCount];
  }

  // Set error attrs on html elements to allow errors to appear within the form
  function renderErrors(id: string, errors: Record<string, string>) {
    for (const [name, error] of Object.entries(errors)) {
      const key = `${id}:${name}`;
      _formFields[key].setAttribute("error", "");
      _formFields[key].closest("goa-form-item")?.setAttribute("error", error);
    }
  }

  function resetErrors() {
    for (const [_name, el] of Object.entries(_formFields)) {
      el.removeAttribute("error");
      el.closest("goa-form-item")?.removeAttribute("error");
    }
  }

  function onContinue(e: Event, id: string) {
    e.stopPropagation();

    const section = _formOutline[id];
    const isSubform = _formOutline[id].subform;

    if (!section) {
      console.error(
        `Missing the public-form-page id of '${id}' from the defined ${"`outline`"}`,
      );
      return;
    }

    const [errors, errorCount] = validate(id);
    if (errorCount > 0) {
      renderErrors(id, errors);
      return;
    }

    // if there are no errors ensure all form-items have their error state reset
    resetErrors();

    // the `next` section is either a string or a function that returns a string
    try {
      let next =
        typeof section.next === "string" ? section.next : section.next(_state); // error thrown from here on form level validation failure

      // when editting the `next` field has to be checked to determine whether to jump back
      // to the summary or trim the history since a new path will be taken
      const currentHistoryIndex = _state.history.findIndex(
        (value) => value === id,
      );
      const nextIdInPreviousPath = _state.history[currentHistoryIndex + 1];

      // subform data is already validated
      if (!isSubform) {
        // TODO: add data format per field here, the formatted values will need to be saved to a different field to allow the raw value being available if required ex. dates

        // save the validated data in the top level state
        _state.data = { ..._state.data, [id]: { ..._state.dataBuffer } };
      }
      _state.dataBuffer = {};

      // jump back to summary of the new *next* step is equal to the previous next step
      if (next === nextIdInPreviousPath) {
        // jump to summary
        const last = _state.history[_state.history.length - 1];
        setPageVisibility(last);
      } else {
        // When progressing to the next page there should never be any history that lies after it.
        // In the case that the user is progressing in a linear fashion there will already be
        // no history item that lies after the current. However, in the case that the user editted
        // a field that resulted in a path change the history after the current needs to be removed.
        _state.history = _state.history.slice(0, currentHistoryIndex + 1);

        // now the next history item can be pushed
        _state.history.push(next);

        setPageVisibility(next);
      }

      // ensure any previous formPage error is reset
      _formPages[id].removeAttribute("error");

      // send message to application
      dispatch(_rootEl, "_next", _state, { bubbles: true });

      syncFormSummary();
    } catch (e) {
      _formPages[id].setAttribute("error", e as string);
    }
  }

  function syncFormSummary() {
    dispatch(_formSummaryEl, "form:summary-sync", {
      ..._state,
      outline: _formOutline,
    });
  }

  // TODO: rename this function to something is more generic due to databuffer setting
  function setPageVisibility(pageId: string) {
    for (const [id, el] of Object.entries(_formPages)) {
      el.style.display = id === pageId ? "block" : "none";
    }

    _currentPage = pageId;

    // fill buffer since that is what the `onContinue` uses on validation
    _state.dataBuffer = (_state.data[pageId] as PFPage) || {};
  }
</script>

<form bind:this={_rootEl} style={calculateMargin(mt, mr, mb, ml)}>
  <goa-circular-progress visible={!_state} />
  <div style={`display: ${_state ? "block" : "none"}`}>
    <slot />
  </div>
</form>
