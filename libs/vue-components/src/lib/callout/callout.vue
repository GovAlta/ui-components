<template>
  <div>
    <div :class=[calloutTypeClass]>
      <div>
        <h3>{{ title }}</h3>
        <div class="messages" v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<script lang="typescript">

export default {
  name: 'goa-callout',
  props: {
    /**
     * Callout title.
     */
    title: {
      type: String,
      required: true,
    },
  /**
   * The type of the callout, changes stylings and icons.
  */
    calloutType:{
      type: String,
      validator: (prop) => [
      'important', 'information' , 'event' , 'emergency', 'success', 'error'
      ].includes(prop)
    },
    /**
     * Callout description
     */
    content: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
        calloutTypeClass: `goa-callout goa--${this.calloutType}`
    };
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/callout/callout.scss';
</style>
