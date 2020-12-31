import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueCurrencyInput from 'vue-currency-input'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.use(VueCurrencyInput)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
