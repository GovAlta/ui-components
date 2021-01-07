<template>
  <div>
    <div class="goa-radio-group">
      <span v-if="title" class="radio-group-title">{{title}}</span>
      <span v-if="required" class="required-label">{{required}}</span>
      <div v-if="helperText" class="helper-text">{{helperText}}</div>
      <label class="goa-radio-layout">
        <div :class="getSelectedCss">
          {{items}}
          <li v-for="item in items" :key="item.message">
            {{item}}--{{item.text}}
            <goa-radio :labelPosition="labelPosition" :title="item.text" :value="item.value" />
          </li>

          <input type="radio" id="one" value="One" v-model="picked">
          <label for="one">One</label>
          <br>
          <input type="radio" id="two" value="Two" v-model="picked">
          <label for="two">Two</label>
          <br>
        </div>
      </label>
      <div v-if="requiredErrorMessage" class="error-text">{{requiredErrorMessage}}</div>
    </div>
  </div>
</template>

<script lang="typescript">
import GoARadio from './radio/radio.vue';

export default {
  name: 'goa-radio-group',
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
    items: {
      type: Array,
      required: true,
    }
  },
  components: {
    'goa-radio': GoARadio
  },
  data() {
    return {
      hasError: this.required,
    };
  },
};
</script>
<style lang="scss" scoped>
@import './radio-group.scss';
</style>
