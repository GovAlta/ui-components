<svelte:options tag="pg-input" />

<script lang="ts">

  function handleChange(e) {
    const {name, value} = e.detail
    console.log("handleChange", value)
  }

</script>

<goa-input on:_change={handleChange} />
<goa-textarea on:_change={handleChange} value="ths is nt splled rit" />