<template>
  <div class="goa-radio-group">
    <span class="radio-group-title">{{title}}</span>
    <span v-if="required" class="required-label">(Required)</span>
    <div v-if="helperText" class="helper-text">{{helperText}}</div>

    <label>
      <div v-for="(option, index) in items" :key="option.text">
        <Radio
          v-model="selectedValue"
          :options="items[index]"
          :disabled="disabled"
          :required="hasError()"
          :labelPosition="labelPosition"
          :value="value"
          :defaultValue="value"
          label="Example question one"
          @change="onChangeResponse"
        />
      </div>
    </label>
    <div v-if="hasError()" class="error-text">
      {{ requiredErrorMessage }}
    </div>
  </div>
</template>

<script lang="ts">
  import Radio from "./radio.vue";

  export default {
    components: {
      Radio,
    },
    props: {
      /**
       * Title of the radio item
       */
      title: {
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
        required: false,
        default: null,
      },
      /**
       * Disable radio buttons
      */
      disabled: {
        type: Boolean,
        default: false,
      },
      /**
       * Is the radio button selection required.
      */
      required: {
        type: Boolean,
        default: false,
      },
      /**
       * List of radio buttons to select
       */
      items: {
        type: [Array],
        required: true,
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
      onChange: {
        type: Function,
        required: false,
      },
      value: {
        type: String,
        required: false,
        default: "",
      },
    },
    methods: {
      hasError() {
        return this.requiredErrorMessage && this.required && !this.selectedValue;
      },
      onChangeResponse(event) {
        this.selectedValue = event
      }
    },
    data() {
      return {
        selectedValue: null,
      };
    },
  };
</script>
<style lang="scss" scoped>
  @import './radio-group.scss';
</style>
