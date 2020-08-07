<template>
    <div class="goa-microsite-logo">
        <div class="logo">
            <a :href="microServiceHomeLink" :aria-label="microServiceHomeLink" class='microsite-link'>
                <img class="image-desktop-tablet" :alt="base64Images.logo.fullSize.alt"
                   :src="base64Images.logo.fullSize.data" />
                <img class="image-mobile" :alt="base64Images.logo.small.alt" :src="base64Images.logo.small.data" />
                <span class="name">
                    {{serviceName}}
                </span>
            </a>
        </div>
    </div>
</template>
<script>
    import { FooterImages } from '../../../../core-css/src/lib/microsite-logo/inlineImages';

    export default {
        name: 'goa-microsite-logo',
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
    @import '../../../../core-css/src/lib/microsite-logo/microsite-logo.scss';
</style>