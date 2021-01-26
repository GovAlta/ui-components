<template>
  <div :class="rootCssClasses">
    <label class="goa-radio-layout">
      <div class="goa-radio-container" :class="options.value === fields.activeValue ? 'goa-radio-selected' : null">
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
      </div>
      <span class="goa-radio-label" for="one">{{options.text}}</span>
    </label>
  </div>
</template>

<script lang="ts">
  import classnames from 'classnames';

  export default {
    model: {
      event: "change",
    },
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: [String, Number, Boolean, Object],
        default: null,
      },
      defaultValue: {
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
      labelPosition: {
        type: String,
        required: false,
        default: 'after',
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
        fields: {
          activeValue: null,
        },
      };
    },
    computed: {
      rootCssClasses() {
        this.fields.activeValue = this.value;
        return classnames({
          'goa-radio': true,
          'goa-radio-disabled': this.disabled,
          'has-error': !this.fields.activeValue && this.required,
          'goa-radio-label-before': this.labelPosition === 'before',
        })
      }
    },
    created() {
      this.fields.activeValue||= this.defaultValue;
    },
    methods: {
      updateValue(value) {
        this.$emit("change", value);
      },
    },

  };
</script>

<style lang="scss" scoped>
  @import './radio.scss';
</style>
