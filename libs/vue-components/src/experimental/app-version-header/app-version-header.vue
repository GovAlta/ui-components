<template>
  <div v-if="!isProdEnvironment && !isClosed" class="goa-app-version-header">
    <span class="content-wrapper" data-testid="content-wrapper">
      <span class="environment-and-version">
        {{ environment }} {{ version }}
      </span>
      <div class="close" data-testid="close" @click="onCloseClick">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon"
          viewBox="0 0 512 512"
        >
          <title>Close</title>
          <path
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      </div>
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
