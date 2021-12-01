<svelte:options tag="goa-modal" />

<!-- Script -->
<script lang="ts">

</script>

<!-- Html -->
<div class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <slot />
  </div>
</div>

<!-- Css -->
<style>
  .modal {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 100;
  }

  .modal-content {
    background-color: #fff;
    border: 1px solid red;
  }

</style>
