<template>
<div class="container">
  <b-progress :value="bookSpot()" :max="books.length" size="is-medium" show-value>
    {{ bookSpot() }} / {{ books.length }}
  </b-progress>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-4">
      <article class="box tile is-child">
        <book-card v-bind="book"/>
      </article>
    </div>
    <div class="tile is-parent is-8">
      <article class="box tile is-child">
        <stock-info v-bind="stock"/>
      </article>
    </div>
  </div>
</div>
</template>

<script>
import BookCard from '@/components/BookCard.vue';
import StockInfo from '@/components/StockInfo.vue';
import { mapState } from 'vuex'

export default {
  name: 'Book',
  components: { BookCard, StockInfo },
  data() {
    return {
      book: { loading: true },
      stock: { pile: true, loading: true },
      store_id: null,
      isbn: null
    }
  },
  watch: {
    $route(to) {
      this.store_id = to.params.store_id;
      this.isbn = to.params.isbn;
      this.book.loading = true;
      this.getBook();
    }
  },
  computed: {
    ...mapState({
      books: state => state.pile.books
    }),
  },
  methods: {
    getBook: function() {
      this.stock.loading = true;
      if(localStorage.token) {
        this.axios.get(`https://api.indybooks.net/v5/auth/inventory/stores/${this.store_id}/isbn/${this.isbn}`, {
          headers: {
            'Authorization': localStorage.token
          }
        })
        .then((response) => {
          this.book = response.data.book;
          this.book.loading = false;
          this.stock.price = response.data.price;
          this.stock.quantity = response.data.quantity;
          this.stock.delivery_promise = response.data.delivery_promise;
          this.stock.store_id = this.store_id;
          this.stock.isbn = this.isbn;
          this.stock.pile = true;
          this.stock.loading = false;
        })
      }
    },
    bookSpot: function() {
      const index = this.books.findIndex(book => book.isbn === this.isbn);
      return index + 1;
    },
  },
  beforeMount: function() {
    this.$store.commit('store/uuid', this.$route.params.store_id);
    if(localStorage.token && this.books.length === 0) {
      this.axios.get(`https://api.indybooks.net/v5/auth/pile/${this.$route.params.pile_id}`, {
        headers: {
          'Authorization': localStorage.token
        }
      })
      .then((response) => {
        this.loading = false;
        this.$store.commit('pile/books', response.data.pile.book_list);
      })
      .catch(() => {
        this.loading = false;
      })
    }
  },
  mounted: function() {
    this.store_id = this.$route.params.store_id;
    this.isbn = this.$route.params.isbn;
    this.book.loading = true;
    this.getBook();
  },
}
</script>

<style>
.b-numberinput.has-text-left input[type=number] {
    text-align: left;
}
</style>
