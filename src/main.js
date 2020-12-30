import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Buefy)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
