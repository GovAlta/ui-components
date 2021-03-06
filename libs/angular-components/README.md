# Angular UI Components

This library contains angular components from the Government of Alberta.

Create angular app
```bash
ng new my-app
```

Add Dependencies
```bash
npm i
npm i @abgov/web-components
npm i @abgov/styles
```

Link ionicons in app/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UiComponentAngularVerification</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <!-- Ionicons -->
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <!-- -->
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

Update `app.module.ts` as per the three steps below
```typescript

// 1. Import the CUSTOM_ELEMENTS_SCHEMA
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// 2. Import the web-components lib
import '@abgov/web-components';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],

  // 3. Add the CUSTOM_ELEMENTS_SCHEMA to the NgModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
```

Add the styles link in the `src/styles.css` file
```css
@import '@abgov/styles/styles.esm.css';
```
