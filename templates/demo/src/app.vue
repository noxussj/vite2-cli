<template>
    <suspense>
        <router-view />
    </suspense>
</template>

<script lang="ts" setup>
import { _echarts } from 'echarts-next'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// rem响应式设置
const resizeText = () => {
    // （根据实际需求定义）
    const designSize = 1920 // 默认设计尺寸
    const fontSize = 16 // 默认节点字体大小 // 以下内容不需要改动

    const rule = designSize / fontSize // 标准
    const html: any = document.querySelector('html') // 根节点
    const body: any = document.querySelector('body') // 屏幕宽度
    const htmlFontsize = body.clientWidth / rule // html节点字体大小

    html.style.fontSize = htmlFontsize <= 13.7 ? 13.7 + 'px' : htmlFontsize + 'px'
}

resizeText()

window.addEventListener('resize', () => {
    resizeText()
})

watch(
    () => route.path,
    () => {
        _echarts.destroy()
    }
)
</script>
