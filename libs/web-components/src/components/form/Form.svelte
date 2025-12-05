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
  import { dispatch, receive, style } from "../../common/utils";


  type FormProps = {
    outline: PFOutline;
  };

  let _rootEl: HTMLFormElement;
  let _senderEl: HTMLDivElement;

  // Fieldset binding details
  let _formPages: Record<string, HTMLElement> = {};
  let _formItems: Record<string, HTMLElement> = {};
  let _formOutline: FormOutline;

  // Form state
  let _state: PFFormState;

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

      const { name, value, label } = (e as CustomEvent).detail;
      const [section, field, ..._] = name.split(".");

      // update state
      _state.data = {
        ..._state.data ,
        [section]: {
          ..._state.data?.[section] || {},
          [field]: value
        }
      };

      // TODO: need to update history here as well

      // dispatch
      const detail = {
        data: _state.data,
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

  function init(data: PFFormState, { outline }: FormProps) {
    _state = data || {
      data: {},
      editPage: {},
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
        _formItems[name] = fi as HTMLElement;
      }
    })
  }

  // Event listeners

  function onContinue(e: Event, id: string) {
    e.stopPropagation();

    // perform validation here
    console.log("onCOn", id)

    const detail = {
      id,
      navigateTo(id: string) {
        console.log("navigating to", id);
      },
      state: _state,
    }
    dispatch(_rootEl, "_continue", detail, { bubbles: true });
  }


  function addToHistory(id: string) {
    if (_state.history.includes(id)) {
      console.warn("Form:addToHistory", name, "history already contains id", id);
      return;
    }

    _state.history.push(id);
  }
</script>

<div bind:this={_senderEl} />
<form bind:this={_rootEl}>
  <slot />
</form>
