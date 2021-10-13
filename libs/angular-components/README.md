# angular-components

This library contains angular components from the Government of Alberta. This plugin uses angular 11, which is required to make it compatible with the latest nx angular generator.

[UI Components Storybook - Angular](https://ui-components.alpha.alberta.ca/angular/index.html)

## Installation

1. Add @abgov/angular-components
   `npm add --save @abgov/angular-components`
2. OPTIONAL: in package.json specify the allowed versions for installation
3. Add peer dependencies
4. OPTIONAL: Add to styles to import Alberta fonts and global element styles.
   `@import '~@abgov/angular-components/theme.css';`
5. Add localize to polyfill.js
   `import '@angular/localize/init';`
6. Add `"preserveSymlinks": true` to configurations in angular.json.

## Documentation

Documentation is being worked on and will be provided soon.

## Usage

```
import { AngularComponentsModule } from '@abgov/angular-components'
...
@NgModule({
  ...
  imports: [
    AngularComponentsModule
  ],
  ...
})
```

For experimental components, import ExperimentalComponentsModule.
```
import { AngularComponentsModule, ExperimentalComponentsModule } from '@abgov/angular-components'
...
@NgModule({
  ...
  imports: [
    AngularComponentsModule,
    ExperimentalComponentsModule
  ],
  ...
})
```
