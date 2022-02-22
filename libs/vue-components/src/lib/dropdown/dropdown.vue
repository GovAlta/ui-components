<template>
  <div>
    <div v-if="isOpen" ref="overlay" class="dropdown-overlay" @click="toggleOpen"></div>
    <div
      class="goa-dropdown"
      :class="{ 'single-selection': multiple, 'has-error': hasError }"
    >
      <label class="dropdown-label" :for="`input-for-${label}`">
        {{ label }}
      </label>

      <span v-if="required && !disabled" class="required-label">(Required)</span>

      <div
        class="dropdown-grouping"
        :class="{ disabled: disabled }"
        role="menu"
        @click="!disabled && toggleOpen()"
      >
        <i class="goa-select-icon" />
        <input
          v-if="!isOpen"
          :value="selectedStatus"
          :placeholder="description"
          :readOnly="true"
          role="search"
          class="dropdown-textbox margin-override"
          type="text"
        >

        <input
          v-if="isOpen"
          :id="`input-for-${label}`"
          :placeholder="selectedStatus || description"
          :readOnly="typeAheadMode === 'none'"
          role="search"
          class="dropdown-textbox margin-override"
          type="text"
          autocomplete="off"
          @input="setFilter"
        >
        <div v-if="isOpen" ref="menu" class="dropdown-menu" role="list" :style="{ 'max-height': `${this.maxMenuHeight}px` }">
          <goa-dropdown-option
            v-for="option in matchingOptions"
            :key="option.value"
            role="listitem"
            :value="option.value"
            :name="option.name"
            :class="{ selected: option.selected }"
            :selected="option.selected"
            @select="(e) => selectOption(e, option)"
          />
        </div>
      </div>
      <span v-if="hasError" role="alert" class="dropdown-label error-text">
        At least one item must be selected.
      </span>
      <span v-if="!hasError && !disabled" class="helper-text">
        {{ description }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import GoADropdownOption from './option/option.vue';
export * from './option/option.vue';

interface Option {
  name: string;
  value: string;
  selected: boolean;
}

export default {
  name: 'goa-dropdown',

  components: {
    'goa-dropdown-option': GoADropdownOption,
  },

  props: {
    description: { type: String, default: '' },
    disabled: Boolean,
    label: { type: String, default: '' },
    menuHeight: Number,
    multiple: Boolean,
    options: {
      type: Array,
      required: true,
    },
    required: Boolean,
    typeAheadMode: {
      type: String,
      default: 'none',
      validator: (val: string): boolean => {
        return ['none', 'startsWith', 'contains'].includes(val);
      },
    },
    value: { type: String, default: '' },
    values: { type: Array, default: null },
  },

  data: (): unknown => {
    return {
      opts: [],
      isOpen: false,
      filter: null,
      hasError: false,
      maxMenuHeight: 0,
    };
  },

  computed: {
    matchingOptions(): Option[] {
      if (!this.filter || this.typeAheadMode === 'none') {
        return this.opts;
      }
      return this.opts.filter((option: Option) => {
        if (this.typeAheadMode === 'contains') {
          return option.name.toLowerCase().includes(this.filter);
        }
        return option.name.toLowerCase().indexOf(this.filter) === 0;
      });
    },

    selectedStatus(): string {
      if (this.selectedOptions.length === 0) {
        return '';
      }
      return this.selectedOptions.map((option: Option) => option.name).join(', ');
    },

    selectedOptions(): Option[] {
      return this.opts.filter((option: Option) => option.selected);
    },

    selectedValues(): string[] {
      return this.selectedOptions.map((option: Option) => option.value);
    },
  },

  created(): void {
    const values = this.values || [this.value];
    this.opts = this.options;
    if (values) {
      this.opts.forEach((option: Option) => {
        if (values.includes(option.value)) {
          option.selected = true;
        }
      });
    }
  },

  methods: {

    setMenuHeight(): void {
      const menu = this.$refs['menu'] as HTMLElement
      const overlay = this.$refs['overlay'] as HTMLElement

      if (this.menuHeight) {
        this.maxMenuHeight = this.menuHeight
      } else {
        this.maxMenuHeight = overlay?.clientHeight - menu?.offsetTop - 20 || 0
      }
    },
    selectOption(e: MouseEvent, option: Option): void {
      if (this.multiple) {
        e.stopPropagation();
      }

      // set selected state on the option within the list
      this.opts = this.opts.map((o: Option) => {
        if (o.name === option.name) {
          o.selected = !option.selected;
        } else if (!this.multiple) {
          // deselect the previous value for single selections
          o.selected = false;
        }
        return o;
      });

      this.filter = null;
    },

    setFilter(e: KeyboardEvent): void {
      const target = e.target as HTMLInputElement;
      this.filter = target.value.toLowerCase();
    },

    toggleOpen(): void {
      this.isOpen = !this.isOpen;

      // calculate max height
      if (this.isOpen) {
        // timeout required since the DOM update was out of sync with the menu state
        setTimeout(this.setMenuHeight, 0)
      }

      // relay selected value to parent
      if (!this.isOpen) {
        this.filter = null
        this.hasError =
          this.required &&
          !this.opts.find((option: Option) => option.selected);

        if (this.selectedValues.length > 0) {
          this.$emit('select', this.selectedValues);
        }
      }
    },
  },
};
</script>
