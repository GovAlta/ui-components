<svelte:options customElement={{
  tag: "goa-pf-subform",
  props: {
    addbuttontext: { attribute: "addbuttontext", reflect: true, type: "String" },
    addbuttontype: { attribute: "addbuttontype", reflect: true, type: "String" },
    addbuttonsize: { attribute: "addbuttonsize", reflect: true, type: "String" },
    addbuttonicon: { attribute: "addbuttonicon", reflect: true, type: "String" },
    addheading: { attribute: "addheading", reflect: true, type: "String" },
    editheading: { attribute: "editheading", reflect: true, type: "String" },
  }
}} />

<script lang="ts">
  import { dispatch } from "@abgov/ui-components-common";
  import { onMount } from "svelte";

  // Add button customization
  export let addbuttontext: string = "Add";
  export let addbuttontype: string = "primary";
  export let addbuttonsize: string = "default";
  export let addbuttonicon: string = "";

  // Modal headings
  export let addheading: string = "";
  export let editheading: string = "";

  let open = false;

  let _id: string;  // uuid for the editted item
  let _rootEl: HTMLElement;

  onMount(() => {
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
  <goa-modal {open} heading={_id ? editheading : addheading}>
    <slot name="form" />
    <div slot="actions">
      <goa-button-group alignment="end">
        <goa-button type="tertiary" action="cancel">Cancel</goa-button>
        <goa-button action="save">Save</goa-button>
      </goa-button-group>
    </div>
  </goa-modal>

  <slot />
  <goa-button action="add" type={addbuttontype} size={addbuttonsize} leadingicon={addbuttonicon || undefined}>{addbuttontext}</goa-button>
</div>
