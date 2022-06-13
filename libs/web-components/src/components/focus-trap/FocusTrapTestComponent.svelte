<!-- Script -->
<script lang="ts">
  import GoAFocusTrap from './FocusTrap.svelte';
</script>

<!-- HTML -->
<div>
  <input type="text" class="description" name="description" />
  <GoAFocusTrap open="true">
    <input type="text" class="username" name="username" />
    <input type="text" class="email" name="email" />
    <input type="text" class="address" name="address" />
  </GoAFocusTrap>
  <input type="submit" />
  <input type="reset" />
</div>
