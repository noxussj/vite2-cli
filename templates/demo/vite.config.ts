import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/styles/variables.scss";'
            }
        }
    },
    build: {
        sourcemap: false, // 源代码地图，生产环境一定要关
        minify: 'esbuild' // 打包工具  terser （体积小，速度慢） esbuild （体积大，速度快）
    },
    plugins: [
        vue(),
        eslintPlugin({
            cache: false // 禁用 eslint 缓存
        })
    ]
})
