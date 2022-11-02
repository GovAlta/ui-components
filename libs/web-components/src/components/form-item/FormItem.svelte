<svelte:options tag="goa-form-item" />

<!-- Script -->
<script lang="ts">
  import { toBoolean } from "../../common/utils";
  import { onMount } from "svelte";

  const REQUIREMENT_TYPES = ["optional", "required", ""];
  type RequirementType = (typeof REQUIREMENT_TYPES)[number];

  // type check function
  function isRequirementType(value: string): value is RequirementType {
    return REQUIREMENT_TYPES.includes(value);
  }

  // Optional
  export let label: string = "";
  export let helptext: string = "";
  export let error: string = "";
  export let requirement: RequirementType = "";

  onMount(() => {
    if (!isRequirementType(requirement)) {
      console.error("Invalid requirement type", requirement);
    }
  })

</script>

<!-- HTML -->
<div class="goa-form-item">
  {#if label}
    <div class="label">
      {label}
      {#if requirement && REQUIREMENT_TYPES.includes(requirement)}
        <em>({requirement})</em>
      {/if}
    </div>
  {/if}
  <div class="form-item-input">
    <slot />
  </div>
  {#if error}
    <div class="error-msg">
      <goa-icon type="warning" size="small" theme="filled" style="pointer-events: none;" />
      {error}
    </div>
  {/if}
  {#if helptext}
    <div class="help-msg">{helptext}</div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--font-family);
  }

  * {
    box-sizing: border-box;
  }

  .label {
    display: block;
    font-weight: var(--fw-bold);
    color: var(--goa-color-text);
    font-size: var(--fs-base);
    padding: 0.5rem 0;
  }

  .label em {
    color: var(--color-gray-600);
    font-weight: var(--fw-regular);
    font-size: var(--fs-sm);
    line-height: var(--lh-sm);
    font-style: normal;
  }

  .form-item-input {
    margin-bottom: 0.25rem;
  }

  .help-msg {
    font-size: var(--fs-sm);
    color: var(--goa-color-text);
    margin-right: 56px;
  }

  .error-msg {
    display: inline-flex;
    gap: 0.25rem;
    font-size: var(--fs-sm);
    color: var(--goa-color-interactive--error);
    margin-bottom: 0.25rem;
  }
</style>
