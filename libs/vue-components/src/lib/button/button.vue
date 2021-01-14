<template>
  <button role="button" v-on:click="onClickFunction" :class="[buttonClasses, buttonTypeClass]" :title="tooltip" v-once >
    {{ content }}
  </button>
</template>

<script lang="typescript">

export default {
  name: 'goa-header',
  emits: ['click'],
  props: {
    /**
     * The type of button - "primary", "secondary", "tertiary".
     */
    buttonType: {
      type: String,
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
      required: false,
      validator: (value) => {
        return ["small", "normal"].includes(value);
      },
    },
    /**
     * Text to display when hovering.
     */
    tooltip: {
      type: String,
      required: false,
    },
    /**
     * The text to display in the button,
     */
    content: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: false,
    },
    onMouseDown: {
      type: Function,
      required: false,
    },
  },
  data() {
    const buttonTypeClass = this.buttonType === 'primary' ? '' : `goa--${this.buttonType}`;
    return {
      buttonClasses: `goa-button ${this.buttonSize === 'small' ? 'btn-small' : ''}`,
      buttonTypeClass: buttonTypeClass,
    }
  },
  methods: {
    onClickFunction: function (event) {
      alert('clicked')
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './button.scss';
</style>
