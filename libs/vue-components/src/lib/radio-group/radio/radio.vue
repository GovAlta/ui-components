

<template>
  <div :class="getRootCssClasses">
    <label class="goa-radio-layout">
      <div class="goa-radio-container" :class="item.value === value ? 'goa-radio-selected' : null">

        <input
          :id="id + index"
          :name="id"
          type="radio"
          :value="item.value"
          :checked="item.value === value"

          @change="onChangeFunction(item.value)"
        />
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <circle cx="6" cy="6" r="6" fill="#eee" />
        </svg> -->
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
  model: {
    event: "change",
  },
  props: {
    checked: Boolean,
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
    passValue: {
      type: String,
      required: true,
    },
    /**
     * Help text of the radio item
     */
    value: {
      type: [String, Number, Boolean, Object],
      default: null,
    },
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
    item: {
      type: [Array],
      required: true,
    },
  },
   methods: {
    onChangeFunction: function(message) {
      this.$emit('change', message);
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
