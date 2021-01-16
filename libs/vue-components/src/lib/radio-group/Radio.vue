<template>
  <div :id="id">
    <div :class="getRootCssClasses()">
      <label class="goa-radio-layout">
        <div class="goa-radio-container" :class="options.value === value ? 'goa-radio-selected' : null">
          <input
            type="radio"
            :value="options.value"
            :checked="options.value === value"
            :disabled="disabled"
            @change="updateValue(options.value)"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <circle cx="6" cy="6" r="6" fill="#fff" />
          </svg>
          <!-- {{options}} -->
        </div>
        <label class="goa-radio-label" for="one">{{options.text}}</label>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
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
        type: String,
        default: null,
      },
      defvalue: {
        type: String,
        default: null,
      },
      options: {
        type: Object,
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
        default: 'before',
        validator: (prop) => [
        'before', 'after'
        ].includes(prop)
      },
      inputClass: {
        type: [String, Object],
        default: "",
      },
    },
    data() {
      return {
        hasError: this.required && !this.value,
      };
    },
    methods: {
      updateValue(value) {
         console.log(value + "<value")
        this.$emit("change", value);
        console.log(this.value + "<this.valuehh")
      },
      getRootCssClasses() {
         console.log(this.value + "<this.value")
         console.log(this.options.value + "<options.value")
         if (this.value === null) {
           this.value = this.defvalue;
         }
        this.$emit("change", this.value);
         return classnames({
          'goa-radio': true,
          'goa-radio-disabled': this.disabled,
          'has-error': !this.value && this.required,
          'goa-radio-label-before': this.labelPosition === 'before',
        })
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import './radio.scss';
</style>
