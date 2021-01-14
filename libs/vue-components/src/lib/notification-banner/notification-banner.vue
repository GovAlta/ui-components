<template>
  <div v-if="!dismissed">
    <div class="goa-notifications">
      <h2 class="title">{{title}}</h2>
    </div>
    <div role="notification" :class="`goa-notification goa--${type}`">
      <div class='content'>   
        <a v-if="notificationUrl" class="message" role="url" :href="notificationUrl">{{message}}</a>
        <span v-else class="message">{{message}}</span>
        
        <a v-if="isDismissable" role="closeBox" class="close" title="Dismiss" @click="dismissBanner()">
          <svg width="16px" height="16px" viewBox="0 0 16 16">
            <path d="M 15.99 14.54C 15.99 14.54 14.54 15.99 14.54 15.99 14.54 15.99 8 9.45 8 9.45 8 9.45 1.46 15.99 1.46 15.99 1.46 15.99 0.01 14.54 0.01 14.54 0.01 14.54 6.55 8 6.55 8 6.55 8 0.01 1.46 0.01 1.46 0.01 1.46 1.46 0.01 1.46 0.01 1.46 0.01 8 6.55 8 6.55 8 6.55 14.54 0.01 14.54 0.01 14.54 0.01 15.99 1.46 15.99 1.46 15.99 1.46 9.45 8 9.45 8 9.45 8 15.99 14.54 15.99 14.54Z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="typescript">

export default {
  data() {
    return {
      dismissed: false,
    };
  },
  name: 'goa-notification-banner',
  props: {
    title: String,
    type: {
      type: String,
      required: false,
      default: 'information',
      validator: (value) => {
          return ['important', 'information', 'event', 'emergency'].includes(value);
      },
    },
    message: String,
    
    notificationUrl: String,
    
    isDismissable:Boolean,
    
    dismiss: {
      type: Function,
      required: false,
    },
    
    },
    methods: {
      dismissBanner: function() {        
        this.dismissed = true;

        this.$emit('click');
      }
    },
  };

</script>

<style lang="scss" scoped>

@import './notification-banner.scss';

</style>