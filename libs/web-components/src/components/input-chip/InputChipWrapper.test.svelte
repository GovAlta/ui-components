<svelte:options customElement="test-input-chip-wrapper" />

<script lang="ts">
  import GoAInputChip from "./InputChip.svelte";
  import GoAInput from "../input/Input.svelte";
</script>

<GoAInputChip {...$$restProps}>
  <GoAInput>
    <test-input-chip-wrapper>
      {#if $$restProps.leadingContent}
        <div slot="leadingContent"></div>
      {/if}
      <div slot="innerContent" class="innerContent"></div>
      {#if $$restProps.trailingContent}
        <div slot="trailingContent"></div>
      {/if}
    </test-input-chip-wrapper>
  </GoAInput>
</GoAInputChip>
