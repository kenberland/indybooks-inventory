import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Book from '@/views/Book.vue'
import Store from '@/views/Store.vue'
import Search from '@/views/Search.vue'
import Pile from '@/views/Pile.vue'
import PileScanner from '@/views/PileScanner.vue'
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
    path: '/store/:store_id',
    name: 'Store',
    component: Store,
    meta: {
      breadcrumbs: [
        { name: 'Stores', route: { name: 'Home' }, active: false },
        { name: 'Piles', active: true }
      ]
    }
  },
  {
    path: '/store/:store_id/isbn/:isbn',
    name: 'Book',
    component: Book
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/store/:store_id/piles/:pile_id',
    name: 'Pile',
    component: Pile,
    meta: {
      breadcrumbs: [
        { name: 'Stores', route: { name: 'Home' }, active: false },
        { name: 'Piles', route: { name: 'Store' }, active: false },
        { name: 'Pile', active: true }
      ]
    }
  },
  {
    path: '/piles/:pile_id/scanner',
    name: 'PileScanner',
    component: PileScanner
  },
  {
    path: '/piles/:pile_id/isbn/:isbn',
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
