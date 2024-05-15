<svelte:options customElement="test-form-step-wrapper" />

<script lang="ts" context="module">
  import type { FormStepFlowType } from "./FormStepper.svelte";
</script>

<script lang="ts">
  import GoAFormStepper from "./FormStepper.svelte";
  import GoAFormStep from "../form-step/FormStep.svelte";

  export let step: number = -1;
  export let type: FormStepFlowType;
</script>

<GoAFormStepper {step} {type}>
  <GoAFormStep text="step 1" />
  <GoAFormStep text="step 2" />
  <GoAFormStep text="step 3" />
  <GoAFormStep text="step 4" />
</GoAFormStepper>
