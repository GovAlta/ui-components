<template>
  <div id="app">
    <goa-header serviceName="Sample usage example" microServiceHomeLink="http://alberta.ca" />
  </div>
</template>

<script>
import { GoAHeader } from '@abgov/vue-components';
console.log(GoAHeader)
export default {
  name: "App",
  components: {
    'goa-header': GoAHeader
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
