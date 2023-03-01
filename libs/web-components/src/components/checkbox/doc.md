# Checkboxes Library

Checkboxes are contained in a fieldset for accessibility and categorization purposes. The option group (checkbox and label) can be selected by the user with an input device. The option is meant to be submitted as data and is part of a form. The input data, while can be selected, will not be recorded until the user presses a submission button.

Use it like this:

```html
<goa-checkbox
  goaValue
  name="desserts"
  text="Ice Cream"
  [formControl]="reactiveFormCtrl"
  [value]="reactiveFormCtrl.value"
></goa-checkbox>
```
