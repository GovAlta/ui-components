<template>
  <div class="goa-hero" :style="{ backgroundImage: backgroudImageStyle }">
    <h1 role="heading" aria-level="{1}">{{ title }}</h1>
    <goa-hero-banner-content v-if="content" :content="content" />
    <goa-hero-banner-link v-if="hasLink" :linkText="linkText" :linkUrl="linkUrl" />
  </div>
</template>
<script lang="typescript">
import GoAHeroBannerContent from './hero-banner-content.vue';
import GoAHeroBannerLink from './hero-banner-link.vue';

export default {
  name: 'goa-hero-banner',
  components: {
    'goa-hero-banner-content': GoAHeroBannerContent,
    'goa-hero-banner-link': GoAHeroBannerLink,
  },
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
    backgroundUrl: {
      type: String,
      required: true,
    },

    /**
     * The content displayed under the title.
     */
    content: {
      type: String,
      required: false,
    },
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
      backgroudImageStyle: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.6) 100%), url('${this.backgroundUrl}')`,
    };
  },
  computed: {
    hasLink() {
      return Boolean(this.linkText)&& Boolean(this.linkUrl);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/hero-banner/hero-banner.scss';
</style>
