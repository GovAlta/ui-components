<template>
  <div>
    <a class="goa-link-button right-arrow" :href='linkUrl' role="link">
      {{linkText}}
    </a>
  </div>
</template>
<script lang="typescript">

export default {
  name: 'goa-hero-banner-link',
  props: {
   /**
     * The text displaye for the link/button.
     */
    linkText: {
      type: String,
      required: false,
    },
    /**
     * The Url for the link/button.
     */
    linkUrl: {
      type: String,
      required: false,
    },
  },
  data() {
    return {

    };
  },
};
</script>
