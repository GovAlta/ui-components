<template>
  <div class="goa-radio-group">
    <span class="radio-group-title">{{title}}</span>
    <span v-if="required" class="required-label">{{required}}</span>
    <div v-if="helperText" class="helper-text">{{helperText}}</div>
    <span v-if="required" class="required-label">{{required}}</span>

    <label class="goa-radio-layout">
      <div v-for="(option, index) in items" :key="option.text">
        <Radio
          id="yesNoQuestion"
          v-model="fields.default"
          :options="items[index]"
          :disabled="disabled"
          :required="required"
          :labelPosition="labelPosition"
          label="Example question one"
        />
      </div>
    </label>
    <div v-if="requiredErrorMessage" class="error-text">{{requiredErrorMessage}}</div>
  </div>
</template>


<script>
import Radio from "./Radio";

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
      required: true,
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
      default: false,
      validator: (prop) => [
      'before', 'after'
      ].includes(prop)
    },
  },

  data() {
    return {
      fields: {
        default: null,
      },
    };
  },
};
</script>
<style lang="scss" scoped>
@import './radio-group.scss';
</style>
