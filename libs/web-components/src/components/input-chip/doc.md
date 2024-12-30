# InputChip

Text fields let users enter and input text.

This adds a filter chip(s) within the text field on user text entry.

Use it like this:

```html
<goa-input-chip name="input"></goa-input-chip>
```

Populate with chip values and define valid chip values like this:

```html
<!-- WIP: -->
<goa-input-chip name="input" chipValues={["foo"]} validValues={["foo", "bar"]} ></goa-input-chip>
```

Input Chip accepts same props/slots as an Input. Example:

```html
<goa-input-chip name="input" prefix="prefix" suffix="suffix" leadingIcon="pencil" trailingIcon="pencil" placeholder="Type then press Enter" width="100%">
  <div slot="leadingContent" class="leadingContent">lead</div>
  <div slot="trailingContent" class="trailingContent">trail</div>
</goa-input-chip>
```
