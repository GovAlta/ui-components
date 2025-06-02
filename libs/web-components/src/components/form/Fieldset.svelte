<svelte:options
  customElement={{
    tag: "goa-fieldset",
    props: {
      sectionTitle: { type: "String", attribute: "section-title" },
      dispatchOn: { attribute: "dispatch-on" },
    },
  }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { dispatch, receive, relay } from "../../common/utils";
  import {
    ExternalErrorRelayDetail,
    ExternalSetErrorMsg,
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetChangeMsg,
    FieldsetChangeRelayDetail,
    FieldsetErrorRelayDetail,
    FieldsetItemState,
    FieldsetResetErrorsMsg,
    FieldsetResetFieldsMsg,
    FieldsetSetErrorMsg,
    FieldsetSetValueMsg,
    FieldsetSetValueRelayDetail,
    FieldsetValidationRelayDetail,
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
    FormPageContinueMsg,
    FormPageContinueRelayDetail,
  } from "../../types/relay-types";

  // ======
  // Public
  // ======

  export let id: string = "";
  // when the changes will be dispatched to the form; `change` ~ immediately
  export let dispatchOn: "change" | "continue" = "continue";

  // =======
  // Private
  // =======

  let _rootEl: HTMLElement;
  let _errors: Record<string, string> = {};

  // allows for the state to be sent to _continue event allowing for custom validation
  let _state: Record<string, FieldsetItemState> = {};

  // snapshot of the state when the fieldset is made active
  let _stateSnapshot: Record<string, FieldsetItemState> = {};

  // reference to child form-item components to allow for relaying of error state
  let _formItems: Record<string, { label: string; el: HTMLElement }> = {};

  // reference to child form input, dropdown, etc components to allow for relaying of error state
  let _formFields: Record<string, HTMLElement> = {};

  // =====
  // Hooks
  // =====

  onMount(() => {
    dispatchBindMsg();
    addChildChangeListener();
    bindChannel();
    bindAlterPropsMsg();
  });

  // =========
  // Functions
  // =========

  function bindChannel() {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case FormSetFieldsetMsg:
          onSetFieldset(data as FormSetFieldsetRelayDetail);
          event.stopPropagation();
          break;
        case FormResetErrorsMsg:
          onErrorReset();
          event.stopPropagation();
          break;
        case FormItemMountMsg:
          onFormItemMount(data as FormItemMountRelayDetail);
          event.stopPropagation();
          break;
        case FormFieldMountMsg:
          onFormFieldMount(data as FormFieldMountRelayDetail);
          event.stopPropagation();
          break;
        case FormToggleActiveMsg:
          onToggleActiveState(data as FormToggleActiveRelayDetail);
          event.stopPropagation();
          break;
        case ExternalSetErrorMsg:
          onError(data as ExternalErrorRelayDetail);
          event.stopPropagation();
          break;
        case FormPageContinueMsg:
          onFormPageContinue(data as FormPageContinueRelayDetail);
          event.stopPropagation();
          break;
        case FormResetFormMsg:
          resetFields(event);
          event.stopPropagation();
          break;
      }
    });
  }

  // *****************
  // Dispatch handlers
  // *****************

  /**
   * Set goa-details components, within the fieldset, to have a certain top spacing
   * set within the UI design guidelines
   */
  function bindAlterPropsMsg() {
    const els = document.querySelectorAll("goa-details");
    els.forEach((el) => {
      el.setAttribute("style", "margin-top: -1rem");
    })
  }

  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    // obtain an initial snapshot of the data when fieldset shown
    if (detail.active) {
      _stateSnapshot = JSON.parse(JSON.stringify({ ..._state }));
    }
  }

  function resetFields(event: Event) {
    _state = {};
    // prevent subform resets from resetting the parent
    event.stopPropagation();

    for (const { el } of Object.values(_formFields)) {
      relay(el, FieldsetResetFieldsMsg);
    }
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
            _formFields[name],
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

  function onErrorReset() {
    _errors = {};

    // reset children
    for (const [_, val] of Object.entries(_formFields)) {
      relay(val, FieldsetResetErrorsMsg, null);
    }
    for (const [_, { el }] of Object.entries(_formItems)) {
      relay(el, FieldsetResetErrorsMsg, null);
    }
  }

  function onFormItemMount(detail: FormItemMountRelayDetail) {
    const { id, label, el, order } = detail;
    _formItems[id] = { label, el };

    const defaultOrderIndex = Object.keys(_formItems).length;
    _state[id] = {
      name: id,
      value: "",
      label: label,
      order: order || defaultOrderIndex,
    }
  }

  // Collect list of child form item (input, dropdown, etc) elements
  function onFormFieldMount(detail: FormFieldMountRelayDetail) {
    const { name, el } = detail;
    if (!name) return;

    _formFields[name] = el;
  }

  function onError(detail: ExternalErrorRelayDetail) {

    if (detail.grouped) {
      if (!Object.values(_errors).includes(detail.msg)) {
        _errors[detail.name] = detail.msg;
      }
    } else {
      _errors[detail.name] = detail.msg;
    }

    // dispatch error down to fields
    relay<FieldsetErrorRelayDetail>(
      _formFields[detail.name],
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

  // *********
  // Functions
  // *********

  // Reverts the form field values within the "input" components to prevent the
  // cancelled values from showing when viewed again.
  function revertFormFieldValues() {
    for (const [name, field] of Object.entries(_formFields)) {
      // some form elements not "form-bound" won't exist within the snapshot state
      if (_stateSnapshot[name]) {
        relay<FieldsetSetValueRelayDetail>(field, FieldsetSetValueMsg, {
          name,
          value: _stateSnapshot[name].value,
        });
      }
    }
  }

  // Bind with the parent FormPage
  function dispatchBindMsg() {
    setTimeout(() => {
      relay<FieldsetBindRelayDetail>(
        _rootEl,
        FieldsetBindMsg,
        { id, el: _rootEl, cb: (_id) => (id = _id) },
        { bubbles: true, timeout: 10 },
      );
    }, 10);
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

      _state[name].value = value;

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
        state: { data: _state },
        dispatchOn,
      },
      { bubbles: true },
    );
  }

  function jumpToError(e: Event, id: string) {
    _formFields[id].focus();
    e.preventDefault();
  }

  function onFormPageContinue(detail: FormPageContinueRelayDetail) {
    const isDirty = Object.keys(_state).length > 0;

    // send updated values for _stateChange
    if (isDirty && !detail.cancelled) {
      relayFieldsetChange();
    }

    // revert the component values
    if (detail.cancelled) {
      revertFormFieldValues();
      _state = _stateSnapshot;
    }

    // send continue to allow for page change
    dispatch<FieldsetValidationRelayDetail>(
      _rootEl,
      "_continue",
      { el: _rootEl, state: _state, cancelled: detail.cancelled },
      { bubbles: true },
    );
  }
</script>

<fieldset bind:this={_rootEl}>
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

  <goa-block gap="xl" direction="column">
    <slot />
  </goa-block>

</fieldset>

<style>
  fieldset {
    border: none;
    padding: 0;
    margin-bottom: var(--goa-space-m);
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
