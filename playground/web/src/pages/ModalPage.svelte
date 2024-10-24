<script lang="ts">
  let modalOpen = false;
</script>

<goa-button on:_click={() => (modalOpen = true)}>Open Modal</goa-button>
<goa-modal
  open={modalOpen}
  on:_close={() => (modalOpen = false)}
  closable
  heading="Do you agree?"
>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
    obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
    explicabo eligendi eius laboriosam! Repellendus ducimus officia
    asperiores. Eos, eius numquam.
  </p>

  <goa-dropdown name="item">
    <goa-dropdown-item value="red" label="Red"></goa-dropdown-item>
    <goa-dropdown-item value="green" label="Green"></goa-dropdown-item>
    <goa-dropdown-item value="blue" label="Blue"></goa-dropdown-item>
  </goa-dropdown>

  <div slot="actions">
    <goa-button-group alignment="end">
      <goa-button on:_click={() => (modalOpen = false)}
        >Primary</goa-button
      >
    </goa-button-group>
  </div>
</goa-modal>
