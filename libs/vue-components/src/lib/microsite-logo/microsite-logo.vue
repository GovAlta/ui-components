<template>
    <div class="goa-microsite-logo">
        <div class="logo">
            <a :href="serviceHome" :aria-label="serviceHome" class='microsite-link'>
                <span class="image-desktop-tablet"></span>
                <span class="image-mobile"></span>
                <span class="name">
                    {{serviceName}}
                </span>
            </a>
        </div>
    </div>
</template>
<script lang="typescript">
    export default {
        name: 'goa-microsite-logo',
        props: {
            'serviceHome': {
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
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../../../core-css/src/lib/microsite-logo/microsite-logo.scss';
</style>