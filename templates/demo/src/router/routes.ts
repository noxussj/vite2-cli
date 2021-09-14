import type { RouteRecordRaw } from 'vue-router'
import AppLayout from '../layout/app-layout.vue'

const routes:RouteRecordRaw[] = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: import('../views/home/index.vue')
            }
        ]
    }
]

export default routes
