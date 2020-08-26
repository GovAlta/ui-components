# angular-components

This library contains angular components from the Government of Alberta.

## Installation

1. ```npm add --save @abgov/angular-components```  
2. Add "preserveSymlinks": true, to angular.json.  
3. Install peerDependencies
4. Add angular localize to pollyfill:  
```import '@angular/localize/init';```
5. Add to global styles:  
```@import '~@angular/cdk/overlay-prebuilt.css';```

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
