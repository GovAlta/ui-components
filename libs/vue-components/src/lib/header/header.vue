<template>
  <div>
    <header class="goa-header goa-official-site-header">
      <div>
        <span :class="serviceLevelCss" v-once>{{ serviceLevel }}</span>
      </div>

      <div v-if="isLive" class="site-text">
        An official site of the
        <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a>
      </div>
      <div v-else class="site-text">
        This is a new <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a> service
      </div>

    </header>
    <header class="goa-header goa-microsite-header">
      <div class="goa-microsite-header">
        <goa-microsite-logo
          :serviceName="serviceName"
          :serviceHome="serviceHome"
        />
      </div>
    </header>
  </div>
</template>

<script lang="typescript">
import GoAMicrositeLogo from '../microsite-logo/microsite-logo.vue';
import {ServiceLevel} from "@abgov/shared/common";
export default {
  components: {
    'goa-microsite-logo': GoAMicrositeLogo
  },
  name: 'goa-header',
  props: {
    /**
     * The home link url for when the user clicks.
     */
    'serviceHome': {
      type: String,
      required: true
    },
    /**
     * The service name to display.
     */
    'serviceName': {
      type: String,
      required: true
    },
    /**
     * The service level to display.
     */
    'serviceLevel': {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      serviceLevelCss: `service-level service-level--${this.serviceLevel.toLowerCase()}`,
      isLive: this.serviceLevel === ServiceLevel.Live,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/header/header.scss';
</style>
