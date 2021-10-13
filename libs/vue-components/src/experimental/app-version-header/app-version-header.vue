<template>
  <div v-if="!isProdEnvironment && !isClosed" class="goa-app-version-header">
    <span class="content-wrapper" data-testid="content-wrapper">
      <span class="environment-and-version">
        {{ environment }} {{ version }}
      </span>
      <span class="close" data-testid="close" @click="onCloseClick">&#10006;</span>
    </span>
  </div>
</template>
<script lang="ts">
interface Data {
  isClosed: boolean;
}

export default {
  name: 'goa-app-version-header',
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
  data(): Data {
    return {
      isClosed: false,
    };
  },
  methods: {
    onCloseClick(): void {
      this.isClosed = true;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/app-version-header/app-version-header.scss';
</style>
