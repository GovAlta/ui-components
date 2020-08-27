# angular-components

This library contains angular components from the Government of Alberta.

## Installation

1. Add @abgov/angular-components  
````npm add --save @abgov/angular-components````
2. OPTIONAL: in package.json specify the allowed versions for installation
3. Add peer dependencies  
4. Add styles to global styles  
````@import '~@angular/cdk/overlay-prebuilt.css';````
5. Add localize to polyfill.js   
````import '@angular/localize/init';````
6. Add ````"preserveSymlinks": true```` to configurations in angular.json.

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
