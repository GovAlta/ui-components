<template>
  <goa-form-item version="2" label="Indian registration number" labelsize="large">
    <goa-block gap="m" direction="row">
      <goa-form-item version="2" label="Band #" helptext="3 digits">
        <goa-input version="2" name="bandNo" id="band-input" width="88px" maxlength="3" @_change="onChange('band-input', $event)"></goa-input>
      </goa-form-item>
      <goa-form-item version="2" label="Family" helptext="Up to 5 digits">
        <goa-input version="2" name="family" id="family-input" width="105px" maxlength="5" @_change="onChange('family-input', $event)"></goa-input>
      </goa-form-item>
      <goa-form-item version="2" label="Position" helptext="2 digits">
        <goa-input version="2" name="position" id="position-input" width="71px" maxlength="2" @_change="onChange('position-input', $event)"></goa-input>
      </goa-form-item>
    </goa-block>
  </goa-form-item>
</template>

<script setup lang="ts">
function onChange(id: string, e: CustomEvent) {
  console.log(`${id}:`, e.detail.value);
}
</script>
