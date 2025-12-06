<svelte:options
  customElement={{
    tag: "goa-public-form",
  }}
/>

<script lang="ts" context="module">
  import { PFOutline, PFState } from "@abgov/ui-components-common";

  /**
  TODOS:
    - [x] jump back to summary on edits that don't affect the history
    - [/] update history when an edit does change the path
      - Need to test this
  **/


</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive } from "../../common/utils";

  type FormProps = {
    outline: PFOutline;
  };

  let _rootEl: HTMLFormElement;
  let _formSummaryEl: HTMLElement;

  // Fieldset binding details
  let _formPages: Record<string, HTMLElement> = {};
  let _formFields: Record<string, HTMLElement> = {};  // key = [formPageId]:[formFieldName]
  let _formOutline: PFOutline;

  // Form state
  let _state: PFState;

  onMount(() => {
    addRelayListener();
    addChangeListener();
    dispatch(_rootEl, "_init", init, { bubbles: true });
  });

  function addChangeListener() {
    _rootEl.addEventListener("_change", (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.dataset["pfItem"] === undefined) {
        return;
      }

      const { name, value } = (e as CustomEvent).detail;

      // data added to buffer to allow for cancellation
      _state.dataBuffer[name] = value;

      // dispatch
      const detail = {
        state: _state,
        name,
        value,
      };

      dispatch(_rootEl, "_change", detail, { bubbles: true });

      e.stopPropagation();
    });
  }

  function addRelayListener() {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case "form-page:continue":
          onContinue(event, data as string);
          break;
        case "form-page:cancel":
          onFormChangeCancel(event, data as string);
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

  function init(data: PFState, { outline }: FormProps) {
    _state = data || {
      data: {},
      dataBuffer: {},
      history: [],
    };
    _formOutline = outline;

    // get all fieldsets
    const pages = document.querySelectorAll("goa-public-form-page");
    const currentPage = _state.history[_state.history.length - 1] || 0;

    pages.forEach((page, index) => {
      // @ts-ignore
      const id = page.getAttribute("id") || page.id;
      if (index != currentPage) {
        (page as HTMLElement).style.display = "none";
      } else {
        _state.history.push(id);
      }
      if (id) {
        _formPages[id] = page as HTMLElement;
      }

      // get all form items
      const formItems = page.querySelectorAll("[data-pf-item]");
      formItems.forEach((fi) => {
        // @ts-ignore
        const name = fi.getAttribute("name") || fi.name;
        if (name) {
          _formFields[`${id}:${name}`] = fi as HTMLElement;
        }
      });
    });

    bindFormFieldValues();
  }

  // allows pages to be set/reset on initial form load and when cancelling an edit
  function bindFormFieldValues() {
    for (const [id, page] of Object.entries(_state.data)) {
      for (const [name, data] of Object.entries(page)) {
        const key = `${id}:${name}`;
        _formFields[key].setAttribute("value", data);
      }
    }
  }

  // Event listeners

  function onFormChangeCancel(e: Event, id: string) {
    e.stopPropagation();

    _state.dataBuffer = {};
    _formPages[id].removeAttribute("data-pf-editting")

    const lastPage = _state.history[_state.history.length - 1];
    setPageVisibility(lastPage);

    bindFormFieldValues()
  }

  function onContinue(e: Event, id: string) {
    e.stopPropagation();

    const errors: Record<string, string> = {};

    // run validators
    const section = _formOutline[id];
    if (!section) {
      console.error(
        `Missing the public-form-page id of '${id}' from the defined ${"`outline`"}`,
      );
      return;
    }

    // perform error checks for each form item
    for (const [name, validators] of Object.entries(section.validators || {})) {
      const val = _state.dataBuffer[name];

      for (const validator of validators) {
        const err = validator(val);
        if (err) {
          errors[name] = err;
          break; // only show one error per field
        }
      }
    }

    // set errors on fields
    for (const [name, error] of Object.entries(errors)) {
      const key = `${id}:${name}`
      _formFields[key].setAttribute("error", "");
      _formFields[key].closest("goa-form-item")?.setAttribute("error", error);
    }

    if (Object.keys(errors).length === 0) {
      try {
        // the `next` section is either a string or a function that returns a string
        let next =
          typeof section.next === "string"
            ? section.next
            : section.next(_state);

        // when editting the `next` field has to be checked to determine whether to jump back
        // to the summary or trim the history since a new path will be taken
        const currentHistoryIndex = _state.history.findIndex((value) => value === id)
        const nextIdInPreviousPath = _state.history[currentHistoryIndex + 1];

        _state.data = { ..._state.data, [id]: { ..._state.dataBuffer } };
        _state.dataBuffer = {};

        if (id === nextIdInPreviousPath) {
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

        // send message to application
        dispatch(_rootEl, "_next", _state, { bubbles: true });

        // TODO: the form summary data needs more data
        // - headings
        // - subheadins
        // - field order indices
        dispatch(_formSummaryEl, "_sync", _state);
      } catch (e: any) {
        _formPages[id].setAttribute("error", e);
        return;
      }
    }
  }

  function setPageVisibility(pageId: string) {
    for (const [id, el] of Object.entries(_formPages)) {
      el.style.display = id === pageId ? "block" : "none";
    }
  }
</script>

<form bind:this={_rootEl}>
  <slot />
</form>
