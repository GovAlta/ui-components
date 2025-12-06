<svelte:options
  customElement={{
    tag: "goa-public-form",
  }}
/>

<script lang="ts" context="module">
  import { PFOutline, PFState } from "@abgov/ui-components-common";

</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive } from "../../common/utils";

  type FormProps = {
    outline: PFOutline;
  };

  let _rootEl: HTMLFormElement;

  // Fieldset binding details
  let _formPages: Record<string, HTMLElement> = {};
  let _formFields: Record<string, HTMLElement> = {};
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
      const [section, field] = name.split(".");

      // data added to buffer to allow for cancellation
      _state.dataBuffer[name] = value;

      // dispatch
      // TODO: add type
      const detail = {
        state: _state,
        page: section,
        field,
        value,
      };

      dispatch(_rootEl, "_change", detail , { bubbles: true });

      e.stopPropagation();
    })
  }

  function addRelayListener() {
    receive(_rootEl, (action, data, event) => {
      switch(action) {
        case "_continue":
          onContinue(event, data as string);
          break;
      }
    })
  }

  function init(data: PFState, { outline }: FormProps) {
    _state = data || {
      data: {},
      dataBuffer: {},
      history: []
    };
    _formOutline = outline;

    // get all fieldsets
    const pages = document.querySelectorAll("goa-public-form-page");
    const currentPage = _state.history[_state.history.length-1] || 0;
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
    });

    // get all form items
    const formItems = document.querySelectorAll("[data-pf-item]");
    formItems.forEach(fi => {
      // @ts-ignore
      const name = fi.getAttribute("name") || fi.name;
      if (name) {
        _formFields[name] = fi as HTMLElement;
      }
    })
  }

  // Event listeners

  function onContinue(e: Event, id: string) {
    e.stopPropagation();

    const errors: Record<string, string> = {};

    // run validators
    const section = _formOutline[id];
    if (!section) {
      console.error(`Missing the public-form-page id of '${id}' from the defined ${"`outline`"}`);
      return;
    }

    for (const [name, validators] of Object.entries(section.validators || {})) {
      const val = _state.dataBuffer[name];

      for (const validator of validators) {
        const err = validator(val);
        if (err) {
          errors[name] = err;
          break; // one show one error per field
        }
      }
    }

    // set errors on fields
    for (const [name, error] of Object.entries(errors)) {
      _formFields[name].setAttribute("error", "");
      _formFields[name].closest("goa-form-item")?.setAttribute("error", error);
    }

    if (Object.keys(errors).length === 0) {
      try {
        let next = typeof section.next === "string"
          ? section.next
          : section.next(_state);

        _state.history.push(next);
        _state.data = {..._state.data, ..._state.dataBuffer };
        _state.dataBuffer = {}

        setPageVisibility(next);
        dispatch(_rootEl, "_next", _state, { bubbles: true })

      } catch(e: any) {
        _formPages[id].setAttribute("error", e);
        return;
      }
    }
  }

  function setPageVisibility(pageId: string) {
    for (const [id, el] of Object.entries(_formPages)) {
      el.style.display =  id === pageId ? "block" : "none";
    }
  }
</script>

<form bind:this={_rootEl}>
  <slot />
</form>
