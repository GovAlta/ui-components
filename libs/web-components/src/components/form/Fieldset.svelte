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
  import { dispatch, receive } from "../../common/utils";
  import {
    FieldsetValidationRelayDetail,
    FormPageContinueMsg,
    FormPageContinueRelayDetail,
  } from "../../types/relay-types";


  export let name: string;


  let _rootEl: HTMLElement;
  let _errors: Record<string, string> = {};

  onMount(() => {
    if (!name) {
      console.warn("Fieldset is missing name attribute");
    }

    receive(_rootEl, (action, data, event) => {
      switch (action) {
        case FormPageContinueMsg:
          onFormPageContinue(data as FormPageContinueRelayDetail);
          event.stopPropagation();
          break;
      }
    });
  });

  function jumpToError(e: Event, id: string) {
    // FIXME: on an error the element in error should be passed to the event
    // _formFields[id].focus();
    e.preventDefault();
  }

  function onFormPageContinue(detail: FormPageContinueRelayDetail) {

    // send continue to allow for page change
    // FIXME: state no longer needs to be send
    // FIXME: why is `cancelled` a prop? There should just be a different button and event
    dispatch<FieldsetValidationRelayDetail>(
      _rootEl,
      "_continue",
      { el: _rootEl, state: {}, cancelled: detail.cancelled },
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
