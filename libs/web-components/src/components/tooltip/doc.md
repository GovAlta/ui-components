# GoA Tooltip
A tooltip is a message box that is displayed when a user hovers over or gives focus to a UI element to provide helpful, supporting, temporary, and non-essential content. The tooltip should be paired with a UI element.

Use it like this:

```html
<!-- Simple string content -->
<goa-tooltip content="Item description">
  <div>Item</div>
</goa-tooltip>

<!-- Rich / multiline content -->
<goa-tooltip>
  <div>Item</div>
  <div slot="content">
    <p><strong>Item:</strong> Name</p>
    <p>Updated by Jane Doe<br/>Last updated Aug 8, 2025</p>
  </div>
</goa-tooltip>
```

Use the content slot for multiline or formatted content. The `content` attribute remains for backward compatibility and will be ignored when a `slot="content"` element is provided.
