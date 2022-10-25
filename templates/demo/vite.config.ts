import { defineConfig } from 'vite'
import { url } from './config/api'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    server: {
        proxy: {
            '/data': {
                target: url,
                changeOrigin: true,
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            'lodash-es': path.join(__dirname, 'node_modules/lodash-es'),
            vue: path.join(__dirname, 'node_modules/vue'),
            echarts: path.join(__dirname, 'node_modules/echarts'),
            config: path.join(__dirname, 'config')
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
    plugins: [vue()]
})
