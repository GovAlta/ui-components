<template>
    <div class="goa-microsite-logo">
        <div class="logo">
            <a v-bind:href="microServiceHomeLink" v-bind:aria-label="microServiceHomeLink" class='microsite-link'>
                <img class="image-desktop-tablet" v-bind:alt="base64Images.logo.fullSize.alt"
                   v-vind:src="base64Images.logo.fullSize.data" />
                <img class="image-mobile" v-bind:alt="base64Images.logo.small.alt" v-bind:src="base64Images.logo.small.data" />
                <span class="name">
                    {{serviceName}}
                </span>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'GoAMicrositeLogo',
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

        }
    }
</script>
<style lang="scss">
    @import '../../../../core-css/src/lib/microsite-logo/microsite-logo.scss';
</style>