<template>
  <div >
        <h1  >{{title}}</h1>
  </div>
</template>
<script lang="typescript">

export default {
  name: 'goa-hero-banner',
  props: {
    /**
     * The title of the banner
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * The Url for the banner's background image."
     */
    // backgroundUrl: {
    //   type: String,
    //   required: true,
    // },

    // /**
    //  * The content displayed under the title.
    //  */
    // content: {
    //   type: String,
    //   required: false,
    // },
    // /**
    //  * The text displaye for the link/button.
    //  */
    // linkText: {
    //   type: String,
    //   required: false,
    // },
    // /**
    //  * The Url for the link/button.
    //  */
    // linkUrl: {
    //   type: String,
    //   required: false,
    // },
  },
  data() {
    return {   
        
    };
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/hero-banner/hero-banner.scss';
</style>
