# Linear Progress Library

A linear progress component providing visual progress feedback to users after they request an action from the system.

Use it like this:

```html
<goa-linear-progress progress="100"> </goa-linear-progress>
```

By default the percentage is shown, but you can hide it by adding `showpercentage`.

```html
<goa-linear-progress progress="25" showpercentage="false"> </goa-linear-progress>
```

You can change the progress bar to a "ping pong" effect by setting the progress to null.

```html
<goa-linear-progress progress="null" showpercentage="false"> </goa-linear-progress>
```
