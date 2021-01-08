<template>
    <div class='goa-card-group'>
      <div class='card-group-title'>{{title}}</div>
      <div  v-if='!hasCardItems' slot-scope :class=[cardGroupClass]>
       <slot/>
    </div> 
    <div  v-if='hasCardItems' :class=[cardGroupClass] >
       <goa-card  
      v-for="(card,index) in cardItems" :key="index"
       :title="card.title"
       :titleUrl="card.titleUrl"
       :description="card.description"
       :cardImageUrl="card.cardImageUrl"
       :cardWidth="cardcardWidth"
       />
    </div> 

    </div>
   
</template>

<script lang="typescript">
import GoACard from '../card/card.vue';

export default {
  name: 'goa-card-group',
  components:{
    'goa-card':GoACard,
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
     * Card layout, basic and column .
     */
    layout: {
      type: String,
      required: false,
      default:'basic',
        validator: (prop) => [
      'basic', 'column'
      ].includes(prop)
    },
    /** card group json data pass in*/
    cardItems:{
      type:Object,
      required: false
    }
  },
  data() {
    return {
      cardGroupClass:`card-group-${this.layout}-vue`,
      cardItems: this.cardItems
    };
  },
  computed:{
    hasCardItems(){
      return Boolean(this.cardItems);
    }
  }
};
</script>

<style lang="scss" module>
@import './card.group.scss';
</style>
