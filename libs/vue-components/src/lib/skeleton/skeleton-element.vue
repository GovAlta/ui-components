<template>
  <div
    :class="[indicatorTypeClass]"
  />
</template>

<script lang="typescript">
export default {
  name: 'goa-skeleton-element',
  props: {
    /**
     * The type of skeleton element - "text", "avatar", "title", "paragraph", "thumbnail", "card".
     */
    type: {
      type: String,
      default: 'text',
      required: false,
      validator: (value) => {
        return ["text", "avatar", "title", "paragraph", "thumbnail", "card"].includes(value);
      },
    },
  },
  data() {
    return {
      indicatorTypeClass: `skeleton ${this.type}`,
    }
  },
}
</script>

<style lang="scss" scoped>
  @import './skeleton-element.scss';
</style>
