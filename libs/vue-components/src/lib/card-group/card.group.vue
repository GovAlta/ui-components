<template>
    <div class="goa-card-group">
      <div class="card-group-title">{{title}}</div>
      <!-- <div :class=[cardGroupClass]>{getCards()}</div> -->
    </div>
</template>
<script lang="typescript">
export default {
  name: 'goa-card-group',
  props: {
    /**
     * Card group title.
     */
    title: {
      type: String,
      required: true,
    },
        /**
     * Card title url .
     */
    // layout: {
    //   type: String,
    //   required: false,
    //   default:'basic'
    // },

    /**
     * Cards json Object
     */
    // cardItem: {
    //   type: Object,
    //   required: false,
    // },
  },
  data() {
    return {
      //cardGroupClass:`card-group-${this.layout}`
    };
  },
  computed: {
    getCards() {
    
    },
   
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/card-group/card-group.scss';
</style>
