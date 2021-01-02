import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Inventory from '@/views/Inventory.vue'
import Book from '@/views/Book.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
    beforeEnter: (to, from, next) => {
      let re = /#id_token=(.+?)&/;
      let matches = to.hash.match(re);

      if(matches) {
        let token = matches[1];
        console.log(token);
        next({ path: '/', query: { token: token }});
      } else {
        next();
      }
    }
  },
  {
    path: '/store/:store_id/isbn/:isbn',
    name: 'Book',
    component: Book
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
