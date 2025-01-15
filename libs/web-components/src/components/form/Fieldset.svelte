<svelte:options
  customElement={{
    tag: "goa-public-form-page",
    props: {
      buttonText: { type: "String", attribute: "button-text" },
      secondaryButtonText: {
        type: "String",
        attribute: "secondary-button-text",
      },
      skipSummary: { type: "Boolean", attribute: "skip-summary" },
      preserveState: { type: "String", attribute: "preserve-state" },
      sectionTitle: { type: "String", attribute: "section-title" },
      dispatchOn: { attribute: "dispatch-on" },
      first: { attribute: "first", type: "Boolean" },
      last: { attribute: "last", type: "Boolean" },
      active: { attribute: "active", type: "Boolean" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
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
    FieldsetResetFieldsMsg,
    FieldsetSetErrorMsg,
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetCompleteMsg,
    FieldsetValidationRelayDetail,
    FormBackUrlDetail,
    FormBackUrlMsg,
    FormDispatchEditMsg,
    FormDispatchEditRelayDetail,
    FormFieldMountMsg,
    FormFieldMountRelayDetail,
    FormItemMountMsg,
    FormItemMountRelayDetail,
    FormResetErrorsMsg,
    FormResetFormMsg,
    FormSetFieldsetMsg,
    FormSetFieldsetRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
  } from "../../types/relay-types";

  // ======
  // Public
  // ======

  export let id: string = "";
  export let skipSummary: boolean = false;
  export let heading: string = "";
  export let buttonText: string = "";
  export let secondaryButtonText: string = "";
  export let sectionTitle: string = "";

  // when the changes will be dispatched to the form; `change` ~ immediately
  export let dispatchOn: "change" | "continue" = "continue";
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let first: boolean = false;
  export let last: boolean = false;
  export let active: boolean = false;

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;
  let _active: boolean = false;
  let _editting: boolean = false;
  let _errors: Record<string, string> = {};
  let _backUrl: string;

  // allows for the state to be sent to _continue event allowing for custom validation
  let _state: Record<string, FieldsetItemState> = {};

  // snapshot of the state when the fieldset is made active
  let _stateSnapshot: Record<string, FieldsetItemState> = {};

  // reference to child form-item components to allow for relaying of error state
  let _formItems: Record<string, { label: string; el: HTMLElement }> = {};

  // reference to child form input, dropdown, etc components to allow for relaying of error state
  let _formFields: Record<string, { order: number; el: HTMLElement }> = {};

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
    dispatchBindMsg();
    addChildChangeListener();
    bindChannel();
  });

  // =========
  // Functions
  // =========

  function bindChannel() {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case FormSetFieldsetMsg:
          onSetFieldset(data as FormSetFieldsetRelayDetail);
          break;
        case FormResetErrorsMsg:
          onErrorReset();
          break;
        case FormDispatchEditMsg:
          onFormDispatch(data as FormDispatchEditRelayDetail);
          break;
        case FormItemMountMsg:
          onFormItemMount(data as FormItemMountRelayDetail);
          break;
        case FormFieldMountMsg:
          onFormFieldMount(data as FormFieldMountRelayDetail);
          break;
        case FormToggleActiveMsg:
          onToggleActiveState(data as FormToggleActiveRelayDetail);
          break;
        case ExternalSetErrorMsg:
          onError(data as ExternalErrorRelayDetail);
          break;
        case FormBackUrlMsg:
          setBackUrl(data as FormBackUrlDetail);
          break;
        case FormResetFormMsg:
          resetFields(event);
          break;
      }
    });
  }

  // *****************
  // Dispatch handlers
  // *****************

  function resetFields(event: Event) {
    // prevent subform resets from resetting the parent
    event.stopPropagation();

    for (const { el } of Object.values(_formFields)) {
      relay(el, FieldsetResetFieldsMsg);
    }
  }

  function setBackUrl(detail: FormBackUrlDetail) {
    _backUrl = detail.url;
  }

  function onSetFieldset(detail: FormSetFieldsetRelayDetail) {
    if (detail.value.type === "details") {
      // set the local fieldset state
      for (const [id, item] of Object.entries(detail.value.fieldsets)) {
        _state[id] = { ...item };
      }

      // restore state in form items by relaying the message
      for (const [name, data] of Object.entries(_state)) {
        if (data.value) {
          relay<FieldsetSetValueRelayDetail>(
            _formFields[name].el,
            FieldsetSetValueMsg,
            {
              name,
              value: data.value,
            },
          );
        }
      }
    }
  }

  // allow customization of form if user has jumped back to a question (editting mode)
  function onFormDispatch(detail: FormDispatchEditRelayDetail) {
    _editting = detail.id === id;
  }

  function onErrorReset() {
    _errors = {};

    // reset children
    for (const [_, val] of Object.entries(_formFields)) {
      relay(val.el, FieldsetResetErrorsMsg, null);
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
  function onFormFieldMount(detail: FormFieldMountRelayDetail) {
    const { name, el } = detail;
    if (!name) return;

    const itemCount = Object.keys(_formFields).length;
    _formFields[name] = { order: itemCount + 1, el };

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
    relay<FieldsetErrorRelayDetail>(
      _formFields[detail.name].el,
      FieldsetSetErrorMsg,
      {
        error: detail.msg,
      },
    );

    // dispatch error down to form items
    relay<FieldsetErrorRelayDetail>(
      _formItems[detail.name].el,
      FieldsetSetErrorMsg,
      {
        error: detail.msg,
      },
    );
  }

  // **************
  // Event handlers
  // **************

  // FIXME: refactor this
  // Dispatch _continue event to app's level allowing custom validation to be performed
  function saveAndContinue() {
    // Prevents looping form sections from sending no data to the form, thereby overwritting data
    // already collected and saved at the form level
    // const isDirty = Object.keys(_state).length > 0;
    // if (isDirty) {
    //   relayFieldsetChange();
    // }

    // dispatch to on:_continue method allowing users to validate the data
    sendContinueMsg(false);
  }

  function sendContinueMsg(cancelled: boolean) {
    console.log("sendContinueMsg", cancelled, _state);

    const isDirty = Object.keys(_state).length > 0;
    if (isDirty) {
      relayFieldsetChange();
    }

    dispatch<FieldsetValidationRelayDetail>(
      _rootEl,
      "_continue",
      { el: _rootEl, state: cancelled ? _stateSnapshot : _state, last, first },
      { bubbles: true },
    );

    if (cancelled) {
      revertFormFieldValues();
      _state = _stateSnapshot;
    }
  }

  // *********
  // Functions
  // *********

  function onCancel() {
    sendContinueMsg(true);
  }

  function revertFormFieldValues() {
    for (const [name, val] of Object.entries(_formFields)) {
      // some form elements not "form-bound" won't exist within the snapshot state
      if (_stateSnapshot[name]) {
        relay<FieldsetSetValueRelayDetail>(val.el, FieldsetSetValueMsg, {
          name,
          value: _stateSnapshot[name].value,
        });
      }
    }
  }

  function onComplete() {
    // FIXME: this functions assumes that the submit button is being displayed within a summary page
    // and that the all the form data has already been relayed up to the form. But if the last page
    // is *not* a summary page this breaks.
    sendContinueMsg(false); // This was added to ensure that above issue is "fixed"
    relay(_rootEl, FieldsetCompleteMsg, null, { bubbles: true });
  }

  function onSecondaryClick() {
    dispatch(_rootEl, "_secondaryClick", {}, { bubbles: true });
  }

  function handleBack(e: Event) {
    history.back();
    e.stopPropagation();
  }

  function dispatchBindMsg() {
    relay<FieldsetBindRelayDetail>(
      _rootEl,
      FieldsetBindMsg,
      { id, heading, skipSummary, el: _rootEl },
      { bubbles: true, timeout: 10 },
    );
  }

  function addChildChangeListener() {
    _rootEl.addEventListener("_change", (e: Event) => {
      const { name, value } = (e as CustomEvent).detail;
      // if no name is registered, they are not bound to the public-form
      if (!_formItems[name]) {
        return;
      }

      if (!_formFields[name]) {
        return;
      }
      _state[name] = {
        name,
        value,
        label: _formItems[name].label,
        order: _formFields[name].order,
      };

      if (dispatchOn === "change") {
        const isDirty = Object.keys(_state).length > 0;
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
      {
        id,
        state: { heading, data: _state },
        dispatchOn,
      },
      { bubbles: true },
    );
  }

  function jumpToError(e: Event, id: string) {
    _formFields[id].el.focus();
    e.preventDefault();
  }
</script>

<section bind:this={_rootEl}>
  <fieldset
    style={styles(
      calculateMargin(mt, mr, mb, ml),
      `display: ${_active || active ? "block" : "none"}`,
    )}
  >
    {#if first && _backUrl && !_editting }
      <goa-link leadingicon="chevron-back" mb="2xl">
        <a href={_backUrl}>Back</a>
      </goa-link>
    {/if}
    {#if (!first && !_editting && !last)}
      <goa-link-button
        leadingicon="chevron-back"
        mb="2xl"
        on:_click={handleBack}
      >
        Back
      </goa-link-button>
    {/if}

    {#if Object.values(_errors).filter((err) => !!err).length}
      <goa-callout type="emergency" heading={`There is a problem`}>
        <ul class="errors">
          {#each Object.keys(_errors) as key}
            <li>
              <a
                class="error"
                href={`#${key}`}
                on:click={(e) => jumpToError(e, key)}
              >
                {_errors[key]}
              </a>
            </li>
          {/each}
        </ul>
      </goa-callout>
    {/if}

    {#if sectionTitle}
      <goa-text class="section-title" size="body-l" mb="s">
        {sectionTitle}
      </goa-text>
    {/if}

    {#if heading}
      <goa-text as="h2" size="heading-l">{heading}</goa-text>
    {:else}
      <br />
    {/if}

    <goa-block gap="m" direction="column">
      <slot />
    </goa-block>

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
        <goa-button on:_click={onComplete} type="primary">
          {buttonText || "Confirm"}
        </goa-button>
      {:else}
        <goa-button on:_click={saveAndContinue} type="primary">
          {buttonText || "Continue"}
        </goa-button>
      {/if}
    </goa-block>
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

  ul {
    padding: 0;
  }

  ul li {
    list-style-type: none;
  }

  a.error,
  a.error:visited {
    color: var(--goa-color-emergency-dark);
  }
</style>
