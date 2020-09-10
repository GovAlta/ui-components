<template>
    <header class="goa-header">
        <div class="top-bar">
            <span class="image"></span>
            <span class="site-text">An official site of the </span> <a href='https://www.alberta.ca/index.aspx'
                class="web-link">Alberta
                Government</a>
        </div>
        <header class="goa-header goa-microsite-header">
            <goa-microsite-logo class="microsite-logo" :serviceName="serviceName" :serviceHome="serviceHome"></goa-microsite-logo>
        </header>
    </header>
</template> 
<script lang="typescript">
    import GoAMicrositeLogo from '../microsite-logo/microsite-logo.vue'; 

    export default {
        components: { 
            'goa-microsite-logo': GoAMicrositeLogo 
        },
        name: 'goa-header',
        props: {
             /**
             * The home link url for when the user clicks.
             */
            'serviceHome': {
                type: String,
                required: true
            },
              /**
             * The service name to display.
             */
            'serviceName': {
                type: String,
                required: true
            }
        },
        data () {
            return {
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../../shared/styles/src/lib/header/header.scss';
</style>