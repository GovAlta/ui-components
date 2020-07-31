## Project/Component organization
  
- Follow the pattern set by existing components.  Each library should have a folder for each component which contains all unique elements required by the component.  
```
/src  
--/libs  
  --/components  
    --/my-component  
      --/my-component.scss  
      --/my-component.html  
```
- If the elements are common across components in a particular library but not common across multiple libraries...
```
/src  
--/libs  
  --/ 
```

- If there are elements which will be common across multiple libraries please consider pulling those out into a library of their own or adding to an appropriate existing common library.  

## CSS Guidelines
  
We are using [SCSS](https://sass-lang.com/) to do CSS compilation.  

- __Use Mixins__  
Use mixins to encourage re-use and make style updates less error prone.  When creating a style consider the following: 
    - _Is my style unique to my component?_  
    No need to create a mixin, or only a local one.
    - _Is my style unique to my library but not to other libraries?_  
    Create style in a common area in your library.
    - _Is my style common for all components of the same type across libraries (for example angular button and vue button)?_  
    Create style in core-css project under the component of the same name.
    - _Is my style common for many components across many libraries (for example a colour pallete)?_  
    Create style in core-css project under the styles folder.

## Documentation

- Document your component using JsDocs.

- If a new library is added, please update the readme.  


