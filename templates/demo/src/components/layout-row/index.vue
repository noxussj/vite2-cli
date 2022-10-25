<template>
    <div class="components__layout-row" :class="[orient]" :style="style">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        orient: {
            type: String,
            default: 'horizontal'
        },
        space: {
            type: Number,
            default: 0
        }
    },
    computed: {
        style() {
            const style = {
                '--app-layout-horizontal-space': this.orient === 'horizontal' ? this.space + 'px' : 0,
                '--app-layout-vertical-space': this.orient === 'vertical' ? this.space + 'px' : 0
            }

            return style
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
