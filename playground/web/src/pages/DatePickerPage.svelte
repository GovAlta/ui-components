<script lang="ts">
  let datePickerDate = new Date();
</script>

<goa-button on:_click={() => (datePickerDate = new Date())}>
  Today
</goa-button>

<goa-form-item label="Item">
  <goa-date-picker name="item" value={datePickerDate}></goa-date-picker>
</goa-form-item>


