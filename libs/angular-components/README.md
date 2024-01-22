# Angular UI Components

![npm (scoped)](https://img.shields.io/npm/v/@abgov/angular-components?color=%230081a2&label=angular-components&style=flat-square)

This is the web component library and utilizes Angular's web component integration.

### Add Dependencies

```bash
npm i @abgov/web-components
npm i @abgov/angular-components
```

### Icons

Link ionicons in app/index.html
Add the following in the head element

```html
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
```

### Components

Update `src/app/app.module.ts` as per the four steps below

```typescript
// 1. Import the CUSTOM_ELEMENTS_SCHEMA
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

// 2. Import the libs
import "@abgov/web-components";
import { AngularComponentsModule } from "@abgov/angular-components";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // 3. Add the needed imports
    BrowserModule,
    AngularComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // 4. Add the CUSTOM_ELEMENTS_SCHEMA to the NgModule
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### Styles

Add the styles link in the `src/styles.css` file

```css
@import "@abgov/web-components/index.css";
```

### VS Code Support

In order to use VS Code's [HTML/CSS Custom Data](https://github.com/microsoft/vscode-custom-data)
support to enhance GoA Web Components HTML editing experience, include our html custom data 
setting found in `.vscode/settings.json`:

```json
{
  "html.customData": [
    "./node_modules/@abgov/web-components/html.html-data.json"
  ]
}
```

---

[Visit Design System](https://ui-components.alberta.ca)

