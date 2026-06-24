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
  <goa-link leadingicon="arrow-back" size="small" mb="none"> Back </goa-link>
  <goa-form-item version="2" mt="xl" label="Do you pay for child care?" labelsize="large" helptext="Examples of child care are daycares, day homes and baby-sisters.">
    <goa-radio-group version="2" name="child-care" arialabel="Do you pay for child care?">
      <goa-radio-item value="yes" label="Yes"></goa-radio-item>
      <goa-radio-item value="no" label="No"></goa-radio-item>
    </goa-radio-group>
  </goa-form-item>
  <goa-details heading="Why are we asking this question?" mt="l">
    <p>We ask this question to determine if you are eligible for child care benefits.</p>
  </goa-details>
  <goa-button version="2" type="submit" mt="2xl">Save and continue</goa-button>
</template>
