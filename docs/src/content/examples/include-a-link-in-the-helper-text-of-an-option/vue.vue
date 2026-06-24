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
  <goa-form-item version="2" label="How would you like to be contacted?">
    <goa-checkbox-list name="contact-options">
      <goa-checkbox version="2" name="email" text="Email" value="email">
        <span slot="description">Help text with a <a href="#">link</a>.</span>
      </goa-checkbox>
      <goa-checkbox version="2" name="phone" text="Phone" value="phone"></goa-checkbox>
      <goa-checkbox version="2" name="text" text="Text message" value="text"></goa-checkbox>
    </goa-checkbox-list>
  </goa-form-item>
</template>
