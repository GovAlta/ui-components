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
  <form>
    <goa-form-item version="2" label="Do you have additional education expenses?" helptext="You can request funding for these now or at any time during your program." mb="m">
      <goa-radio-group version="2" name="additional" @_change="onChange">
        <goa-radio-item label="Yes" value="yes" name="additional"></goa-radio-item>
        <goa-radio-item label="No" value="no" name="additional"></goa-radio-item>
      </goa-radio-group>
    </goa-form-item>
    <goa-details heading="What are additional education expenses?">
      <goa-block gap="m" mt="m">
        <div>
          <strong>Examples of education expenses</strong>
          <ul class="goa-unordered-list">
            <li>Laptop and computer hardware</li>
            <li>Computer apps and subscriptions</li>
            <li>Home internet</li>
            <li>Testing and exam fees</li>
            <li>Work or school clothing, like work boots</li>
          </ul>
        </div>
        <div>
          <strong>Do not include</strong>
          <ul class="goa-unordered-list">
            <li>Tuition</li>
            <li>Mandatory fees</li>
            <li>Books and supplies</li>
            <li>School association fees</li>
          </ul>
        </div>
      </goa-block>
    </goa-details>
  </form>
</template>

<script setup lang="ts">
function onChange(e: CustomEvent) {
  console.log("value is", e.detail.value);
}
</script>
