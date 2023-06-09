# Sidebar group

Use it like this:
```html
<goa-sidebar>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
  <goa-sidebar-group heading="Links">
    <a href="#foo">Foo</a>
    <a href="#bar">Bar</a>
    <goa-sidebar-group heading="More Links">
      <a href="#more-foo">More Foo</a>
      <a href="#more-bar">More Bar</a>
    </goa-sidebar-group>
  </goa-sidebar-group>
</goa-sidebar>
```
