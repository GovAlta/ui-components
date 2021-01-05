<template>
  <div class="goa-card" :style="{ width: this.getCardWidth }">
    <div class="goa-poster">
      <img v-if="this.hasImage" :src="this.cardImageUrl" alt="Card cardImageUrl" />
    </div>

    <div class="card-content">
      
       <a class="goa-title" v-if="this.hasTitleUrl" :href="this.titleUrl"> {{ title }} </a>
      <div class="goa-title" v-if="!this.hasTitleUrl">{{ title }} </div>
      
      <div class="goa-text">
        {{ description }}
      </div>
       <div  slot-scope class="goa-footer">
         <slot/>
       </div>
    </div>
  </div>
</template>
<script lang="typescript">
export default {
  name: 'goa-card',
  props: {
    /**
     * Card title.
     */
    title: {
      type: String,
      required: true,
    },
        /**
     * Card title url .
     */
    titleUrl: {
      type: String,
      required: false,
    },

    /**
     * Card description
     */
    description: {
      type: String,
      required: false,
    },
    /** Card image , display on top of title */
    cardImageUrl: {
      type: String,
      required: false,
    },
    /** Display card size to allow card responsively show in different device*/
    cardWidth: {
       type: [ String, Number],
       required: false,
       default:'auto',

    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    hasImage() {
      return Boolean(this.cardImageUrl);
    },
    hasTitleUrl() {
      return Boolean(this.titleUrl);
    },

    getCardWidth(){
      if((typeof this.cardWidth) === "number"){
        return this.cardWidth+"px";
      }
     return (this.cardWidth==='full'? this.cardWidth:'auto');
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../../../core-css/src/lib/styles/card/card.scss';
</style>
