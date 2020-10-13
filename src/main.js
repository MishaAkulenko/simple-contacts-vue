import Vue from 'vue'
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

import './assets/css/common.scss';
import './utils/filters'; //Custom filters
import './utils/directives'; //Custom directives
import './utils/baseComponents'; //Base components/ Like BaseButton or BaseInput

import App from './App.vue';

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

