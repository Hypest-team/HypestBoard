// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios';
import { DateFilter } from './filters/DateFilter';

axios.defaults.baseURL = location.pathname;

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'flag-icon-css/css/flag-icon.css';

Vue.config.productionTip = false

DateFilter(Vue);

/* eslint-disable no-new */
new Vue({
    render: h => h(App)
}).$mount('#app');
