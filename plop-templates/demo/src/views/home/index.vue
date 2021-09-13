<template>
    <div id="test" class="views__home">Hello World Count:{{ count }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import store from '@/store'

const count = ref(store.state.count)
</script>

<style lang="scss">
.views__home {
    color: $color;
}
</style>
