# Angular Sample Usage

This project was created to show simple consumption of the @abgov/angular-components library.  
A full listing of available components and further documentation can be found at: https://ui-components.alpha.alberta.ca/angular/.

## Integrating the @abgov/angular-components Library

The steps taken to integrate the library are as follows:  

1. Add @abgov/angular-components  
````npm add --save @abgov/angular-components````
2. OPTIONAL: in package.json specify the allowed versions for installation
3. Add peer dependencies  
````npm add --save @angular/core````  
````npm add --save @angular/common````  
````npm add --save @angular/cdk````  
````npm add --save @angular/forms````  
````npm add --save @angular/localize````
4. Add styles to global styles  
````@import '~@abgov/angular-components/theme.css';````
5. Add localize to polyfill.js   
````import '@angular/localize/init';````
6. Add ````"preserveSymlinks": true```` to configurations in angular.json.

## To build

Install any missing NPM packages by running `npm install`.  
Run `ng build` from the current directory.

## To run

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

