import { createApp } from 'vue';
import * as amplitude from '@amplitude/analytics-browser';
import App from './App.vue';
import store from './store';
import router from './router'

amplitude.init('716e4268e37ffd95c61f30061accbfd2', {
    defaultTracking: false,
});

createApp(App).use(router).use(store).mount('#app');
