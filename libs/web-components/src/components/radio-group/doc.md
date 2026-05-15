# Radio Library
Radios allow users to select one option from a set.

Use it like this:

```html
<goa-radio-group
  name="color"
  arialabel="please select color"
  goaValue
  [formControl]="reactiveFormCtrl"
  [value]="reactiveFormCtrl.value"
>
  <goa-radio-item value="red" arialabel="you are choosing color red"></goa-radio-item>
</goa-radio-group>
```
