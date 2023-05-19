import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import ListView from '../views/ListView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'list',
        component: ListView,
    },
    {
        path: '/search/',
        name: 'search',
        component: () => import(/* webpackChunkName: "about" */ '../views/SearchView.vue'),
    },
    {
        path: '/song/:id',
        name: 'song',
        component: () => import(/* webpackChunkName: "about" */ '../views/SongView.vue'),
        beforeEnter: (to) => {
            console.log(to);
            const id = Array.isArray(to.params.id) ? to.params.id[0] : to.params.id;
            const song = store.state.songs.find((el) => el.id === parseInt(id, 10));
            store.commit('SET_ACTIVE', song)
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
