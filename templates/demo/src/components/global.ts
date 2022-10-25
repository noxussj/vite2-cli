import LayoutRow from './layout-row/index.vue'
import LayoutCol from './layout-col/index.vue'
import AppTitle from './app-title/index.vue'
import AppCard from './app-card/index.vue'

/**
 * 全局组件
 */
export default (app:any) => {
    // 布局组件
    app.component('LayoutRow', LayoutRow)
    app.component('LayoutCol', LayoutCol)
    app.component('AppTitle', AppTitle)
    app.component('AppCard', AppCard)
}
