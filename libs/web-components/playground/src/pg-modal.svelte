<svelte:options tag="pg-modal" />

<script lang="ts">
  let open: boolean = false;
  let value: string = "blue";
</script>

<goa-modal {open} closable="true" on:_close={() => (open = false)}>
  <goa-dropdown on:_change={() => {}} {value} disabled={false}>
    <goa-dropdown-item value="" label="Red" />
    <goa-dropdown-item value="green" label="Green" />
    <goa-dropdown-item value="blue" label="Blue" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
    <goa-dropdown-item value="white" label="White" />
  </goa-dropdown>
</goa-modal>

<button on:click={() => (open = !open)}> Show </button>

<div class="card">This is a card</div>

<style>
  .card {
    display: grid;
    transition: all 0.5s;
    user-select: none;
  }

  @media (--mobile) {
    .card {
      background-color: green;
    }
  }
  @media (--tablet) {
    .card {
      background-color: steelblue;
    }
  }
  @media (--desktop) {
    .card {
      background-color: paleturquoise;
    }
  }

  @media (--desktop) or (--tablet) {
    .card {
      background-color: red;
    }
  }
</style>
