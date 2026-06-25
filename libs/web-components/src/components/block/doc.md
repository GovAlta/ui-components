# Block Library

Used when grouping components into a block with consistent space between.

Use it like this:

```html
<goa-block gap="m">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</goa-block>
```

Setting `alignment` to anything other than `normal` stops children from stretching to fill the block's cross-axis (e.g. width in a `direction="column"` block). Use `stretch="true"` to force children to fill the cross-axis regardless of `alignment`:

```html
<goa-block direction="column" alignment="start" stretch="true">
  <goa-form-item label="Name" max-width="100%">
    <goa-input name="name" />
  </goa-form-item>
</goa-block>
```
