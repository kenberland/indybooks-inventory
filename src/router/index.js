import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Inventory from '@/views/Inventory.vue'
import Book from '@/views/Book.vue'
import Search from '@/views/Search.vue'
import Piles from '@/views/Piles.vue'
import Pile from '@/views/Pile.vue'
import PileBook from '@/views/PileBook.vue'

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
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/store/:store_id/piles',
    name: 'Piles',
    component: Piles
  },
  {
    path: '/store/:store_id/piles/:pile_id',
    name: 'Pile',
    component: Pile
  },
  {
    path: '/store/:store_id/piles/:pile_id/isbn/:isbn',
    name: 'PileBook',
    component: PileBook
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
