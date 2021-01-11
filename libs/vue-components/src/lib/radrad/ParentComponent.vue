<template>
  <div class="goa-radio-group">
    <span class="radio-group-title">{{title}}</span>
    <span v-if="required" class="required-label">{{required}}</span>
    <div v-if="helperText" class="helper-text">{{helperText}}</div>
    <span v-if="required" class="required-label">{{required}}</span>

    <label class="goa-radio-layout">
      <div v-for="(option, index) in yes_no_question_options" :key="option.text">
        <CustomRadioGroup
          id="yesNoQuestion"
          v-model="fields.yes_no_question"
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
import CustomRadioGroup from "./CustomRadioGroup";

export default {
  components: {
    CustomRadioGroup,
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
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    items: {
      type: JSON,
      required: true,
    },
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
        yes_no_question: null,
        yes_no_other_question: "",
        other_text: "",
        required_question: null,
        disabled_question: null,
      },
      yes_no_question_options: [
        {
          value: 'grapes',
          text: "Grapes",
        },
        {
          value: 'pears',
          text: "Pears",
        },
        {
          value: 'kiwi',
          text: "Kiwi",
        },
      ],
      yes_no_other_question_options: [
        {
          value: "yes",
          text: "Yes",
        },
        {
          value: "no",
          text: "No",
        },
        {
          value: "other",
          text: "Other",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import './radio-group.scss';
</style>
