import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  mounted: function() {
    try {
      const jwtJsDecode = require('jwt-js-decode');
      let parameters = this.$route.fullPath;
      let re = /\/#id_token=(.+?)&/;
      let token = parameters.match(re)[1];
      let jwt = jwtJsDecode.jwtDecode(token);
      localStorage.token = token;
      localStorage.JWT = JSON.stringify(jwt.payload);
    } catch(err) {
      console.log("error with JWT decode");
    }
  },
  render: h => h(App)
}).$mount('#app')
