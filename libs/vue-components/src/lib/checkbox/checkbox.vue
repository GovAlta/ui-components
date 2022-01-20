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
          'goa-checkbox-selected': isChecked,
          'goa-checkbox-indeterminate': isIndeterminate,
        }"
      >
        <input
          type="checkbox"
          :checked="isChecked"
          :disabled="disabled"
          :required="required"
          @change="onChangeFunction()"
        >
        <svg
          v-if="isChecked"
          id="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 12.18"
          class="goa-checkmark"
        >
          <path d="M5.09,9.64,1.27,5.82,0,7.09l5.09,5.09L16,1.27,14.73,0Z" />
        </svg>
        <svg
          v-if="isIndeterminate"
          id="dashmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 2"
          class="goa-indeterminate"
        >
          <rect width="15" height="2" />
        </svg>
      </div>
      <div class="goa-checkbox-label">
        {{ content }}
      </div>
    </label>
  </div>
</template>

<script lang="ts">

export default {
  name: 'goa-checkbox',
  props: {
    checked: Boolean,
    required: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    content: { type: String, default: ''},
    labelPosition: {
      type: String,
      default: 'after',
      validator: (value: string): boolean => {
          return ["before", "after"].includes(value);
      },
    },
    change: {
      type: Function,
      default: null,
      required: false,
    },
  },
  data: (): unknown => {
    return {
      isIndeterminate: false,
      isChecked: false,
    }
  },
  computed: {
    hasError: function(): boolean {
      return this.required && !this.isChecked;
    }
  },
  created(): void {
    this.isIndeterminate = this.checked ? false : this.indeterminate;
    this.isChecked = this.checked;
  },
  methods: {
    onChangeFunction: function(): void {
        this.isChecked = !this.isChecked;

        if(this.isChecked && this.isIndeterminate){
          this.isIndeterminate = false;
        }

        this.$emit('change');
    },
  },
}
</script>

