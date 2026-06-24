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
  <goa-button-group alignment="start">
    <goa-tooltip content="Edit">
      <goa-icon-button icon="pencil" aria-label="Edit"></goa-icon-button>
    </goa-tooltip>
    <goa-tooltip content="Alerts">
      <goa-icon-button icon="notifications" aria-label="Alerts"></goa-icon-button>
    </goa-tooltip>
    <goa-tooltip content="Settings">
      <goa-icon-button icon="settings" aria-label="Settings"></goa-icon-button>
    </goa-tooltip>
  </goa-button-group>
</template>
