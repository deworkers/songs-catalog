import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ListView from '../views/ListView.vue'
import SearchView from '../views/SearchView.vue'
import SongView from '../views/SongView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'list',
        component: ListView,
    },
    {
        path: '/search/',
        name: 'search',
        component: SearchView,
    },
    {
        path: '/song/:id',
        name: 'song',
        component: SongView,
    },
    {
        path: '/login/',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404',
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
