<template>
  <div v-if="!isProdEnvironment && !isClosed" class="goa-app-version-header">
    <span class="content-wrapper" data-testid="content-wrapper">
      <span class="environment-and-version">
        {{ environment }} {{ version }}</span
      >
      <span class="close" @click="onCloseClick">X</span>
    </span>
  </div>
</template>
<script lang="typescript">
export default {
  name: 'app-version-header',
  props: {
    /**
     * If this is true, the .
     */
    isProdEnvironment: {
      type: Boolean,
      required: true,
    },
    /**
     * The home link url for when the user clicks.
     */
    environment: {
      type: String,
      required: true,
    },
    /**
     * The service name to display.
     */
    version: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isClosed: false,
    };
  },
  methods: {
    onCloseClick() {
      this.isClosed = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/app-version-header/app-version-header.scss';
</style>
