import Vue from 'vue';
import vue2Filters from 'vue2-filters';
import App from './App.vue';

/* External styles dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Own styles dependencies */
import './theme/app.scss';

/* Init filters */
Vue.use(vue2Filters);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
