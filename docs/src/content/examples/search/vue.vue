<template>
  <form>
    <goa-form-item version="2">
      <goa-block gap="xs" direction="row">
        <goa-input version="2" type="search" name="search" leadingicon="search" @_change="onInputChange"></goa-input>
        <goa-button version="2" type="primary" @_click="onSearch">Search</goa-button>
      </goa-block>
    </goa-form-item>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchValue = ref("");

function onInputChange(e: CustomEvent) {
  searchValue.value = e.detail.value;
}

function onSearch() {
  console.log("search:", searchValue.value);
}
</script>
