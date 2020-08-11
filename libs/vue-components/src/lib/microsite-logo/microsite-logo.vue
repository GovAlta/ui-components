<template>
    <div class="goa-microsite-logo">
        <div class="logo">
            <a :href="microServiceHomeLink" :aria-label="microServiceHomeLink" class='microsite-link'>
                <img class="image-desktop-tablet" alt="Government of Alberta"
                   :src="DesktopLogo" />
                <img class="image-mobile" alt="Government of Alberta" :src="MobileLogo" />
                <span class="name">
                    {{serviceName}}
                </span>
            </a>
        </div>
    </div>
</template>
<script lang="typescript">
    import { DesktopLogo, MobileLogo } from '@abgov/shared/common';

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
                DesktopLogo: DesktopLogo,
                MobileLogo: MobileLogo
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../../core-css/src/lib/microsite-logo/microsite-logo.scss';
</style>