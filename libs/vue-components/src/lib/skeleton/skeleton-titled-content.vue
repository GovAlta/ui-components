<template>
  <div className="skeleton-content">
    <div>
      <goa-skeleton-element type="title" />
      <div v-for="row in rows" :key="row">
        <goa-skeleton-element type="text" />
      </div>
    </div>
  </div>
</template>

<script lang="typescript">
import GoASkeletonElement from './skeleton-element.vue';

export default {
  name: 'goa-skeleton-titled-content',
  components: {
    'goa-skeleton-element': GoASkeletonElement,
  },
  props: {
    /**
     * The number of rows to display.
     */
    rows: {
      type: Number,
      default: 1,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import './skeleton-element.scss';
</style>
