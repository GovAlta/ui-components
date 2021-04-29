<template>
  <div>
    <header class="goa-header goa-official-site-header">
      <div>
        <span v-once :class="serviceLevelCss">{{ serviceLevelFormatted }}</span>
      </div>

      <div v-if="isLive" class="site-text">
        An official site of the
        <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a>
      </div>
      <div v-else class="site-text">
        This is a new
        <a href="https://www.alberta.ca/index.aspx" class="web-link">Alberta Government</a>
        service
      </div>
    </header>
    <header class="goa-header goa-microsite-header">
      <div class="goa-microsite-header">
        <goa-microsite-logo
          :service-name="serviceName"
          :service-home="serviceHome"
        />
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import GoAMicrositeLogo from '../microsite-logo/microsite-logo.vue';

export default {
  name: 'goa-header',
  components: {
    'goa-microsite-logo': GoAMicrositeLogo,
  },
  props: {
    /**
     * The home link url for when the user clicks.
     */
    serviceHome: {
      type: String,
      required: true,
    },
    /**
     * The service name to display.
     */
    serviceName: {
      type: String,
      required: true,
    },
    /**
     * The service level to display.
     */
    serviceLevel: {
      type: String,
      required: true,
      validator: (value) => {
        return ['alpha', 'beta', 'live'].includes(value.toLowerCase());
      }
    },
  },
  data() {
    return {
      serviceLevelCss: `service-level service-level--${this.serviceLevel.toLowerCase()}`,
      isLive: this.serviceLevel === 'live',
    };
  },
  computed: {
    serviceLevelFormatted(): string {
      return this.serviceLevel.toLowerCase();
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/header/header.scss';
</style>
