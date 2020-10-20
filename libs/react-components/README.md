# react-components

This library contains react components from the Government of Alberta.

## Installation

1. Add @abgov/react-components  
````npm add --save @abgov/react-components````
2. OPTIONAL: in package.json specify the allowed versions for installation
3. Add peer dependencies  
4. OPTIONAL: Add to styles to import Alberta fonts and global element styles. 
````import '@abgov/react-components/react-components.esm.css';````

## Documentation

Documentation is being worked on and will be provided soon.

## Usage

```
import '@abgov/react-components/react-components.esm.css';
import { Callout } from '@abgov/react-components';

function App() {
    return (
        <Callout type="emergency" title="Covid 19 Emergency" content="please be advised that in-center services are closed" />
    )
}

```
