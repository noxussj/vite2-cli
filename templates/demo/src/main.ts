import { createApp } from 'vue'
import dom from './app.vue'
import Router from './router'
import Store from './store'

/**
 * 引用全局css
 */
import './styles/common.scss'

const app = createApp(dom)

/**
 * 挂载应用
 */
app.use(Router)
app.use(Store)
app.mount('#app')
