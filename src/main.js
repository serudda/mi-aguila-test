import Vue from 'vue';
import App from './App.vue';

/* External styles dependencies */
import 'bootstrap/dist/css/bootstrap.min.css';

/* Own styles dependencies */
import './theme/app.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
