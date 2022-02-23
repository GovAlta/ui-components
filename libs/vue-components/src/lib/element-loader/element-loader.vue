

<template>
  <svg
    v-if="visible"
    class="circular-loader"
    fill="none"
    :viewBox="boxView"
    :width="radius"
    :height="radius"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      :cx="radius"
      :cy="radius"
      :stroke="baseColour"
      :stroke-width="7"
      :r="circleRadius"
    />
    <path
      :d="getArc(75, 100, circleRadius, radius, false)"
      :stroke-width="7"
      :stroke="spinnerColour"
      :stroke-linecap="round"
    />
  </svg>
</template>

<script lang="typescript">
export default {
  name: 'goa-element-loader',
  props: {
    /**
     * Sets the base color of element loader.
     */
    baseColour: {
      type: String,
      required: true,
    },
    /**
     * Sets the spinner color of element loader.
     */
    spinnerColour: {
      type: String,
      required: true,
    },
    /**
     * Sets the element loader visibility state.
     */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
     * Sets the size of element loader.
     */

    size: {
      default: 'default',
      required: false,
      validator: (value) => {
        return ['small', 'default'].includes(value);
      },
    },
  },
  data() {
    const radius = this.size === 'small' ? 16 : 18;
    const diameter = radius * 2;
    const pathRadius = radius - 4;
    const boxView = `0 0 ${diameter} ${diameter}`;
    const circleRadius = radius - 4;
    return {
      boxView,
      radius,
      circleRadius,
    };
  },
  methods: {
    getArc(current, total, pathRadius, elementRadius, isSemicircle = false) {
      const value = Math.max(0, Math.min(current || 0, total));
      const maxAngle = isSemicircle ? 180 : 359.9999;
      const percentage = total > 0 ? (value / total) * maxAngle : maxAngle;
      const start = this.polarToCartesian(
        elementRadius,
        pathRadius,
        percentage
      );
      const end = this.polarToCartesian(elementRadius, pathRadius, 0);
      const arcSweep = percentage <= 180 ? 0 : 1;
      return `M ${start} A ${pathRadius} ${pathRadius} 0 ${arcSweep} 0 ${end}`;
    },
    polarToCartesian(elementRadius, pathRadius, angleInDegrees) {
      const DEGREE_IN_RADIANS = Math.PI / 180;
      const angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
      const x = elementRadius + pathRadius * Math.cos(angleInRadians);
      const y = elementRadius + pathRadius * Math.sin(angleInRadians);
      return x + ' ' + y;
    },
  },
};
</script>
