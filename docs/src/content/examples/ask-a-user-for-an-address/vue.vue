<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + design-tokens/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-text size="heading-l" mt="none" mb="xl">What is your address?</goa-text>
  <goa-form-item version="2" label="Street Address">
    <goa-input version="2" name="address" type="text" width="100%" id="address-input"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Suite or unit #" mt="l">
    <goa-input version="2" name="suite" type="text" width="100%" id="suite-input"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="City or town" mt="l">
    <goa-input version="2" name="city" type="text" width="100%" id="city-input"></goa-input>
  </goa-form-item>
  <goa-block direction="row" gap="l" mt="l">
    <goa-form-item version="2" label="Province or territory">
      <goa-dropdown version="2" name="province" width="100%">
        <goa-dropdown-item label="Alberta" value="AB"></goa-dropdown-item>
        <goa-dropdown-item label="British Columbia" value="BC"></goa-dropdown-item>
        <goa-dropdown-item label="Manitoba" value="MB"></goa-dropdown-item>
        <goa-dropdown-item label="New Brunswick" value="NB"></goa-dropdown-item>
        <goa-dropdown-item label="Newfoundland and Labrador" value="NL"></goa-dropdown-item>
        <goa-dropdown-item label="Northwest Territories" value="NT"></goa-dropdown-item>
        <goa-dropdown-item label="Nova Scotia" value="NS"></goa-dropdown-item>
        <goa-dropdown-item label="Nunavut" value="NU"></goa-dropdown-item>
        <goa-dropdown-item label="Ontario" value="ON"></goa-dropdown-item>
        <goa-dropdown-item label="Prince Edward Island" value="PE"></goa-dropdown-item>
        <goa-dropdown-item label="Quebec" value="QC"></goa-dropdown-item>
        <goa-dropdown-item label="Saskatchewan" value="SK"></goa-dropdown-item>
        <goa-dropdown-item label="Yukon" value="YT"></goa-dropdown-item>
      </goa-dropdown>
    </goa-form-item>
    <goa-form-item version="2" label="Postal Code">
      <goa-input version="2" name="postalCode" type="text" width="7ch" id="postal-input"></goa-input>
    </goa-form-item>
  </goa-block>
  <goa-button-group alignment="start" mt="2xl">
    <goa-button version="2" type="primary" @_click="onSave">Save and continue</goa-button>
    <goa-button version="2" type="secondary">Cancel</goa-button>
  </goa-button-group>
</template>

<script setup lang="ts">
function onSave() {
  console.log("Form submitted");
}
</script>
