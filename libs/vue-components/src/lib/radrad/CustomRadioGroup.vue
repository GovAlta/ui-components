<template>
  <div :id="id">
    <div v-for="(option, index) in options" :key="option.text">
    <div :class="getRootCssClasses">
    <label class="goa-radio-layout">
      <div class="goa-radio-container" :class="option.value === value ? 'goa-radio-selected' : null">
        <!-- <div>option.value: {{ option.value }}</div>
        <div>value: {{ value }}</div> -->
        <input
          type="radio"
          :value="option.value"
          :checked="option.value === value"
          @change="updateValue(option.value)"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <circle cx="6" cy="6" r="6" fill="#fff" />
        </svg>
        <slot v-if="option.value === value" :name="option.value" />

      </div>
      <label class="goa-radio-label" for="one">{{option.text}}</label>
    </label>
    </div>
  </div>
  </div>
</template>

<script>
import classnames from 'classnames';
export default {
  model: {
    event: "change",
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
    options: {
      type: [Array],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
        /**
     * where is the label Positioned
     */
    labelPosition: {
      type: String,
      required: false,
      validator: (prop) => [
      'before', 'after'
      ].includes(prop)
    },
    inputClass: {
      type: [String, Object],
      default: "",
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("change", value);
    },
  },
  data() {
    return {
      hasError: this.required,
      stuff: 'hello',
      getRootCssClasses: classnames({
        'goa-radio': true,
        'goa-radio-disabled': this.disabled,
        'has-error': this.required,
        'goa-radio-label-before': this.labelPosition === 'before',
      }),
    };
  },
};
</script>


<style lang="scss" scoped>
@import './radio.scss';
</style>
