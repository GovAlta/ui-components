# Footer Library
The footer resides at the bottom of every page of your service, providing copyright information and other information related to your service. The footer will not position itself on the bottom of the page, but must instead be positioned by either a GoA or custom layout component.

Use it like this:

```html
<goa-app-footer></goa-app-footer>
```
or
```html
<goa-app-footer>
  <goa-app-footer-meta-section slot="meta">
    <a href="privacy.html">Privacy</a>
    <a href="disclaimer.html">Disclaimer</a>
    <a href="accessibility.html">Accessibility</a>
    <a href="using-alberta.html">Using Alberta.ca</a>
  </goa-app-footer-meta-section>
</goa-app-footer>
```
