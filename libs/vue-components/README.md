# angular-components

This library contains vue components from the Government of Alberta.

## Installation

> npm install @abgov/vue-components

## Documentation

Documentation is being worked on and will be provided soon.

## Usage
```
<template>
  <div id="app">
    <goa-header serviceName="Sample usage example" serviceHome="/" />
  </div>
</template>

<script>
import { GoAHeader } from '@abgov/vue-components';

export default {
  name: "App",
  components: {
    'goa-header': GoAHeader
  }
};
</script>
``` 