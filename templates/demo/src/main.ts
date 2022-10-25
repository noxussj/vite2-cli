import { createApp } from 'vue'
import dom from './app.vue'
import Router from './router'
import Store from './store'
import registerEcharts from './plugins/echarts'
import registerEchartsNext from './plugins/echarts-next'
import registerElementPlus from './plugins/element-plus'

/**
 * 引用全局 css
 */
import './styles/reset.scss'
import './styles/common.scss'
import './styles/layout.scss'
import './styles/element-variables.scss'
import './styles/reset-element.scss'

/**
 * 全局组件
 */
import globalComponents from './components/global'

const app = createApp(dom)

registerEcharts(app)
registerEchartsNext(app)
registerElementPlus(app)
globalComponents(app)

/**
 * 挂载应用
 */
app.use(Router)
app.use(Store)
app.mount('#app')
