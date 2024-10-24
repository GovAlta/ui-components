<svelte:options
  customElement={{
    tag: "goa-fieldset",
    props: {
      buttonText: { type: "String", attribute: "button-text" },
      secondaryButtonText: { type: "String", attribute: "secondary-button-text" },
      preserveState: { type: "String", attribute: "preserve-state" },
      showBackButton: { type: "String", attribute: "show-back-button" },
      sectionTitle: { type: "String", attribute: "section-title" },
      dispatchOn: { attribute: "dispatch-on"}
    },
  }}
/>

<script lang="ts">;
  import { onMount } from "svelte"
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, receive, relay, styles } from "../../common/utils";
  import {
    ExternalErrorRelayDetail,
    ExternalSetErrorMsg,
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetChangeMsg,
    FieldsetChangeRelayDetail,
    FieldsetErrorRelayDetail,
    FieldsetItemState,
    FieldsetMountFormItemMsg,
    FieldsetMountFormRelayDetail,
    FieldsetResetErrorsMsg,
    FieldsetSetErrorMsg,
    FieldsetSubmitMsg,
    FieldsetValidationRelayDetail,
    FormDispatchStateMsg,
    FormDispatchStateRelayDetail,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FormItemMountMsg,
    FormItemMountRelayDetail,
    FormResetErrorsMsg,
    FormSetFieldsetMsg,
    FormSetFieldsetRelayDetail,
    FormSetValueMsg,
    FormSetValueRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
  } from "../../types/relay-types";

  // ======
  // Public
  // ======

  export let id: string = "";
  export let heading: string = "";
  export let buttonText: string = "";
  export let secondaryButtonText: string = "";
  export let showBackButton: string = "true";
  export let sectionTitle: string = "";
  export let state: "subform" | "default" = "default";

  // when the changes will be dispatched to the form; `change` ~ immediately
  export let dispatchOn: "change" | "continue" = "continue";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let first: boolean = false;
  export let last: boolean = false;

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;
  let _active: boolean = false;
  let _editting: boolean = false;
  let _detail: FieldsetBindRelayDetail;
  let _errors: Record<string, string> = {};

  // allows for the state to be sent to _continue event allowing for custom validation
  let _state: Record<string, FieldsetItemState> = {};
  // snapshot of the state when the fieldset is made active
  let _stateSnapshot: Record<string, FieldsetItemState> = {};

  // reference to child form-item components to allow for relaying of error state
  let _formItems: Record<string, { label: string; el: HTMLElement }> = {};

  // reference to child form input, dropdown, etc components to allow for relaying of error state
  let _formFields: Record<string, HTMLElement> = {};

  // ========
  // Reactive
  // ========

  $: if (_active) {
    const url = new URL(location.href);
    url.searchParams.set("page", id);
    history.pushState({ page: id }, "", url);
  }

  // =====
  // Hooks
  // =====

  onMount(() => {
    _detail = {
      id,
      heading,
      el: _rootEl,
    };

    dispatchBindMsg();
    addChildChangeListener();
    bindChannel();
  });

  // =========
  // Functions
  // =========

  function bindChannel() {
    receive(_rootEl, (action, data) => {
      // console.log(`  RECEIVE(Fieldset => ${action}):`, data);
      switch (action) {
        case FormSetFieldsetMsg:
          onSetFieldset(data as FormSetFieldsetRelayDetail);
          break;
        case FormResetErrorsMsg:
          onErrorReset();
          break;
        case FormDispatchStateMsg:
          onFormDispatch(data as FormDispatchStateRelayDetail);
          break;
        case FormItemMountMsg:
          onFormItemMount(data as FormItemMountRelayDetail);
          break;
        case FormFieldMountMsg:
          onFieldsetMount(data as FormFieldMountRelayDetail);
          break;
        case FormToggleActiveMsg:
          onToggleActiveState(data as FormToggleActiveRelayDetail);
          break;
        case ExternalSetErrorMsg:
          onError(data as ExternalErrorRelayDetail);
          break;
      }
    });
  }

  // *****************
  // Dispatch handlers
  // *****************

  function onSetFieldset(detail: FormSetFieldsetRelayDetail) {
    for (const [id, item] of Object.entries(detail.value)) {
      _state[id] = { ...item }
    }
  }

  function onFormDispatch(detail: FormDispatchStateRelayDetail) {
    // allow customization of form if user has jumped back to a question (editting mode)
    _editting = detail.editting === id;
  }

  function onErrorReset() {
    _errors = {};

    // reset children
    for (const [_, el] of Object.entries(_formFields)) {
      relay(el, FieldsetResetErrorsMsg, null);
    }
    for (const [_, { el }] of Object.entries(_formItems)) {
      relay(el, FieldsetResetErrorsMsg, null);
    }
  }

  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    _active = detail.active;
    _stateSnapshot = { ..._state };
  }

  function onFormItemMount(detail: FormItemMountRelayDetail) {
    const { id, label, el } = detail;
    _formItems[id] = { label, el };
  }

  // Collect list of child form item (input, dropdown, etc) elements
  function onFieldsetMount(detail: FormFieldMountRelayDetail) {
    const { name, el } = detail;
    _formFields[name] = el;

    // dispatch to the Form along with the fieldset id
    relay<FieldsetMountFormRelayDetail>(
      _rootEl,
      FieldsetMountFormItemMsg,
      { id, name, el },
      { bubbles: true },
    );
  }

  function onError(detail: ExternalErrorRelayDetail) {
    _errors[detail.name] = detail.msg;

    // dispatch error down to fields
    relay<FieldsetErrorRelayDetail>(_formFields[detail.name], FieldsetSetErrorMsg, {
      error: detail.msg,
    });

    console.log("dertai", detail);
    // dispatch error down to form items
    relay<FieldsetErrorRelayDetail>(_formItems[detail.name].el, FieldsetSetErrorMsg, {
      error: detail.msg,
    });
  }

  // **************
  // Event handlers
  // **************

  // Dispatch _continue event to app's level allowing custom validation to be performed
  function saveAndContinue() {
    // Prevents looping form sections from sending no data to the form, thereby overwritting data
    // already collected and saved at the form level
    const isDirty = Object.keys(_state).length > 0
    if (isDirty) {
      relayFieldsetChange();
    }
    
    // dispatch to on:_continue method allowing users to validate the data
    sendContinueMsg(false);
  }

  function sendContinueMsg(cancelled: boolean) {
    if (cancelled) {
      revertFormFieldValues();            
    }
    dispatch<FieldsetValidationRelayDetail>(
      _rootEl,
      "_continue",
      { el: _rootEl, state: cancelled ? _stateSnapshot : _state},
      { bubbles: true },
    );
  }

  // *********
  // Functions
  // *********

  function onCancel() {
    sendContinueMsg(true)
  }

  function revertFormFieldValues() {
    for (const [id, el] of Object.entries(_formFields)) {
      relay<FormSetValueRelayDetail>(el, FormSetValueMsg, { name: id, value: _stateSnapshot[id].value});
    }
  }

  function onSubmit() {
    relay(_rootEl, FieldsetSubmitMsg, {}, { bubbles: true });
  }

  function onSecondaryClick() {
    dispatch(_rootEl, "_secondaryClick", {}, { bubbles: true });
  }

  function handleBack(e: Event) {
    history.back();
    e.stopPropagation();
  }

  function dispatchBindMsg() {
    relay<FieldsetBindRelayDetail>(_rootEl, FieldsetBindMsg, _detail, {
      bubbles: true,
      timeout: 10,
    });
  }

  function addChildChangeListener() {
    _rootEl.addEventListener("_change", (e: Event) => {
      const { name, value } = (e as CustomEvent).detail;

      // if no name is registered, they are not bound to the public-form
      if (!_formItems[name]) {
        return;
      }
      
      _state[name] = { name, value, label: _formItems[name].label };

      if (dispatchOn === "change") {
        const isDirty = Object.keys(_state).length > 0
        if (isDirty) {
          relayFieldsetChange();
        }
      }

      e.stopPropagation();
    });
  }

  function relayFieldsetChange() {
    relay<FieldsetChangeRelayDetail>(
      _rootEl,
      FieldsetChangeMsg,
      { id, state: _state, dispatchOn },
      { bubbles: true },
    );
  }

  function jumpToError(e: Event, id: string) {
    _formFields[id].focus();
    e.preventDefault();
  }
</script>

<section bind:this={_rootEl}>
  <fieldset
    style={styles(
      calculateMargin(mt, mr, mb, ml),
      `display: ${_active ? "block" : "none"}`,
    )}
  >
    {#if state === "default"}
      {#if !first && !_editting && !last && showBackButton === "true"}
        <goa-link-button leadingicon="chevron-back" mb="2xl" on:_click={handleBack}>
          Back
        </goa-link-button>
      {/if}

      {#if Object.keys(_errors).length}
        <goa-callout
          type="emergency"
          heading="Please correct the following errors on this page:"
        >
          <ul class="errors">
            {#each Object.keys(_errors) as key}
              <li>
                <a class="error" href={`#${key}`} on:click={(e) => jumpToError(e, key)}>
                  {_errors[key]}
                </a>
              </li>
            {/each}
          </ul>
        </goa-callout>
      {/if}

      {#if sectionTitle}
        <goa-text class="section-title" size="body-l" mb="s">{sectionTitle}</goa-text>
      {/if}

      {#if heading}
        <goa-text as="h2" size="heading-l">{heading}</goa-text>
      {:else}
        <br />
      {/if}

      <slot />

      <goa-block mt="xl">
        {#if _editting && !secondaryButtonText}
          <goa-button on:_click={onCancel} type="secondary">
            Cancel
          </goa-button>
        {/if}
        {#if secondaryButtonText}
          <goa-button on:_click={onSecondaryClick} type="secondary">
            {secondaryButtonText}
          </goa-button>
        {/if}

        {#if last}
          <goa-button on:_click={onSubmit} type="primary">
            {buttonText || "Confirm"}
          </goa-button>
        {:else}
          <goa-button on:_click={saveAndContinue} type="primary">
            {buttonText || "Continue"}
          </goa-button>
        {/if}
      </goa-block>

    {:else}
      <slot name="subform" />
    {/if}
  </fieldset>
</section>

<style>
  fieldset {
    border: none;
    padding: 0;
  }

  .section-title {
    color: var(--goa-color-greyscale-700);
  }

  .errors li::marker,
  a.error,
  a.error:visited {
    color: var(--goa-color-emergency-dark);
  }
</style>
