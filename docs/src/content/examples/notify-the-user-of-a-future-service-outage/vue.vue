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
  <goa-notification version="2" type="important">
    Our system will be under maintenance from Thursday, September 15, 2025 at 10 pm to
    Friday, September 16, 2025 at 10 am. If you have questions or concerns, contact us at
    <a href="mailto:support@example.com">support@example.com</a>.
  </goa-notification>
</template>
