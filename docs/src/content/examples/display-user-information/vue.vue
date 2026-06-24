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
  <goa-container>
    <goa-text as="span" size="body-m" color="secondary" mt="none" mb="none">Housing Advisor</goa-text>
    <goa-text size="heading-m" mt="none" mb="s">Tracy Hero</goa-text>
    <goa-block direction="row" gap="s">
      <goa-block direction="column" gap="m">
        <goa-text as="span" size="heading-xs" mt="none" mb="none">Email</goa-text>
        <goa-text as="span" size="heading-xs" mt="none" mb="none">Phone</goa-text>
      </goa-block>
      <goa-block direction="column" gap="m">
        <goa-text as="span" size="body-m" mt="none" mb="none">tracyhero@email.com</goa-text>
        <goa-text as="span" size="body-m" mt="none" mb="none">283-203-4921</goa-text>
      </goa-block>
    </goa-block>
  </goa-container>
  <goa-container type="non-interactive" accent="thick">
    <div slot="title">Upcoming important due dates</div>
    <div slot="actions">
      <goa-button version="2" type="tertiary" size="compact" leadingicon="calendar" @_click="onCalendarClick">Add to calendar</goa-button>
    </div>
    <goa-table version="2" width="100%" striped="true">
      <table style="width: 100%">
        <tbody>
          <tr>
            <td>Business plan submission</td>
            <td style="text-align: right">June 30, 2024</td>
          </tr>
          <tr>
            <td>Annual review</td>
            <td style="text-align: right">October 3, 2024</td>
          </tr>
          <tr>
            <td>Application submission</td>
            <td style="text-align: right">December 20, 2024</td>
          </tr>
          <tr>
            <td>Application review</td>
            <td style="text-align: right">January 3, 2025</td>
          </tr>
        </tbody>
      </table>
    </goa-table>
  </goa-container>
</template>

<script setup lang="ts">
function onCalendarClick() {
  console.log("Add to calendar clicked");
}
</script>
