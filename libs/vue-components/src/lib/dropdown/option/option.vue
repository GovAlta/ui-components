<template>
  <div class="option" :class="{selected: selected}" @click="onSelect">
    {{ name }}
  </div>
</template>

<script lang="ts">
  export default {
    name: 'GoaDropdownOption',
    props: {
      value: { type: String, required: true },
      name: { type: String, required: true },
      selected: { type: Boolean },
    },
    methods: {
      onSelect(e: MouseEvent): void {
        this.$emit('select', e, {name: this.name, value: this.value});
      }
    }
  }
</script>

<style scoped>
  .option:hover {
    background: #f1f1f1;
  }
</style>
