

<template>
  <div :class="getRootCssClasses">
    <label class="goa-radio-layout">
      <div>pickedx: {{picked}}</div>
        <div>valuex: {{value}}</div>
      <div class="goa-radio-container" :class="picked === value ? 'goa-radio-selected' : null">

        <input
          type="radio"

          :value="value"
          v-model="picked"

        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <circle cx="6" cy="6" r="6" fill="#eee" />
        </svg>
      </div>
      <label class="goa-radio-label" for="one">{{title}}</label>
    </label>
  </div>
</template>

<script lang="typescript">
  // :checked="picked === value"
  // @change="$event => say($event.target.value)"
  //           :id="value"

import classnames from 'classnames';
export default {
  name: 'goa-radio',
  props: {
    /**
     * Title of the radio item
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * value of the radio item
     */
    value: {
      type: String,
      required: true,
    },
    /**
     * Help text of the radio item
     */
    helperText: {
      type: String,
      required: true,
    },
    /**
     * Error messages
     */
    requiredErrorMessage: {
      type: String,
      required: true,
    },
    /**
     * Radio item disabled
     */
    disabled: {
      type: Boolean,
      required: false,
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
    /**
     * Is the radio button selection required.
    */
    required:{
      type: Boolean,
      required: false,
    },
  },
   methods: {
    say: function (message) {
      alert(message);
      alert(this.picked);
      this.picked = message;
    }
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
