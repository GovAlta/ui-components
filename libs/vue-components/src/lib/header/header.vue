<template>
    <header class="goa-header">
        <div class="top-bar">
            <img class="image" :alt='base64Images.logo.small.alt' :src='base64Images.logo.small.data' />
            <span class="site-text">An official site of the </span> <a href='https://www.alberta.ca/index.aspx'
                class="web-link">Alberta
                Government</a>
        </div>

        <goa-microsite-logo class="microsite-logo" :serviceName="serviceName" :microServiceHomeLink="microServiceHomeLink"></goa-microsite-logo>    
    </header>
</template>
<script>
    import { FooterImages } from '../../../../core-css/src/lib/microsite-logo/inlineImages';
    import { GoAMicrositeLogo } from '../../index';

    export default {
        components: { 
            'goa-microsite-logo': GoAMicrositeLogo 
        },
        name: 'goa-header',
        props: {
            'microServiceHomeLink': {
                type: String,
                required: true
            },
            'serviceName': {
                type: String,
                required: true
            }
        },
        data () {
            return {
                base64Images: FooterImages
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../../core-css/src/lib/header/header.scss';
</style>