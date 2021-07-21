<template>
  <div v-if="visible" class="progress-container">
    <svg fill="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle className="base-circle" cx="50" cy="50" r="45" />
      <circle
        :class="[circleType]"
        cx="50"
        cy="50"
        r="45"
        :style="`strokeDashoffset:${strokeDashoffset}`"
      />
    </svg>
    <span className="progress-message">{{ message }}</span>
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
     * Sets the page to locked and does not accept user input.
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
    let strokeDashoffset = 0;

    if(this.pagelock){
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    }
    else{
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
    };
  },
};
</script>

<style lang="scss" scoped>
@import './page-load-indicator.scss';
</style>
