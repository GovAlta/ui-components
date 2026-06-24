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
  <goa-text size="heading-l" mt="none" mb="none">Review your answers</goa-text>
  <goa-text size="heading-s" color="secondary" mt="l" mb="none">Your situation</goa-text>
  <goa-table version="2" mt="l">
    <table>
      <tbody>
        <tr>
          <td><strong>What was your (the applicant's) relationship to the deceased?</strong></td>
          <td>Other</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
        <tr>
          <td><strong>My relationship to the deceased was</strong></td>
          <td>Manager</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
        <tr>
          <td><strong>Was the deceased part of a household that was receiving Assured Income for the Severely Handicapped (AISH) or Income Support?</strong></td>
          <td>No</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
        <tr>
          <td><strong>Was the deceased a minor?</strong></td>
          <td>No</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
        <tr>
          <td><strong>What was the deceased's marital status at time of death?</strong></td>
          <td>Married</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
        <tr>
          <td><strong>Did the deceased have any dependents?</strong></td>
          <td>No</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
        <tr>
          <td><strong>Was the deceased a sponsored immigrant?</strong></td>
          <td>Yes</td>
          <td><goa-link>Change</goa-link></td>
        </tr>
      </tbody>
    </table>
  </goa-table>
  <goa-button-group alignment="start" mt="2xl">
    <goa-button version="2" type="primary" @_click="onConfirm">Confirm and continue</goa-button>
    <goa-button version="2" type="tertiary">Back to application overview</goa-button>
  </goa-button-group>
</template>

<script setup lang="ts">
function onConfirm() {
  console.log("Confirm clicked");
}
</script>
