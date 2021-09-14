<template>
  <div v-if="visible" :class="`progress-container--${sizeType}`">
    <svg
      :class="[svgClass]"
      fill="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="base-circle" cx="50" cy="50" r="45" />
      <circle
        :class="[circleType]"
        cx="50"
        cy="50"
        r="45"
        :style="`strokeDashoffset:${strokeDashoffset}`"
      />
    </svg>
    <span :class="`progress-message--${sizeType}`">{{ message }}</span>
  </div>
</template>

<script lang="typescript">
export default {
  name: 'goa-page-load-indicator-component',
  props: {
    /**
     * The type of indicator - "progress", "infinite".
     */
    type: {
      type: String,
      default: 'progress',
      required: false,
      validator: (value) => {
        return ['progress', 'infinite'].includes(value);
      },
    },
    /**
     * The message to display while loading.
     */
    message: {
      type: String,
      required: true,
    },
    /**
     * Sets the percentage value of the page loader while set to progress type, 0 - 100 percent.
     */
    value: {
      type: Number,
    },
    /**
     * Sets the page to locked and does not accept user input. When not set the component can be used as a child element without blocking user input.
     */
    pagelock: {
      type: Boolean,
      default: true,
    },
    /**
     * Sets the page loader visibility state.
     */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
    * Sets the progress indicator display type size.
    */
    displayType: {
      type: String,
      default: 'large',
      required: false,
      validator: (value) => {
        return ['large', 'small'].includes(value);
      },
    },
  },
  data() {
    const circleType =
      this.type === 'progress'
        ? 'progress-circle'
        : 'progress-circle--infinite';
    /**
     * Set defaults
     */
    const progressMaxValue = 283;
    const svgClass = this.displayType === 'large' ? 'svg' : 'svg--small';
    const sizeType = this.displayType;

    let strokeDashoffset = 0;

    if (this.pagelock) {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
    }

    if (this.type === 'progress') {
      if (this.value === 0) {
        strokeDashoffset = progressMaxValue;
        return;
      }

      if (this.value >= 100) {
        return;
      }

      const value =
        progressMaxValue - Math.round((progressMaxValue * this.value) / 100);

      strokeDashoffset = value;
    }

    return {
      progressMaxValue,
      strokeDashoffset,
      circleType,
      svgClass,
      sizeType
    };
  },
};
</script>

<style lang="scss" scoped>
@import './page-load-indicator.scss';
</style>
