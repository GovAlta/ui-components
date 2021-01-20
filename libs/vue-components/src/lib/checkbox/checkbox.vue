<template>
  <div
    class="goa-checkbox"
    :class="{
      'goa-checkbox-disabled': disabled,
      'has-error': hasError,
      'goa-checkbox-label-before': labelPosition === 'before',
    }"
  >
    <label class="goa-checkbox-layout">
      <div
        class="goa-checkbox-container"
        :class="{
          'goa-checkbox-selected': checked,
          'goa-checkbox-indeterminate': indeterminate,
        }"
      >
        <input
          type="checkbox"
          :checked="checked"
          :disabled="disabled"
          :required="required"
          @change="onChangeFunction()"
        />
        <svg
          v-if="checked"
          id="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 12.18"
          class="goa-checkmark"
        >
          <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
        </svg>
        <svg
          v-if="indeterminate"
          id="dashmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 2"
          class="goa-indeterminate"
        >
          <rect width="15" height="2" />
        </svg>
      </div>
      <span class="goa-checkbox-label">
        {{ content }}
      </span>
    </label>
  </div>
</template>

<script lang="typescript">

export default {
  name: 'goa-checkbox',
  props: {
      checked: Boolean,
      required: Boolean,
      disabled: Boolean,
      indeterminate: Boolean,
      content: String,
      labelPosition: {
          type: String,
          required: false,
          default: 'after',
          validator: (value) => {
              return ["before", "after"].includes(value);
          },
      },
      change: {
          type: Function,
          required: false,
      },
    },
    methods: {
      onChangeFunction: function() {
        this.checked = !this.checked;
        if(this.checked && this.indeterminate){
            this.indeterminate = false;
        };

        this.$emit('change');
      },
    },
    computed: {
        hasError: function(){
            return this.required && !this.checked;
        }
    },
    created () {
        if(this.checked){
            this.indeterminate = false;
        }
    },
  }
</script>

<style lang="scss" scoped>
@import './checkbox.scss';
</style>
