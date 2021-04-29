<template>
  <button
    v-once
    role="button"
    :class="[buttonClasses, buttonTypeClass]"
    :title="title"
    @click="onClickFunction"
  >
    <slot />
  </button>
</template>

<script lang="typescript">

export default {
  name: 'goa-button',
  props: {
    /**
     * The type of button - "primary", "secondary", "tertiary".
     */
    buttonType: {
      type: String,
      default: 'primary',
      required: false,
      validator: (value) => {
        return ["primary", "secondary", "tertiary"].includes(value);
      },
    },
    /**
     * The size of the button - "normal","small".
     */
    buttonSize: {
      type: String,
      default: 'normal',
      required: false,
      validator: (value) => {
        return ["small", "normal"].includes(value);
      },
    },
    /**
     * Text to display when hovering.
     */
    title: {
      type: String,
      default: null,
      required: false,
    },
    onClick: {
      type: Function,
      required: true,
    }
  },
  data() {
    const buttonTypeClass = this.buttonType === 'primary' ? '' : `goa--${this.buttonType}`;
    return {
      buttonClasses: `goa-button ${this.buttonSize === 'small' ? 'btn-small' : ''}`,
      buttonTypeClass: buttonTypeClass,
    }
  },
  methods: {
    onClickFunction() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './button.scss';
</style>
