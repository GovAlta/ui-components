# Angular UI Components

This is the web component library and utilizes Angular's web component integration.

Add Dependencies

```bash
npm i @abgov/web-components@alpha
npm i @abgov/styles@alpha
```

Link ionicons in app/index.html
Add the following in the head element

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

Update `src/app/app.module.ts` as per the three steps below

```typescript
// 1. Import the CUSTOM_ELEMENTS_SCHEMA
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// 2. Import the web-components lib
import '@abgov/web-components';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],

  // 3. Add the CUSTOM_ELEMENTS_SCHEMA to the NgModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

Add the styles link in the `src/styles.css` file

```css
@import '@abgov/styles/styles.esm.css';
```