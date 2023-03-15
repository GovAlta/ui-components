# Dropdown Library
Dropdowns hide a long list of options, arranged vertically. A single select menu list is revealed upon interaction with this component.

Use it like this:
```html
<goa-dropdown
  goaValue
  name="colors"
  [formControl]="reactiveFormCtrl"
  [value]="reactiveFormCtrl.value">
  <goa-dropdown-item
    *ngFor="let color of colors"
    [value]="color"
    [label]="color"
  >
  </goa-dropdown-item>
</goa-dropdown>
```
