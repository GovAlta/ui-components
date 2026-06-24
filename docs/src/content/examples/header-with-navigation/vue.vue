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
  <goa-app-header version="2" url="https://example.com" heading="Service name">
    <a slot="navigation" href="#">Dashboard</a>
    <goa-app-header-menu slot="navigation" heading="Search">
      <a href="#">Cases</a>
      <a href="#">Payments</a>
      <a href="#">Outstanding</a>
    </goa-app-header-menu>
    <a slot="navigation" href="#">Support</a>
    <goa-menu-button slot="utilities" version="2" text="John Smith" type="tertiary" size="compact">
      <goa-menu-action text="User settings" action="user-settings"></goa-menu-action>
      <goa-menu-action text="Sign out" action="sign-out"></goa-menu-action>
    </goa-menu-button>
  </goa-app-header>
</template>
