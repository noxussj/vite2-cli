<template>
    <div class="components__app-card" :class="[abs ? 'abs' : '']">
        <div class="card__header">
            <div class="header__left">
                <div v-if="title" class="header__title">
                    <div class="title__icon"><slot name="icon"></slot></div>
                    <div class="title__name">{{ title }}</div>
                </div>
                <div class="left__model" :style="{ height: leftModelHeight }"><slot name="left"></slot></div>
            </div>
            <div class="header__right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="card__container">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        leftModelHeight: {
            type: String,
            default: '24px'
        },
        abs: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
