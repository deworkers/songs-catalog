import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ListView from '../views/ListView.vue'
import SearchView from '../views/SearchView.vue'
import SongView from '../views/SongView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'
import GroupView from '../views/GroupView.vue'

import store from '../store/index'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'list',
        component: ListView,
        beforeEnter: (to, from, next) => {
            setTimeout(() => {
                window.scrollTo({
                    top: store.state.scrollPosition,
                    behavior: 'smooth',
                })
            }, 1);
            next();
        },
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
        beforeEnter: (to, from, next) => {
            store.commit('SET_SCROLL_POSITION', document.documentElement.scrollTop);
            next();
        },
    },
    {
        path: '/group/:id',
        name: 'group',
        component: GroupView,
        beforeEnter: (to, from, next) => {
            store.commit('SET_SCROLL_POSITION', document.documentElement.scrollTop);
            next();
        },
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
