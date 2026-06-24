<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + /design-tokens/dist/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-link leadingicon="arrow-back" size="small" mb="none"> Back </goa-link>
  <goa-text as="h2" mt="xl" mb="m">Your address</goa-text>
  <goa-text mt="none" mb="xl">This is the home address of the person applying</goa-text>
  <goa-form-item version="2" label="Address line 1">
    <goa-input version="2" name="address-line-1" aria-label="Address line 1" width="100%" @_change="onAddressChange"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Address line 2" mt="l">
    <goa-input version="2" name="address-line-2" aria-label="Address line 2" width="100%"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Town or city" mt="l">
    <goa-input version="2" name="town-city" aria-label="Town or city name" width="460px"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Province or territory" mt="l" id="provinceLabel">
    <goa-dropdown version="2" name="province-territory" aria-labelledby="provinceLabel" @_change="onProvinceChange">
      <goa-dropdown-item value="AB" label="Alberta"></goa-dropdown-item>
      <goa-dropdown-item value="BC" label="British Columbia"></goa-dropdown-item>
      <goa-dropdown-item value="MB" label="Manitoba"></goa-dropdown-item>
      <goa-dropdown-item value="NB" label="New Brunswick"></goa-dropdown-item>
      <goa-dropdown-item value="NL" label="Newfoundland and Labrador"></goa-dropdown-item>
      <goa-dropdown-item value="NS" label="Nova Scotia"></goa-dropdown-item>
      <goa-dropdown-item value="ON" label="Ontario"></goa-dropdown-item>
      <goa-dropdown-item value="PE" label="Prince Edward Island"></goa-dropdown-item>
      <goa-dropdown-item value="QC" label="Quebec"></goa-dropdown-item>
      <goa-dropdown-item value="SK" label="Saskatchewan"></goa-dropdown-item>
      <goa-dropdown-item value="NT" label="Northwest Territories"></goa-dropdown-item>
      <goa-dropdown-item value="NU" label="Nunavut"></goa-dropdown-item>
      <goa-dropdown-item value="YT" label="Yukon"></goa-dropdown-item>
    </goa-dropdown>
  </goa-form-item>
  <goa-form-item version="2" label="Postal code" mt="l">
    <goa-input version="2" name="postal-code" width="105px"></goa-input>
  </goa-form-item>
  <goa-button version="2" type="submit" mt="2xl" @_click="onSubmit">Save and continue</goa-button>
</template>

<script setup lang="ts">
function onAddressChange(e: CustomEvent) {
  console.log("Address line 1:", e.detail.value);
}

function onProvinceChange(e: CustomEvent) {
  console.log("Province:", e.detail.value);
}

function onSubmit() {
  console.log("Form submitted");
}
</script>
