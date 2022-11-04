# React UI Components

This library contains react components from the Government of Alberta.

Add Dependencies

```bash
npm i @abgov/react-components@alpha
npm i @abgov/web-components@alpha
npm i @abgov/styles@alpha
```

Link ionicons in app/index.html
Add the following to the head element

```html
<script
  type="module"
  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
></script>
<script
  nomodule
  src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
></script>
```

Import the styles in the `src/index.css` file

```css
@import "@abgov/styles/styles.esm.css";
```
