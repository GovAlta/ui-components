# Side menu group

Use it like this:
```html
<goa-side-menu>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <goa-side-menu-group heading="Links">
    <a href="#foo">Foo</a>
    <a href="#bar">Bar</a>
    <goa-side-menu-group heading="More Links">
      <a href="#more-foo">More Foo</a>
      <a href="#more-bar">More Bar</a>
    </goa-side-menu-group>
  </goa-side-menu-group>
</goa-side-menu>
```
