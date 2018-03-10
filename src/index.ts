import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@Component/App.vue';
import router from './router';

import "./Styles/app.css"

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')