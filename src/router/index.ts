import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import ListView from '../views/ListView.vue';
import SearchView from '../views/SearchView.vue';
import SongView from '../views/SongView.vue';
import LoginView from '../views/LoginView.vue';
import NotFound from '../views/NotFound.vue';
import GroupView from '../views/GroupView.vue';

import store from '../store/index';

const isMobile: boolean = window.innerWidth <= 760;

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'list',
        component: ListView,
        beforeEnter: (_, __, next) => {
            store.commit('SET_PLAY_LIST', store.state.songs);
            setTimeout(() => {
                if (isMobile) {
                    window.scrollTo({
                        top: store.state.scrollPosition,
                        behavior: 'smooth',
                    });
                } else {
                    const element = document.querySelector('main');
                    if (element) {
                        element.scrollTo({
                            top: store.state.scrollPosition,
                            behavior: 'smooth',
                        });
                    }
                }
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
        beforeEnter: (_, __, next) => {
            if (isMobile) {
                store.commit('SET_SCROLL_POSITION', document.documentElement.scrollTop);
            } else {
                const element = document.querySelector('main');
                if (element) {
                    store.commit('SET_SCROLL_POSITION', element.scrollTop);
                }
            }
            next();
        },
    },
    {
        path: '/group/:id',
        name: 'group',
        component: GroupView,
        beforeEnter: (_, __, next) => {
            if (isMobile) {
                store.commit('SET_SCROLL_POSITION', document.documentElement.scrollTop);
            } else {
                const element = document.querySelector('main');
                if (element) {
                    store.commit('SET_SCROLL_POSITION', element.scrollTop);
                }
            }
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
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
