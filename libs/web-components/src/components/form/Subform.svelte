<svelte:options customElement={{
  tag: "goa-pf-subform",
  props: {

  }
}} />

<script lang="ts">
  import { dispatch } from "@abgov/ui-components-common";
  import { onMount } from "svelte";

  let open = false;

  let _id: string;  // uuid for the editted item
  let _rootEl: HTMLElement;

  onMount(() => {
    // TODO: I think that for these events the parent form-page needs to intercept the event
    // and add the page id to the event detail, then re-dispatch the event, otherwise there is
    // no way to reset the group of values
    _rootEl.addEventListener("edit", (e) => {
      e.stopPropagation();
      _id = (e as CustomEvent).detail;
      open = true;
      dispatch(_rootEl, "pf:subform:edit", _id, { bubbles: true });
    });

    _rootEl.addEventListener("delete", (e) => {
      e.stopPropagation();
      const id = (e as CustomEvent).detail;
      dispatch(_rootEl, "pf:subform:delete", id, { bubbles: true });
      open = false;
    })

    _rootEl.addEventListener("save", (e) => {
      e.stopPropagation();
      dispatch(_rootEl, "pf:subform:save", _id, { bubbles: true });
      _id = "";
      open = false;
    });

    _rootEl.addEventListener("add", (e) => {
      e.stopPropagation();
      _id = "";
      open = true;
      dispatch(_rootEl, "pf:subform:add", _id, { bubbles: true });
    })

    _rootEl.addEventListener("cancel", (e) => {
      e.stopPropagation();
      _id = "";
      open = false;
      dispatch(_rootEl, "pf:subform:cancel", _id, { bubbles: true });
    });
  })
</script>

<div bind:this={_rootEl}>
  <goa-modal {open}>
    <slot name="form" />
    <goa-block slot="actions">
      <goa-button type="tertiary" action="cancel">Cancel</goa-button>
      <goa-spacer hspacing="fill" />
      <goa-button action="save">Save</goa-button>
    </goa-block>
  </goa-modal>

  <slot />
  <goa-button action="add">Add</goa-button>
</div>
