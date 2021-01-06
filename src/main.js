import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueCurrencyInput from 'vue-currency-input'
import VueQuagga from 'vue-quaggajs';
import LogRocket from 'logrocket';

LogRocket.init('avssbk/indybooks');
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.use(VueCurrencyInput)
Vue.use(VueQuagga);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
