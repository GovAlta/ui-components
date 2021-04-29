<template>
  <div class="goa-card-group">
    <div class="card-group-title">{{ title }}</div>
    <div v-if="!hasCardItems" slot-scope :class="[cardGroupClass]">
      <slot />
    </div>
    <div v-if="hasCardItems" :class="[cardGroupClass]">
      <div>
        <goa-card
          v-for="(card, index) in cardItems"
          :key="index"
          :title="card.title"
          :title-url="card.titleUrl"
          :description="card.description"
          :card-image-url="card.cardImageUrl"
          :card-width="card.cardWidth"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GoACard from '../card/card.vue';

export default {
  name: 'goa-card-group',
  components: {
    'goa-card': GoACard,
  },
  props: {
    /**
     * Card group title.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Card layout: basic and column .
     */
    layout: {
      type: String,
      required: false,
      default: 'basic',
      validator: (prop: string): boolean => ['basic', 'column'].includes(prop),
    },
    /** Card group json data pass in*/
    cardItems: {
      type: Array,
      default: null,
    },
  },
  data(): unknown {
    return {
      cardGroupClass: `card-group-${this.layout}-vue`,
    };
  },
  computed: {
    hasCardItems(): boolean {
      return Boolean(this.cardItems);
    },
  },
};
</script>

<style lang="scss" module>
@import './card.group.scss';
</style>
