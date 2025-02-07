<svelte:options
  customElement={{
    tag: "goa-public-form-page",
    props: {
      buttonText: { type: "String", attribute: "button-text" },
      buttonVisibility: { type: "String", attribute: "button-visibility" },
      sectionTitle: { type: "String", attribute: "section-title" },
    }
  }}
/>

<script lang="ts">
  import { calculateMargin, Spacing } from "../../common/styling";
  import { dispatch, receive, relay, styles } from "../../common/utils";
  import {
    FieldsetBindMsg,
    FieldsetBindRelayDetail,
    FieldsetChangeMsg,
    FieldsetChangeRelayDetail,
    FieldsetCompleteMsg,
    FieldsetValidationRelayDetail,
    FormBackUrlDetail,
    FormBackUrlMsg,
    FormDispatchEditMsg,
    FormDispatchEditRelayDetail, FormPageBackMsg,
    FormPageBindMsg,
    FormPageBindRelayDetail,
    FormPageContinueMsg,
    FormPageContinueRelayDetail,
    FormToggleActiveMsg,
    FormToggleActiveRelayDetail,
  } from "../../types/relay-types";
  import { onMount } from "svelte";

  export let buttonText: string = "";

  // common with fieldset
  export let id: string = "";
  export let heading: string = "";
  export let sectionTitle: string = "";
  export let type: "step" | "first-step" | "last-step" | "multistep";
  export let buttonVisibility: "visible" | "hidden" = "visible";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;
  export let active: boolean = false;

  // Private

  let _senderEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _fieldsetEl: HTMLElement;
  let _active: boolean = false;
  let _backUrl: string;
  let _editting: boolean = false;  // when a user jumps from the summary page back to one of the pages

  // ========
  // Reactive
  // ========

  $: if (_active) {
    const url = new URL(location.href);
    url.searchParams.set("page", id);
    history.pushState({ page: id }, "", url);
  }

  onMount(() => {
    bindReceiver();
    bindWithParent();
  });

  function bindReceiver() {
    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case FormToggleActiveMsg:
          onToggleActiveState(data as FormToggleActiveRelayDetail);
          break;
        case FormBackUrlMsg:
          setBackUrl(data as FormBackUrlDetail);
          break;
        case FormDispatchEditMsg:
          onFormDispatch(data as FormDispatchEditRelayDetail);
          break;
        case FieldsetChangeMsg:
          onFieldsetChange(data as FieldsetChangeRelayDetail);
          break;
        case "_continue":
          handleFieldsetContinue(data as FieldsetValidationRelayDetail);
          break;
        case FieldsetBindMsg:
          bindFieldset(event, data as FieldsetBindRelayDetail);
          break;
      }
    });
  }

  function bindFieldset(event: Event, detail: FieldsetBindRelayDetail) {
    event.stopPropagation();

    _fieldsetEl = detail.el;
    detail.cb?.(id);

    // resend up with the id
    relay(_senderEl, FieldsetBindMsg, { ...detail, id }, { bubbles: true });
  }

  function bindWithParent() {
    setTimeout(() => {
      relay<FormPageBindRelayDetail>(
        _senderEl,
        FormPageBindMsg,
        { id, el: _rootEl, heading },
        { bubbles: true },
      );
    }, 10);
  }

  function onFieldsetChange(detail: FieldsetChangeRelayDetail) {
    relay<FieldsetChangeRelayDetail>(
      _senderEl,
      FieldsetChangeMsg,
      { ...detail, state: { ...detail.state, heading } },
      { bubbles: true },
    );
  }

  function setBackUrl(detail: FormBackUrlDetail) {
    _backUrl = detail.url;
  }

  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    _active = detail.active;
  }

  // allow customization of form if user has jumped back to a question (editting mode)
  function onFormDispatch(detail: FormDispatchEditRelayDetail) {
    _editting = detail.id === id;
  }

  // Either directly or indirectly gets a _continue message sent up the dom tree
  // If a fieldset exists, a message must be sent to the fieldset to get the fieldset
  // to send the _continue message, as the message will contain the data within the fieldset.
  // If no fieldset exists (text only or summary page) then no data exists so a _continue
  // message can be sent directly from this component.
  function dispatchContinueMsg(cancelled = false) {
    if (_fieldsetEl) {
      // send message to fieldset to then get it to send data up
      relay<FormPageContinueRelayDetail>(_fieldsetEl, FormPageContinueMsg, { cancelled });
    } else {
      dispatch(_senderEl, "_continue", null, { bubbles: true });
    }
  }

  function dispatchCompletion() {
    dispatchContinueMsg(); // This was added to ensure that above issue is "fixed"
    relay(_senderEl, FieldsetCompleteMsg, null, { bubbles: true });
  }

  // TODO: these errors can be resolved by being able to send a message down to the child fieldset
  function handleFieldsetContinue(detail: FieldsetValidationRelayDetail) {
    dispatch<FieldsetValidationRelayDetail>(
      _rootEl,
      "_continue",
      { ...detail, last: type === "last-step", first: type === "first-step" },
      { bubbles: true },
    );
  }

  function handleBack(e: Event) {
    relay(_senderEl, FormPageBackMsg, null, { bubbles: true });
    e.stopPropagation();
  }
</script>

<section
  bind:this={_senderEl}
  style={styles(
    calculateMargin(mt, mr, mb, ml),
    `display: ${_active || active ? "block" : "none"}`,
  )}
>
  <div bind:this={_rootEl}>
    {#if type === "first-step" && _backUrl && !_editting }
      <goa-link leadingicon="chevron-back" mb="2xl">
        <a href={_backUrl}>Back</a>
      </goa-link>
    {/if}

    {#if (type === "step" && !_editting)}
      <goa-link-button
        leadingicon="chevron-back"
        mb="2xl"
        on:_click={handleBack}
      >
        Back
      </goa-link-button>
    {/if}

    {#if sectionTitle}
      <goa-text size="body-l" mb="s" color="secondary">{sectionTitle}</goa-text>
    {/if}

    {#if heading}
      <goa-text as="h2" size="heading-l">{heading}</goa-text>
    {/if}

    <slot />

    {#if type !== "multistep"}
      <goa-block mt="xl">
        {#if _editting}
          <goa-button on:_click={() => dispatchContinueMsg(false)} type="secondary">
            Cancel
          </goa-button>
        {/if}

        {#if type === "last-step"}
          <goa-button on:_click={() => dispatchCompletion()} type="primary">
            {buttonText || "Confirm"}
          </goa-button>
        {:else}
          {#if buttonVisibility === "visible"}
            <goa-button on:_click={() => dispatchContinueMsg()} type="primary">
              {buttonText || "Continue"}
            </goa-button>
          {/if}
        {/if}
      </goa-block>
    {/if}
  </div>
</section>
