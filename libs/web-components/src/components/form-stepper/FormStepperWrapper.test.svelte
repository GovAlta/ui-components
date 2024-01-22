<svelte:options customElement="test-form-step-wrapper" />

<script lang="ts">
  import GoAFormStepper from "./FormStepper.svelte";

  export let step: number = -1;
</script>

<GoAFormStepper {step}>
  <goa-form-step text="foobar" enabled="true" />
  <goa-form-step text="foobar" enabled="true" />
  <goa-form-step text="foobar" enabled="true" />
  <goa-form-step text="foobar" enabled="true" />
</GoAFormStepper>
