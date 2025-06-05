<svelte:options
  customElement={{
    tag: "goa-public-form-page",
    props: {
      buttonText: { type: "String", attribute: "button-text" },
      buttonVisibility: { type: "String", attribute: "button-visibility" },
      subHeading: { type: "String", attribute: "sub-heading" },
      sectionTitle: { type: "String", attribute: "section-title" },
      backUrl: { attribute: "back-url", type: "String" },
      summaryHeading: { attribute: "summary-heading", type: "String" },
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
  export let summaryHeading: string = "";
  export let subHeading: string = "";
  export let sectionTitle: string = "";
  export let backUrl: string = "";
  export let type: "step" | "summary" | "multistep" = "step";
  export let buttonVisibility: "visible" | "hidden" = "visible";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = "3xl";
  export let ml: Spacing = null;
  export let active: boolean = false;

  // Private

  let _senderEl: HTMLElement;
  let _rootEl: HTMLElement;
  let _fieldsetEl: HTMLElement;
  let _active: boolean = false;
  let _editting: string = "";  // the id of the form page that is currently being editted

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
          event.stopPropagation();
          break;
        case FormDispatchEditMsg:
          onFormDispatch(data as FormDispatchEditRelayDetail);
          event.stopPropagation();
          break;
        case FieldsetChangeMsg:
          onFieldsetChange(data as FieldsetChangeRelayDetail);
          event.stopPropagation();
          break;
        case FieldsetBindMsg:
          bindFieldset(event, data as FieldsetBindRelayDetail);
          event.stopPropagation();
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
        { id, el: _rootEl, heading: summaryHeading },
        { bubbles: true },
      );
    }, 10);
  }

  function onFieldsetChange(detail: FieldsetChangeRelayDetail) {
    relay<FieldsetChangeRelayDetail>(
      _senderEl,
      FieldsetChangeMsg,
      { ...detail, state: { ...detail.state, heading: summaryHeading } },
      { bubbles: true },
    );
  }

  function onToggleActiveState(detail: FormToggleActiveRelayDetail) {
    _active = detail.active;
    relay(_fieldsetEl, FormToggleActiveMsg, { active: _active });
  }

  // allow customization of form if user has jumped back to a question (editting mode)
  function onFormDispatch(detail: FormDispatchEditRelayDetail) {
    _editting = detail.id;
  }

  // Either directly or indirectly there is a _continue message sent up the dom tree.
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
    {#if !_editting}
      {#if backUrl}
        <goa-link action="back" leadingicon="chevron-back" mb="2xl">
          {#if backUrl === "#"}
            <a>Back</a>
          {:else}
            <a href={backUrl}>Back</a>
          {/if}
        </goa-link>
      {/if}

      {#if !backUrl && type === "step"}
        <goa-link-button
          leadingicon="chevron-back"
          mb="2xl"
          on:_click={handleBack}
        >
          Back
        </goa-link-button>
      {/if}
    {/if}

    {#if sectionTitle}
      <goa-text size="body-l" mb="xs" color="secondary">{sectionTitle}</goa-text>
    {/if}
    {#if heading}
      <goa-text as="h2" size="heading-l" mb={subHeading ? "none" : "m"}>{heading}</goa-text>
    {/if}
    {#if subHeading}
      <goa-text size="body-l" mt="2xs" mb="xl" color="primary">{subHeading}</goa-text>
    {/if}

    <slot />

    {#if type !== "multistep"}
      <goa-block mt="2xl">
        {#if _editting === id}
          <goa-button on:_click={() => dispatchContinueMsg(true)} type="secondary">
            Cancel
          </goa-button>
        {/if}

        {#if type === "summary"}
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
