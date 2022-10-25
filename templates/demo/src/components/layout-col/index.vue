<template>
    <div class="components__layout-col" :style="style">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        grow: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        style() {
            const style = { '--layout-col-width': this.width, '--layout-col-height': this.height }

            return style
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
