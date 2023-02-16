# One Column Layout
A one column layout to use as a starting point for your page.

Use it like this:
```html
<goa-one-column-layout>
  <section slot="header">
    <goa-microsite-header type="alpha" version="UAT" />
    <goa-app-header url="/" heading="Design System">
      <a href="/login">Sign in</a>
    </goa-app-header>
  </section>
  <goa-page-block width="704px">
    <!-- Insert custom content here -->
  </goa-page-block>
  <section slot="footer">
    <goa-app-footer />
  </section>
</goa-one-column-layout>
```
