import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/callback',
    redirect: to => {
      const { hash } = to;

      let parameters = hash;
      let re = /#id_token=(.+?)&/;
      let token = parameters.match(re)[1];

      return {
        path: '/',
        component: 'Home',
        hash: '',
        query: {
          token: token
        }
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
