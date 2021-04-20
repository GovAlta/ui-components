<template>
  <div class="goa-badge" :class="[badgeClass]">
    <slot name="icon" />
    <div class="goa-badge-content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'GoABadge',
  props: {
    /**
     * Type of the badge.
     */
    type: {
      type: String,
      required: false,
      default: 'information',
      validator: (value) => {
        return [
          'information',
          'success',
          'warning',
          'emergency',
          'dark',
          'midtone',
          'light',
          'inactive'
        ].includes(value);
      }
    },
    /**
     * Content of the badge.
     */
    content: {
      type: String,
      default: null,
      required: false
    }
  },
  data() {
    return {
      badgeClass: `badge-${this.type}`
    };
  }
};
</script>

<style lang="scss" scoped>
  @import './badge.scss';
</style>
