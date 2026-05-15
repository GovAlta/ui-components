<svelte:options customElement="test-input-formitem-wrapper" />

<!-- Script -->
<script lang="ts">
  import GoAFormItem from "../form-item/FormItem.svelte";
  import GoAInput from "./Input.svelte";

  export let label: string = "";
  export let helptext: string = "";
  export let testIdFormItem: string = "";

  export let inputId: string = "";
  export let testIdInput: string = "";
  export let arialabel: string = "";
  export let inputName: string = "";
</script>

<!-- HTML -->

<GoAFormItem {label} {helptext} testid={testIdFormItem}>
  <GoAInput id={inputId} name={inputName} {arialabel} testid={testIdInput} />
</GoAFormItem>
