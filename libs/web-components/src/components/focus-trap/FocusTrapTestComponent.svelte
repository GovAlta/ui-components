<!-- Script -->
<script lang="ts">
  import GoAFocusTrap from "./FocusTrap.svelte";
</script>

<!-- HTML -->
<div>
  <input type="text" class="description" name="description" />
  <GoAFocusTrap>
    <button data-ignore-focus="true">Ignore Focus</button>
    <input type="text" data-testid="username" name="username" />
    <input type="text" data-testid="email" name="email" />
    <input type="text" data-testid="address" name="address" />
  </GoAFocusTrap>
  <input type="submit" />
  <input type="reset" />
</div>
