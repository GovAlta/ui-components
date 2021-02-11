<template>
  <button role="button" v-on:click="onClickFunction" :class="[buttonClasses, buttonTypeClass]" :title="title" v-once >
    <slot />
  </button>
</template>

<script lang="typescript">

export default {
  name: 'goa-header',
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
    title: {
      type: String,
      required: false,
    },
    onClick: {
      type: Function,
      required: false,
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
    onClickFunction: function (event) {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './button.scss';
</style>
