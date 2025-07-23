# Callout Library

Callouts communicate important changes or facts within the body layout through a strong visual emphasis, so that users take notice and read the information.

## Emphasis Levels

The `emphasis` prop controls the visual prominence and layout spacing of the callout:

- **high**: Maximum visual prominence with larger padding and stronger styling
- **medium** (default): Balanced visual prominence suitable for most use cases  
- **low**: Minimal visual emphasis with compact spacing, especially when no heading is provided

Use it like this:

```html
<!-- High emphasis for critical information -->
<goa-callout type="emergency" emphasis="high" heading="Critical Update">
  This requires immediate attention from all users.
</goa-callout>

<!-- Medium emphasis for standard callouts (default) -->
<goa-callout type="information" emphasis="medium" heading="Information">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</goa-callout>

<!-- Low emphasis for subtle notifications -->
<goa-callout type="success" emphasis="low" heading="Task Complete">
  Your action was completed successfully.
</goa-callout>

<!-- Low emphasis without heading adjusts layout automatically -->
<goa-callout type="information" emphasis="low">
  Brief informational message with compact spacing.
</goa-callout>
```

## Legacy Size Property

The `size` property is still supported for backward compatibility but is deprecated:

```html
<!-- Legacy usage - still functional but not recommended -->
<goa-callout type="emergency" heading="Emergency callout" size="medium">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</goa-callout>
```
